import "dotenv/config";
import Sequelize from "sequelize";
import pg from "pg";
import criarPessoa from "./pessoa.js";
import criarFormacao from "./formacao.js";
import criarExperiencia from "./experiencia.js";
import criarProjeto from "./projeto.js";
import criarHabilidade from "./habilidade.js";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL ausente. Crie um arquivo .env com a conexão do NeonDB.");
}

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg,
  logging: false,
  pool: { max: 3, min: 0, acquire: 30000, idle: 10000 },
});

const models = {
  Pessoa: criarPessoa(sequelize, Sequelize),
  Formacao: criarFormacao(sequelize, Sequelize),
  Experiencia: criarExperiencia(sequelize, Sequelize),
  Projeto: criarProjeto(sequelize, Sequelize),
  Habilidade: criarHabilidade(sequelize, Sequelize),
};

for (const Model of Object.values(models)) {
  if (typeof Model.associate === "function") Model.associate(models);
}

export default models;
