import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Bem-vindo ao Painel de Usuários</h1>
      <p className="subtitulo">
        Um sistema simples para listar usuários e ver os detalhes de cada um.
      </p>

      <div className="caixa">
        <h2>O que dá pra fazer aqui</h2>
        <ul className="lista-simples">
          <li>Ver a lista de usuários cadastrados</li>
          <li>Buscar um usuário pelo nome</li>
          <li>Abrir a página de detalhes de cada pessoa</li>
        </ul>
        <p>Os dados são fictícios e ficam num array dentro do código.</p>
      </div>

      <Link href="/usuarios" className="botao">
        Ver usuários
      </Link>
    </div>
  );
}
