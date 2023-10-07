import express from "express";
import { userControllers } from "./auth.controller";

const router = express.Router();

router.post("/signup", userControllers.signup);

export const authRoute = router;
