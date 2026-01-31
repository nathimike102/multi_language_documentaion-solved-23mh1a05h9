import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

export default function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState('');
  const { t } = useTranslation('common');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0.5,
      }
    );

    const headingElements = headings.map((heading) =>
      document.getElementById(heading.slug)
    ).filter(Boolean);

    headingElements.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      headingElements.forEach((element) => {
        if (element) observer.unobserve(element);
      });
    };
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <div data-testid="table-of-contents" className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        {t('common.table_of_contents')}
      </h3>
      <nav>
        <ul className="space-y-2 border-l-2 border-slate-200 dark:border-slate-700">
          {headings.map((heading) => (
            <li
              key={heading.slug}
              style={{
                paddingLeft: `${(heading.level - 1) * 0.75}rem`,
              }}
            >
              <a
                href={`#${heading.slug}`}
                data-testid={`toc-link-${heading.slug}`}
                data-active={activeId === heading.slug ? 'true' : 'false'}
                className={`block text-sm py-1.5 pl-4 transition-all border-l-2 -ml-0.5 ${
                  activeId === heading.slug
                    ? 'text-blue-600 dark:text-blue-400 font-semibold border-blue-600 dark:border-blue-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border-transparent'
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
