//*
//* Código responsável pelo CRUD de transações usando localStorage
//*

//* Imports
import { getFormattedDate } from "@/utils/formattedDate";

const STORAGE_KEY = "sf-transactions";

//* Garante que as transações possuam a estrutura correta
class Transaction {
  constructor(id, title, type, category, value, createdAt) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.category = category;
    this.value = value;
    this.createdAt = createdAt;
  }
}

//* Métodos genêricos para retornar e salvar transações
const getTransactions = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

const saveTransactions = (transactions) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
};

//* Create
const addTransaction = ({ title, type, category, value }) => {
  const createdAt = getFormattedDate();
  const id = new Date().getTime();

  const newTransaction = new Transaction(
    id,
    title,
    type,
    category,
    parseFloat(value),
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
const getTransactionById = (id) => {
  let transactions = getTransactions();
  return transactions.find((transaction) => transaction.id === id);
};

//* Get total value OR total length of entries based on a filter
const getEntries = (filterType, filterValue, returnLength = false) => {
  const transactions = getTransactions();

  const filteredTransactions = filterType
    ? transactions.filter((transaction) => transaction[filterType] === filterValue)
    : transactions;

  const totalLength = filteredTransactions.length;

  const totalValue = filteredTransactions.reduce((accumulator, transaction) => {
    if (transaction.type === "income") {
      return accumulator + parseFloat(transaction.value);
    } else if (transaction.type === "expense") {
      return accumulator - parseFloat(transaction.value);
    }
    return accumulator;
  }, 0);

  if (returnLength) return totalLength;
  else return totalValue;
};


export {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransactionById,
  getEntries
};
