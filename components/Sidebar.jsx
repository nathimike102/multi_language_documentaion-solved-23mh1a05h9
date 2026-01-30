import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import VersionSelector from './VersionSelector';

const navItems = {
  v1: [
    { slug: 'introduction', title: 'Introduction' },
    { slug: 'installation', title: 'Installation' },
    { slug: 'configuration', title: 'Configuration' },
  ],
  v2: [
    { slug: 'introduction', title: 'Introduction' },
    { slug: 'api-reference', title: 'API Reference' },
  ],
  v3: [
    { slug: 'introduction', title: 'Introduction' },
    { slug: 'advanced-features', title: 'Advanced Features' },
  ],
};

export default function Sidebar({ isOpen, currentVersion = 'v1', currentSlug }) {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { locale } = router;

  const items = navItems[currentVersion] || navItems.v1;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => {}}
        />
      )}

      {/* Sidebar */}
      <aside
        data-testid="sidebar"
        className={`fixed left-0 top-16 bottom-0 w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-40 transition-transform duration-300 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <nav className="p-4 space-y-6">
          {/* Version Selector */}
          <VersionSelector currentVersion={currentVersion} />

          {/* Navigation Links */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
              {t('common.documentation')}
            </h3>
            <ul className="space-y-1">
              {items.map((item) => {
                const isActive = currentSlug === item.slug;
                return (
                  <li key={item.slug}>
                    <Link
                      href={`/docs/${currentVersion}/${item.slug}`}
                      locale={locale}
                      data-testid={`sidebar-nav-link-${item.slug}`}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* API Reference Link */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
              {t('common.api_reference')}
            </h3>
            <Link
              href="/api-reference"
              locale={locale}
              className="block px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              API Reference
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
