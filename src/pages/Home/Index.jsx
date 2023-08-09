//#region Imports

//* React
import { useState } from "react";

//* Context API
import { useTransactions } from "@/contexts/transactions";

//* Layout
import { MainLayout } from "@/layouts/Index";

//* Components
import { Stats, Table } from "@/components/Index";
import { ModalAdd, ModalDelete, ModalEdit } from "@/components/Modals/Index";

//* Icons
import { Plus, Info } from "@phosphor-icons/react";

//#endregion

export const Home = () => {
  const { transactions } = useTransactions();

  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const [selectedModalId, setSelectedModalId] = useState(0);

  //#region Methods

  const openAddTransactionModal = () => {
    setOpenModalAdd(true);
  };

  const openDeleteTransactionModal = (id) => {
    setOpenModalDelete(true);
    setSelectedModalId(id);
  };

  const openEditTransactionModal = (id) => {
    setOpenModalEdit(true);
    setSelectedModalId(id);
  };

  //#endregion

  return (
    <MainLayout pageTitle="Home">
      <section className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between sm:items-center container">
        <hgroup>
          <h1 className="text-3xl font-semibold tracking-wider">SenFinança</h1>
          <p className="text-sm">Seu webapp de finanças pessoais!</p>
        </hgroup>
        <div className="space-x-4">
          <button className="btn btn-primary">Categorias</button>
          <button
            onClick={openAddTransactionModal}
            className="btn btn-primary w-full sm:w-auto"
          >
            Adicionar Transação <Plus size={16} weight="bold" />
          </button>
        </div>
      </section>
      <div className="divider" />
      <section className="container flex flex-col items-center">
        {transactions.length > 0 ? (
          <>
            <Table
              openDeleteModal={openDeleteTransactionModal}
              openEditModal={openEditTransactionModal}
            />
            <Stats />
          </>
        ) : (
          <article className="alert alert-info w-fit mx-auto">
            <Info size={24} weight="bold" />
            <span>Nenhuma transação registrada.</span>
          </article>
        )}
      </section>
      <ModalAdd open={openModalAdd} setOpen={setOpenModalAdd} />
      <ModalDelete
        id={selectedModalId}
        open={openModalDelete}
        setOpen={setOpenModalDelete}
      />
      <ModalEdit
        id={selectedModalId}
        open={openModalEdit}
        setOpen={setOpenModalEdit}
      />
    </MainLayout>
  );
};
