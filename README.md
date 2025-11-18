# Portal Nitro M365

Base inicial para o portal de implantação padronizada do Microsoft 365, com front-end em React/Vite/Tailwind e API Node/Express/Prisma conectada a PostgreSQL. Inclui docker-compose para subir front, backend e banco.

## Estrutura

```
app/        # Front-end React + Vite
backend/    # API Express com Prisma
```

## Guia antifalhas (instalação do zero em Ubuntu Server)

Passo a passo completo para subir o projeto em uma VM Ubuntu limpa (testado em Ubuntu 22.04/24.04). Copie/cole com atenção na ordem indicada.

### 1) Atualizar o sistema e instalar dependências de base

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y ca-certificates curl git gnupg lsb-release
```

### 2) Instalar Docker Engine + Compose Plugin

```bash
# Adiciona chave oficial
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Adiciona repositório
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Permite usar docker sem sudo (precisa relogar)
sudo usermod -aG docker $USER
newgrp docker

# Teste rápido
docker run --rm hello-world
```

### 3) Instalar Node.js 22 (para uso local opcional)

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# Confirme versões
node -v
npm -v
```

### 4) Clonar o repositório

```bash
git clone <url-do-repo> portal-nitro-m365
cd portal-nitro-m365
```

### 5) Configurar variáveis de ambiente do backend

```bash
cp backend/.env.example backend/.env

# Ajuste se necessário:
# DATABASE_URL="postgresql://portal:CHANGE_ME_POSTGRES_PASSWORD@db:5432/nitro_portal?schema=public"
```

### 6) Subir toda a stack com Docker

```bash
docker compose up --build -d
docker compose ps
```

Você deve ver `app`, `backend` e `db` em estado `Up`. Se algum serviço reiniciar, rode `docker compose logs <serviço>`.

### 7) Aplicar migrações e seed do Prisma

```bash
docker compose exec backend npx prisma migrate deploy
docker compose exec backend node prisma/seed.js
```

### 8) Validar funcionalidade básica

```bash
# Listar clientes (rota pública)
curl http://localhost:3000/api/clients

# Obter JWT padrão
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"analista@nitro.com","password":"nitro123"}'

# Acessar front-end
echo "Abra http://localhost:5173 no navegador."
```

### 9) Problemas comuns e correções rápidas

- **Permissão do Docker:** se receber `permission denied`, finalize a sessão e faça login novamente após `usermod -aG docker $USER`.
- **Portas em uso:** pare serviços que ocupem 3000/5173/5432 ou edite as portas no `docker-compose.yml`.
- **Migração falhou:** verifique a conexão com o banco: `docker compose exec db pg_isready -U portal -d nitro_portal` e repita o passo 7.
- **Seed duplicado:** pode ignorar ou limpar com `docker compose down -v` e repetir os passos 6–8.

### Referência rápida (sem Docker)

1. Criar `.env` em `backend/` baseado em `.env.example`.
2. Instalar dependências em `backend/` e `app/` (`npm install`).
3. Rodar API: `cd backend && npm run dev`.
4. Rodar front: `cd app && npm run dev`.
5. Aplicar Prisma: `npx prisma migrate deploy` e `node prisma/seed.js` dentro de `backend/`.

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
