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
import { getAllCategories } from "@/services/categories";

//#endregion

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  const updateTransactions = useCallback(() => {
    const savedTransactions = getAllTransactions();
    setTransactions(savedTransactions);
  }, []);

  const updateCategories = useCallback(() => {
    const savedCategories = getAllCategories();
    setCategories(savedCategories);
  }, []);

  useEffect(() => {
    updateTransactions();
    updateCategories();
  }, []);

  return (
    <AppContext.Provider
      value={{
        transactions,
        setTransactions,
        updateTransactions,
        categories,
        setCategories,
        updateCategories,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => {
  return useContext(AppContext);
};

export { AppProvider, useApp };
