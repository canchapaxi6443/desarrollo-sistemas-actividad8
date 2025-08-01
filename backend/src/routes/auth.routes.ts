import { Router } from "express";
import { login } from "../controllers/auth.controller";

const router = Router();

// POST /login
router.post("/login", login);

export default router;
