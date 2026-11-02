import models from "../models/index.js";
import AppError from "../utils/AppError.js";
import { validarDados, validarId } from "../utils/validation.js";

export const includesCurriculo = [
  { model: models.Formacao, as: "formacoes" },
  { model: models.Experiencia, as: "experiencias" },
  { model: models.Projeto, as: "projetos" },
  { model: models.Habilidade, as: "habilidades" },
];

// Serviço compartilhado usado pelos 5 recursos REST; a FK pessoaId garante o relacionamento.
export function criarCrudService(nomeEntidade) {
  const Model = models[nomeEntidade];
  if (!Model) throw new Error(`Model não encontrado: ${nomeEntidade}`);
  const ehPessoa = nomeEntidade === "Pessoa";
  return {
    listar: async () => Model.findAll({ order: [["createdAt", "ASC"]] }),
    buscar: async (id) => {
      validarId(id);
      const registro = await Model.findByPk(id);
      if (!registro) throw new AppError(`${nomeEntidade} não encontrado(a).`, 404);
      return registro;
    },
    criar: async (dados) => {
      validarDados(nomeEntidade, dados);
      if (!ehPessoa) {
        const pessoa = await models.Pessoa.findByPk(dados.pessoaId);
        if (!pessoa) throw new AppError("Pessoa associada (pessoaId) não encontrada.", 404);
      }
      return Model.create(dados);
    },
    atualizar: async (id, dados) => {
      validarId(id);
      validarDados(nomeEntidade, dados, { atualizacao: true });
      const registro = await Model.findByPk(id);
      if (!registro) throw new AppError(`${nomeEntidade} não encontrado(a).`, 404);
      if (!ehPessoa && dados.pessoaId !== undefined) {
        const pessoa = await models.Pessoa.findByPk(dados.pessoaId);
        if (!pessoa) throw new AppError("Pessoa associada (pessoaId) não encontrada.", 404);
      }
      return registro.update(dados);
    },
    excluir: async (id) => {
      validarId(id);
      const removidos = await Model.destroy({ where: { id } });
      if (!removidos) throw new AppError(`${nomeEntidade} não encontrado(a).`, 404);
    },
  };
}

export async function obterCurriculoCompleto(pessoaId) {
  validarId(pessoaId, "pessoaId");
  const pessoa = await models.Pessoa.findByPk(pessoaId, { include: includesCurriculo });
  if (!pessoa) throw new AppError("Pessoa não encontrada.", 404);
  return pessoa;
}

export async function listarCurriculosCompletos() {
  return models.Pessoa.findAll({ include: includesCurriculo, order: [["createdAt", "ASC"]] });
}
