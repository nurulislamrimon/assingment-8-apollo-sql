import { Category } from "@prisma/client";
import prisma from "../../shared/prisma";

const createCategory = async (payload: Category): Promise<Category> => {
  const Categorys = await prisma.category.create({ data: payload });
  return Categorys;
};

const getAllCategories = async (): Promise<Partial<Category[]> | null> => {
  const Category = await prisma.category.findMany({});
  return Category;
};

const getACategory = async (id: string): Promise<Partial<Category> | null> => {
  const Category = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });
  return Category;
};

const updateACategory = async (
  id: string,
  payload: Partial<Category>
): Promise<Partial<Category> | null> => {
  const Category = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
    select: {
      id: true,
      title: true,
    },
  });
  return Category;
};

const deleteACategory = async (
  id: string
): Promise<Partial<Category> | null> => {
  const Category = await prisma.category.delete({
    where: {
      id,
    },
  });
  return Category;
};

export const categoryServices = {
  createCategory,
  getAllCategories,
  getACategory,
  updateACategory,
  deleteACategory,
};
