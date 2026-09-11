# Next.js TailAdmin Starter

Base privada e reutilizável para aplicações Next.js, com o catálogo TailAdmin
isolado do código do produto.

## Incluído

- Next.js 16, React 19, TypeScript e Tailwind CSS 4;
- PostgreSQL 17 via Docker Compose;
- Prisma ORM, migrations e seed de exemplo;
- validação de variáveis de ambiente com Zod;
- ESLint e Prettier;
- catálogo TailAdmin disponível em `/template`.

## Criando um projeto

Use o botão **Use this template** no GitHub. Depois de clonar o novo repositório:

1. Troque `name` no `package.json` e atualize o lockfile com `npm install --package-lock-only`.
2. Ajuste título e descrição em `src/app/(product)/layout.tsx`.
3. Substitua a página inicial em `src/app/(product)/page.tsx`.
4. Renomeie o projeto e as credenciais locais em `compose.yaml` e `.env.example`.
5. Substitua `ExampleItem` pelo domínio real e gere a primeira migration.
6. Revise a licença do TailAdmin antes de compartilhar ou tornar o repositório público.

## Ambiente local

```bash
nvm install
nvm use
npm ci
cp .env.example .env.local
npm run db:up
npm run db:deploy
npm run db:seed
npm run dev
```

A aplicação abre em `http://localhost:3000` e o catálogo em
`http://localhost:3000/template`.

## Estrutura

```text
src/
├── app/
│   ├── (product)/      # aplicação real
│   └── (reference)/    # entrada do catálogo em /template
├── components/         # componentes compartilhados do produto
├── features/           # funcionalidades por domínio
├── generated/prisma/   # cliente gerado, não versionado
├── lib/                # infraestrutura compartilhada
└── template/           # TailAdmin, somente para referência
```

O ESLint impede que o produto importe diretamente de `src/template`. Copie e
adapte os componentes necessários para `src/components` ou `src/features`.

## Comandos

| Comando                             | Uso                                |
| ----------------------------------- | ---------------------------------- |
| `npm run dev`                       | Servidor local                     |
| `npm run quality`                   | Formatação, lint, tipos e build    |
| `npm run db:up`                     | Inicia o PostgreSQL                |
| `npm run db:down`                   | Para o PostgreSQL sem apagar dados |
| `npm run db:migrate -- --name nome` | Cria uma migration                 |
| `npm run db:deploy`                 | Aplica migrations versionadas      |
| `npm run db:seed`                   | Executa o seed de exemplo          |
| `npm run db:reset`                  | Apaga o volume do banco local      |

## Licenciamento

Esta base inclui componentes premium do TailAdmin. Mantenha o repositório
privado e respeite os termos da licença associada à sua compra.
