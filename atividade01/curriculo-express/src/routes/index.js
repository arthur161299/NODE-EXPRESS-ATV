import { Router } from "express";
import criarCrudRoutes from "./crudRoutes.js";
import { buscarCurriculo, listarCurriculos } from "../controllers/curriculoController.js";

const router = Router();
router.get("/curriculos", listarCurriculos);
router.get("/pessoas/:id/curriculo", buscarCurriculo);
router.use("/pessoas", criarCrudRoutes("Pessoa"));
router.use("/formacoes", criarCrudRoutes("Formacao"));
router.use("/experiencias", criarCrudRoutes("Experiencia"));
router.use("/projetos", criarCrudRoutes("Projeto"));
router.use("/habilidades", criarCrudRoutes("Habilidade"));

export default router;
