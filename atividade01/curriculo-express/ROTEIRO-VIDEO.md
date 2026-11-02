# Roteiro para vídeo do YouTube — até 2 minutos

**Pré-requisitos:** NeonDB já preparado com `npm run db:setup`; API publicada; coleção importada; `baseUrl` apontando à sua URL da Vercel. Deixe a aba **Variables** do Postman visível na gravação. Use dados fictícios para os testes.

**00:00–00:15** — "Esta é a API Currículo Express, feita em Node.js, Express, Sequelize e PostgreSQL no NeonDB, publicada na Vercel." Mostre `GET /api/health` para provar que o servidor e o banco estão online.

**00:15–00:35** — Execute `Listar currículos (guarda pessoaId)`. Mostre os dois currículos cadastrados. Execute `Consultar currículo completo` e mostre os quatro relacionamentos `formacoes`, `experiencias`, `projetos`, `habilidades`.

**00:35–00:55** — Mostre a aba Variables: `baseUrl`, `pessoaId`. Explique que o UUID é preenchido automaticamente ao listar ou criar, mas também pode ser editado manualmente. Execute `Selecionar segunda pessoa` e `Consultar currículo completo`.

**00:55–01:20** — Execute `Criar formação` para a pessoa selecionada; a coleção salva `formacaoId`. Execute `Editar formação` e `Buscar formação por ID`. Explique o relacionamento por `pessoaId`.

**01:20–01:40** — Mostre `Listar experiências`, `Listar projetos`, `Listar habilidades`. Se der tempo, execute os exemplos de criação e atualização de cada recurso.

**01:40–01:55** — Execute `Excluir formação de teste` e, em seguida, `Consultar currículo completo` para mostrar que o relacionamento foi atualizado. Cite os métodos GET/POST/PUT/PATCH/DELETE presentes na coleção.

**01:55–02:00** — Finalize mostrando o link público da API e o repositório GitHub.

> **Atenção:** Em vídeo, não mostre o arquivo `.env` nem a senha do NeonDB. O vídeo deverá ser publicado no YouTube como **público** ou **não listado**, não **privado**. Cole o link do YouTube no AVA.
