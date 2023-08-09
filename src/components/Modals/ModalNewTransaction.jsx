//#region Imports

//* React
import { useState } from "react";

//* ContextAPI
import { useTransactions } from "@/contexts/transactions";

//* Components UI
import { Modal, Input, Select } from "../Index";

//* Services
import { addTransaction } from "@/services/transactions";

//* Utils
import { updateState } from "@/utils/updateState";

//#endregion

export const ModalNewTransaction = ({ open, setOpen }) => {
  const [newTransaction, setNewTransaction] = useState({
    title: "",
    type: "",
    category: "",
    value: 0,
  });

  const { updateTransactions } = useTransactions();

  const handleChange = (event) => {
    updateState(event, setNewTransaction);
  };

  const handleSubmit = () => {
    addTransaction({ ...newTransaction });

    updateTransactions();

    setNewTransaction({
      title: "",
      type: "",
      category: "",
      value: 0,
    });
  };

  return (
    <Modal id="addTransaction" title="Adicionar Transação" open={open} setOpen={setOpen}>
      <form
        onSubmit={handleSubmit}
        method="dialog"
        className="flex justify-between flex-wrap mt-2"
      >
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
          <option value="entry">Entrada</option>
          <option value="output">Sáida</option>
        </Select>
        <Select
          id="category"
          value={newTransaction.category}
          valueChange={handleChange}
          label="Categoria"
        >
          <option value="saude">Saúde</option>
          <option value="transporte">Transporte</option>
        </Select>
        <Input
          id="value"
          type="number"
          value={newTransaction.value}
          valueChange={handleChange}
          placeholder="Valor aqui..."
          label="Valor"
        />
        <section className="modal-action flex w-full justify-end">
          <button className="btn btn-primary" type="submit">Adicionar</button>
        </section>
      </form>
    </Modal>
  );
};
