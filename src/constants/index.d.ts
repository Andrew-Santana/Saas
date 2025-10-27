export declare const APP_CONFIG: {
    readonly name: "AgendaPro";
    readonly description: "Agendamento Inteligente para seu Negócio";
    readonly url: "https://agendapro.com.br";
    readonly version: "1.0.0";
    readonly author: "AgendaPro";
    readonly themeColor: "#10b981";
};
export declare const SEO_DEFAULTS: {
    readonly title: "AgendaPro - Agendamento Inteligente para seu Negócio";
    readonly description: "Reduza faltas, organize seu time e conquiste mais clientes com a plataforma de agendamento mais simples do mercado. Teste grátis por 14 dias.";
    readonly keywords: "agendamento online, gestão de negócios, SaaS, agendamento inteligente, gestão de equipe, lembretes automáticos, pagamentos integrados, Brasil";
    readonly ogImage: "https://agendapro.com.br/og-image.jpg";
    readonly twitterSite: "@agendapro";
    readonly twitterCreator: "@agendapro";
};
export declare const DEMO_PAGES_CONFIG: {
    readonly salao: {
        readonly title: "Demonstração Salão de Beleza - AgendaPro";
        readonly description: "Experimente a gestão completa para salões de beleza e clínicas de estética com o AgendaPro. Agendamentos online, controle de profissionais e estoque.";
        readonly keywords: "demo salão beleza, agendamento estética, software clínica estética, gestão salão";
        readonly ogImage: "https://agendapro.com.br/og-image-salao.jpg";
        readonly url: "https://agendapro.com.br/demonstracoes/salao";
    };
    readonly barbearia: {
        readonly title: "Demonstração Barbearia - AgendaPro";
        readonly description: "Descubra o sistema completo para barbearias modernas do AgendaPro. Agendamentos 24/7, gestão de barbeiros e fidelização de clientes.";
        readonly keywords: "demo barbearia, agendamento barbeiro, software barbearia, gestão barbearia";
        readonly ogImage: "https://agendapro.com.br/og-image-barbearia.jpg";
        readonly url: "https://agendapro.com.br/demonstracoes/barbearia";
    };
    readonly veterinaria: {
        readonly title: "Demonstração Clínica Veterinária - AgendaPro";
        readonly description: "Conheça a plataforma especializada para clínicas veterinárias do AgendaPro. Agendamentos por especialidade, prontuário eletrônico e gestão de vacinas.";
        readonly keywords: "demo veterinária, agendamento pet shop, software clínica veterinária, gestão veterinária";
        readonly ogImage: "https://agendapro.com.br/og-image-veterinaria.jpg";
        readonly url: "https://agendapro.com.br/demonstracoes/veterinaria";
    };
    readonly dashboard: {
        readonly title: "Demonstração Dashboard Inteligente - AgendaPro";
        readonly description: "Visualize métricas em tempo real, acompanhe KPIs e tome decisões baseadas em dados com o dashboard completo do AgendaPro.";
        readonly keywords: "dashboard agendamento, relatórios agenda pro, indicadores salão, analytics spa";
        readonly ogImage: "https://agendapro.com.br/og-image-dashboard.jpg";
        readonly url: "https://agendapro.com.br/demonstracoes/dashboard";
    };
    readonly inventory: {
        readonly title: "Demonstração Controle de Estoque - AgendaPro";
        readonly description: "Gerencie o estoque do seu negócio com alertas inteligentes, reposição automática e análise de consumo por profissional.";
        readonly keywords: "controle de estoque salão, gestão de produtos estética, inventário spa, agenda pro estoque";
        readonly ogImage: "https://agendapro.com.br/og-image-estoque.jpg";
        readonly url: "https://agendapro.com.br/demonstracoes/estoque";
    };
    readonly timeBank: {
        readonly title: "Demonstração Banco de Horas - AgendaPro";
        readonly description: "Controle a jornada do time em tempo real, gere banco de horas automaticamente e mantenha conformidade com a legislação trabalhista.";
        readonly keywords: "banco de horas, controle de ponto, gestão de jornada, horas extras, compliance trabalhista";
        readonly ogImage: "https://agendapro.com.br/og-image-banco-horas.jpg";
        readonly url: "https://agendapro.com.br/demonstracoes/banco-de-horas";
    };
    readonly newsletter: {
        readonly title: "Demonstração Newsletter e Campanhas - AgendaPro";
        readonly description: "Crie newsletters segmentadas, automações de e-mail e campanhas de retenção para fidelizar seus clientes.";
        readonly keywords: "newsletter salão, automação e-mail agenda pro, marketing relacionamento spa, campanhas fidelização";
        readonly ogImage: "https://agendapro.com.br/og-image-newsletter.jpg";
        readonly url: "https://agendapro.com.br/demonstracoes/newsletter";
    };
    readonly productShowcase: {
        readonly title: "Demonstração Vitrine de Produtos - AgendaPro";
        readonly description: "Apresente seus produtos com vitrines digitais integradas, destaque lançamentos e aumente suas vendas online.";
        readonly keywords: "vitrine produtos salão, catálogo digital estética, venda produtos spa, agenda pro vitrine";
        readonly ogImage: "https://agendapro.com.br/og-image-vitrine.jpg";
        readonly url: "https://agendapro.com.br/demonstracoes/vitrine";
    };
    readonly productReviews: {
        readonly title: "Demonstração Avaliações de Clientes - AgendaPro";
        readonly description: "Colete, gerencie e destaque avaliações dos clientes para fortalecer a reputação do seu negócio e aumentar conversões.";
        readonly keywords: "avaliações clientes salão, reputação online estética, reviews agenda pro, feedback clientes spa";
        readonly ogImage: "https://agendapro.com.br/og-image-avaliacoes.jpg";
        readonly url: "https://agendapro.com.br/demonstracoes/avaliacoes";
    };
};
export declare const ROUTES: {
    readonly HOME: "/";
    readonly DEMO_SALAO: "/demonstracoes/salao";
    readonly DEMO_BARBEARIA: "/demonstracoes/barbearia";
    readonly DEMO_VETERINARIA: "/demonstracoes/veterinaria";
    readonly DEMO_DASHBOARD: "/demonstracoes/dashboard";
    readonly DEMO_INVENTORY: "/demonstracoes/estoque";
    readonly DEMO_TIME_BANK: "/demonstracoes/banco-de-horas";
    readonly DEMO_NEWSLETTER: "/demonstracoes/newsletter";
    readonly DEMO_PRODUCT_SHOWCASE: "/demonstracoes/vitrine";
    readonly DEMO_PRODUCT_REVIEWS: "/demonstracoes/avaliacoes";
    readonly DASHBOARD: "/dashboard";
};
export declare const API_ENDPOINTS: {
    readonly PING: "/api/ping";
    readonly PLANS: "/api/plans";
    readonly USER: "/api/user";
    readonly SUBSCRIPTIONS: "/api/subscriptions";
    readonly PAYMENTS: "/api/payments";
    readonly CHAT_LEADS: "/api/chat/leads";
};
export declare const ANALYTICS_EVENTS: {
    readonly WATCH_DEMO_CLICK: "watch_demo_click";
    readonly DEMO_SELECTION_CLICK: "demo_selection_click";
    readonly FREE_TRIAL_CLICK: "free_trial_click";
    readonly PAGE_VIEW: "page_view";
    readonly CHAT_OPEN: "chat_open";
    readonly CHAT_PRODUCT_SELECTED: "chat_product_selected";
    readonly CHAT_LEAD_SUBMITTED: "chat_lead_submitted";
};
export declare const LOADING_STATES: {
    readonly IDLE: "idle";
    readonly LOADING: "loading";
    readonly SUCCESS: "success";
    readonly ERROR: "error";
};
