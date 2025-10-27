# Sistema de Internacionalização (i18n)

Este projeto inclui um sistema completo de internacionalização com suporte a múltiplos idiomas e regiões.

## 🌍 Idiomas Suportados

- **Inglês**: Estados Unidos (en-US), Canadá (en-CA), Reino Unido (en-GB)
- **Francês**: Canadá (fr-CA), França (fr-FR)
- **Português**: Brasil (pt-BR), Portugal (pt-PT)
- **Espanhol**: Espanha (es-ES)

## 🚀 Como Usar

### 1. Hook useI18n

```tsx
import { useI18n } from '../hooks/useI18n';

function MyComponent() {
  const { t, changeLanguage, currentLanguage } = useI18n();

  return (
    <div>
      <h1>{t('navigation.home')}</h1>
      <p>Idioma atual: {currentLanguage}</p>
      <button onClick={() => changeLanguage('pt-BR')}>
        Mudar para Português
      </button>
    </div>
  );
}
```

### 2. Componente LanguageSelector

```tsx
import LanguageSelector from '../components/LanguageSelector';

function Header() {
  return (
    <header>
      <nav>
        {/* Outros itens de navegação */}
        <LanguageSelector />
      </nav>
    </header>
  );
}
```

### 3. Traduções com Interpolação

```tsx
// No arquivo de tradução
{
  "welcome": "Bem-vindo, {{name}}!"
}

// No componente
const { t } = useI18n();
return <h1>{t('welcome', { name: 'João' })}</h1>;
```

## 📁 Estrutura de Arquivos

```
src/
├── i18n/
│   ├── index.ts                 # Configuração do i18next
│   └── locales/
│       ├── en-US/
│       │   └── translation.json
│       ├── en-CA/
│       │   └── translation.json
│       ├── en-GB/
│       │   └── translation.json
│       ├── fr-CA/
│       │   └── translation.json
│       ├── fr-FR/
│       │   └── translation.json
│       ├── pt-BR/
│       │   └── translation.json
│       ├── pt-PT/
│       │   └── translation.json
│       └── es-ES/
│           └── translation.json
├── components/
│   ├── LanguageSelector.tsx    # Seletor de idioma
│   └── LanguageDemo.tsx        # Demonstração do sistema
└── hooks/
    └── useI18n.ts              # Hook personalizado
```

## 🔧 Configuração

### Detecção Automática de Idioma

O sistema detecta automaticamente o idioma preferido do usuário baseado em:

1. **localStorage**: Idioma salvo anteriormente
2. **navigator**: Idioma do navegador
3. **htmlTag**: Atributo lang do HTML

### Fallback de Idiomas

Se uma tradução não estiver disponível, o sistema usa fallbacks:

- `en` → `en-US`
- `fr` → `fr-FR`
- `pt` → `pt-BR`
- `es` → `es-ES`
- Qualquer outro → `en-US`

## 📝 Adicionando Novas Traduções

### 1. Adicionar ao arquivo de tradução

```json
{
  "novaSecao": {
    "titulo": "Novo Título",
    "descricao": "Nova descrição"
  }
}
```

### 2. Usar no componente

```tsx
const { t } = useI18n();
return <h1>{t('novaSecao.titulo')}</h1>;
```

### 3. Adicionar novo idioma

1. Criar pasta `src/i18n/locales/[codigo-idioma]/`
2. Adicionar arquivo `translation.json`
3. Atualizar `src/i18n/index.ts`:

```tsx
import novoIdioma from './locales/[codigo-idioma]/translation.json';

const resources = {
  // ... idiomas existentes
  '[codigo-idioma]': { translation: novoIdioma },
};

export const supportedLanguages = [
  // ... idiomas existentes
  { code: '[codigo-idioma]', name: 'Nome do Idioma', flag: '🇺🇸' },
];
```

## 🎨 Personalização do Seletor

```tsx
<LanguageSelector 
  className="minha-classe"
  showFlags={true}      // Mostrar bandeiras
  showNames={true}      // Mostrar nomes dos idiomas
/>
```

## 🔍 Demonstração

Acesse `/language-demo` para ver o sistema funcionando com exemplos de todas as traduções.

## 📚 Recursos Avançados

### Namespaces

Para organizar traduções em múltiplos arquivos:

```tsx
// Configuração
const resources = {
  'en-US': {
    common: commonEn,
    auth: authEn,
  }
};

// Uso
const { t } = useI18n();
return <span>{t('common:loading')}</span>;
```

### Pluralização

```json
{
  "items": "{{count}} item",
  "items_plural": "{{count}} itens"
}
```

```tsx
{t('items', { count: 5 })} // "5 itens"
```

### Formatação de Datas e Números

```tsx
import { useTranslation } from 'react-i18next';

const { i18n } = useTranslation();

// Formatação de data
const date = new Date();
const formattedDate = new Intl.DateTimeFormat(i18n.language).format(date);

// Formatação de número
const number = 1234.56;
const formattedNumber = new Intl.NumberFormat(i18n.language).format(number);
```

## 🐛 Troubleshooting

### Problema: Tradução não aparece

**Solução**: Verifique se a chave existe no arquivo de tradução e se está sendo importada corretamente.

### Problema: Idioma não muda

**Solução**: Verifique se o idioma está na lista `supportedLanguages` e se o arquivo de tradução existe.

### Problema: Fallback não funciona

**Solução**: Verifique a configuração de `fallbackLng` no arquivo `i18n/index.ts`.

## 📖 Recursos Adicionais

- [Documentação do react-i18next](https://react.i18next.com/)
- [Documentação do i18next](https://www.i18next.com/)
- [Códigos de idioma ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
