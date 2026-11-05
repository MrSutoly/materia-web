# API Biblioteca - João

API REST de uma biblioteca escolar, feita com NestJS, TypeORM e SQLite. Controla livros, autores, categorias, leitores e empréstimos, com regras de negócio, middleware de log, exceções próprias e respostas padronizadas.

## Tecnologias

- Node.js e TypeScript
- NestJS 10
- TypeORM 0.3
- SQLite (driver `better-sqlite3`)
- class-validator e class-transformer
- dotenv

## Requisitos

- Node.js 20 ou superior (LTS) e npm
- VS Code com a extensão **REST Client** (para usar o `requests.http`)

Não é necessário instalar nenhum servidor de banco de dados.

## Como instalar e iniciar

```bash
npm install
npm run start:dev
```

A API sobe em `http://localhost:3000` (porta definida no `.env`).

Outros comandos: `npm run build` (compila) e `npm run start:prod` (roda a versão compilada, após o build).

## Configuração (.env)

```
PORTA=3000
DB_ARQUIVO=biblioteca.sqlite
```

O `.env` não vai para o GitHub. O `.env.example` traz as mesmas chaves sem valores.

## Como funciona o SQLite

- O TypeORM usa o arquivo definido em `DB_ARQUIVO` (`biblioteca.sqlite`, na raiz do projeto).
- Se o arquivo não existe, ele é criado ao iniciar a API. As tabelas são criadas automaticamente (`synchronize: true`).
- Na inicialização, a API cadastra os dados iniciais, verificando antes se cada registro já existe. Reiniciar a API não duplica nada.
- Os dados continuam salvos depois de fechar e reiniciar a API.
- Para voltar ao estado inicial, pare a API e apague o arquivo `biblioteca.sqlite`.

### Dados iniciais

- Autores: Alexandre Dumas, Frank Herbert, Platão
- Categorias: Aventura, Ficção científica, Filosofia
- Livros (3 exemplares cada, 15 no total): O Conde de Monte Cristo, Duna, Messias de Duna, Filhos de Duna, A República
- Leitores: 5 leitores fictícios (matrículas 2024001 a 2024005)
- Empréstimos: nenhum

## Estrutura de pastas

```
api-biblioteca-joao/
├── src/
│   ├── comum/
│   │   ├── filtros/          erro.filter.ts
│   │   ├── interceptors/     resposta.interceptor.ts
│   │   ├── middlewares/      log.middleware.ts
│   │   ├── excecoes/         sem-exemplar, limite-emprestimos, ja-devolvido
│   │   └── dados-iniciais.service.ts
│   ├── livros/               controller, service, repository, module, dto, entities
│   ├── autores/
│   ├── categorias/
│   ├── leitores/
│   ├── emprestimos/
│   ├── app.module.ts
│   └── main.ts
├── docs/
│   └── modelo.dbml           código do diagrama ER (veja a seção Diagrama ER)
├── .env
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── requests.http
```

Responsabilidades:

- **Controller**: só HTTP, uma chamada ao service por método.
- **Service**: todas as regras de negócio.
- **Repository**: único lugar que acessa o banco.
- **Module**: quem precisa do service de outro módulo importa esse módulo, que exporta o service.

## Endpoints

| Método | Rota | Descrição | Sucesso | Erros |
|---|---|---|---|---|
| GET | `/livros` | Lista livros. Filtros: `?categoria=`, `?autor=`, `?disponivel=true` | 200 | 400 |
| GET | `/livros/:id` | Detalhe com autor e categoria | 200 | 400, 404 |
| POST | `/livros` | Cadastra livro | 201 | 400, 404 |
| PATCH | `/livros/:id` | Altera livro | 200 | 400, 404 |
| DELETE | `/livros/:id` | Remove livro | 204 | 400, 404, 409 |
| GET | `/autores` | Lista autores | 200 | |
| POST | `/autores` | Cadastra autor | 201 | 400 |
| GET | `/categorias` | Lista categorias | 200 | |
| POST | `/categorias` | Cadastra categoria | 201 | 400 |
| POST | `/leitores` | Cadastra leitor | 201 | 400, 409 |
| GET | `/leitores/:id/emprestimos` | Empréstimos do leitor. Filtro: `?status=aberto` | 200 | 400, 404 |
| POST | `/emprestimos` | Registra empréstimo | 201 | 400, 404, 409 |
| PATCH | `/emprestimos/:id/devolucao` | Registra devolução | 200 | 400, 404, 409 |

## Exemplos de requisições

Cadastrar livro:

```http
POST /livros
Content-Type: application/json

{ "titulo": "Dom Casmurro", "exemplares": 2, "autorId": 4, "categoriaId": 4 }
```

Registrar empréstimo (só `livroId` e `leitorId`; a data prevista é calculada pela API):

```http
POST /emprestimos
Content-Type: application/json

{ "livroId": 1, "leitorId": 1 }
```

Resposta de sucesso:

```json
{
  "sucesso": true,
  "dados": {
    "livroId": 1,
    "leitorId": 1,
    "dataRetirada": "2026-11-04T23:53:02.564Z",
    "dataPrevista": "2026-11-18T23:53:02.564Z",
    "dataDevolucao": null,
    "multa": 0,
    "id": 1
  }
}
```

Resposta de erro:

```json
{
  "sucesso": false,
  "erro": {
    "status": 409,
    "codigo": "SEM_EXEMPLAR",
    "mensagem": "Livro 1 sem exemplar disponível"
  },
  "caminho": "/emprestimos",
  "timestamp": "2026-11-04T23:53:02.594Z"
}
```

Uma exclusão bem-sucedida responde 204 sem corpo.

### Códigos de erro

| Situação | Status | Código |
|---|---|---|
| Sem exemplar disponível (R1) | 409 | `SEM_EXEMPLAR` |
| Limite de empréstimos (R2) | 409 | `LIMITE_EMPRESTIMOS` |
| Devolução duplicada (R5) | 409 | `JA_DEVOLVIDO` |
| Outros conflitos (matrícula repetida, R6) | 409 | `CONFLITO` |
| Dados ou filtros inválidos | 400 | `REQUISICAO_INVALIDA` |
| Registro inexistente | 404 | `NAO_ENCONTRADO` |
| Erro inesperado | 500 | `ERRO_INTERNO` (mensagem genérica; o detalhe aparece só no log) |

## Regras de negócio

- **R1 - Exemplares**: só empresta se `exemplares` menos os empréstimos em aberto do livro for maior que zero. Senão, 409 `SEM_EXEMPLAR`.
- **R2 - Limite**: cada leitor pode ter no máximo 3 empréstimos em aberto. O quarto retorna 409 `LIMITE_EMPRESTIMOS`.
- **R3 - Prazo**: a data prevista é a data de retirada + 14 dias, calculada pela API. Enviar `dataPrevista` no body resulta em 400.
- **R4 - Multa**: na devolução, cada dia completo de atraso gera R$ 1,00, salvo no campo `multa` do empréstimo. Sem atraso, a multa é 0.
- **R5 - Devolução duplicada**: devolver um empréstimo já devolvido retorna 409 `JA_DEVOLVIDO`.
- **R6 - Exclusão**: livro com empréstimo em aberto não pode ser excluído (409). Ao excluir um livro que só tem empréstimos já devolvidos, o histórico desses empréstimos é removido junto (`onDelete: CASCADE`), pois o banco não aceita empréstimo apontando para livro inexistente.

Observação sobre o body de `POST /emprestimos`: além de `livroId` e `leitorId`, a API aceita o campo opcional `dataRetirada` (data ISO). Sem ele, usa-se a data de hoje. Esse campo existe para permitir testar a multa (R4) sem criar endpoints extras, registrando um empréstimo com retirada no passado.

## Como testar com requests.http

1. Instale a extensão **REST Client** no VS Code.
2. Pare a API, apague o `biblioteca.sqlite` e inicie de novo (`npm run start:dev`), para começar com os dados iniciais.
3. Abra o `requests.http` e clique em **Send Request** em cada requisição, **de cima para baixo**.

O arquivo cobre todos os endpoints, os filtros e as seis regras:

- R1: três empréstimos do livro 1 e o quarto retorna `SEM_EXEMPLAR`.
- R2: três empréstimos do leitor 5 e o quarto retorna `LIMITE_EMPRESTIMOS`.
- R3: a resposta do primeiro empréstimo mostra `dataPrevista` 14 dias após `dataRetirada`.
- R4: empréstimo com retirada há 20 dias; ao devolver, `multa` é 6.
- R5: devolver duas vezes retorna `JA_DEVOLVIDO`.
- R6: excluir o livro 2 (empréstimo em aberto) retorna 409.

## Diagrama ER

O código do diagrama está em `docs/modelo.dbml`. Para gerar o `docs/modelo.png`:

1. Acesse https://dbdiagram.io e crie um diagrama novo.
2. Cole o conteúdo de `docs/modelo.dbml` no editor.
3. Clique em **Export**, escolha **Export to PNG** e salve como `docs/modelo.png`.

Relacionamentos (todos 1:N, com a FK no lado N):

- Autor 1:N Livro (`livros.autorId`)
- Categoria 1:N Livro (`livros.categoriaId`)
- Livro 1:N Empréstimo (`emprestimos.livroId`)
- Leitor 1:N Empréstimo (`emprestimos.leitorId`)

## Por que Empréstimo é uma entidade própria

O empréstimo precisa ser uma entidade própria porque armazena informações específicas da operação, como data de retirada, data prevista para devolução, data de devolução e multa. Essas informações não pertencem diretamente ao livro ou ao leitor. Além disso, um mesmo leitor pode pegar o mesmo livro emprestado em momentos diferentes, gerando registros distintos.
