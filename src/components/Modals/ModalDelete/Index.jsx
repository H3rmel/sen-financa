//#region Imports

//* Context API
import { useApp } from "@/contexts/app";

//* Components/UI
import { Modal } from "@/components/Index";

//* Services
import { deleteTransaction } from "@/services/transactions";

//#endregion

export const ModalDelete = ({ id, open, setOpen }) => {
  const { updateTransactions } = useApp();

  //#region Methods

  const handleClose = (event) => {
    event.preventDefault();
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    deleteTransaction(id);

    updateTransactions();
    setOpen(false);
  };

  return (
    <Modal
      id="removeTransaction"
      title="Remover transação"
      open={open}
      className="max-w-none w-fit"
    >
      <form className="flex justify-between flex-wrap mt-2">
        <p>Você tem certeza que deseja excluir esta transação? 🤔</p>
        <section className="modal-action flex gap-2 w-full">
          <button onClick={handleClose} className="btn btn-outline flex-grow">
            Cancelar
          </button>
          <button onClick={handleSubmit} className="btn btn-error flex-grow">
            Remover
          </button>
        </section>
      </form>
    </Modal>
  );
};
