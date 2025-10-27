#!/usr/bin/env node

const { execSync } = require('child_process');

try {
  console.log('Executando Jest...');
  execSync('npx jest', { stdio: 'inherit' });
  console.log('Testes executados com sucesso!');
} catch (error) {
  console.error('Erro ao executar testes:', error.message);
  process.exit(1);
}
