import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../lib/api";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
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
      const response = await api.post("/api/auth/register", formData);

      // Mostra a resposta que veio do backend.
      setMessage(response.data.message);
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao cadastrar");
    }
  };

  return (
    <div className="page">
      <Navbar />

      <main className="card">
        <h1>Cadastro</h1>

        <form className="form" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
          />

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

          <button type="submit">Cadastrar</button>
        </form>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </main>
    </div>
  );
}
