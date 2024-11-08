import { Router } from "express";
import { ClienteController } from "./controllers/usuarios.controller";
import { verificarToken } from "./middlewares/auth.middleware";
import { AdminController } from "./controllers/administrador.controller";
import { verificarTokenAdmin } from "./middlewares/auth.middleware.admin";

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

    // rutas usuarios
    router.post("/login", (request, response) =>
      controller.login(request, response)
    );
    router.get("/auth", verificarToken, (request, response) =>
      controller.checkAuthStatus(request, response)
    );
    router.post("/register", (request, response) =>
      controller.register(request, response)
    );

    // Rutas Actividades del cliente
    router.get("/activities", (request, response) =>
      controller.getActivities(request, response)
    );

    //rutas admin
    const controller2 = new AdminController();
    router.post("/loginAdmin", (request, response) =>
      controller2.login(request, response)
    );
    router.get("/authAdmin", verificarTokenAdmin, (request, response) =>
      controller2.checkAuthStatus(request, response)
    );

    return router;
  }
}
