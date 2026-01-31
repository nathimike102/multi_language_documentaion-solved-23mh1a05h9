import { getAllVersionsAndLocales, getDocBySlug, extractHeadings } from '@/lib/docs';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DocsLayout from '@/components/DocsLayout';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import CodeBlock from '@/components/CodeBlock';
import FeedbackWidget from '@/components/FeedbackWidget';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

export default function DocPage({ doc, headings, version, slug }) {
  const { t } = useTranslation('common');

  if (!doc) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <div className="text-8xl font-bold text-slate-200 dark:text-slate-800 mb-4">404</div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Page not found</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">The page you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium">
            Go Home
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <DocsLayout headings={headings} currentVersion={version} currentSlug={slug}>
      <div data-testid="doc-content" className="markdown-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeRaw]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <CodeBlock language={match[1]} code={String(children).replace(/\n$/, '')} />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            h1: ({ children, ...props }) => {
              const id = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
              return <h1 id={id} {...props}>{children}</h1>;
            },
            h2: ({ children, ...props }) => {
              const id = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
              return <h2 id={id} {...props}>{children}</h2>;
            },
            h3: ({ children, ...props }) => {
              const id = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
              return <h3 id={id} {...props}>{children}</h3>;
            },
          }}
        >
          {doc.content}
        </ReactMarkdown>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
        <FeedbackWidget />
      </div>

      <div className="mt-8 flex items-center justify-between text-sm">
        <a
          href={`https://github.com/example/repo/blob/main/_docs/${version}/${slug}.md`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z\" />
          </svg>
          {t('common.edit_page')}
        </a>
        <span className="text-slate-500 dark:text-slate-500">
          Last updated: {new Date().toLocaleDateString()}
        </span>
      </div>
    </DocsLayout>
  );
}

export async function getStaticPaths() {
  const allPaths = getAllVersionsAndLocales();

  const paths = allPaths.map(({ locale, version, slug }) => ({
    params: {
      slug: [version, slug],
    },
    locale,
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params, locale }) {
  const [version, ...slugParts] = params.slug;
  const slug = slugParts.join('/');

  const doc = getDocBySlug(locale, version, slug);

  if (!doc) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  const headings = extractHeadings(doc.content);

  return {
    props: {
      doc,
      headings,
      version,
      slug,
      ...(await serverSideTranslations(locale, ['common'])),
    },
    revalidate: 60, // ISR: Revalidate every 60 seconds
  };
}
