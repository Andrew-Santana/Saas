#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND_DIR="$PROJECT_ROOT/backend"

if [ -d "$BACKEND_DIR/app" ]; then
  echo "[setup-backend] O diretório backend já contém um projeto Laravel. Nada a fazer." >&2
  exit 0
fi

echo "[setup-backend] Baixando Laravel..."
composer create-project laravel/laravel "$BACKEND_DIR"

pushd "$BACKEND_DIR" >/dev/null

echo "[setup-backend] Instalando Laravel Breeze (opcional)..."
php artisan breeze:install api --no-interaction || true

cat <<'PHP' > routes/api.php
<?php

use Illuminate\Support\Facades\Route;

Route::get('/ping', function () {
    return response()->json([
        'message' => 'API Laravel operacional',
        'timestamp' => now()->toIso8601String(),
    ]);
});
PHP

echo "[setup-backend] Executando migrations..."
php artisan migrate || true

popd >/dev/null

echo "[setup-backend] Configuração concluída."
