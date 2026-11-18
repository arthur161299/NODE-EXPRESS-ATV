import { Router } from "express";
import criarCrudRoutes from "./crudRoutes.js";
import { buscarCurriculo, listarCurriculos } from "../controllers/curriculoController.js";
import tarefaRoutes from "./tarefa.js";

const router = Router();
router.get("/curriculos", listarCurriculos);
router.get("/pessoas/:id/curriculo", buscarCurriculo);
router.use("/pessoas", criarCrudRoutes("Pessoa"));
router.use("/formacoes", criarCrudRoutes("Formacao"));
router.use("/experiencias", criarCrudRoutes("Experiencia"));
router.use("/projetos", criarCrudRoutes("Projeto"));
router.use("/habilidades", criarCrudRoutes("Habilidade"));
router.use("/tarefas", tarefaRoutes);

export default router;
