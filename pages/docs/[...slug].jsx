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

export default function DocPage({ doc, headings, version, slug }) {
  const { t } = useTranslation('common');

  if (!doc) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-gray-600 dark:text-gray-400">Page not found</p>
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

      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <FeedbackWidget />
      </div>

      <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
        <a
          href={`https://github.com/example/repo/blob/main/_docs/${version}/${slug}.md`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {t('common.edit_page')} →
        </a>
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
