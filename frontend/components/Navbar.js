import Link from "next/link";
import { useRouter } from "next/router";
import { clearToken } from "../lib/api";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    // Faz logout removendo o token salvo.
    clearToken();
    router.push("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link href="/">Início</Link>
        <Link href="/register">Cadastro</Link>
        <Link href="/login">Login</Link>
        <Link href="/profile">Perfil</Link>
      </div>

      <button className="link-button" onClick={handleLogout}>
        Sair
      </button>
    </nav>
  );
}
