import { createContext, useState, useEffect, useCallback } from "react";
import Pocketbase from 'pocketbase';

const pb = new Pocketbase('https://wrapped-sometime.pockethost.io/');

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [user, setUser] = useState(pb.authStore.model);
  const [formData, setFormData] = useState({
    type: 'income',
    amount: 0,
    description: ""
  });
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [allTransactions, setAllTransactions] = useState([]);

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange((model) => setUser(model));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const fetchTransactions = useCallback(async () => {
    if (!user) return;
    try {
      const records = await pb.collection('transactions').getFullList({
        filter: `user_id="${user.id}"`,
      });
      setAllTransactions(records);
      updateTotals(records); 
    } catch (error) {
      console.log('Failed to fetch transactions:', error);
    }
  }, [user]);

  useEffect(() => {
    updateTotals(allTransactions);
  }, [allTransactions]);

  const updateTotals = useCallback((transactions) => {
    let income = 0;
    let expense = 0;

    transactions.forEach(item => {
      if (item.type === 'income') {
        income += parseFloat(item.amount);
      } else {
        expense += parseFloat(item.amount);
      }
    });

    setTotalIncome(income);
    setTotalExpense(expense);
  }, []);

  const register = useCallback(async (email, password) => {
    const createdUser = await pb.collection("users").create({ 
      email,
      password,
      passwordConfirm: password,
    }); 
    return createdUser
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      await pb.collection("users").authWithPassword(email, password);
      setUser(pb.authStore.model) // Essential for correctly mapping user_id correctly
      fetchTransactions(); // optional as fetchTransactions is already dependent on user change
    } catch (error) {
      console.log('Login failed:', error);
    }
  }, [fetchTransactions]);

  const logout = useCallback(() => {
    pb.authStore.clear();
    setTotalExpense(0);
    setTotalIncome(0);
    setAllTransactions([]);
  }, []);

  async function handleFormSubmit(currentFormData) {
    if (!currentFormData.description || !currentFormData.amount || !user) {
      console.log('Form submission failed: Missing description, amount, or user.');
      return;
    }
    try {
      const newTransaction = {
        ...currentFormData,
        user_id: user.id,
      };
      const savedTransaction = await pb.collection('transactions').create(newTransaction);
      setAllTransactions(prev => {
        const updatedTransactions = [...prev, savedTransaction];
        updateTotals(updatedTransactions);
        return updatedTransactions;
      });
    } catch (error) {
      console.log('Failed to submit form data:', error);
    }
  }


  async function deleteTransaction(id) {
    try {
      await pb.collection('transactions').delete(id);
      setAllTransactions(prev => {
        const updatedTransactions = prev.filter(transaction => transaction.id !== id);
        updateTotals(updatedTransactions);
        return updatedTransactions;
      });
    } catch (error) {
      console.log('Failed to delete transaction:', error);
    }
  }

  async function deleteAllTransactions(type) {
    try {
      const transactionsToDelete = allTransactions.filter(transaction => transaction.type === type);
      await Promise.all(transactionsToDelete.map(transaction => pb.collection('transactions').delete(transaction.id)));
      setAllTransactions(prev => {
        const updatedTransactions = prev.filter(transaction => transaction.type !== type);
        updateTotals(updatedTransactions);
        return updatedTransactions;
      });
    } catch (error) {
      console.log('Failed to delete all transactions of type:', type, error);
    }
  }

  return (
    <GlobalContext.Provider value={{
      register, login, logout, user,
      formData, setFormData,
      totalExpense, setTotalExpense,
      totalIncome, setTotalIncome,
      allTransactions, setAllTransactions,
      handleFormSubmit,
      deleteTransaction,
      deleteAllTransactions
    }}>
      {children}
    </GlobalContext.Provider>
  );
}
