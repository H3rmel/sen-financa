//#region Imports

import { useEffect, useState, useMemo, useContext } from "react";

import { AppContext } from "@/contexts/app";

import { Modal, Input, Select } from "@/components/Index";

import { getTransactionById, updateTransaction } from "@/services/transactions";

import { updateState } from "@/utils/updateState";
import { isObjectComplete } from "@/utils/isObjectComplete";

//#endregion

/**
 * Componente de modal para edição de uma transação existente.
 *
 * @param {Object} props - As propriedades do componente.
 * @param {number} props.id - O ID da transação a ser editada.
 * @param {boolean} props.open - Indica se o modal está aberto.
 * @param {function} props.setOpen - Função para controlar o estado do modal.
 * @returns {JSX.Element} O componente de modal para edição de uma transação.
 */
export const ModalEdit = ({ id, open, setOpen }) => {
  // Estado para armazenar os campos da nova transação em edição
  const [newTransaction, setNewTransaction] = useState({
    id: "",
    title: "",
    type: "",
    category: "",
    value: "",
    createdAt: "",
  });

  // Calcula se todos os campos foram preenchidos
  const fieldsCompleted = useMemo(() => {
    return isObjectComplete(newTransaction, [
      "title",
      "type",
      "category",
      "value",
    ]);
  }, [newTransaction]);

  // Obtém o contexto da aplicação para acesso a transações e categorias
  const { updateTransactions, categories } = useContext(AppContext);

  //#region Methods

  /**
   * Manipula o fechamento do modal.
   *
   * @param {Event} event - O evento de clique.
   */
  const handleClose = (event) => {
    event.preventDefault();
    setOpen(false);
  };

  /**
   * Manipula as mudanças nos campos do formulário.
   *
   * @param {Event} event - O evento de mudança.
   */
  const handleChange = (event) => {
    updateState(event, setNewTransaction);
  };

  /**
   * Manipula o envio do formulário.
   *
   * @param {Event} event - O evento de envio.
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    // Atualiza a transação usando o ID fornecido
    updateTransaction(id, newTransaction);

    // Atualiza as transações após a edição
    updateTransactions();

    // Fecha o Modal
    setOpen(false);
  };

  // Preenche o formulário com os dados da transação a ser editada
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
            type="submit"
          >
            Atualizar
          </button>
        </section>
      </form>
    </Modal>
  );
};
