import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Home() {
  const { t } = useTranslation('common');
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {t('common.documentation')} Portal
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Multi-language documentation with ISR and i18n
          </p>
          
          <div className="flex gap-4 justify-center mb-12">
            <Link
              href="/docs/v1/introduction"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('common.getting_started')}
            </Link>
            <Link
              href="/api-reference"
              className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-white"
            >
              {t('common.api_reference')}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Fast Performance
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Static generation with incremental regeneration for optimal speed
              </p>
            </div>
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Multi-language
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Full support for English, Spanish, French, and German
              </p>
            </div>
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Version Control
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Switch between v1, v2, and v3 documentation seamlessly
              </p>
            </div>
          </div>
        </div>
      </div>
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
