import { Helmet } from 'react-helmet-async';
import { SEO_DEFAULTS } from '../constants';
import type { SEOProps } from '../types';

export default function SEO({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  twitterCard,
  twitterTitle,
  twitterDescription,
  twitterImage,
  canonicalUrl,
  structuredData,
  url,
}: SEOProps) {
  const defaultTitle = SEO_DEFAULTS.title;
  const defaultDescription = SEO_DEFAULTS.description;
  const defaultKeywords = SEO_DEFAULTS.keywords;
  const defaultOgImage = SEO_DEFAULTS.ogImage;
  const defaultUrl = SEO_DEFAULTS.url;

  return (
    <Helmet>
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <link rel="canonical" href={canonicalUrl || url || defaultUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl || url || defaultUrl} />
      <meta property="og:title" content={ogTitle || title || defaultTitle} />
      <meta property="og:description" content={ogDescription || description || defaultDescription} />
      <meta property="og:image" content={ogImage || defaultOgImage} />
      <meta property="og:site_name" content="AgendaPro" />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard || "summary_large_image"} />
      <meta name="twitter:url" content={url || defaultUrl} />
      <meta name="twitter:title" content={twitterTitle || title || defaultTitle} />
      <meta name="twitter:description" content={twitterDescription || description || defaultDescription} />
      <meta name="twitter:image" content={twitterImage || defaultOgImage} />
      <meta name="twitter:site" content={SEO_DEFAULTS.twitterSite} />
      <meta name="twitter:creator" content={SEO_DEFAULTS.twitterCreator} />

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}