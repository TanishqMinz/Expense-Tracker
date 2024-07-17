import { createContext, useState, useEffect, useCallback } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [formData, setFormData] = useState({
    type: 'income',
    amount: 0,
    description: ""
  });

  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [allTransactions, setAllTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const updateTotals = useCallback(() => {
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
  }, [allTransactions]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(allTransactions));
    updateTotals();
  }, [allTransactions, updateTotals]);

  function handleFormSubmit(currentFormData) {
    if (!currentFormData.description || !currentFormData.amount) return;
    const newTransaction = { ...currentFormData, id: Date.now() };
    setAllTransactions([...allTransactions, newTransaction]);
  }

  function deleteTransaction(id) {
    const updatedTransactions = allTransactions.filter(transaction => transaction.id !== id);
    setAllTransactions(updatedTransactions);
  }

  function deleteAllTransactions(type) {
    const updatedTransactions = allTransactions.filter(transaction => transaction.type !== type);
    setAllTransactions(updatedTransactions);
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
