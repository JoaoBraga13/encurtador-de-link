import express from "express";
import { pool } from "./database.js";
import shortLinkRoutes from './routes/shortLinkRoutes.js';
import redirectRoutes from './routes/redirectRoutes.js'

const app = express();

//permite receber o body das requisições em JSON
app.use(express.json());

//rota para verificar a disponibilidade do servidor
app.get("/health", (_req, res) => {
  res.status(200).json({status: "ok"});
});

//rota para confirmar a conexão com o banco de dados
app.get("/health/db", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({status: "ok", database: "ok"});
  } catch {
    res.status(503).json({status: "error", database: "unavailable"});
  }
});

//Monta as rotas de links curtos sob /api/links
app.use("/api/links", shortLinkRoutes);

//Monta a rota pública de redirecionamento
app.use("/", redirectRoutes);

export default app;
