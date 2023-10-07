import jwt from "jsonwebtoken";
import config from "../config/config";

const generateToken = (
  payload: { email: string; role: string },
  expiresIn = "1d"
) => {
  const { email, role } = payload;
  const token = jwt.sign({ email, role }, config.accessTokenSecret, {
    expiresIn,
  });
  return token;
};

export default generateToken;
