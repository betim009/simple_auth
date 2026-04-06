import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import api, { saveToken } from "../lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    // Atualiza o estado com o valor dos inputs.
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    try {
      // Envia email e senha para o backend.
      const response = await api.post("/api/auth/login", formData);
      const token = response.data.token;

      // Salva o token para usar nas rotas protegidas.
      saveToken(token);

      setMessage(response.data.message);
      router.push("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao fazer login");
    }
  };

  return (
    <div className="page">
      <Navbar />

      <main className="card">
        <h1>Login</h1>

        <form className="form" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">Entrar</button>
        </form>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </main>
    </div>
  );
}
