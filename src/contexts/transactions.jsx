//#region Imports

//* React
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

//* Services
import { getAllTransactions } from "@/services/transactions";

//#endregion

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  const updateTransactions = useCallback(() => {
    const savedTransactions = getAllTransactions();
    setTransactions(savedTransactions);
  }, []);

  useEffect(() => {
    updateTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{ transactions, setTransactions, updateTransactions }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  return useContext(TransactionContext);
};
