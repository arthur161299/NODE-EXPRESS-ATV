import models from "../models/index.js";

// Dados de demonstração fictícios. A rotina é idempotente: não duplica registros ao repetir.
const dados = [
  {
    pessoa: { nome: "Mariana Costa", email: "mariana.costa.cv@example.com", telefone: "(81) 90000-0001", cidade: "Recife - PE", resumo: "Designer gráfica com experiência em identidade visual, comunicação e produção de materiais impressos.", linkedin: "https://www.linkedin.com/", github: null },
    formacoes: [{ instituicao: "Instituto Criativo do Recife", curso: "Design Gráfico", nivel: "Tecnólogo", inicio: "2018-02-01", fim: "2020-12-20", concluido: true }],
    experiencias: [{ empresa: "Estúdio Aurora", cargo: "Designer Gráfica", descricao: "Criação de identidades visuais, peças digitais e materiais para impressão.", inicio: "2021-03-01", fim: null, atual: true }],
    projetos: [{ titulo: "Coleção Editorial Botânica", descricao: "Coleção de capas e materiais de papelaria personalizados.", tecnologias: "Illustrator, Photoshop, InDesign", link: "https://example.com/projeto-botanica" }],
    habilidades: [{ nome: "Adobe Illustrator", nivel: "Avançado" }, { nome: "Identidade visual", nivel: "Avançado" }],
  },
  {
    pessoa: { nome: "Lucas Almeida", email: "lucas.almeida.cv@example.com", telefone: "(81) 90000-0002", cidade: "Olinda - PE", resumo: "Desenvolvedor de software com foco em APIs REST e bancos de dados relacionais.", linkedin: "https://www.linkedin.com/", github: "https://github.com/" },
    formacoes: [{ instituicao: "Centro Universitário Exemplo", curso: "Análise e Desenvolvimento de Sistemas", nivel: "Graduação", inicio: "2022-02-01", fim: null, concluido: false }],
    experiencias: [{ empresa: "Tech Nordeste", cargo: "Desenvolvedor Back-end", descricao: "Desenvolvimento de APIs REST, integração de dados e testes.", inicio: "2024-06-01", fim: null, atual: true }],
    projetos: [{ titulo: "API REST de Currículos", descricao: "API de cadastro de currículos usando Express e PostgreSQL.", tecnologias: "Node.js, Express, Sequelize, PostgreSQL", link: "https://example.com/api-curriculos" }],
    habilidades: [{ nome: "Node.js", nivel: "Intermediário" }, { nome: "PostgreSQL", nivel: "Intermediário" }],
  },
];

export default async function executarSeed() {
  for (const cadastro of dados) {
    const [pessoa] = await models.Pessoa.findOrCreate({ where: { email: cadastro.pessoa.email }, defaults: cadastro.pessoa });
    for (const [chave, modelName, campos] of [
      ["formacoes", "Formacao", ["instituicao", "curso"]],
      ["experiencias", "Experiencia", ["empresa", "cargo"]],
      ["projetos", "Projeto", ["titulo"]],
      ["habilidades", "Habilidade", ["nome"]],
    ]) {
      for (const item of cadastro[chave]) {
        const criterio = { pessoaId: pessoa.id };
        for (const campo of campos) criterio[campo] = item[campo];
        await models[modelName].findOrCreate({ where: criterio, defaults: { ...item, pessoaId: pessoa.id } });
      }
    }
    console.log(`Currículo: ${pessoa.nome} | UUID ${pessoa.id}`);
  }
  console.log("Seeds verificados: 2 pessoas, 2 formações, 2 experiências, 2 projetos, 4 habilidades.");
}
