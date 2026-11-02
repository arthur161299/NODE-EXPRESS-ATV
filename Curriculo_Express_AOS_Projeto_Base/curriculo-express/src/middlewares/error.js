import AppError from "../utils/AppError.js";

export default (err, req, res, next) => {
  const nome = err?.name || "Error";
  if (nome === "SequelizeUniqueConstraintError") {
    return res.status(409).json({ erro: "Registro já existe (campo único duplicado)." });
  }
  if (nome === "SequelizeValidationError" || nome === "SequelizeForeignKeyConstraintError") {
    return res.status(400).json({ erro: err.errors?.map((e) => e.message).join("; ") || "Dados inválidos ou relacionamento inexistente." });
  }
  if (nome === "SequelizeDatabaseError" && err.parent?.code === "22P02") {
    return res.status(400).json({ erro: "UUID inválido." });
  }
  if (err instanceof AppError) return res.status(err.statusCode).json({ erro: err.message });
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ erro: "JSON malformado." });
  }
  console.error(err);
  return res.status(500).json({ erro: "Erro interno do servidor." });
};
