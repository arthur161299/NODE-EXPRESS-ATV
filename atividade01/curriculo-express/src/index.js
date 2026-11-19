
import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

import routes from "./routes/index.js";
import tarefaRoutes from "./routes/tarefa.js";

import errorMiddleware from "./middlewares/error.js";
import AppError from "./utils/AppError.js";
import { sequelize } from "./models/index.js";

const app = express();

app.set("trust proxy", 1);

// Configurações de segurança
app.use(helmet());

const origins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);

app.use(cors({ origin: origins.length ? origins : true }));

// Permitir requisições JSON
app.use(express.json({ limit: "100kb" }));

// Limitar quantidade de requisições
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  })
);

// Rota inicial
app.get("/", (req, res) =>
  res.json({
    projeto: "Currículo Express API + Tarefas",
    versao: "1.1.0",
    documentacao: "/api",
    status: "online",
  })
);

// Documentação
app.get("/api", (req, res) =>
  res.json({
    mensagem: "API REST para currículos e tarefas (Express + PostgreSQL)",
    recursos: [
      "pessoas",
      "formacoes",
      "experiencias",
      "projetos",
      "habilidades",
      "tarefas",
    ],
    exemplos: [
      "GET /api/pessoas",
      "GET /api/curriculos",
      "GET /api/pessoas/:id/curriculo",
      "POST /api/formacoes",
      "GET /tarefas",
      "POST /tarefas",
      "GET /tarefas/:objectId",
      "PUT /tarefas/:objectId",
      "DELETE /tarefas/:objectId",
    ],
    metodosCrud: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

// Verificar conexão com banco
app.get("/api/health", async (req, res) => {
  try {
    await sequelize.authenticate();

    return res.status(200).json({
      api: "online",
      banco: "conectado",
    });
  } catch (err) {
    console.error("Falha na conexão com banco:", err.message);

    return res.status(503).json({
      api: "online",
      banco: "indisponível",
    });
  }
});


app.use("/tarefas", tarefaRoutes);

// Rotas existentes de currículos
app.use("/api", routes);

// Tratamento de rotas não encontradas
app.use((req, res, next) =>
  next(
    new AppError(
      `Rota ${req.originalUrl} não encontrada.`,
      404
    )
  )
);

// Tratamento global de erros
app.use(errorMiddleware);

// Exportação para Vercel
export default app;
