//#region Imports

//* React
import { useState } from "react";

//* Components/UI
import { Modal, Input } from "@/components/Index";

//*

//#endregion

export const ModalCategories = ({ open, setOpen }) => {
  return (
    <Modal
      id="modalCategories"
      title="Categorias"
      open={open}
      setOpen={setOpen}
    >
      <div className="tabs tabs-boxed">
        <a className="tab">Lista</a>
        <a className="tab tab-active">Tab 2</a>
        <a className="tab">Tab 3</a>
      </div>
      toma
    </Modal>
  );
};
