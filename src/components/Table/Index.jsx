//#region Imports

//* React
import { useMemo, useState } from "react";

//* Context API
import { useApp } from "@/contexts/app";

//* Components/UI
import { Select, Input } from "@/components/Index";

//* Icons
import {
  ArrowDown,
  ArrowUp,
  PencilSimple,
  TrashSimple,
} from "@phosphor-icons/react";

//* Utils
import { updateState } from "@/utils/updateState";
import { getFormattedValue } from "@/utils/formattedValue";

//#endregion

export const Table = ({ openDeleteModal, openEditModal }) => {
  //#region States and Variables

  const [filters, setFilters] = useState({
    type: "all",
    category: "all",
    title: "",
    value: 0,
    createdAt: "",
  });

  const [sorter, setSorter] = useState({
    field: null,
    order: "asc",
  });

  const { transactions, categories } = useApp();

  //#endregion

  //#region Methods

  //* Sort
  const handleSort = (field, order) => {
    setSorter({
      field: field,
      order: order,
    });
  };

  const sortedTransactions = useMemo(() => {
    let sorted = [...transactions];

    if (sorter.field) {
      sorted = sorted.sort((a, b) => {
        const valueA = a[sorter.field];
        const valueB = b[sorter.field];

        if (typeof valueA === "number" && typeof valueB === "number")
          return sorter.order === "asc" ? valueA - valueB : valueB - valueA;
        else
          return sorter.order === "asc"
            ? valueA.toString().localeCompare(valueB.toString())
            : valueB.toString().localeCompare(valueA.toString());
      });
    }

    return sorted;
  }, [transactions, sorter]);

  //* Filter
  const filteredTransactions = useMemo(() => {
    return sortedTransactions.filter((transaction) => {
      if (
        (filters.type === "all" || transaction.type === filters.type) &&
        (filters.category === "all" ||
          transaction.category === filters.category) &&
        (filters.title === "" ||
          transaction.title
            .toLowerCase()
            .includes(filters.title.toLowerCase())) &&
        (filters.value === "" ||
          transaction.value.toString().includes(filters.value)) &&
        (filters.createdAt === "" ||
          transaction.createdAt.includes(filters.createdAt))
      )
        return true;

      return false;
    });
  }, [sortedTransactions, filters]);

  const handleChange = (event) => {
    updateState(event, setFilters);
  };

  const resetFiltersAndSorters = () => {
    setFilters({
      type: "all",
      category: "all",
      title: "",
      value: 0,
      createdAt: "",
    });

    setSorter({
      field: null,
      order: "asc",
    });
  };

  //#endregion

  return (
    <>
      <article className="card bg-base-100 w-full mb-8">
        <div className="card-body flex flex-row flex-wrap justify-center sm:justify-start items-end gap-4">
          <Input
            id="title"
            type="text"
            value={filters.title}
            valueChange={handleChange}
            label="Título"
            placeholder="Escreva aqui..."
          />
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
            {categories.map((category, index) => (
              <option key={index} value={category.name} className="capitalize">
                {category.name}
              </option>
            ))}
          </Select>
          <Input
            id="value"
            type="text"
            value={filters.value}
            valueChange={handleChange}
            label="Valor (R$)"
            placeholder="Escreva aqui..."
          />
          <Input
            id="createdAt"
            type="text"
            value={filters.createdAt}
            valueChange={handleChange}
            label="Data"
            placeholder="Escreva aqui..."
          />
          <button
            className="btn btn-primary w-full max-w-xs"
            onClick={resetFiltersAndSorters}
          >
            Resetar Filtros
          </button>
        </div>
      </article>
      <article className="card bg-base-100 w-full border-[1px] border-neutral overflow-x-auto shadow-lg">
        <div className="card-body">
          <table className="table">
            <thead>
              <tr className="text-base">
                <th>#</th>
                <th>
                  <div className="flex items-center gap-2">
                    Título
                    <button
                      onClick={() => handleSort("title", "asc")}
                      className="btn btn-ghost min-h-0 h-fit p-1 flex justify-center items-center"
                    >
                      <ArrowUp size={16} weight="bold" />
                    </button>
                    <button
                      onClick={() => handleSort("title", "desc")}
                      className="btn btn-ghost min-h-0 h-fit p-1 flex justify-center items-center"
                    >
                      <ArrowDown size={16} weight="bold" />
                    </button>
                  </div>
                </th>
                <th>
                  <div className="flex items-center gap-2">
                    Tipo
                    <button
                      onClick={() => handleSort("type", "asc")}
                      className="btn btn-ghost min-h-0 h-fit p-1 flex justify-center items-center"
                    >
                      <ArrowUp size={16} weight="bold" />
                    </button>
                    <button
                      onClick={() => handleSort("type", "desc")}
                      className="btn btn-ghost min-h-0 h-fit p-1 flex justify-center items-center"
                    >
                      <ArrowDown size={16} weight="bold" />
                    </button>
                  </div>
                </th>
                <th>
                  <div className="flex items-center gap-2">
                    Categoria
                    <button
                      onClick={() => handleSort("category", "asc")}
                      className="btn btn-ghost min-h-0 h-fit p-1 flex justify-center items-center"
                    >
                      <ArrowUp size={16} weight="bold" />
                    </button>
                    <button
                      onClick={() => handleSort("category", "desc")}
                      className="btn btn-ghost min-h-0 h-fit p-1 flex justify-center items-center"
                    >
                      <ArrowDown size={16} weight="bold" />
                    </button>
                  </div>
                </th>
                <th>
                  <div className="flex items-center gap-2">
                    Valor
                    <button
                      onClick={() => handleSort("value", "asc")}
                      className="btn btn-ghost min-h-0 h-fit p-1 flex justify-center items-center"
                    >
                      <ArrowUp size={16} weight="bold" />
                    </button>
                    <button
                      onClick={() => handleSort("value", "desc")}
                      className="btn btn-ghost min-h-0 h-fit p-1 flex justify-center items-center"
                    >
                      <ArrowDown size={16} weight="bold" />
                    </button>
                  </div>
                </th>
                <th>
                  <div className="flex items-center gap-2">
                    Data
                    <button
                      onClick={() => handleSort("createdAt", "asc")}
                      className="btn btn-ghost min-h-0 h-fit p-1 flex justify-center items-center"
                    >
                      <ArrowUp size={16} weight="bold" />
                    </button>
                    <button
                      onClick={() => handleSort("createdAt", "desc")}
                      className="btn btn-ghost min-h-0 h-fit p-1 flex justify-center items-center"
                    >
                      <ArrowDown size={16} weight="bold" />
                    </button>
                  </div>
                </th>
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
                    <div className="tooltip tooltip-info" data-tip="Remover">
                      <button
                        onClick={() => openDeleteModal(transaction.id)}
                        className="btn btn-error btn-square text-white"
                      >
                        <TrashSimple size={20} weight="bold" />
                      </button>
                    </div>
                    <div className="tooltip tooltip-info" data-tip="Editar">
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
    </>
  );
};
