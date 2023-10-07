import jwt from "jsonwebtoken";
import config from "../config/config";

const generateToken = (
  payload: { id: string; role: string },
  expiresIn = "1y"
) => {
  const { id: userId, role } = payload;
  const token = jwt.sign({ userId, role }, config.accessTokenSecret, {
    expiresIn,
  });
  return token;
};

export default generateToken;
