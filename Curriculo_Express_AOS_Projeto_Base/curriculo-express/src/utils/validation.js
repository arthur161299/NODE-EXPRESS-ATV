import AppError from "./AppError.js";

const schemas = {
  Pessoa: {
    obrigatorios: ["nome", "email"],
    permitidos: ["nome", "email", "telefone", "cidade", "resumo", "linkedin", "github"],
  },
  Formacao: {
    obrigatorios: ["pessoaId", "instituicao", "curso"],
    permitidos: ["pessoaId", "instituicao", "curso", "nivel", "inicio", "fim", "concluido"],
  },
  Experiencia: {
    obrigatorios: ["pessoaId", "empresa", "cargo"],
    permitidos: ["pessoaId", "empresa", "cargo", "descricao", "inicio", "fim", "atual"],
  },
  Projeto: {
    obrigatorios: ["pessoaId", "titulo"],
    permitidos: ["pessoaId", "titulo", "descricao", "tecnologias", "link"],
  },
  Habilidade: {
    obrigatorios: ["pessoaId", "nome"],
    permitidos: ["pessoaId", "nome", "nivel"],
  },
};

export const isUUID = (value) =>
  typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

export function validarId(value, nome = "ID") {
  if (!isUUID(value)) throw new AppError(`${nome} deve ser um UUID válido.`, 400);
}

function dataValida(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

export function validarDados(nomeEntidade, dados, { atualizacao = false } = {}) {
  const schema = schemas[nomeEntidade];
  if (!schema) throw new Error(`Entidade não configurada: ${nomeEntidade}`);
  if (!dados || typeof dados !== "object" || Array.isArray(dados)) {
    throw new AppError("Envie um objeto JSON válido.");
  }
  const chaves = Object.keys(dados);
  if (!chaves.length) throw new AppError("O corpo JSON não pode estar vazio.");
  const invalidos = chaves.filter((campo) => !schema.permitidos.includes(campo));
  if (invalidos.length) throw new AppError(`Campos não permitidos: ${invalidos.join(", ")}.`);
  if (!atualizacao) {
    for (const campo of schema.obrigatorios) {
      if (dados[campo] === undefined || dados[campo] === null || dados[campo] === "") {
        throw new AppError(`Campo obrigatório: ${campo}.`);
      }
    }
  }
  for (const [campo, valor] of Object.entries(dados)) {
    if (campo === "pessoaId") {
      validarId(valor, "pessoaId");
    } else if (["inicio", "fim"].includes(campo)) {
      if (valor !== null && !dataValida(valor)) throw new AppError(`${campo} deve ser uma data no formato AAAA-MM-DD.`);
    } else if (["atual", "concluido"].includes(campo)) {
      if (typeof valor !== "boolean") throw new AppError(`${campo} deve ser true ou false.`);
    } else if (valor !== null && (typeof valor !== "string" || valor.trim() === "")) {
      throw new AppError(`${campo} deve ser um texto não vazio ou null (quando opcional).`);
    }
  }
  for (const campo of schema.obrigatorios) {
    if (campo in dados && (dados[campo] === null || (typeof dados[campo] === "string" && !dados[campo].trim()))) {
      throw new AppError(`Campo obrigatório inválido: ${campo}.`);
    }
  }
  if ("email" in dados && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)) {
    throw new AppError("E-mail inválido.");
  }
  if (dados.inicio && dados.fim && dados.fim < dados.inicio) {
    throw new AppError("A data de fim não pode ser anterior à data de início.");
  }
  return dados;
}
