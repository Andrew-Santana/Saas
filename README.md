# SaaS Frontend - AgendaPro

[![Deploy to GitHub Pages](https://github.com/Andrew-Santana/Saas/actions/workflows/deploy.yml/badge.svg)](https://github.com/Andrew-Santana/Saas/actions/workflows/deploy.yml)

Aplicação frontend criada com React 18, Vite, TypeScript e TailwindCSS. Fornece landing pages e demos para o produto SaaS AgendaPro.

🌐 **Demo ao vivo**: [https://andrew-santana.github.io/Saas/](https://andrew-santana.github.io/Saas/)

## 🚀 Scripts principais

- `npm install` – instala dependências
- `npm run dev` – inicia servidor de desenvolvimento (porta 5173)
- `npm run build` – gera build de produção
- `npm run preview` – visualiza build de produção
- `npm run lint` – verifica problemas de código
- `npm run format` – formata código com Prettier
- `npm test` – executa testes

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

## 🚀 Deploy no GitHub Pages

### Configuração Inicial

1. Vá até **Settings** → **Pages** no seu repositório GitHub
2. Em **Source**, selecione **GitHub Actions**
3. O deploy será automático a cada push na branch `main`

### Deploy Manual

Para fazer deploy manual:
```bash
# Via GitHub Interface
# Vá em Actions → Deploy to GitHub Pages → Run workflow

# Ou via push
git push origin main
```

### Variáveis de Ambiente em Produção

Para configurar a URL da API em produção:
1. Vá em **Settings** → **Secrets and variables** → **Actions**
2. Adicione: `VITE_API_URL` com o valor da sua API de produção

### Verificar Deploy

- Status: Veja na aba **Actions**
- URL: `https://andrew-santana.github.io/Saas/`
- Build logs disponíveis em cada workflow run

## 🔒 Segurança

- ✅ Source maps desabilitados em produção
- ✅ Console logs removidos automaticamente
- ✅ Variáveis de ambiente nunca commitadas
- ✅ `.env.example` disponível como template
- 📄 Veja [SECURITY.md](./SECURITY.md) para mais informações

## 📝 Notas

- Backend separado em repositório próprio: [SaasBackend](https://github.com/Andrew-Santana/SaasBackend)
- Frontend focado em landing pages, demos e chatbot de captura de leads
- Deploy automático via GitHub Actions
- Hospedado no GitHub Pages
