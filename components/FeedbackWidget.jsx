import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import toast, { Toaster } from 'react-hot-toast';

export default function FeedbackWidget() {
  const [feedback, setFeedback] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const { t } = useTranslation('common');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (feedback.trim()) {
      // Client-side confirmation (no backend required)
      setShowSuccess(true);
      setFeedback('');
      toast.success(t('feedback.thank_you'));
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-8 bg-white dark:bg-slate-900 shadow-sm">
      <Toaster position="bottom-right" />
      
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0\">
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z\" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
            {t('feedback.title')}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t('feedback.message')}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            data-testid="feedback-input"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder={t('common.feedback_placeholder')}
            rows={4}
            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all placeholder-slate-400"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            data-testid="feedback-submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all text-sm font-semibold shadow-sm hover:shadow-md"
          >
            {t('common.submit')}
          </button>
          <button
            type="button"
            onClick={() => setFeedback('')}
            className="px-6 py-2.5 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl transition-all text-sm font-semibold"
          >
            {t('common.cancel')}
          </button>
        </div>
      </form>

      {showSuccess && (
        <div
          data-testid="feedback-success-message"
          className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3"
        >
          <svg className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-green-800 dark:text-green-200 font-medium">
            {t('feedback.thank_you')}
          </p>
        </div>
      )}
    </div>
  );
}
