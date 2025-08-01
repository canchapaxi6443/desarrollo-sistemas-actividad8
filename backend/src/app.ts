import express from "express";
import productRouter from "./routes/route";
import authRouter from "./routes/auth.routes";
var cors = require("cors");

class App {
  public server;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    // login
    this.server.use("/", authRouter);
    this.server.use("/", productRouter);
  }
}

export default new App().server;
