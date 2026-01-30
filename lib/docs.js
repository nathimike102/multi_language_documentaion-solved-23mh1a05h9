import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const docsDirectory = path.join(process.cwd(), '_docs');

export function getDocBySlug(locale, version, slug) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(docsDirectory, locale, version, `${realSlug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    frontMatter: data,
    content,
  };
}

export function getAllDocs(locale, version) {
  const docsPath = path.join(docsDirectory, locale, version);
  
  if (!fs.existsSync(docsPath)) {
    return [];
  }

  const files = fs.readdirSync(docsPath);
  
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      return getDocBySlug(locale, version, slug);
    })
    .filter(Boolean);
}

export function getAllVersionsAndLocales() {
  const locales = ['en', 'es', 'fr', 'de'];
  const versions = ['v1', 'v2', 'v3'];
  
  const paths = [];
  
  locales.forEach((locale) => {
    versions.forEach((version) => {
      const docsPath = path.join(docsDirectory, locale, version);
      
      if (fs.existsSync(docsPath)) {
        const files = fs.readdirSync(docsPath);
        files.forEach((file) => {
          if (file.endsWith('.md')) {
            paths.push({
              locale,
              version,
              slug: file.replace(/\.md$/, ''),
            });
          }
        });
      }
    });
  });
  
  return paths;
}

export function extractHeadings(content) {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    headings.push({
      level,
      text,
      slug,
    });
  }

  return headings;
}
