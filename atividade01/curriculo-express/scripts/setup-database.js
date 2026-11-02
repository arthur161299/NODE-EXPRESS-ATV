import { sequelize } from "../src/models/index.js";
import executarSeed from "../src/seeds/doSeed.js";
try {
  await sequelize.authenticate();
  console.log("Conexão Neon/PostgreSQL OK.");
  await sequelize.sync(); // cria tabelas ausentes; NÃO apaga dados existentes
  console.log("Tabelas verificadas/criadas sem exclusão de dados.");
  await executarSeed();
} catch (err) {
  console.error("Não foi possível preparar o banco:", err.message);
  process.exitCode = 1;
} finally {
  await sequelize.close();
}
