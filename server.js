const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

// Conecta no banco antes de receber requisicoes.
connectDB();

// Permite receber JSON do frontend.
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API de autenticacao rodando" });
});

// Todas as rotas de autenticacao ficam aqui.
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
