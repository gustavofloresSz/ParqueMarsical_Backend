import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Cliente, Actividades } from "../entities";
import { Between, Raw } from "typeorm";

export class ClienteController {
  async getActivities(request: Request, response: Response) {
    const activities = await Actividades.find();
    response.json(activities);
  }

  //metodo agregar usuarios
  async register(request: Request, response: Response) {
    const { ci, nombre, apellido, password } = request.body;
    const cliente = Cliente.create({ ci, nombre, apellido, password });
    await cliente.save();
    const token = this._generateToken(cliente);
    return response
      .status(200)
      .json({ token, fullname: `${cliente.nombre} ${cliente.apellido}` });
  }

  async login(request: Request, response: Response) {
    const { login, password } = request.body;
    const cliente = await Cliente.findOne({ where: { ci: login } });
    if (!cliente) {
      return response
        .status(400)
        .json({ message: "Usuario o Contraseña incorrectos" });
    }
    if (cliente.password !== password) {
      `${cliente.nombre}`;
      return response
        .status(400)
        .json({ message: "Usuario o Contraseña incorrectos" });
    }
    const token = this._generateToken(cliente);
    return response
      .status(200)
      .json({ token, fullname: `${cliente.nombre} ${cliente.apellido}` });
  }

  async checkAuthStatus(request: Request, response: Response) {
    const cliente: Cliente = request.body["cliente"];
    return response
      .status(200)
      .json({ fullname: `${cliente.nombre} ${cliente.apellido}` });
  }

  private _generateToken(cliente: Cliente) {
    const token = jwt.sign({ id: cliente.id }, "secret-key-2024", {
      expiresIn: "1h",
    });
    return token;
  }

  //Metodos para el resporte
  async getClientesByFecha(request: Request, response: Response) {
    const { fecha } = request.query;
    try {
      const clientes = await Cliente.find({
        where: {
          fecha_creacion: Raw(
            (alias) => `DATE(${alias}) = :fecha`,
            { fecha }
          ),
        },
      });
      console.log(clientes);
      response.json(clientes);
    } catch (error) {
      console.error("Error al obtener clientes por fecha:", error);
      response.status(500).json({ message: "Error al obtener clientes" });
    }
  }
}