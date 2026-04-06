const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Espera receber: Bearer token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token nao informado" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Busca o usuario do token sem devolver a senha.
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Usuario nao encontrado" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalido" });
  }
};

module.exports = authMiddleware;
