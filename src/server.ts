import express, { Router } from "express";
import cors from "cors";
import { AppDataSource } from "./database";

interface ServerOptions {
  port?: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor({ port = 4000, routes }: ServerOptions) {
    this.port = port;
    this.routes = routes;
  }

  async start() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(this.routes);

    //iniciar conexion con la BD
    try {
        await AppDataSource.initialize()
        this.app.listen(this.port,'0.0.0.0', () => {
            console.log(`Server running on port ${this.port}`);
        });
    } catch (error) {
        console.log("Erroe al iniciar el servidor",error)
    }
  }
}