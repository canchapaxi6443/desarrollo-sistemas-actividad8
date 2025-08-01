import { Request, Response } from "express";

const USERNAME = "admin";
const PASSWORD = "admin";
const NAME = "Administrador";

export const login = (req: Request, res: Response) => {
  const { user, pass } = req.body;
  if (user === USERNAME && pass === PASSWORD) {
    return res.json({ name: NAME, user: USERNAME });
  }
  return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
};
