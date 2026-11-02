import { listarCurriculosCompletos, obterCurriculoCompleto } from "../services/crudService.js";

export const listarCurriculos = async (req, res) => {
  res.status(200).json(await listarCurriculosCompletos());
};
export const buscarCurriculo = async (req, res) => {
  res.status(200).json(await obterCurriculoCompleto(req.params.id));
};
