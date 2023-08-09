//*
//* Código responsável pelo CRUD de categorias usando localStorage
//*

import { initialCategories } from "@/constants/initialCategories.json";

const CATEGORY_STORAGE_KEY = "sf-categories";

//* Garante que as categorias possuam a estrutura correta
class Category {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

//* Métodos genêricos para retornar e salvar categorias
const getCategories = () => {
  return JSON.parse(localStorage.getItem(CATEGORY_STORAGE_KEY)) || initialCategories;
};

const saveCategories = (categories) => {
  localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(categories));
};

//* Create
const addCategory = ({ name }) => {
  const id = new Date().getTime();

  const newCategory = new Category(id, name);

  let categories = getCategories();

  categories.unshift(newCategory);
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
const getAllCategories = () => {
  return getCategories();
}

//* Get By Id
const getCategoryById = (id) => {
  let categories = getCategoriesFromStorage();
  return categories.find((category) => category.id === id);
}

export {
  addCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
};
