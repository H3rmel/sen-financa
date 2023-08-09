//#region Imports

//* React
import { useMemo, useState } from "react";

//* Context API
import { useApp } from "@/contexts/app";

//* Components/UI
import { Select, Input, Stat } from "@/components/Index";

//* IMask
import { IMaskInput } from "react-imask";

//* Icons
import {
  ArrowDown,
  ArrowUp,
  PencilSimple,
  TrashSimple,
} from "@phosphor-icons/react";

//* Utils
import { updateState, updateStateMaskedInput } from "@/utils/updateState";
import { getFormattedValue } from "@/utils/formattedValue";
import { getEntries } from "@/services/transactions";

//#endregion

export const Table = ({ openDeleteModal, openEditModal }) => {
  //#region States and Variables

  const [filters, setFilters] = useState({
    type: "all",
    category: "all",
    title: "",
    valueMin: 0,
    valueMax: 0,
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
      const valueInRange =
        (filters.valueMin === 0 ||
          filters.valueMin === "" ||
          transaction.value >= parseFloat(filters.valueMin)) &&
        (filters.valueMax === 0 ||
          filters.valueMax === "" ||
          transaction.value <= parseFloat(filters.valueMax));
      if (
        (filters.type === "all" || transaction.type === filters.type) &&
        (filters.category === "all" ||
          transaction.category === filters.category) &&
        (filters.title === "" ||
          transaction.title
            .toLowerCase()
            .includes(filters.title.toLowerCase())) &&
        valueInRange &&
        (filters.createdAt === "" ||
          transaction.createdAt.includes(filters.createdAt))
      )
        return true;

      return false;
    });
  }, [sortedTransactions, filters]);

  //* Handlers
  const handleChange = (event) => {
    updateState(event, setFilters);
  };

  const handleMaskChange = (value, event) => {
    updateStateMaskedInput(value, event, setFilters);
  };

  //* Reset Filters and Sorters
  const resetFiltersAndSorters = () => {
    setFilters({
      type: "all",
      category: "all",
      title: "",
      valueMin: 0,
      valueMax: 0,
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
      <article className="collapse collapse-arrow sm:max-w-xl sm:w-max bg-base-100 mb-8 border-[1px] border-neutral shadow-lg hover:outline-none focus:outline-none focus-visible:outline-none">
        <input type="checkbox" className="w-auto" />
        <div className="collapse-title text-xl font-medium">Filtros</div>
        <div className="collapse-content flex flex-row flex-wrap justify-center sm:justify-start items-end gap-4">
          <Input
            id="title"
            type="text"
            value={filters.title}
            valueChange={handleChange}
            label="Título"
            placeholder="Escreva aqui..."
            className="max-w-none sm:basis-[48%]"
          />
          <Select
            id="type"
            value={filters.type}
            valueChange={handleChange}
            label="Tipo"
            className="max-w-none sm:basis-[48%]"
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
            className="max-w-none sm:basis-[48%]"
          >
            <option value="all">Todas</option>
            {categories.map((category, index) => (
              <option key={index} value={category.name} className="capitalize">
                {category.name}
              </option>
            ))}
          </Select>
          <div className="form-control w-full max-w-none sm:basis-[48%]">
            <label htmlFor="createdAt" className="label">
              <span className="label-text">Data</span>
            </label>
            <IMaskInput
              mask="00/00/0000"
              name="createdAt"
              id="createdAt"
              value={filters.createdAt}
              onAccept={(value, mask, event) => handleMaskChange(value, event)}
              required
              placeholder="00/00/0000"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <Input
            id="valueMin"
            type="number"
            value={filters.valueMin}
            valueChange={handleChange}
            label="Valor Mínimo (R$)"
            placeholder="Escreva aqui..."
            className="max-w-none sm:basis-[48%]"
          />
          <Input
            id="valueMax"
            type="number"
            value={filters.valueMax}
            valueChange={handleChange}
            label="Valor Máximo (R$)"
            placeholder="Escreva aqui..."
            className="max-w-none sm:basis-[48%]"
          />
          <button
            className="btn btn-primary w-full"
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
      <article className="stats w-full overflow-x-auto border-[1px] border-neutral shadow-xl mt-8">
        <Stat
          title={`Total (${getEntries("", "", true)})`}
          value={getFormattedValue(getEntries("", ""))}
          description="Valor total das entradas e saídas."
        />
        <Stat
          title={`Entradas (${getEntries("type", "income", true)})`}
          value={getFormattedValue(getEntries("", "income"))}
          description="Valor total somente das entradas."
        />
        <Stat
          title={`Saídas (${getEntries("type", "expense", true)})`}
          value={getFormattedValue(getEntries("type", "expense"))}
          description="Valor total somente das saídas."
        />
        {filters.category !== "all" && (
          <Stat
            title={`Total - ${filters.category} (${getEntries("category", filters.category, true)})`}
            value={getFormattedValue(getEntries("category", filters.category))}
            description={`Valor total de gastos com (${filters.category})`}
          />
        )}
      </article>
    </>
  );
};
