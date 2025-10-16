#!/usr/bin/env node

/**
 * Script para validar traduções e gerar relatório de cobertura.
 * Adaptado para ambientes ESM (Node.js com "type": "module").
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOCALES_DIR = path.resolve(__dirname, '../src/i18n/locales');
const TRANSLATION_VALIDATOR_PATH = path.resolve(__dirname, '../src/utils/translationValidator.ts');
const I18N_INDEX_PATH = path.resolve(__dirname, '../src/i18n/index.ts');

const statusEmoji = (coverage) => {
  if (coverage >= 95) return '✅';
  if (coverage >= 80) return '⚠️';
  return '❌';
};

const safeReadJson = (filePath) => {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(`Não foi possível ler o arquivo de tradução: ${filePath}\n${error.message}`);
  }
};

const extractSupportedLanguages = () => {
  try {
    const content = fs.readFileSync(I18N_INDEX_PATH, 'utf-8');
    const listMatch = content.match(/export const supportedLanguagesList\s*=\s*\[(.*?)\];/s);
    if (!listMatch) {
      throw new Error('Lista supportedLanguagesList não encontrada em src/i18n/index.ts');
    }

    const codes = [...listMatch[1].matchAll(/code:\s*'([^']+)'/g)].map(([, code]) => code);
    if (codes.length === 0) {
      throw new Error('Nenhum código de idioma encontrado em supportedLanguagesList');
    }

    return codes;
  } catch (error) {
    throw new Error(`Não foi possível determinar os idiomas suportados: ${error.message}`);
  }
};

const SUPPORTED_LANGUAGES = extractSupportedLanguages();

const getLanguages = () => {
  return SUPPORTED_LANGUAGES.filter((language) =>
    fs.existsSync(path.join(LOCALES_DIR, language, 'translation.json'))
  );
};

const loadTranslations = (language) => {
  const filePath = path.join(LOCALES_DIR, language, 'translation.json');
  return safeReadJson(filePath);
};

const extractRequiredKeys = () => {
  try {
    const fileContent = fs.readFileSync(TRANSLATION_VALIDATOR_PATH, 'utf-8');
    const match = fileContent.match(/export const DEMO_PAGE_REQUIRED_KEYS\s*=\s*\[(.*?)\];/s);
    if (!match) {
      throw new Error('Constante DEMO_PAGE_REQUIRED_KEYS não encontrada no arquivo translationValidator.ts');
    }

    const literalBlock = match[1];
    const keyMatches = [...literalBlock.matchAll(/'([^']+)'/g)];
    return keyMatches.map(([, key]) => key);
  } catch (error) {
    throw new Error(`Não foi possível extrair as chaves obrigatórias: ${error.message}`);
  }
};

const getNestedValue = (object, keyPath) => {
  return keyPath.split('.').reduce((acc, segment) => {
    if (acc === undefined || acc === null) {
      return undefined;
    }
    return acc[segment];
  }, object);
};

const validateLanguage = (translations, requiredKeys) => {
  const missing = [];
  const present = [];

  requiredKeys.forEach((key) => {
    const value = getNestedValue(translations, key);
    if (value === undefined || value === null || value === '') {
      missing.push(key);
    } else {
      present.push(key);
    }
  });

  const coverage = requiredKeys.length > 0 ? (present.length / requiredKeys.length) * 100 : 100;

  return {
    missing,
    present,
    coverage,
  };
};

const generateCoverageReport = (requiredKeys) => {
  const languages = getLanguages();
  const details = {};

  languages.forEach((language) => {
    const translations = loadTranslations(language);
    const result = validateLanguage(translations, requiredKeys);

    details[language] = {
      coverage: result.coverage,
      missingCount: result.missing.length,
      presentCount: result.present.length,
      missingKeys: result.missing,
    };
  });

  const totalCoverage = Object.values(details).reduce((sum, entry) => sum + entry.coverage, 0);
  const averageCoverage = details && Object.keys(details).length > 0 ? totalCoverage / Object.keys(details).length : 0;

  return {
    summary: {
      totalKeys: requiredKeys.length,
      languages: Object.keys(details),
      averageCoverage,
    },
    details,
  };
};

export async function runTranslationTests() {
  console.log('🌍 Executando testes de tradução...\n');

  try {
    const requiredKeys = extractRequiredKeys();
    const report = generateCoverageReport(requiredKeys);

    console.log('📊 RELATÓRIO DE COBERTURA DE TRADUÇÕES');
    console.log('=====================================\n');
    console.log('📈 Resumo:');
    console.log(`   • Total de chaves: ${report.summary.totalKeys}`);
    console.log(`   • Idiomas: ${report.summary.languages.join(', ')}`);
    console.log(`   • Cobertura média: ${report.summary.averageCoverage.toFixed(1)}%\n`);

    console.log('📋 Detalhes por idioma:');
    console.log('----------------------');
    Object.entries(report.details).forEach(([language, details]) => {
      const status = statusEmoji(details.coverage);
      console.log(`${status} ${language}:`);
      console.log(`   • Cobertura: ${details.coverage.toFixed(1)}%`);
      console.log(`   • Presentes: ${details.presentCount}`);
      console.log(`   • Ausentes: ${details.missingCount}`);
      if (details.missingKeys.length > 0) {
        console.log(`   • Chaves ausentes: ${details.missingKeys.join(', ')}`);
      }
      console.log('');
    });

    const hasIssues = Object.values(report.details).some((details) => details.coverage < 95);
    if (hasIssues) {
      console.log('⚠️  ATENÇÃO: Alguns idiomas têm cobertura abaixo de 95%');
      console.log('   Considere adicionar as traduções ausentes.\n');
    } else {
      console.log('✅ Todas as traduções estão com cobertura adequada!\n');
    }

    const reportPath = path.resolve(__dirname, '../translation-coverage-report.json');
    try {
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      console.log(`📄 Relatório salvo em: ${reportPath}`);
    } catch (fsError) {
      console.warn(`⚠️  Não foi possível salvar o relatório (${fsError.message}). Prosseguindo sem gerar arquivo.`);
    }

    return report;
  } catch (error) {
    console.error('❌ Erro ao executar testes de tradução:', error);
    process.exitCode = 1;
    throw error;
  }
}

const executedDirectly = fileURLToPath(import.meta.url) === path.resolve(process.argv[1] ?? '');

if (executedDirectly) {
  runTranslationTests()
    .then(() => {
      if (process.exitCode !== 1) {
        console.log('\n🎉 Testes de tradução concluídos!');
      }
    })
    .catch(() => {
      process.exit(1);
    });
}
