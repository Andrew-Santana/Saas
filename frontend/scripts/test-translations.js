#!/usr/bin/env node

/**
 * Script para testar traduções e gerar relatórios de cobertura
 */

const fs = require('fs');
const path = require('path');

// Importar o validador de traduções
const { TranslationValidator, DEMO_PAGE_REQUIRED_KEYS } = require('../src/utils/translationValidator');

async function runTranslationTests() {
  console.log('🌍 Executando testes de tradução...\n');

  try {
    // Gerar relatório de cobertura
    const report = TranslationValidator.generateCoverageReport(DEMO_PAGE_REQUIRED_KEYS);
    
    console.log('📊 RELATÓRIO DE COBERTURA DE TRADUÇÕES');
    console.log('=====================================\n');
    
    console.log(`📈 Resumo:`);
    console.log(`   • Total de chaves: ${report.summary.totalKeys}`);
    console.log(`   • Idiomas: ${report.summary.languages.join(', ')}`);
    console.log(`   • Cobertura média: ${report.summary.averageCoverage.toFixed(1)}%\n`);
    
    console.log('📋 Detalhes por idioma:');
    console.log('----------------------');
    
    Object.entries(report.details).forEach(([language, details]) => {
      const status = details.coverage >= 95 ? '✅' : details.coverage >= 80 ? '⚠️' : '❌';
      console.log(`${status} ${language}:`);
      console.log(`   • Cobertura: ${details.coverage.toFixed(1)}%`);
      console.log(`   • Presentes: ${details.presentCount}`);
      console.log(`   • Ausentes: ${details.missingCount}`);
      
      if (details.missingKeys.length > 0) {
        console.log(`   • Chaves ausentes: ${details.missingKeys.join(', ')}`);
      }
      console.log('');
    });
    
    // Verificar se há problemas
    const hasIssues = Object.values(report.details).some(details => details.coverage < 95);
    
    if (hasIssues) {
      console.log('⚠️  ATENÇÃO: Alguns idiomas têm cobertura abaixo de 95%');
      console.log('   Considere adicionar as traduções ausentes.\n');
    } else {
      console.log('✅ Todas as traduções estão com cobertura adequada!\n');
    }
    
    // Salvar relatório em arquivo
    const reportPath = path.join(__dirname, '../translation-coverage-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📄 Relatório salvo em: ${reportPath}`);
    
    return report;
    
  } catch (error) {
    console.error('❌ Erro ao executar testes de tradução:', error);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  runTranslationTests()
    .then(() => {
      console.log('\n🎉 Testes de tradução concluídos!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Falha nos testes de tradução:', error);
      process.exit(1);
    });
}

module.exports = { runTranslationTests };
