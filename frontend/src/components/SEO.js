import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Helmet } from 'react-helmet-async';
import { SEO_DEFAULTS } from '../constants';
export default function SEO({ title, description, keywords, ogTitle, ogDescription, ogImage, ogUrl, twitterCard, twitterTitle, twitterDescription, twitterImage, canonicalUrl, structuredData, url, }) {
    const defaultTitle = SEO_DEFAULTS.title;
    const defaultDescription = SEO_DEFAULTS.description;
    const defaultKeywords = SEO_DEFAULTS.keywords;
    const defaultOgImage = SEO_DEFAULTS.ogImage;
    const defaultUrl = SEO_DEFAULTS.url;
    return (_jsxs(Helmet, { children: [_jsx("title", { children: title || defaultTitle }), _jsx("meta", { name: "description", content: description || defaultDescription }), _jsx("meta", { name: "keywords", content: keywords || defaultKeywords }), _jsx("link", { rel: "canonical", href: canonicalUrl || url || defaultUrl }), _jsx("meta", { property: "og:type", content: "website" }), _jsx("meta", { property: "og:url", content: ogUrl || url || defaultUrl }), _jsx("meta", { property: "og:title", content: ogTitle || title || defaultTitle }), _jsx("meta", { property: "og:description", content: ogDescription || description || defaultDescription }), _jsx("meta", { property: "og:image", content: ogImage || defaultOgImage }), _jsx("meta", { property: "og:site_name", content: "AgendaPro" }), _jsx("meta", { property: "og:locale", content: "pt_BR" }), _jsx("meta", { name: "twitter:card", content: twitterCard || "summary_large_image" }), _jsx("meta", { name: "twitter:url", content: url || defaultUrl }), _jsx("meta", { name: "twitter:title", content: twitterTitle || title || defaultTitle }), _jsx("meta", { name: "twitter:description", content: twitterDescription || description || defaultDescription }), _jsx("meta", { name: "twitter:image", content: twitterImage || defaultOgImage }), _jsx("meta", { name: "twitter:site", content: SEO_DEFAULTS.twitterSite }), _jsx("meta", { name: "twitter:creator", content: SEO_DEFAULTS.twitterCreator }), structuredData && (_jsx("script", { type: "application/ld+json", children: JSON.stringify(structuredData) }))] }));
}
