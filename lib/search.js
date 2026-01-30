import { useMemo } from 'react';
import FlexSearch from 'flexsearch';
import { useRouter } from 'next/router';

const searchIndex = new FlexSearch.Document({
  tokenize: 'forward',
  cache: 100,
  document: {
    id: 'id',
    index: ['title', 'content'],
    store: ['title', 'url', 'excerpt'],
  },
});

// Sample search data - In a real app, this would be generated at build time
const searchData = [
  {
    id: '1',
    title: 'Introduction - v1',
    content: 'Welcome to the Documentation Portal documentation ISR i18n',
    excerpt: 'Welcome to the Documentation Portal! This comprehensive guide will help you get started.',
    url: '/docs/v1/introduction',
  },
  {
    id: '2',
    title: 'Installation - v1',
    content: 'How to install and set up the platform Node.js npm yarn Docker',
    excerpt: 'This guide will walk you through the installation process.',
    url: '/docs/v1/installation',
  },
  {
    id: '3',
    title: 'Configuration - v1',
    content: 'How to configure your application environment variables API',
    excerpt: 'Learn how to configure your application for optimal performance.',
    url: '/docs/v1/configuration',
  },
  {
    id: '4',
    title: 'Introduction - v2',
    content: 'Version 2 improvements features performance mobile',
    excerpt: 'Welcome to version 2 of the Documentation Portal!',
    url: '/docs/v2/introduction',
  },
  {
    id: '5',
    title: 'API Reference - v2',
    content: 'Complete API reference endpoints authentication users',
    excerpt: 'Complete reference for all API endpoints available in version 2.',
    url: '/docs/v2/api-reference',
  },
  {
    id: '6',
    title: 'Introduction - v3',
    content: 'Version 3 latest AI GraphQL webhooks TypeScript',
    excerpt: 'Welcome to version 3 - the latest and most advanced version!',
    url: '/docs/v3/introduction',
  },
  {
    id: '7',
    title: 'Advanced Features - v3',
    content: 'GraphQL webhooks caching jobs streaming security encryption',
    excerpt: 'Discover the powerful advanced features available in version 3.',
    url: '/docs/v3/advanced-features',
  },
];

// Initialize search index with data
searchData.forEach((doc) => {
  searchIndex.add(doc);
});

export function useSearch() {
  const router = useRouter();
  const { locale } = router;

  const search = useMemo(() => {
    return (query) => {
      if (!query || query.length < 2) {
        return [];
      }

      try {
        const results = searchIndex.search(query, {
          limit: 10,
          enrich: true,
        });

        // Flatten and deduplicate results
        const allResults = [];
        const seenIds = new Set();

        results.forEach((fieldResults) => {
          fieldResults.result.forEach((item) => {
            if (!seenIds.has(item.id)) {
              seenIds.add(item.id);
              // Add locale to URL
              const url = `/${locale}${item.doc.url}`;
              allResults.push({
                ...item.doc,
                url,
              });
            }
          });
        });

        return allResults;
      } catch (error) {
        console.error('Search error:', error);
        return [];
      }
    };
  }, [locale]);

  return { search };
}
