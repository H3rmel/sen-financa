//#region Imports

//* React
import { useMemo, useState } from "react";

//* Context API
import { useApp } from "@/contexts/app";

//* Components/UI
import { Modal, Input, Select } from "@/components/Index";

//* Services
import { addTransaction } from "@/services/transactions";

//* Utils
import { updateState } from "@/utils/updateState";
import { isObjectComplete } from "@/utils/isObjectComplete";

//#endregion

export const ModalAdd = ({ open, setOpen }) => {
  //#region States and Variables

  const [newTransaction, setNewTransaction] = useState({
    title: "",
    type: "",
    category: "",
    value: 0,
  });

  const fieldsCompleted = useMemo(
    () =>
      isObjectComplete(newTransaction, ["title", "type", "category", "value"]),
    [newTransaction]
  );

  const { updateTransactions, categories } = useApp();

  //#endregion

  //#region Methods

  const handleClose = (event) => {
    event.preventDefault();
    setOpen(false);
  };

  const handleChange = (event) => {
    updateState(event, setNewTransaction);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    addTransaction({ ...newTransaction });
    updateTransactions();

    setNewTransaction({
      title: "",
      type: "",
      category: "",
      value: 0,
    });
    setOpen(false);
  };

  //#endregion

  return (
    <Modal id="addTransaction" title="Adicionar Transação" open={open}>
      <form className="flex justify-around flex-wrap mt-2">
        <Input
          id="title"
          type="text"
          value={newTransaction.title}
          valueChange={handleChange}
          placeholder="Escreva aqui..."
          label="Título"
        />
        <Select
          id="type"
          value={newTransaction.type}
          valueChange={handleChange}
          label="Tipo"
        >
          <option value="income">Entrada</option>
          <option value="expense">Sáida</option>
        </Select>
        <Select
          id="category"
          value={newTransaction.category}
          valueChange={handleChange}
          label="Categoria"
        >
          {categories.map((category, index) => (
            <option key={index} value={category.name} className="capitalize">
              {category.name}
            </option>
          ))}
        </Select>
        <Input
          id="value"
          type="number"
          value={newTransaction.value}
          valueChange={handleChange}
          placeholder="Valor aqui..."
          label="Valor"
        />
        <section className="modal-action flex gap-2 w-full">
          <button
            onClick={handleClose}
            className="btn btn-outline btn-error flex-grow"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className={`btn btn-primary flex-grow ${
              fieldsCompleted ? "" : "btn-disabled"
            }`}
          >
            Adicionar
          </button>
        </section>
      </form>
    </Modal>
  );
};
