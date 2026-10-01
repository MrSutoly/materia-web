import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { usuariosMock } from "../../data/usuarios";

export default function DetalhesUsuario() {
  const router = useRouter();
  const { id } = router.query;

  const [usuario, setUsuario] = useState(null);
  const [naoEncontrado, setNaoEncontrado] = useState(false);

  useEffect(() => {
    if (!id) return;

    function buscarUsuario() {
      const encontrado = usuariosMock.find((u) => u.id === Number(id));
      if (encontrado) {
        setUsuario(encontrado);
        setNaoEncontrado(false);
      } else {
        setUsuario(null);
        setNaoEncontrado(true);
      }
    }

    buscarUsuario();
  }, [id]);

  useEffect(() => {
    return () => {
      console.log("Saindo da página de detalhes do usuário");
    };
  }, []);

  function voltarParaLista() {
    router.push("/usuarios");
  }

  if (naoEncontrado) {
    return (
      <div>
        <h1>Usuário não encontrado</h1>
        <p className="subtitulo">Não existe usuário com o id {id}.</p>
        <button onClick={voltarParaLista} className="botao">
          Voltar para a lista
        </button>
      </div>
    );
  }

  if (!usuario) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <Link href="/usuarios" className="link-voltar">
        ← Usuários
      </Link>

      <h1>{usuario.nome}</h1>
      <p className="subtitulo">{usuario.cargo}</p>

      <div className="caixa">
        <div className="dado">
          <span>ID</span>
          <p>{usuario.id}</p>
        </div>
        <div className="dado">
          <span>Email</span>
          <p>{usuario.email}</p>
        </div>
        <div className="dado">
          <span>Telefone</span>
          <p>{usuario.telefone}</p>
        </div>
        <div className="dado">
          <span>Cidade</span>
          <p>{usuario.cidade}</p>
        </div>
      </div>

      <button onClick={voltarParaLista} className="botao">
        Voltar para a lista
      </button>
    </div>
  );
}
