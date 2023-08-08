//*
//* Código responsável pelo CRUD de transações usando localStorage
//*

//* Imports
import { getFormattedDate } from "@/utils/formattedDate";

const STORAGE_KEY = "transactions";

//* Garante que as transações possuam a estrutura correta
const Transaction = (id, title, type, category, value, createdAt) => ({
  id,
  title,
  type,
  category,
  value,
  createdAt,
});

//* Métodos genêricos para retornar e salvar transações
const getTransactions = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

const saveTransactions = (transactions) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
};

//* Create
const addTransaction = (title, type, category, value) => {
  const createdAt = getFormattedDate();
  const id = new Date.getTime();

  const newTransaction = new Transaction(
    id,
    title,
    type,
    category,
    value,
    createdAt
  );

  let transactions = getTransactions();

  transactions.push(newTransaction);
  saveTransactions(transactions);

  return newTransaction;
};

//* Update
const updateTransaction = (id, updatedTransaction) => {
  let transactions = getTransactions();
  const index = transactions.findIndex((transaction) => transaction.id === id);
  if (index !== 1) {
    transactions[index] = { ...transactions[index], ...updatedTransaction };
    saveTransactions(transactions);
    return transactions[index];
  }
  return null;
};

//* Delete
const deleteTransaction = (id) => {
  let transactions = getTransactions();
  transactions = transactions.filter((transactions) => transactions.id !== id);
  saveTransactions(transactions);
};

//* Get All
const getAllTransactions = () => {
  return getTransactions();
};

//* Get By Id
const getTransactionsById = (id) => {
  const transaction = getTransactions();
  return transaction.find((transaction) => transaction.id === id);
};

export {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransactionsById,
};
