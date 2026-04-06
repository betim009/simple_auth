import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import api, { clearToken, setAuthToken } from "../lib/api";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      // Primeiro tenta pegar o token salvo no navegador.
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      setAuthToken(token);

      try {
        // Busca a rota protegida usando o token.
        const response = await api.get("/api/auth/me");
        setUser(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Erro ao carregar perfil");
        // Se o token falhar, limpa tudo e volta para o login.
        clearToken();
        router.push("/login");
      }
    };

    loadProfile();
  }, [router]);

  return (
    <div className="page">
      <Navbar />

      <main className="card">
        <h1>Perfil</h1>

        {!user && !error && <p>Carregando dados do usuário...</p>}
        {error && <p className="error">{error}</p>}

        {user && (
          <div className="profile-box">
            <p>
              <strong>ID:</strong> {user._id}
            </p>
            <p>
              <strong>Nome:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
