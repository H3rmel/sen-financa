//#region Imports

//* React
import { useMemo, useState } from "react";

//* Context API
import { useTransactions } from "@/contexts/transactions";

//* Components/UI
import { Select } from "../Index";

//* Icons
import { PencilSimple, TrashSimple } from "@phosphor-icons/react";

//* Utils
import { updateState } from "@/utils/updateState";
import { getFormattedValue } from "@/utils/formattedValue";

//#endregion

export const Table = ({ openDeleteModal, openEditModal }) => {
  const [filters, setFilters] = useState({
    type: "all",
    category: "all",
  });

  const { transactions } = useTransactions();

  //#region Methods

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      if (
        (filters.type === "all" || transaction.type === filters.type) &&
        (filters.category === "all" ||
          transaction.category === filters.category)
      )
        return true;

      return false;
    });
  }, [transactions, filters]);

  const handleChange = (event) => {
    updateState(event, setFilters);
  };

  //#endregion

  return (
    <article className="card bg-base-100 w-full border-[1px] border-neutral overflow-x-auto shadow-lg">
      <div className="card-body">
        <div className="flex gap-4 mb-2">
          <Select
            id="type"
            value={filters.type}
            valueChange={handleChange}
            label="Tipo"
          >
            <option value="all">Todos</option>
            <option value="income">Entrada</option>
            <option value="expense">Sáida</option>
          </Select>
          <Select
            id="category"
            value={filters.category}
            valueChange={handleChange}
            label="Categoria"
          >
            <option value="all">Todas</option>
            <option value="saude">Saúde</option>
            <option value="transporte">Transporte</option>
          </Select>
        </div>
        <table className="table">
          <thead>
            <tr className="text-base">
              <th>#</th>
              <th>Título</th>
              <th>Tipo</th>
              <th>Categoria</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <tr key={transaction.id} className="text-md">
                <th>{index + 1}</th>
                <td className="capitalize">{transaction.title}</td>
                <td className="capitalize">
                  {transaction.type === "income" ? "Entrada" : "Saída"}
                </td>
                <td className="capitalize">{transaction.category}</td>
                <td>{getFormattedValue(transaction.value)}</td>
                <td>{transaction.createdAt}</td>
                <td className="flex gap-2">
                  <div className="tooltip" data-tip="Remover">
                    <button
                      onClick={() => openDeleteModal(transaction.id)}
                      className="btn btn-error btn-square text-white"
                    >
                      <TrashSimple size={20} weight="bold" />
                    </button>
                  </div>
                  <div className="tooltip" data-tip="Editar">
                    <button
                      onClick={() => openEditModal(transaction.id)}
                      className="btn btn-primary btn-square"
                    >
                      <PencilSimple size={20} weight="bold" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
};
