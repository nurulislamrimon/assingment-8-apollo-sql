import { User } from "@prisma/client";
import prisma from "../../shared/prisma";

const getAllUser = async (): Promise<User[]> => {
  const users = await prisma.user.findMany({});
  return users;
};

export const userServices = {
  getAllUser,
};
