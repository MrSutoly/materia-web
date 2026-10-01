export default function Sobre() {
  return (
    <div>
      <h1>Sobre o projeto</h1>
      <p className="subtitulo">Trabalho prático de Next.js e React.</p>

      <div className="caixa">
        <h2>Informações</h2>
        <p><strong>Autor:</strong> João Pedro Gomes</p>
        <p><strong>Disciplina:</strong> Desenvolvimento Web</p>
        <p><strong>Curso:</strong> Ciência da Computação</p>
      </div>

      <div className="caixa">
        <h2>O que foi usado</h2>
        <ul className="lista-simples">
          <li>Next.js com roteamento por páginas</li>
          <li>useState e useEffect</li>
          <li>Rota dinâmica /usuarios/[id]</li>
          <li>CSS puro</li>
        </ul>
      </div>
    </div>
  );
}
