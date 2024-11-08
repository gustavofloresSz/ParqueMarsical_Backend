import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Administrador } from "../entities";

export class AdminController {
  async get_admin(response: Response) {
    const admin = await Administrador.find();
    response.json(admin);
  }

  //metodo agregar administradores
  async register(request: Request, response: Response) {
    const {nombre, apellido, usuario,password } = request.body;
    const admin = Administrador.create({ nombre, apellido, usuario,password  });
    await admin.save();
    const token = this._generateToken(admin);
    return response
      .status(200)
      .json({ token, fullname: `${admin.nombre} ${admin.apellido}` });
  }

  async login(request: Request, response: Response) {
    const { login, password } = request.body;
    const admin = await Administrador.findOne({ where: { usuario: login } });
    if (!admin) {
      return response
        .status(400)
        .json({ message: "Usuario o Contraseña incorrectos" });
    }
    if (admin.password !== password) {
      `${admin.nombre}`;
      return response
        .status(400)
        .json({ message: "Usuario o Contraseña incorrectos" });
    }
    const token = this._generateToken(admin);
    return response
      .status(200)
      .json({ token, fullname: `${admin.nombre} ${admin.apellido}` });
  }

  async checkAuthStatus(request: Request, response: Response) {
    const admin: Administrador = request.body["admin"];
    return response
      .status(200)
      .json({ fullname: `${admin.nombre} ${admin.apellido}` });
  }

  private _generateToken(admin: Administrador) {
    console.log(admin)
    const token = jwt.sign({ id: admin.id }, "secret-key-2024", {
      expiresIn: "1h",
    });
    return token;
  }
}
