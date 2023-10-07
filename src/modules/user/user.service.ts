import { User } from "@prisma/client";
import prisma from "../../shared/prisma";

const getAllUser = async (): Promise<Partial<User>[]> => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  return users;
};
const getAUser = async (id: string): Promise<Partial<User> | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  return user;
};
const updateAUser = async (
  id: string,
  payload: Partial<User>
): Promise<Partial<User> | null> => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return user;
};
const deleteAUser = async (id: string): Promise<Partial<User> | null> => {
  const user = await prisma.user.delete({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return user;
};

export const userServices = {
  getAllUser,
  getAUser,
  updateAUser,
  deleteAUser,
};
