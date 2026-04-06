import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="page">
      <Navbar />

      <main className="card">
        <h1>Frontend de Autenticação</h1>
        <p>
          Este frontend mostra como o Next.js envia dados para a API e recebe
          respostas do backend.
        </p>

        <div className="actions">
          <Link className="button" href="/register">
            Ir para cadastro
          </Link>
          <Link className="button secondary" href="/login">
            Ir para login
          </Link>
        </div>
      </main>
    </div>
  );
}
