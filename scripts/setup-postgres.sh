#!/usr/bin/env bash
set -euo pipefail

echo "🐘 Configurando PostgreSQL para o projeto SaaS..."

# Verificar se PostgreSQL está instalado
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL não está instalado. Instalando..."
    
    # Detectar distribuição Linux
    if command -v apt-get &> /dev/null; then
        sudo apt-get update
        sudo apt-get install -y postgresql postgresql-contrib
    elif command -v yum &> /dev/null; then
        sudo yum install -y postgresql-server postgresql-contrib
    elif command -v dnf &> /dev/null; then
        sudo dnf install -y postgresql-server postgresql-contrib
    else
        echo "❌ Não foi possível detectar o gerenciador de pacotes. Instale PostgreSQL manualmente."
        exit 1
    fi
else
    echo "✅ PostgreSQL já está instalado"
fi

# Verificar se o serviço PostgreSQL está rodando
if ! sudo systemctl is-active --quiet postgresql; then
    echo "🔄 Iniciando serviço PostgreSQL..."
    sudo systemctl start postgresql
    sudo systemctl enable postgresql
else
    echo "✅ PostgreSQL já está rodando"
fi

# Criar usuário e banco de dados
echo "🗄️ Criando banco de dados 'saas'..."
sudo -u postgres psql -c "CREATE USER saas WITH PASSWORD 'saas';" 2>/dev/null || echo "Usuário 'saas' já existe"
sudo -u postgres psql -c "CREATE DATABASE saas OWNER saas;" 2>/dev/null || echo "Banco 'saas' já existe"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE saas TO saas;" 2>/dev/null || true

# Configurar autenticação local
echo "🔧 Configurando autenticação local..."
PG_VERSION=$(sudo -u postgres psql -t -c "SELECT version();" | grep -oP '\d+\.\d+' | head -1)
PG_CONFIG_DIR="/etc/postgresql/$PG_VERSION/main"

if [ -d "$PG_CONFIG_DIR" ]; then
    # Configurar pg_hba.conf para permitir conexões locais
    if ! grep -q "local.*saas.*md5" "$PG_CONFIG_DIR/pg_hba.conf"; then
        echo "local   saas             saas                                     md5" | sudo tee -a "$PG_CONFIG_DIR/pg_hba.conf"
        sudo systemctl reload postgresql
    fi
fi

echo "✅ PostgreSQL configurado com sucesso!"
echo ""
echo "📋 Informações de conexão:"
echo "   Host: localhost"
echo "   Porta: 5432"
echo "   Banco: saas"
echo "   Usuário: saas"
echo "   Senha: saas"
echo ""
echo "🚀 Para executar as migrations:"
echo "   cd backend && php artisan migrate"
echo ""
echo "🌱 Para popular com dados de exemplo:"
echo "   cd backend && php artisan db:seed"
