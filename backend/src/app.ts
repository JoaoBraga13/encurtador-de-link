import express from "express";
import { pool } from "./database.js";

const app = express();

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

export default app;
