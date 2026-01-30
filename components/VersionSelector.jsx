import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const versions = ['v1', 'v2', 'v3'];

export default function VersionSelector({ currentVersion = 'v1' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const { t } = useTranslation('common');

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleVersionChange = (version) => {
    const { locale } = router;
    const slug = router.query.slug ? router.query.slug[router.query.slug.length - 1] : 'introduction';
    router.push(`/docs/${version}/${slug}`, undefined, { locale });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        aria-label={t('common.version')}
        data-testid="version-selector"
      >
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {currentVersion.toUpperCase()}
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50">
          <ul className="py-2">
            {versions.map((version) => (
              <li key={version}>
                <button
                  onClick={() => handleVersionChange(version)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                    version === currentVersion
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                      : 'text-gray-700 dark:text-gray-200'
                  }`}
                  data-testid={`version-option-${version}`}
                >
                  {version.toUpperCase()}
                  {version === 'v3' && (
                    <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                      Latest
                    </span>
                  )}
                  {version === 'v1' && (
                    <span className="ml-2 text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">
                      Legacy
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
