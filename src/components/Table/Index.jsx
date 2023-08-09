//#region Imports

//* React
import { useState } from "react";

//* ContextAPI
import { useTransactions } from "@/contexts/transactions";

//* Icons
import { Info, PencilSimple, TrashSimple } from "@phosphor-icons/react";

//* Utils
import { getFormattedValue } from "@/utils/formattedValue";
import { ModalRemoveTransaction } from "../Modals/ModalRemoveTransaction";

//#endregion

export const Table = () => {
  const [openModalRemove, setOpenModalRemove] = useState(false);

  const [idToDelete, setIdToDelete] = useState(0);

  const { transactions } = useTransactions();

  const openRemoveTransactionModal = (id) => {
    setOpenModalRemove(true);
    setIdToDelete(id);
  };

  return (
    <>
      <section className="container">
        {transactions.length > 0 ? (
          <article className="card bg-base-100 border-[1px] border-neutral shadow-lg">
            <div className="card-body">
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
                  {transactions.map((transaction, index) => (
                    <tr key={transaction.id} className="text-md">
                      <th>{index + 1}</th>
                      <td className="capitalize">{transaction.title}</td>
                      <td className="capitalize">
                        {transaction.type === "entry" ? "Entrada" : "Saída"}
                      </td>
                      <td className="capitalize">{transaction.category}</td>
                      <td>{getFormattedValue(transaction.value)}</td>
                      <td>{transaction.createdAt}</td>
                      <td className="flex gap-2">
                        <div className="tooltip" data-tip="Remover">
                          <button
                            onClick={() =>
                              openRemoveTransactionModal(transaction.id)
                            }
                            className="btn btn-error btn-square text-white"
                          >
                            <TrashSimple size={20} weight="bold" />
                          </button>
                        </div>
                        <div className="tooltip" data-tip="Editar">
                          <button className="btn btn-primary btn-square">
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
        ) : (
          <div className="alert alert-info w-fit mx-auto">
            <Info size={24} weight="bold" />
            <span>Nenhuma transação registrada.</span>
          </div>
        )}
        <ModalRemoveTransaction
          id={idToDelete}
          open={openModalRemove}
          setOpen={setOpenModalRemove}
        />
      </section>
    </>
  );
};
