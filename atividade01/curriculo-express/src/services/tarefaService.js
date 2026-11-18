import models from "../models/index.js";

const { Tarefa } = models;

export async function criarTarefa(dados) {
  return await Tarefa.create(dados);
}

export async function listarTarefas() {
  return await Tarefa.findAll();
}

export async function buscarTarefa(objectId) {
  return await Tarefa.findByPk(objectId);
}

export async function atualizarTarefa(objectId, dados) {
  const tarefa = await Tarefa.findByPk(objectId);

  if (!tarefa) return null;

  await tarefa.update(dados);
  return tarefa;
}

export async function excluirTarefa(objectId) {
  const tarefa = await Tarefa.findByPk(objectId);

  if (!tarefa) return false;

  await tarefa.destroy();
  return true;
}