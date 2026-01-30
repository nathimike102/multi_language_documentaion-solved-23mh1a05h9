import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function ApiReferencePage() {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('common.api_reference')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Interactive API documentation powered by Swagger UI
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <SwaggerUI url="/openapi.json" />
          </div>
        </div>
      </div>

      <style jsx global>{`
        .swagger-ui {
          filter: ${typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? 'invert(0.9) hue-rotate(180deg)' : 'none'};
        }
        .swagger-ui .topbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
