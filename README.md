# Portal Nitro M365

Base inicial para o portal de implantação padronizada do Microsoft 365, com front-end em React/Vite/Tailwind e API Node/Express/Prisma conectada a PostgreSQL. Inclui docker-compose para subir front, backend e banco.

## Estrutura

```
app/        # Front-end React + Vite
backend/    # API Express com Prisma
```

## Pré-requisitos

- Node.js 22+
- Docker + Docker Compose (opcional para subir toda a stack)

## Como rodar com Docker

```bash
docker compose up --build
```

- Front-end: http://localhost:5173
- API: http://localhost:3000/api
- Postgres: porta 5432 (usuario `portal`, senha `portal`, banco `nitro_portal`)

Após subir a API, execute as migrações e seed dentro do contêiner do backend (ou localmente):

```bash
docker compose exec backend npx prisma migrate deploy
docker compose exec backend node prisma/seed.js
```

## Rodar localmente (sem Docker)

1. Crie um `.env` na pasta `backend` baseado em `.env.example`.
2. Instale dependências em `backend/` e `app/` (npm install) e execute:

```bash
# API
cd backend
npm run dev

# Front-end
cd ../app
npm run dev
```

## API

- `POST /api/auth/login` — login de analista (JWT)
- `GET/POST /api/clients` — listar/criar clientes
- `GET/POST /api/deployments` — listar/criar implantações (requer `Authorization: Bearer <token>`)

## Front-end

Landing navegável com três visões (externa, analista e cliente) destacando cenários A/B de SharePoint/Teams, licenciamento M365 e roadmap. UI pronta para integrar com a API via `VITE_API_URL`.
