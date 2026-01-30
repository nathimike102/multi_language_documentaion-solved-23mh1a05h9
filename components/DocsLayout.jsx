import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import TableOfContents from './TableOfContents';

export default function DocsLayout({ children, headings = [], currentVersion, currentSlug }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex pt-16">
        <Sidebar 
          isOpen={sidebarOpen} 
          currentVersion={currentVersion}
          currentSlug={currentSlug}
        />
        
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-0'}`}>
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="lg:flex lg:gap-8">
              <article className="flex-1 min-w-0">
                {children}
              </article>
              
              {headings.length > 0 && (
                <aside className="hidden lg:block w-64 flex-shrink-0">
                  <div className="sticky top-24">
                    <TableOfContents headings={headings} />
                  </div>
                </aside>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
