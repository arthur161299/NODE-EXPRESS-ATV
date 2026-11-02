import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import routes from "./routes/index.js";
import errorMiddleware from "./middlewares/error.js";
import AppError from "./utils/AppError.js";
import { sequelize } from "./models/index.js";

const app = express();
app.set("trust proxy", 1);
app.use(helmet());
const origins = (process.env.ALLOWED_ORIGINS || "").split(",").map((item) => item.trim()).filter(Boolean);
app.use(cors({ origin: origins.length ? origins : true }));
app.use(express.json({ limit: "100kb" }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: "draft-7", legacyHeaders: false }));

app.get("/", (req, res) => res.json({ projeto: "Currículo Express API", versao: "1.0.0", documentacao: "/api", status: "online" }));
app.get("/api", (req, res) => res.json({
  mensagem: "API REST para currículos (Express + PostgreSQL)",
  recursos: ["pessoas", "formacoes", "experiencias", "projetos", "habilidades"],
  exemplos: ["GET /api/pessoas", "GET /api/curriculos", "GET /api/pessoas/:id/curriculo", "POST /api/formacoes"],
  metodosCrud: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));
app.get("/api/health", async (req, res) => {
  try { await sequelize.authenticate(); res.status(200).json({ api: "online", banco: "conectado" }); }
  catch (err) { console.error("Falha na conexão com banco:", err.message); res.status(503).json({ api: "online", banco: "indisponível" }); }
});
app.use("/api", routes);
app.use((req, res, next) => next(new AppError(`Rota ${req.originalUrl} não encontrada.`, 404)));
app.use(errorMiddleware);

// Export padrão: o Vercel reconhece automaticamente src/index.js.
export default app;
