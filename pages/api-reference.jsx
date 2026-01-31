import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import DocsLayout from '@/components/DocsLayout';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { 
  ssr: false,
  loading: () => <div className="p-8 text-center text-slate-600 dark:text-slate-400">Loading API documentation...</div>
});

export default function ApiReferencePage() {
  const { t } = useTranslation('common');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <DocsLayout headings={[]} currentVersion="v2" currentSlug="api-reference">
      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              {t('common.api_reference')}
            </h1>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
            Complete API documentation
          </p>
          <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Base URL</h3>
              <code className="text-sm bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">https://api.example.com</code>
            </div>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg">
          <SwaggerUI url="/openapi.json" />
        </div>
      </div>

      <style jsx global>{`
        /* Base Swagger UI styles */
        .swagger-ui {
          background-color: transparent !important;
          padding: 1.5rem;
        }

        .swagger-ui .topbar {
          display: none;
        }

        /* Information section */
        .swagger-ui .information-container {
          margin-bottom: 2rem;
        }

        .swagger-ui .info {
          margin: 0;
        }

        .swagger-ui .info .title {
          color: #0f172a;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .dark .swagger-ui .info .title {
          color: #f8fafc;
        }

        .swagger-ui .info .description,
        .swagger-ui .info p {
          color: #475569;
        }

        .dark .swagger-ui .info .description,
        .dark .swagger-ui .info p {
          color: #cbd5e1;
        }

        /* Scheme container */
        .swagger-ui .scheme-container {
          background: #f8fafc;
          padding: 1.5rem;
          margin: 1rem 0;
          border-radius: 0.75rem;
          border: 1px solid #e2e8f0;
          box-shadow: none;
        }

        .dark .swagger-ui .scheme-container {
          background: #1e293b;
          border-color: #334155;
        }

        /* API blocks */
        .swagger-ui .opblock {
          border-radius: 0.75rem;
          border: 1px solid #e2e8f0;
          margin-bottom: 1rem;
          overflow: hidden;
          box-shadow: none;
        }

        .dark .swagger-ui .opblock {
          border-color: #334155;
          background: #1e293b;
        }

        .swagger-ui .opblock .opblock-summary {
          border: none;
        }

        .swagger-ui .opblock-tag {
          border-bottom: 1px solid #e2e8f0;
          color: #0f172a;
          font-weight: 700;
        }

        .dark .swagger-ui .opblock-tag {
          border-bottom-color: #334155;
          color: #f8fafc;
        }

        .swagger-ui .opblock-summary-description {
          color: #475569;
        }

        .dark .swagger-ui .opblock-summary-description {
          color: #cbd5e1;
        }

        /* Method badges */
        .swagger-ui .opblock-summary-method {
          border-radius: 0.5rem;
          font-weight: 600;
          padding: 0.375rem 0.75rem;
          min-width: 70px;
          text-align: center;
        }

        /* Request/Response sections */
        .swagger-ui .opblock-section-header {
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }

        .dark .swagger-ui .opblock-section-header {
          background: #334155;
          border-bottom-color: #475569;
        }

        .swagger-ui .opblock-section-header h4 {
          color: #0f172a;
        }

        .dark .swagger-ui .opblock-section-header h4 {
          color: #f8fafc;
        }

        .swagger-ui .opblock-body {
          background: #ffffff;
        }

        .dark .swagger-ui .opblock-body {
          background: #0f172a;
        }

        /* Parameters table */
        .swagger-ui .parameters-col_description {
          color: #475569;
        }

        .dark .swagger-ui .parameters-col_description {
          color: #cbd5e1;
        }

        .swagger-ui table thead tr th {
          color: #0f172a;
          border-bottom: 1px solid #e2e8f0;
        }

        .dark .swagger-ui table thead tr th {
          color: #f8fafc;
          border-bottom-color: #334155;
        }

        .swagger-ui table tbody tr td {
          color: #475569;
          border-bottom: 1px solid #e2e8f0;
        }

        .dark .swagger-ui table tbody tr td {
          color: #cbd5e1;
          border-bottom-color: #334155;
        }

        /* Form inputs */
        .swagger-ui input[type="text"],
        .swagger-ui input[type="password"],
        .swagger-ui textarea,
        .swagger-ui select {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
          color: #0f172a;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          transition: all 0.2s;
        }

        .dark .swagger-ui input[type="text"],
        .dark .swagger-ui input[type="password"],
        .dark .swagger-ui textarea,
        .dark .swagger-ui select {
          background: #1e293b;
          border-color: #334155;
          color: #f8fafc;
        }

        .swagger-ui input[type="text"]:focus,
        .swagger-ui input[type="password"]:focus,
        .swagger-ui textarea:focus,
        .swagger-ui select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        /* Buttons */
        .swagger-ui .btn {
          border-radius: 0.75rem;
          padding: 0.625rem 1.25rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: none;
        }

        .swagger-ui .btn-primary {
          background: #3b82f6;
          border: 2px solid #3b82f6;
          color: #fff;
        }

        .swagger-ui .btn-primary:hover {
          background: #2563eb;
          border-color: #2563eb;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        /* Response section */
        .swagger-ui .responses-inner h4,
        .swagger-ui .responses-inner h5 {
          color: #0f172a;
        }

        .dark .swagger-ui .responses-inner h4,
        .dark .swagger-ui .responses-inner h5 {
          color: #f8fafc;
        }

        .swagger-ui .response-col_status {
          color: #0f172a;
          font-weight: 600;
        }

        .dark .swagger-ui .response-col_status {
          color: #f8fafc;
        }

        /* Code blocks */
        .swagger-ui .highlight-code,
        .swagger-ui pre {
          background: #1e293b !important;
          border: 1px solid #334155;
          border-radius: 0.5rem;
        }

        .swagger-ui .highlight-code code,
        .swagger-ui pre code {
          color: #e2e8f0 !important;
        }

        /* Model box */
        .swagger-ui .model-box {
          background: #f8fafc;
          border-radius: 0.75rem;
          border: 1px solid #e2e8f0;
        }

        .dark .swagger-ui .model-box {
          background: #1e293b;
          border-color: #334155;
        }

        .swagger-ui .model-title {
          color: #0f172a;
        }

        .dark .swagger-ui .model-title {
          color: #f8fafc;
        }

        .swagger-ui .property-row {
          border-bottom: 1px solid #e2e8f0;
        }

        .dark .swagger-ui .property-row {
          border-bottom-color: #334155;
        }

        /* Links */
        .swagger-ui a {
          color: #3b82f6;
        }

        .swagger-ui a:hover {
          color: #2563eb;
        }

        /* Markdown content */
        .swagger-ui .markdown p,
        .swagger-ui .markdown code {
          color: #475569;
        }

        .dark .swagger-ui .markdown p,
        .dark .swagger-ui .markdown code {
          color: #cbd5e1;
        }
      `}</style>
    </DocsLayout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
