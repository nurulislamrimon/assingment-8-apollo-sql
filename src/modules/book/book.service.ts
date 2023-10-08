import { Book, Prisma } from "@prisma/client";
import prisma from "../../shared/prisma";
import { IPaginationOptions } from "../../interfaces/pagination";
import { IBooksFilterableFields } from "./book.interfaces";
import { IGenericResult } from "../../interfaces/genericResult";
import { calculatedPagination } from "../../shared/calculatedPagination";
import { organizeSearchAndFilter } from "../../shared/organizeSearchAndFilter";
import { bookFilterableFields, bookSearchableFields } from "./book.constants";

const createBook = async (payload: Book): Promise<Book> => {
  const book = await prisma.book.create({ data: payload });
  return book;
};

const getAllBooks = async (
  filters: IBooksFilterableFields,
  options: IPaginationOptions
): Promise<IGenericResult<Book[]> | null> => {
  const calculatedPaginationOptions = calculatedPagination(options);

  const whereCondition: Prisma.BookWhereInput = organizeSearchAndFilter(
    filters,
    bookSearchableFields,
    bookFilterableFields
  );

  const books = await prisma.book.findMany({ where: whereCondition });
  const total = await prisma.book.count({ where: whereCondition });

  const totalPage = Math.ceil(total / calculatedPaginationOptions.size);
  return {
    meta: {
      page: calculatedPaginationOptions.page,
      size: calculatedPaginationOptions.size,
      total,
      totalPage,
    },
    data: books,
  };
};

const getABook = async (id: string): Promise<Partial<Book> | null> => {
  const Book = await prisma.book.findUnique({
    where: {
      id,
    },
  });
  return Book;
};

const updateABook = async (
  id: string,
  payload: Partial<Book>
): Promise<Partial<Book> | null> => {
  const Book = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
  });
  return Book;
};

const deleteABook = async (id: string): Promise<Partial<Book> | null> => {
  const Book = await prisma.book.delete({
    where: {
      id,
    },
  });
  return Book;
};

// ============================================
// category based book search using category id
// ============================================

const getBookByCategoryId = async (
  categoryId: string,
  options: IPaginationOptions
): Promise<IGenericResult<Book[]> | null> => {
  const calculatedPaginationOptions = calculatedPagination(options);

  const categoryWithAllBooks = await prisma.book.findMany({
    where: {
      categoryId,
    },
    skip: calculatedPaginationOptions.skip,
    take: calculatedPaginationOptions.size,
  });

  const total = await prisma.book.count({
    where: {
      categoryId,
    },
  });
  const totalPage = Math.ceil(total / calculatedPaginationOptions.size);

  return {
    meta: {
      page: calculatedPaginationOptions.page,
      size: calculatedPaginationOptions.size,
      total,
      totalPage,
    },
    data: categoryWithAllBooks,
  };
};

export const BookServices = {
  createBook,
  getAllBooks,
  getABook,
  updateABook,
  deleteABook,
  getBookByCategoryId,
};
