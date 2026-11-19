import * as service from "../services/tarefaService.js";

function tratarErro(res, error) {
  console.error(error);
  return res.status(500).json({
    erro: "Erro interno do servidor",
  });
}

export async function criar(req, res) {
  try {
    const tarefa = await service.criarTarefa(req.body);
    return res.status(201).json(tarefa);
  } catch (error) {
    return tratarErro(res, error);
  }
}

export async function listar(req, res) {
  try {
    const tarefas = await service.listarTarefas();
    return res.status(200).json(tarefas);
  } catch (error) {
    return tratarErro(res, error);
  }
}

export async function buscar(req, res) {
  try {
    const tarefa = await service.buscarTarefa(req.params.objectId);

    if (!tarefa) {
      return res.status(404).json({
        erro: "Tarefa não encontrada",
      });
    }

    return res.status(200).json(tarefa);
  } catch (error) {
    return tratarErro(res, error);
  }
}

export async function atualizar(req, res) {
  try {
    const tarefa = await service.atualizarTarefa(
      req.params.objectId,
      req.body
    );

    if (!tarefa) {
      return res.status(404).json({
        erro: "Tarefa não encontrada",
      });
    }

    return res.status(200).json(tarefa);
  } catch (error) {
    return tratarErro(res, error);
  }
}

export async function excluir(req, res) {
  try {
    const excluida = await service.excluirTarefa(
      req.params.objectId
    );

    if (!excluida) {
      return res.status(404).json({
        erro: "Tarefa não encontrada",
      });
    }

    return res.status(200).json({
      mensagem: "Tarefa excluída com sucesso",
    });
  } catch (error) {
    return tratarErro(res, error);
  }
}