import { useState, useEffect } from "react";
import Link from "next/link";
import { usuariosMock } from "../../data/usuarios";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    function carregarDados() {
      setUsuarios(usuariosMock);
      setCarregando(false);
    }

    const tempo = setTimeout(carregarDados, 600);

    return () => clearTimeout(tempo);
  }, []);

  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.nome.toLowerCase().includes(busca.toLowerCase())
  );

  if (carregando) {
    return <p>Carregando usuários...</p>;
  }

  return (
    <div>
      <h1>Usuários</h1>
      <p className="subtitulo">{usuarios.length} usuários cadastrados</p>

      <input
        type="text"
        className="campo-busca"
        placeholder="Buscar pelo nome..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {usuariosFiltrados.length === 0 && <p>Nenhum usuário encontrado.</p>}

      <ul className="lista-usuarios">
        {usuariosFiltrados.map((usuario) => (
          <li key={usuario.id} className="item-usuario">
            <div>
              <strong>{usuario.nome}</strong>
              <span>{usuario.email}</span>
            </div>
            <Link href={`/usuarios/${usuario.id}`} className="botao pequeno">
              Ver detalhes
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
