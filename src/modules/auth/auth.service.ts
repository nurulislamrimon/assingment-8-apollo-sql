import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import prisma from "../../shared/prisma";
import config from "../../config/config";
import ApiError from "../../errors/apiError";
import httpStatus from "http-status";

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
const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

const isPasswordMatched = async (password: string, hashedPassword: string) => {
  const isPasswordMatched = await bcrypt.compare(password, hashedPassword);
  return isPasswordMatched;
};

export const userServices = {
  signup,
  getUserByEmail,
  isPasswordMatched,
};
