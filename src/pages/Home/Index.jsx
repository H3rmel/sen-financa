//#region Imports

//* React
import { useState } from "react";

//* Layout
import { MainLayout } from "@/layouts/Index";

//* Components
import { Stats, Table } from "@/components/Index";
import { ModalAdd, ModalDelete, ModalEdit } from "@/components/Modals/Index";

//* Icons
import { Plus } from "@phosphor-icons/react";

//#endregion

export const Home = () => {
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
      <section className="flex flex-col gap-4 sm:flex-row sm:gap-0 justify-between sm:items-center container">
        <hgroup>
          <h1 className="text-3xl font-semibold tracking-wider">SenFinança</h1>
          <p className="text-sm">Seu webapp de finanças pessoais!</p>
        </hgroup>
        <button
          onClick={openAddTransactionModal}
          className="btn btn-primary w-full sm:w-auto"
        >
          Adicionar Transação <Plus size={16} weight="bold" />
        </button>
      </section>
      <div className="divider" />
      <section className="container flex flex-col items-center">
        <Table
          openDeleteModal={openDeleteTransactionModal}
          openEditModal={openEditTransactionModal}
        />
        <Stats />
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
