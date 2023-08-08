//*
//* Código responsável pelo CRUD de categorias usando localStorage
//*

const CATEGORY_STORAGE_KEY = "categories";

//* Garante que as categorias possuam a estrutura correta
const Category = (id, name) => ({
  id,
  name,
});

//* Métodos genêricos para retornar e salvar categorias
const getCategories = () => {
  return JSON.parse(localStorage.getItem(CATEGORY_STORAGE_KEY)) || [];
};

const saveCategories = (categories) => {
  localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(categories));
};

//* Create
const addCategory = (name) => {
  const id = new Date().getTime();

  const newCategory = new Category(id, name);

  let categories = getCategories();
  categories.push(newCategory);
  saveCategories(categories);
  return newCategory;
};

//* Update
const updateCategory = (id, updatedCategory) => {
  let categories = getCategories();
  const index = categories.findIndex((category) => category.id === id);
  if (index !== -1) {
    categories[index] = { ...categories[index], ...updatedCategory };
    saveCategories(categories);
    return categories[index];
  }
  return null;
};

//* Delete
const deleteCategory = (id) => {
  let categories = getCategories();
  categories = categories.filter((category) => category.id !== id);
  saveCategories(categories);
};

//* Get All
function getAllCategories() {
  return getAllCategories();
}

//* Get By Id
function getCategoryById(id) {
  const categories = getCategoriesFromStorage();
  return categories.find((category) => category.id === id);
}

export {
  addCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
};
