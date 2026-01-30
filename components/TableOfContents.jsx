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
    <div data-testid="table-of-contents" className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
        {t('common.table_of_contents')}
      </h3>
      <nav>
        <ul className="space-y-2">
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
                className={`block text-sm py-1 transition-colors ${
                  activeId === heading.slug
                    ? 'text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
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
