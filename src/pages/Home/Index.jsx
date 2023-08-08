//#region Imports

//* Layout and Components
import { MainLayout } from "@/layouts/Index";

//* Icons
import { Plus } from "@phosphor-icons/react";

import { ModalNewTransaction } from "@/components/Modals/ModalNewTransaction";
import { Table } from "@/components/Index";

//#endregion

export const Home = () => {
  
  return (
    <MainLayout pageTitle="Home">
      <section className="flex justify-between items-center container">
        <hgroup>
          <h1 className="text-3xl font-semibold tracking-wider">SenFinança</h1>
          <p className="text-sm">Seu webapp de finanças pessoais!</p>
        </hgroup>
        <button
          onClick={() => window.addTransaction.showModal()}
          className="btn btn-primary"
        >
          Adicionar Transação <Plus size={16} weight="bold" />
        </button>
      </section>
      <div className="divider"></div>
      <Table />
      <ModalNewTransaction />
    </MainLayout>
  );
};
