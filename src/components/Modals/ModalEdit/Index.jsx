//#region Imports

//* React
import { useEffect, useState, useMemo } from "react";

//* Context API
import { useApp } from "@/contexts/app";

//* Components/UI
import { Modal, Input, Select } from "@/components/Index";

//* Services
import { getTransactionById, updateTransaction } from "@/services/transactions";

//* Utils
import { updateState } from "@/utils/updateState";
import { isObjectComplete } from "@/utils/isObjectComplete";

//#endregion

export const ModalEdit = ({ id, open, setOpen }) => {
  //#region States and Variables

  const [newTransaction, setNewTransaction] = useState({
    id: "",
    title: "",
    type: "",
    category: "",
    value: "",
    createdAt: "",
  });

  const fieldsCompleted = useMemo(() => {
    return isObjectComplete(newTransaction, [
      "title",
      "type",
      "category",
      "value",
    ]);
  }, [newTransaction]);

  const { updateTransactions } = useApp();

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
    updateTransaction(id, newTransaction);

    updateTransactions();
    setOpen(false);
  };

  useEffect(() => {
    const oldTransaction = getTransactionById(id);
    setNewTransaction((prevNewTransaction) => ({
      ...prevNewTransaction,
      ...oldTransaction,
    }));
  }, [id]);

  //#endregion

  return (
    <Modal id="editTransaction" title="Adicionar Transação" open={open}>
      <form className="flex justify-between flex-wrap mt-2">
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
            type="submit"
          >
            Atualizar
          </button>
        </section>
      </form>
    </Modal>
  );
};
