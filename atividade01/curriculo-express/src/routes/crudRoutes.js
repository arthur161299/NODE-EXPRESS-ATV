import { Router } from "express";
import criarCrudController from "../controllers/crudController.js";

export default function criarCrudRoutes(nomeEntidade) {
  const router = Router();
  const controller = criarCrudController(nomeEntidade);
  router.get("/", controller.listar);
  router.get("/:id", controller.buscar);
  router.post("/", controller.criar);
  router.put("/:id", controller.atualizar);
  router.patch("/:id", controller.atualizar);
  router.delete("/:id", controller.excluir);
  return router;
}
