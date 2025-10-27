// Constantes da aplicação
export const APP_CONFIG = {
  name: 'AgendaPro',
  description: 'Agendamento Inteligente para seu Negócio',
  url: 'https://agendapro.com.br',
  version: '1.0.0',
  author: 'AgendaPro',
  themeColor: '#10b981',
} as const;

export const SEO_DEFAULTS = {
  title: 'AgendaPro - Agendamento Inteligente para seu Negócio',
  description: 'Reduza faltas, organize seu time e conquiste mais clientes com a plataforma de agendamento mais simples do mercado. Teste grátis por 14 dias.',
  keywords: 'agendamento online, gestão de negócios, SaaS, agendamento inteligente, gestão de equipe, lembretes automáticos, pagamentos integrados, Brasil',
  ogImage: 'https://agendapro.com.br/og-image.jpg',
  twitterSite: '@agendapro',
  twitterCreator: '@agendapro',
} as const;

export const DEMO_PAGES_CONFIG = {
  salao: {
    title: 'Demonstração Salão de Beleza - AgendaPro',
    description: 'Experimente a gestão completa para salões de beleza e clínicas de estética com o AgendaPro. Agendamentos online, controle de profissionais e estoque.',
    keywords: 'demo salão beleza, agendamento estética, software clínica estética, gestão salão',
    ogImage: 'https://agendapro.com.br/og-image-salao.jpg',
    url: 'https://agendapro.com.br/demonstracoes/salao',
  },
  barbearia: {
    title: 'Demonstração Barbearia - AgendaPro',
    description: 'Descubra o sistema completo para barbearias modernas do AgendaPro. Agendamentos 24/7, gestão de barbeiros e fidelização de clientes.',
    keywords: 'demo barbearia, agendamento barbeiro, software barbearia, gestão barbearia',
    ogImage: 'https://agendapro.com.br/og-image-barbearia.jpg',
    url: 'https://agendapro.com.br/demonstracoes/barbearia',
  },
  veterinaria: {
    title: 'Demonstração Clínica Veterinária - AgendaPro',
    description: 'Conheça a plataforma especializada para clínicas veterinárias do AgendaPro. Agendamentos por especialidade, prontuário eletrônico e gestão de vacinas.',
    keywords: 'demo veterinária, agendamento pet shop, software clínica veterinária, gestão veterinária',
    ogImage: 'https://agendapro.com.br/og-image-veterinaria.jpg',
    url: 'https://agendapro.com.br/demonstracoes/veterinaria',
  },
  dashboard: {
    title: 'Demonstração Dashboard Inteligente - AgendaPro',
    description: 'Visualize métricas em tempo real, acompanhe KPIs e tome decisões baseadas em dados com o dashboard completo do AgendaPro.',
    keywords: 'dashboard agendamento, relatórios agenda pro, indicadores salão, analytics spa',
    ogImage: 'https://agendapro.com.br/og-image-dashboard.jpg',
    url: 'https://agendapro.com.br/demonstracoes/dashboard',
  },
  inventory: {
    title: 'Demonstração Controle de Estoque - AgendaPro',
    description: 'Gerencie o estoque do seu negócio com alertas inteligentes, reposição automática e análise de consumo por profissional.',
    keywords: 'controle de estoque salão, gestão de produtos estética, inventário spa, agenda pro estoque',
    ogImage: 'https://agendapro.com.br/og-image-estoque.jpg',
    url: 'https://agendapro.com.br/demonstracoes/estoque',
  },
  timeBank: {
    title: 'Demonstração Banco de Horas - AgendaPro',
    description: 'Controle a jornada do time em tempo real, gere banco de horas automaticamente e mantenha conformidade com a legislação trabalhista.',
    keywords: 'banco de horas, controle de ponto, gestão de jornada, horas extras, compliance trabalhista',
    ogImage: 'https://agendapro.com.br/og-image-banco-horas.jpg',
    url: 'https://agendapro.com.br/demonstracoes/banco-de-horas',
  },
  newsletter: {
    title: 'Demonstração Newsletter e Campanhas - AgendaPro',
    description: 'Crie newsletters segmentadas, automações de e-mail e campanhas de retenção para fidelizar seus clientes.',
    keywords: 'newsletter salão, automação e-mail agenda pro, marketing relacionamento spa, campanhas fidelização',
    ogImage: 'https://agendapro.com.br/og-image-newsletter.jpg',
    url: 'https://agendapro.com.br/demonstracoes/newsletter',
  },
  productShowcase: {
    title: 'Demonstração Vitrine de Produtos - AgendaPro',
    description: 'Apresente seus produtos com vitrines digitais integradas, destaque lançamentos e aumente suas vendas online.',
    keywords: 'vitrine produtos salão, catálogo digital estética, venda produtos spa, agenda pro vitrine',
    ogImage: 'https://agendapro.com.br/og-image-vitrine.jpg',
    url: 'https://agendapro.com.br/demonstracoes/vitrine',
  },
  productReviews: {
    title: 'Demonstração Avaliações de Clientes - AgendaPro',
    description: 'Colete, gerencie e destaque avaliações dos clientes para fortalecer a reputação do seu negócio e aumentar conversões.',
    keywords: 'avaliações clientes salão, reputação online estética, reviews agenda pro, feedback clientes spa',
    ogImage: 'https://agendapro.com.br/og-image-avaliacoes.jpg',
    url: 'https://agendapro.com.br/demonstracoes/avaliacoes',
  },
} as const;

export const ROUTES = {
  HOME: '/',
  DEMO_SALAO: '/demonstracoes/salao',
  DEMO_BARBEARIA: '/demonstracoes/barbearia',
  DEMO_VETERINARIA: '/demonstracoes/veterinaria',
  DEMO_DASHBOARD: '/demonstracoes/dashboard',
  DEMO_INVENTORY: '/demonstracoes/estoque',
  DEMO_TIME_BANK: '/demonstracoes/banco-de-horas',
  DEMO_NEWSLETTER: '/demonstracoes/newsletter',
  DEMO_PRODUCT_SHOWCASE: '/demonstracoes/vitrine',
  DEMO_PRODUCT_REVIEWS: '/demonstracoes/avaliacoes',
  DASHBOARD: '/dashboard',
} as const;

export const API_ENDPOINTS = {
  PING: '/api/ping',
  PLANS: '/api/plans',
  USER: '/api/user',
  SUBSCRIPTIONS: '/api/subscriptions',
  PAYMENTS: '/api/payments',
  CHAT_LEADS: '/api/chat/leads',
} as const;

export const ANALYTICS_EVENTS = {
  WATCH_DEMO_CLICK: 'watch_demo_click',
  DEMO_SELECTION_CLICK: 'demo_selection_click',
  FREE_TRIAL_CLICK: 'free_trial_click',
  PAGE_VIEW: 'page_view',
  CHAT_OPEN: 'chat_open',
  CHAT_PRODUCT_SELECTED: 'chat_product_selected',
  CHAT_LEAD_SUBMITTED: 'chat_lead_submitted',
} as const;

export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;
