import SEO from '../components/SEO';
import { DEMO_PAGES_CONFIG } from '../constants';

const page = DEMO_PAGES_CONFIG.newsletter;

const NewsletterDemoPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO title={page.title} description={page.description} keywords={page.keywords} url={page.url} />
      <section className="max-w-5xl mx-auto px-6 py-16 space-y-6">
        <h1 className="text-4xl font-bold text-slate-900">{page.title}</h1>
        <p className="text-lg text-slate-600">{page.description}</p>
      </section>
    </div>
  );
};

export default NewsletterDemoPage;
