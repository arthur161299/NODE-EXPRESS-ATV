import { sequelize } from "../src/models/index.js";
import executarSeed from "../src/seeds/doSeed.js";
try {
  await sequelize.authenticate();
  await executarSeed();
} catch (err) {
  console.error("Falha no seed:", err.message);
  process.exitCode = 1;
} finally {
  await sequelize.close();
}
