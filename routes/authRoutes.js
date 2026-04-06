const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const generateToken = (userId) => {
  // O token guarda o id do usuario.
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

router.post("/register", async (req, res) => {
  try {
    // O frontend envia name, email e password no body.
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Preencha nome, email e senha" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "Email ja cadastrado" });
    }

    // Criptografa a senha antes de salvar.
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Usuario cadastrado com sucesso",
      // Devolve apenas os dados seguros do usuario.
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao cadastrar usuario" });
  }
});

router.post("/login", async (req, res) => {
  try {
    // O frontend envia email e password para validar o login.
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Preencha email e senha" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email ou senha invalidos" });
    }

    // Compara a senha enviada com a senha salva no banco.
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Email ou senha invalidos" });
    }

    const token = generateToken(user._id);

    return res.json({
      message: "Login realizado com sucesso",
      // O token sera salvo no frontend.
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao fazer login" });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  // Se o token for valido, o middleware libera esta rota.
  return res.json(req.user);
});

module.exports = router;
