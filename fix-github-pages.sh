#!/bin/bash

# Script para corrigir GitHub Pages

cd /home/andrew/portifolio/Saas

echo "🔧 Corrigindo configuração do GitHub Pages..."
echo ""

echo "📦 Adicionando correções..."
git add .

echo ""
echo "📝 Commitando correções..."
git commit -m "fix: corrigir deploy no GitHub Pages

Correções aplicadas:
- Adicionar .nojekyll para desabilitar Jekyll
- Copiar index.html para 404.html (fallback SPA)
- Configurar basename no React Router
- Atualizar workflow de deploy

Isso resolve o problema de 404 ao acessar a aplicação."

echo ""
echo "🚀 Fazendo push..."
git push origin main

echo ""
echo "✅ Correções aplicadas!"
echo ""
echo "📋 O que acontecerá agora:"
echo "1. GitHub Actions vai executar o build"
echo "2. Aplicação será deployada com as correções"
echo "3. Aguarde ~2 minutos"
echo ""
echo "🌐 Verifique em: https://andrew-santana.github.io/Saas/"
echo "📊 Status: https://github.com/Andrew-Santana/Saas/actions"

