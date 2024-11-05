import { Router } from "express";
import { ClienteController } from "./controllers/usuarios.controller";
import { verificarToken } from "./middlewares/auth.middleware";

//aca van las rutas
export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ClienteController();
    router.get("/clientes", (request, response) =>
      controller.get_usuarios(response)
    );
    router.post("/clientes", (request, response) =>
      controller.register(request, response)
    );

    // Nuevas rutas
    router.post("/login", (request, response) =>
      controller.login(request, response)
    );
    router.get("/auth", verificarToken, (request, response) =>
      controller.checkAuthStatus(request, response)
    );
    router.post("/register", (request, response) =>
      controller.register(request, response)
    );

    // Rutas del cliente
    router.get("/activities", (request, response) =>
      controller.getActivities(request, response)
    );

    return router;
  }
}
