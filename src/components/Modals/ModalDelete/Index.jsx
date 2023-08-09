//#region Imports

//* ContextAPI
import { useTransactions } from "@/contexts/transactions";

//* Components UI
import { Modal } from "../../Index";

//* Services
import { deleteTransaction } from "@/services/transactions";

//#endregion

export const ModalDelete = ({ id, open, setOpen }) => {
  const { updateTransactions } = useTransactions();

  const handleSubmit = () => {
    deleteTransaction(id);

    updateTransactions();
    setOpen(false);
  };

  return (
    <Modal
      id="removeTransaction"
      title="Remover transação"
      open={open}
      setOpen={setOpen}
      className="max-w-none w-fit"
    >
      <form method="dialog" className="flex justify-between flex-wrap mt-2">
        <p>Você tem certeza que deseja excluir esta transação? 🤔</p>
        <section className="modal-action flex gap-2 w-full">
          <button
            onClick={() => setOpen(false)}
            className="btn btn-outline flex-grow"
          >
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
