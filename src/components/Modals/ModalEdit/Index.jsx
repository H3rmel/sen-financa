//#region Imports

//* React
import { useEffect, useState } from "react";

//* Context API
import { useTransactions } from "@/contexts/transactions";

//* Components/UI
import { Modal, Input, Select } from "@/components/Index";

//* Services
import { getTransactionById, updateTransaction } from "@/services/transactions";

//* Utils
import { updateState } from "@/utils/updateState";

//#endregion

export const ModalEdit = ({ id, open, setOpen }) => {
  const [newTransaction, setNewTransaction] = useState({
    id: "",
    title: "",
    type: "",
    category: "",
    value: "",
    createdAt: "",
  });

  useEffect(() => {
    const oldTransaction = getTransactionById(id);
    setNewTransaction((prevNewTransaction) => ({
      ...prevNewTransaction,
      ...oldTransaction,
    }));
  }, [id]);

  const { updateTransactions } = useTransactions();

  //#region Methods

  const handleChange = (event) => {
    updateState(event, setNewTransaction);
  };

  const handleSubmit = () => {
    updateTransaction(id, newTransaction);

    updateTransactions();
    setOpen(false);
  };

  //#endregion

  return (
    <Modal
      id="editTransaction"
      title="Adicionar Transação"
      open={open}
      setOpen={setOpen}
    >
      <form method="dialog" className="flex justify-between flex-wrap mt-2">
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
            onClick={() => setOpen(false)}
            className="btn btn-outline flex-grow"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="btn btn-primary flex-grow"
            type="submit"
          >
            Atualizar
          </button>
        </section>
      </form>
    </Modal>
  );
};
