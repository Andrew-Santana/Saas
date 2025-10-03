# SaaS Starter Monorepo

Base inicial para o projeto SaaS com frontend React/Vite e backend Laravel. Este repositório contém a estrutura
mínima para acelerar o kick-off descrito na conversa compartilhada.

## Estrutura

```
Saas/
├── frontend/      # Aplicação React + TypeScript + Tailwind
├── backend/       # Script e instruções para gerar projeto Laravel
├── scripts/       # Utilitários de setup
└── README.md
```

## Pré-requisitos

- Node.js 18+
- npm 9+
- PHP 8.2+
- Composer 2+
- PostgreSQL 15+ (configurado automaticamente via script)
- Docker & Docker Compose (opcional, para desenvolvimento)

## Setup do Frontend

```bash
cd frontend
npm install
npm run dev
```

Configurar a variável `VITE_API_URL` em um arquivo `.env.local` caso o backend rode em outra origem.

## Setup do Backend

### 1. Configurar PostgreSQL

```bash
./scripts/setup-postgres.sh
```

Este script instala e configura o PostgreSQL localmente com:
- Usuário: `saas`
- Senha: `saas` 
- Banco: `saas`
- Porta: `5432`

### 2. Configurar Laravel

```bash
./scripts/setup-backend.sh
```

O script baixa o boilerplate oficial do Laravel e cria um endpoint de health check em `/api/ping`.

### 3. Executar Migrations e Seeders

```bash
cd backend
php artisan migrate
php artisan db:seed
```

### 4. Iniciar o Servidor

```bash
cd backend
php artisan serve
```

O backend estará disponível em `http://localhost:8000`

## Desenvolvimento com Docker

Para desenvolvimento usando containers:

```bash
# Iniciar todos os serviços
docker compose up -d

# Apenas o banco de dados
docker compose up -d database

# Ver logs
docker compose logs -f

# Parar todos os serviços
docker compose down
```

### Serviços disponíveis:

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8000  
- **PostgreSQL**: localhost:5432

## Comunicação Front <-> Back

- O frontend utiliza Axios + React Query.
- Endpoint padrão consumido: `GET /api/ping`.
- Ajuste `frontend/src/lib/apiClient.ts` para apontar para o host/porta do backend.

## Funcionalidades Implementadas

✅ **Backend (Laravel 11)**
- Autenticação com Laravel Breeze + Sanctum
- API Resources para serialização
- Rate Limiting personalizado
- CORS configurado
- Modelos SaaS: Plans, Subscriptions, Payments
- Soft Deletes implementado
- Testes PHPUnit configurados

✅ **Frontend (React 18 + TypeScript)**
- Redux Toolkit para estado global
- React Hook Form para formulários
- ESLint + Prettier configurados
- Jest + React Testing Library
- Tailwind CSS para estilização

✅ **Banco de Dados**
- PostgreSQL 15 configurado
- Migrations com timestamps específicos
- Seeders com dados de exemplo
- Docker Compose para desenvolvimento

## Próximos passos sugeridos

1. **Integração de Pagamentos**: Implementar Stripe/PayPal
2. **Email Notifications**: Configurar envio de emails para assinaturas
3. **Admin Panel**: Interface para gerenciar planos e usuários
4. **Analytics**: Dashboard com métricas de assinaturas
5. **CI/CD**: Configurar GitHub Actions ou GitLab CI
6. **Multi-tenancy**: Suporte para múltiplas organizações
7. **API Documentation**: Swagger/OpenAPI
