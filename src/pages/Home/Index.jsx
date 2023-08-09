//#region Imports

//* React
import { useState } from "react";

//* Layout
import { MainLayout } from "@/layouts/Index";

//* Components
import { Table } from "@/components/Index";
import { ModalNewTransaction } from "@/components/Modals/ModalNewTransaction";

//* Icons
import { Plus } from "@phosphor-icons/react";

//#endregion

export const Home = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);

  const openAddTransactionModal = () => {
    setOpenModalAdd(true);
  };

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
      <div className="divider"></div>
      <Table />
      <ModalNewTransaction open={openModalAdd} setOpen={setOpenModalAdd} />
    </MainLayout>
  );
};
