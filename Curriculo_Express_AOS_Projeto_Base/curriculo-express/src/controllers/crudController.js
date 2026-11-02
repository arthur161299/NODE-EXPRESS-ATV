import { criarCrudService } from "../services/crudService.js";

export default function criarCrudController(entidade) {
  const service = criarCrudService(entidade);
  return {
    listar: async (req, res) => res.status(200).json(await service.listar()),
    buscar: async (req, res) => res.status(200).json(await service.buscar(req.params.id)),
    criar: async (req, res) => res.status(201).json(await service.criar(req.body)),
    atualizar: async (req, res) => res.status(200).json(await service.atualizar(req.params.id, req.body)),
    excluir: async (req, res) => { await service.excluir(req.params.id); return res.status(204).send(); },
  };
}
