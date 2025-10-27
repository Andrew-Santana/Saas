#!/bin/bash

# Script para commitar todas as mudanças de segurança e GitHub Pages

cd /home/andrew/portifolio/Saas

echo "🔍 Verificando mudanças..."
git status

echo ""
echo "📦 Adicionando arquivos..."
git add .

echo ""
echo "📝 Commitando mudanças..."
git commit -m "feat: configurar segurança e GitHub Pages

- Atualizar .gitignore com proteções adequadas
- Remover dist/ do repositório
- Desabilitar source maps em produção
- Remover scripts legados do backend
- Adicionar .env.example
- Adicionar SECURITY.md
- Configurar vite.config.ts para GitHub Pages
- Adicionar GitHub Actions workflow para deploy automático
- Atualizar README com instruções de deploy
- Adicionar terser para minificação otimizada

Melhorias de segurança:
- ✅ Source maps desabilitados
- ✅ Console logs removidos em produção
- ✅ Variáveis de ambiente protegidas
- ✅ Build artifacts ignorados

Deploy automático:
- GitHub Pages configurado
- Deploy via GitHub Actions
- Base path configurado"

echo ""
echo "🚀 Fazendo push..."
git push origin main

echo ""
echo "✅ Pronto! Seu repositório está seguro e pronto para GitHub Pages"
echo ""
echo "📋 Próximos passos:"
echo "1. Vá até Settings → Pages no GitHub"
echo "2. Selecione 'GitHub Actions' como source"
echo "3. O deploy acontecerá automaticamente no próximo push"
echo ""
echo "🌐 URL: https://andrew-santana.github.io/Saas/"

