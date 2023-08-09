//#region Imports

//* React
import { useState, useMemo } from "react";

//* Components/UI
import { ConfirmButton, Input } from "@/components/Index";

//* Icons
import { Check, PencilSimple, TrashSimple } from "@phosphor-icons/react";

//* Utils
import { updateState } from "@/utils/updateState";
import { isObjectComplete } from "@/utils/isObjectComplete";

//#endregion

export const CategoriesList = ({ children }) => {
  return (
    <ul className="bg-neutral py-7 border-[1px] border-neutral-50/10 mt-4 rounded-2xl max-h-96 overflow-y-auto">
      {children}
    </ul>
  );
};

export const CategoriesListItem = ({
  category,
  index,
  deleteCategory,
  editCategory,
}) => {
  //#region States and Variables

  const [newCategory, setNewCategory] = useState({ ...category });
  const [isEditing, setIsEditing] = useState(false);

  const fieldCompleted = useMemo(
    () => isObjectComplete(newCategory, ["name"]),
    [newCategory]
  );

  //#endregion

  //#region Methods

  const handleChange = (event) => {
    updateState(event, setNewCategory);
  };

  const handleSubmit = () => {
    editCategory(category.id, newCategory);
    setIsEditing(false);
  };

  //#endregion

  return (
    <li
      className={`flex items-center justify-between px-6 py-2 ${
        index === 0 ? "border-y-[1px]" : "border-b-[1px]"
      } border-base-100/50`}
    >
      {isEditing ? (
        <Input
          id="name"
          type="text"
          value={newCategory.name}
          valueChange={handleChange}
          placeholder="Escreva aqui..."
        />
      ) : (
        <p className="text-lg capitalize">{category.name}</p>
      )}
      <div className="flex gap-2">
        <ConfirmButton
          onConfirm={() => deleteCategory(category.id)}
          className="btn-error btn-square text-neutral-50"
          messages={["Remover", "Confirmar"]}
          dialog={[
            <TrashSimple size={20} weight="bold" />,
            <Check size={20} weight="bold" />,
          ]}
        />
        <ConfirmButton
          onFirstClick={() => setIsEditing(true)}
          onConfirm={handleSubmit}
          messages={["Editar", "Confirmar"]}
          dialog={[
            <PencilSimple size={20} weight="bold" />,
            <Check size={20} weight="bold" />,
          ]}
          className={`btn-primary btn-square text-neutral-50 ${
            fieldCompleted ? "" : "btn-disabled"
          }`}
        />
      </div>
    </li>
  );
};
