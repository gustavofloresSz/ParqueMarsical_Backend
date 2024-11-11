import { Router } from "express";
import { ClienteController } from "./controllers/usuarios.controller";
import { verificarToken } from "./middlewares/auth.middleware";
import { AdminController } from "./controllers/administrador.controller";
import { verificarTokenAdmin } from "./middlewares/auth.middleware.admin";
import { CompraEntradasController } from "./controllers/compra_entradas.controller";

//aca van las rutas
export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ClienteController();
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

    // Rutas Actividades del cliente,recuperar actividades
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

    //agregar compra
    const controller3 = new CompraEntradasController();
    router.post("/compra",(request,response) => controller3.add_compra(request,response))

    return router;
  }
}
