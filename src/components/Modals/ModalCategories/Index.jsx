//#region Imports

//* React
import { useState, useMemo } from "react";

//* Context API
import { useApp } from "@/contexts/app";

//* Components/UI
import { Modal, Input } from "@/components/Index";
import { CategoriesList, CategoriesListItem } from "./CategoriesList";

//* Services
import {
  addCategory,
  deleteCategory,
  getCategoryById,
  updateCategory,
} from "@/services/categories";

//* Utils
import { updateState } from "@/utils/updateState";
import { isObjectComplete } from "@/utils/isObjectComplete";

//#endregion

export const ModalCategories = ({ open, setOpen }) => {
  //#region States and Variables

  const [newCategory, setNewCategory] = useState({ name: "" });

  const fieldCompleted = useMemo(
    () => isObjectComplete(newCategory, ["name"]),
    [newCategory]
  );

  const { categories, updateCategories } = useApp();

  //#endregion

  //#region Methods

  const handleClose = (event) => {
    event.preventDefault();
    setOpen(false)
  }

  //* Add
  const handleAddChange = (event) => {
    updateState(event, setNewCategory);
  };

  const handleAddSubmit = (event) => {
    event.preventDefault();

    addCategory({ ...newCategory });

    updateCategories();
  };

  //* Delete
  const handleDelete = (id) => {
    deleteCategory(id);

    updateCategories();
  };

  //* Edit
  const handleEdit = (id, updatedCategory) => {
    updateCategory(id, updatedCategory);

    updateCategories();
  };

  //#endregion

  return (
    <Modal id="modalCategories" title="Categorias" open={open}>
      <form
        onSubmit={handleAddSubmit}
        className="flex flex-col sm:flex-row items-end gap-4"
      >
        <Input
          id="name"
          type="text"
          value={newCategory.name}
          valueChange={handleAddChange}
          placeholder="Escreva aqui..."
          label="Nome"
        />
        <button
          className={`btn btn-primary w-full sm:w-auto ${
            fieldCompleted ? "" : "btn-disabled"
          }`}
          type="submit"
        >
          Adicionar
        </button>
      </form>
      <CategoriesList>
        {categories.map((category, index) => (
          <CategoriesListItem
            key={category.id}
            category={category}
            index={index}
            deleteCategory={handleDelete}
            editCategory={handleEdit}
          />
        ))}
      </CategoriesList>
      <section className="modal-action flex w-full justify-start">
        <button
          className="btn btn-outline btn-error w-full"
          onClick={handleClose}
        >
          Fechar
        </button>
      </section>
    </Modal>
  );
};
