# Frontend - SaaS Starter

Aplicação criada com React, Vite, TypeScript e TailwindCSS. Fornece telas iniciais para o produto SaaS.

## Scripts principais

- `npm install` – instala dependências.
- `npm run dev` – inicia servidor de desenvolvimento (porta 5173).
- `npm run build` – gera build de produção.
- `npm run preview` – visualiza build.

## Estrutura sugerida

```
frontend/
├── src/
│   ├── components/      # componentes compartilhados (AppShell, etc.)
│   ├── pages/           # páginas de aplicação (Landing, Dashboard)
│   ├── hooks/           # hooks customizados (consumo de API, auth...)
│   ├── lib/             # utilitários e clientes HTTP
│   └── types/           # definições de tipos
└── public/              # assets estáticos
```

A aplicação já está preparada para integração com o backend Laravel via React Query e Axios.
