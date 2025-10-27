# SaaS Frontend - AgendaPro

Aplicação frontend criada com React 18, Vite, TypeScript e TailwindCSS. Fornece landing pages e demos para o produto SaaS AgendaPro.

## 🚀 Scripts principais

- `npm install` – instala dependências.
- `npm run dev` – inicia servidor de desenvolvimento (porta 5173).
- `npm run build` – gera build de produção.
- `npm run preview` – visualiza build de produção.
- `npm run lint` – verifica problemas de código.
- `npm run format` – formata código com Prettier.

## 📁 Estrutura do projeto

```
.
├── src/
│   ├── components/      # componentes compartilhados (Hero, Pricing, etc.)
│   ├── pages/           # páginas de aplicação (Landing, Demos)
│   ├── hooks/           # hooks customizados
│   ├── lib/             # utilitários e clientes HTTP
│   ├── types/           # definições de tipos TypeScript
│   ├── i18n/            # traduções (pt-BR, en-US, es-ES, fr-FR)
│   ├── services/        # serviços de API e analytics
│   └── utils/           # funções utilitárias
├── public/              # assets estáticos
└── dist/                # build de produção
```

## 🌍 Internacionalização

A aplicação suporta 4 idiomas:
- **Português (pt-BR)** - Idioma padrão
- **Inglês (en-US)**
- **Espanhol (es-ES)**
- **Francês (fr-FR)**

As rotas estão localizadas:
- `/` ou `/pt` - Português
- `/en` - Inglês
- `/es` - Espanhol
- `/fr` - Francês

## 🔗 Integração com Backend

O frontend está preparado para integração com o backend Laravel via:
- **Axios** para requisições HTTP
- **React Query** para cache e sincronização
- **Sanctum** para autenticação

Configure a URL da API no arquivo `.env.local`:
```
VITE_API_URL=http://localhost:8000
```

## 🐳 Docker

Para rodar em Docker:
```bash
docker compose up -d
```

## 📝 Notas

- Backend separado em repositório próprio: [SaasBackend](https://github.com/Andrew-Santana/SaasBackend)
- Frontend focado em landing pages, demos e chatbot de captura de leads
