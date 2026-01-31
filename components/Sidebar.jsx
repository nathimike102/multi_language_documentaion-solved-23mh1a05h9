import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import VersionSelector from './VersionSelector';

const navItems = {
  v1: [
    { slug: 'introduction', titleKey: 'common.introduction' },
    { slug: 'installation', titleKey: 'common.installation' },
    { slug: 'configuration', titleKey: 'common.configuration' },
  ],
  v2: [
    { slug: 'introduction', titleKey: 'common.introduction' },
    { slug: 'api-reference', titleKey: 'common.api_reference' },
  ],
  v3: [
    { slug: 'introduction', titleKey: 'common.introduction' },
    { slug: 'advanced-features', titleKey: 'common.advanced_features' },
  ],
};

export default function Sidebar({ isOpen, currentVersion = 'v1', currentSlug }) {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { locale } = router;

  // For API reference, use v3 navigation items; for doc versions, use the specific version
  const displayVersion = currentVersion === 'api' ? 'v3' : currentVersion;
  const items = navItems[displayVersion] || navItems.v1;

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
        className={`fixed left-0 top-16 bottom-0 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 z-40 transition-transform duration-300 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <nav className="p-6 space-y-6">
          {/* Version Selector - Only show for documentation versions, not for API Reference */}
          {currentVersion !== 'api' && <VersionSelector currentVersion={currentVersion} />}

          {/* Navigation Links */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                {currentVersion === 'api' ? t('common.documentation') : t('common.getting_started')}
              </h3>
            </div>
            <ul className="space-y-1">
              {items.map((item) => {
                const isActive = currentSlug === item.slug;
                // For API reference, link to v3 docs; for doc versions, link within version
                const href = currentVersion === 'api' 
                  ? `/docs/v3/${item.slug}` 
                  : `/docs/${currentVersion}/${item.slug}`;
                return (
                  <li key={item.slug}>
                    <Link
                      href={href}
                      locale={locale}
                      data-testid={`sidebar-nav-link-${item.slug}`}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold shadow-sm'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <svg className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {t(item.titleKey)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* API Reference Link */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                API
              </h3>
            </div>
            <Link
              href="/api-reference"
              locale={locale}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              {t('common.api_reference')}
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
