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
};
export declare const ROUTES: {
    readonly HOME: "/";
    readonly DEMO_SALAO: "/demonstracoes/salao";
    readonly DEMO_BARBEARIA: "/demonstracoes/barbearia";
    readonly DEMO_VETERINARIA: "/demonstracoes/veterinaria";
    readonly DASHBOARD: "/dashboard";
};
export declare const API_ENDPOINTS: {
    readonly PING: "/api/ping";
    readonly PLANS: "/api/plans";
    readonly USER: "/api/user";
    readonly SUBSCRIPTIONS: "/api/subscriptions";
    readonly PAYMENTS: "/api/payments";
};
export declare const ANALYTICS_EVENTS: {
    readonly WATCH_DEMO_CLICK: "watch_demo_click";
    readonly DEMO_SELECTION_CLICK: "demo_selection_click";
    readonly FREE_TRIAL_CLICK: "free_trial_click";
    readonly PAGE_VIEW: "page_view";
};
export declare const LOADING_STATES: {
    readonly IDLE: "idle";
    readonly LOADING: "loading";
    readonly SUCCESS: "success";
    readonly ERROR: "error";
};
