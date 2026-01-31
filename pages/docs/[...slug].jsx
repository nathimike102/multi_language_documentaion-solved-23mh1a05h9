import { getAllVersionsAndLocales, getDocBySlug, extractHeadings, getAllDocs } from '@/lib/docs';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DocsLayout from '@/components/DocsLayout';
import ReactMarkdown from 'react-markdown';
import React from 'react';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import CodeBlock from '@/components/CodeBlock';
import FeedbackWidget from '@/components/FeedbackWidget';
import { useRouter } from 'next/router';
import Link from 'next/link';

function extractTextFromNode(node) {
  if (!node) return '';
  if (node.type === 'text' && typeof node.value === 'string') {
    return node.value;
  }
  if (Array.isArray(node.children)) {
    return node.children.map(extractTextFromNode).join('');
  }
  return '';
}

function extractText(children, node) {
  if (typeof children === 'string') return children;

  if (Array.isArray(children)) {
    return children.map((child) => extractText(child)).join('');
  }

  if (React.isValidElement(children)) {
    return extractText(children.props?.children ?? '');
  }

  if (children && typeof children === 'object' && 'props' in children) {
    return extractText(children.props?.children ?? '');
  }

  return extractTextFromNode(node);
}

export default function DocPage({ doc, headings, version, slug, availableSlugs }) {
  const router = useRouter();
  
  // Extract version from URL as fallback in case props are not set correctly
  const urlVersion = router.query.slug?.[0] || version;
  const urlSlug = router.query.slug?.slice(1).join('/') || slug;
  
  // Use URL-extracted values if they're valid versions, otherwise use props
  const finalVersion = ['v1', 'v2', 'v3'].includes(urlVersion) ? urlVersion : version;
  const finalSlug = finalVersion === urlVersion ? urlSlug : slug;

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
    <DocsLayout
      headings={headings}
      currentVersion={finalVersion}
      currentSlug={finalSlug}
      availableSlugs={availableSlugs}
    >
      <div data-testid="doc-content" className="markdown-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeRaw]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              const codeText = extractText(children, node).replace(/\n$/, '');
              return !inline && match ? (
                <CodeBlock language={match[1]} code={codeText} />
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
  const availableSlugs = getAllDocs(locale, version).map((item) => item.slug);

  return {
    props: {
      doc,
      headings,
      version,
      slug,
      availableSlugs,
      ...(await serverSideTranslations(locale, ['common'])),
    },
    revalidate: 60, // ISR: Revalidate every 60 seconds
  };
}
