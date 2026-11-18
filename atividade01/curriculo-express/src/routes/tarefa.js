import { Router } from "express";
import { z } from "zod";
import * as controller from "../controllers/tarefaController.js";

const router = Router();

const criarSchema = z.object({
  descricao: z.string().trim().min(1, "Descrição obrigatória"),
  concluida: z.boolean().default(false),
}).strict();

const atualizarSchema = z.object({
  descricao: z.string().trim().min(1).optional(),
  concluida: z.boolean().optional(),
}).strict().refine(
  (dados) => Object.keys(dados).length > 0,
  "Informe pelo menos um campo"
);

const idSchema = z.uuid();

function validar(schema, origem = "body") {
  return (req, res, next) => {
    const resultado = schema.safeParse(
      origem === "params"
        ? req.params.objectId
        : req.body
    );

    if (!resultado.success) {
      return res.status(400).json({
        erro: "Dados inválidos",
        detalhes: resultado.error.issues,
      });
    }

    if (origem === "body") {
      req.body = resultado.data;
    }

    next();
  };
}

router.post("/", validar(criarSchema), controller.criar);
router.get("/", controller.listar);
router.get("/:objectId", validar(idSchema, "params"), controller.buscar);
router.put(
  "/:objectId",
  validar(idSchema, "params"),
  validar(atualizarSchema),
  controller.atualizar
);
router.delete("/:objectId", validar(idSchema, "params"), controller.excluir);

export default router;