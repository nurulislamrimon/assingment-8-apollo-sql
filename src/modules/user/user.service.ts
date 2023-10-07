import { User } from "@prisma/client";
import Prisma from "../../shared/prisma";

const getAllUser = async (): Promise<User[]> => {
  const users = await Prisma.user.findMany({});
  return users;
};

export const userServices = {
  getAllUser,
};
