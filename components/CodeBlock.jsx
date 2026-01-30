import { useState } from 'react';
import { useTranslation } from 'next-i18next';

export default function CodeBlock({ language, code }) {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation('common');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative group" data-testid="code-block">
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleCopy}
          data-testid="copy-code-button"
          className="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
          aria-label={t('common.copy_code')}
        >
          {copied ? t('common.copied') : t('common.copy_code')}
        </button>
      </div>
      <pre className="rounded-lg overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
