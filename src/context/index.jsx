import { createContext, useState, useEffect } from "react";
import Pocketbase from 'pocketbase';

const pb = new Pocketbase('https://wrapped-sometime.pockethost.io/');

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [formData, setFormData] = useState({
    type: 'income',
    amount: 0,
    description: ""
  });

  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [allTransactions, setAllTransactions] = useState([]);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const records = await pb.collection('transactions').getFullList();
        setAllTransactions(records);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    }
    fetchTransactions();
  }, []);

  useEffect(() => {
    async function saveTransactions() {
      try {
        await Promise.all(allTransactions.map(async (transaction) => {
          await pb.collection('transactions').update(transaction.id, transaction);
        }));
      } catch (error) {
        console.error('Failed to save transactions:', error);
      }
    }
    if (allTransactions.length > 0) {
      saveTransactions();
    }
    updateTotals();
  }, [allTransactions]);

  function updateTotals() {
    let income = 0;
    let expense = 0;

    allTransactions.forEach(item => {
      if (item.type === 'income') {
        income += parseFloat(item.amount);
      } else {
        expense += parseFloat(item.amount);
      }
    });

    setTotalIncome(income);
    setTotalExpense(expense);
  }

  async function handleFormSubmit(currentFormData) {
    if (!currentFormData.description || !currentFormData.amount) return;
    try {
      const newTransaction = { ...currentFormData };
      const savedTransaction = await pb.collection('transactions').create(newTransaction);
      setAllTransactions([...allTransactions, savedTransaction]);
    } catch (error) {
      console.error('Failed to submit form data:', error);
    }
  }

  async function deleteTransaction(id) {
    try {
      await pb.collection('transactions').delete(id);
      const updatedTransactions = allTransactions.filter(transaction => transaction.id !== id);
      setAllTransactions(updatedTransactions);
    } catch (error) {
      console.error('Failed to delete transaction:', error);
    }
  }

  async function deleteAllTransactions(type) {
    try {
      const transactionsToDelete = allTransactions.filter(transaction => transaction.type === type);
      await Promise.all(transactionsToDelete.map(transaction => pb.collection('transactions').delete(transaction.id)));
      const updatedTransactions = allTransactions.filter(transaction => transaction.type !== type);
      setAllTransactions(updatedTransactions);
    } catch (error) {
      console.error('Failed to delete all transactions of type:', type, error);
    }
  }

  return (
    <GlobalContext.Provider value={{
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
