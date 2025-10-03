import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { Trans } from 'react-i18next';
import { usePing } from '../hooks/usePing';
import { useI18n } from '../hooks/useI18n';
export const DashboardPage = () => {
    const { t, i18n } = useI18n();
    const metrics = useMemo(() => t('dashboardPage.metrics', { returnObjects: true }), [i18n.language, t]);
    const [selectedMetric, setSelectedMetric] = useState(metrics[0] ?? { label: '', value: '', change: '' });
    useEffect(() => {
        if (metrics.length) {
            setSelectedMetric(metrics[0]);
        }
    }, [metrics]);
    const { data, isLoading, isError } = usePing();
    const locale = i18n.resolvedLanguage || i18n.language;
    const formattedTimestamp = (timestamp) => new Date(timestamp).toLocaleString(locale);
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("header", { className: "space-y-2", children: [_jsx("h1", { className: "text-3xl font-semibold text-foreground", children: t('dashboardPage.title') }), _jsx("p", { className: "text-sm text-muted-foreground", children: t('dashboardPage.subtitle') })] }), _jsx("section", { className: "grid gap-4 sm:grid-cols-3", children: metrics.map((metric) => (_jsxs("button", { onClick: () => setSelectedMetric(metric), className: `card-premium hover-lift ${selectedMetric.label === metric.label
                        ? 'border-gold/40 bg-gradient-to-br from-gold/5 to-transparent shadow-large'
                        : 'border-border'}`, children: [_jsx("span", { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground", children: metric.label }), _jsx("p", { className: "mt-2 text-2xl font-semibold text-foreground", children: metric.value }), _jsx("span", { className: `mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${metric.change.startsWith('+')
                                ? 'bg-success/10 text-success'
                                : metric.change.startsWith('-')
                                    ? 'bg-destructive/10 text-destructive'
                                    : 'bg-gold/10 text-gold'}`, children: metric.change })] }, metric.label))) }), _jsxs("section", { className: "card-premium", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx("div", { className: "w-8 h-8 bg-gradient-gold rounded-lg flex items-center justify-center", children: _jsx("svg", { className: "w-4 h-4 text-navy", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }), _jsx("p", { className: "font-medium text-foreground", children: t('dashboardPage.status.title') })] }), _jsxs("div", { className: "mt-3 text-sm", children: [isLoading && (_jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [_jsx("div", { className: "w-4 h-4 border-2 border-gold border-t-transparent rounded-full animate-spin" }), _jsx("span", { children: t('dashboardPage.status.loading') })] })), isError && (_jsxs("div", { className: "flex items-center gap-2 text-destructive", children: [_jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }), _jsx("span", { children: t('dashboardPage.status.error') })] })), data && (_jsxs("div", { className: "flex items-center gap-2 text-success", children: [_jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }), _jsx("span", { className: "text-foreground", children: t('dashboardPage.status.success', {
                                            message: data.message,
                                            time: formattedTimestamp(data.timestamp),
                                        }) })] }))] }), _jsx("div", { className: "mt-6 p-4 bg-muted/50 rounded-lg border border-border", children: _jsx("p", { className: "text-sm text-muted-foreground", children: _jsx(Trans, { i18nKey: "dashboardPage.integration.description", values: { endpoint: '/api/metrics', library: 'react-query' }, components: {
                                    strong: _jsx("strong", { className: "font-semibold text-foreground" }),
                                    code: _jsx("code", { className: "bg-background px-1 py-0.5 rounded text-gold" }),
                                } }) }) })] })] }));
};
