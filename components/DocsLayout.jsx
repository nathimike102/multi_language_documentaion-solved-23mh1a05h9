import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import TableOfContents from './TableOfContents';

export default function DocsLayout({ children, headings = [], currentVersion, currentSlug }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex pt-16">
        <Sidebar 
          isOpen={sidebarOpen} 
          currentVersion={currentVersion}
          currentSlug={currentSlug}
        />
        
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-72' : 'md:ml-0'}`}>
          <div className="max-w-5xl mx-auto px-6 py-12">
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
