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

export const userServices = {
  getAllUser,
};
