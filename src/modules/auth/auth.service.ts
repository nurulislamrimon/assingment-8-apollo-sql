import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import prisma from "../../shared/prisma";
import config from "../../config/config";

const signup = async (payload: User): Promise<Partial<User>> => {
  const { password, ...user } = payload;
  const encryptedPassword = await bcrypt.hash(password, Number(config.salt));
  const users = await prisma.user.create({
    data: { ...user, password: encryptedPassword },
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
  signup,
};
