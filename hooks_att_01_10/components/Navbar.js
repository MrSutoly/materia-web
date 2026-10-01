import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  function linkAtivo(caminho) {
    if (caminho === "/") {
      return router.pathname === "/" ? "ativo" : "";
    }
    return router.pathname.startsWith(caminho) ? "ativo" : "";
  }

  return (
    <header className="navbar">
      <div className="navbar-conteudo">
        <Link href="/" className="logo">
          Painel de Usuários
        </Link>
        <nav className="links">
          <Link href="/" className={linkAtivo("/")}>
            Home
          </Link>
          <Link href="/usuarios" className={linkAtivo("/usuarios")}>
            Usuários
          </Link>
          <Link href="/sobre" className={linkAtivo("/sobre")}>
            Sobre
          </Link>
        </nav>
      </div>
    </header>
  );
}
