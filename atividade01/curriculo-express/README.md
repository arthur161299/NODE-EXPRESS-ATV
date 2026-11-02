# Currículo Express — API REST (AOS)

Projeto acadêmico construído a partir da arquitetura do **`express-01`** do arquivo `aos-2026-2-main.zip` fornecido para a atividade: Express, Sequelize, PostgreSQL e organização por `models`, `controllers`, `services`, `routes` e `middlewares`.

## O que foi implementado

- **5 entidades com CRUD completo:** Pessoas, Formações, Experiências, Projetos e Habilidades.
- **4 relacionamentos 1:N:** Pessoa → Formações / Experiências / Projetos / Habilidades, por meio da chave estrangeira `pessoaId` (UUID).
- `GET /api/curriculos` retorna todos os currículos com suas associações.
- `GET /api/pessoas/:id/curriculo` retorna um currículo com as associações.
- Script de criação das tabelas e cadastro inicial de **2 pessoas fictícias**, sem duplicação se executado novamente.
- Coleção **Postman v2.1** pronta para importação com variáveis reutilizáveis.
- Exportação do app no formato reconhecido pelo **Vercel**.

> **Importante:** O pacote não contém credenciais reais. Você precisa conectar sua própria conta NeonDB, publicar no GitHub e Vercel, atualizar `baseUrl` no Postman e gravar/publicar o vídeo no YouTube. Nenhuma dessas etapas externas é executada automaticamente.

## 1. Configurar o NeonDB

1. Crie um projeto em https://console.neon.tech/.
2. Na opção **Connect**, copie a **connection string** (de preferência **Pooled connection**, adequada para ambientes serverless). Ela se parece com:
   `postgresql://USUARIO:SENHA@ep-xxx-pooler.REGIAO.aws.neon.tech/neondb?sslmode=require`
3. Na raiz deste projeto, copie `.env.example` para `.env` e substitua `DATABASE_URL` pela connection string real. **Não publique `.env` nem suas senhas no GitHub.**

No Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

No Linux/macOS:

```bash
cp .env.example .env
```

## 2. Instalar e criar as tabelas com 2 currículos

Requer **Node.js 20+** e acesso ao NeonDB.

```bash
npm install
npm run db:setup
```

O `db:setup` executa `sequelize.sync()` (sem `force` ou `alter`) e insere os 2 currículos fictícios: **Mariana Costa** e **Lucas Almeida**. Ao executar novamente, não duplica os mesmos registros. Para semear novamente em banco já criado: `npm run db:seed`.

**Atenção:** O `sync()` sem `alter` cria as tabelas faltantes, mas não atualiza esquemas de tabelas preexistentes. Use um projeto Neon novo para esta atividade.

## 3. Rodar e testar localmente

```bash
npm run dev
```

A API responde em `http://localhost:4001` (ou porta indicada no `.env`).

Teste inicialmente:

- `GET http://localhost:4001/`
- `GET http://localhost:4001/api/health` — verifica conexão com NeonDB
- `GET http://localhost:4001/api/curriculos` — os 2 currículos com formações, empregos, projetos e habilidades

Executar testes de validação: `npm test`.

## 4. CRUD e relacionamentos

| Recurso | Listar | Buscar 1 | Criar | Editar | Excluir |
| --- | --- | --- | --- | --- | --- |
| Pessoas | `GET /api/pessoas` | `GET /api/pessoas/:id` | `POST /api/pessoas` | `PUT/PATCH /api/pessoas/:id` | `DELETE /api/pessoas/:id` |
| Formações | `GET /api/formacoes` | `GET /api/formacoes/:id` | `POST /api/formacoes` | `PUT/PATCH /api/formacoes/:id` | `DELETE /api/formacoes/:id` |
| Experiências | `GET /api/experiencias` | `GET /api/experiencias/:id` | `POST /api/experiencias` | `PUT/PATCH /api/experiencias/:id` | `DELETE /api/experiencias/:id` |
| Projetos | `GET /api/projetos` | `GET /api/projetos/:id` | `POST /api/projetos` | `PUT/PATCH /api/projetos/:id` | `DELETE /api/projetos/:id` |
| Habilidades | `GET /api/habilidades` | `GET /api/habilidades/:id` | `POST /api/habilidades` | `PUT/PATCH /api/habilidades/:id` | `DELETE /api/habilidades/:id` |

Todos os endpoints acima aceitam/retornam JSON. Nas tabelas filhas, **o corpo de criação deve conter `pessoaId`**, que faz o relacionamento com uma Pessoa existente. O banco cria a FK; excluir a pessoa exclui seus registros relacionados (`ON DELETE CASCADE`).

### Exemplos

Criar pessoa (`POST /api/pessoas`):

```json
{"nome":"Teste Pessoa","email":"teste.pessoa@example.com","cidade":"Recife - PE","resumo":"Currículo de teste"}
```

Criar formação associada (`POST /api/formacoes`):

```json
{"pessoaId":"UUID-REAL-DA-PESSOA","instituicao":"Faculdade Exemplo","curso":"Design","nivel":"Graduação","inicio":"2022-02-01","concluido":false}
```

Atualizar (`PATCH /api/formacoes/UUID-REAL-DA-FORMACAO`):

```json
{"curso":"Design Gráfico","concluido":true}
```

Depois consulte `GET /api/pessoas/UUID-REAL-DA-PESSOA/curriculo` para demonstrar os relacionamentos.

**Observações de API:** `POST` → `201`, consultas/edições → `200`, exclusão → `204`, erro de validação → `400`, recurso ausente → `404`, e-mail repetido → `409`. `PUT` e `PATCH` aceitam atualização parcial nesta base. Não é necessário mandar `id`, pois UUID é criado automaticamente.

## 5. Publicar no GitHub e Vercel

1. Crie um repositório **seu** no GitHub e envie os arquivos **desta pasta** para a raiz (não envie `.env`).
2. Em https://vercel.com/new, importe esse repositório; a Vercel reconhece o aplicativo Express exportado em `src/index.js`.
3. Na Vercel, configure **Environment Variables** → `DATABASE_URL` = string real do NeonDB (também na produção). Pode configurar `ALLOWED_ORIGINS` se for usar um frontend web.
4. Faça o deploy. Confira `https://SEU-PROJETO.vercel.app/api/health` e `https://SEU-PROJETO.vercel.app/api/curriculos`.
5. Se modificar as variáveis após o primeiro deploy, faça **redeploy**.

**Importante:** prepare o banco com `npm run db:setup` em sua máquina antes de testar na Vercel. Não execute `sync({force:true})` em produção. A URL real `*.vercel.app` só é conhecida após a publicação.

## 6. Importar o Postman e configurar variáveis

1. Abra **Postman → Import** e escolha `postman/Curriculo-Express.postman_collection.json`.
2. Abra a coleção → **Variables**. Altere `baseUrl` de `https://SEU-PROJETO.vercel.app` para **sua URL real publicada**, sem barra final, e salve.
3. Execute `Listar currículos (guarda pessoaId)` (captura automaticamente o primeiro UUID).
4. Execute `Criar formação` e depois `Consultar currículo completo`; os scripts salvam IDs `formacaoId`, `experienciaId`, `projetoId`, `habilidadeId` para outras requisições.
5. Para alternar para o outro currículo, execute `Listar currículos (guarda pessoaId)` e altere manualmente `pessoaId` para o ID do segundo usuário, ou use `Selecionar segunda pessoa (guarda pessoaId)`.
6. **Atenção:** `DELETE` remove dados de verdade; para demonstrar sem alterar os dados iniciais, crie e exclua somente um registro de teste.

## 7. Entrega acadêmica

Insira no AVA: **link do seu GitHub**, **link da Vercel**, **arquivo JSON do Postman**, **link do vídeo no YouTube (público ou não listado)**. Consulte `ROTEIRO-VIDEO.md` para caber em até dois minutos. Evite mostrar `.env` ou a connection string com senha durante a gravação.

## Organização

```text
curriculo-express/
├── src/
│   ├── models/        # Sequelize, tabelas e relacionamentos
│   ├── services/      # Operações CRUD e consultas associadas
│   ├── controllers/   # Códigos de resposta HTTP
│   ├── routes/        # Rotas Express
│   ├── middlewares/   # Tratamento de erros
│   ├── seeds/         # Dois currículos fictícios
│   ├── index.js       # Export padrão para Vercel
│   └── server.js      # Execução local
├── scripts/           # Preparação e seed do NeonDB
├── tests/             # Testes de validação
├── postman/           # Coleção importável
├── .env.example
├── package.json
├── ROTEIRO-VIDEO.md
└── README.md
```

**Nota de segurança:** Esta é uma base acadêmica sem autenticação. Não armazene currículos reais/sensíveis em uma API pública sem implementar autorização e proteção de dados.
