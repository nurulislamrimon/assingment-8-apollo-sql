import express from "express";
import { userControllers } from "./auth.controller";

const router = express.Router();

router.post("/signup", userControllers.signup);
router.post("/signin", userControllers.login);

export const authRoute = router;
