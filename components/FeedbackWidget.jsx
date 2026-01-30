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
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
      <Toaster position="bottom-right" />
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {t('feedback.title')}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {t('feedback.message')}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            data-testid="feedback-input"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder={t('common.feedback_placeholder')}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            data-testid="feedback-submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            {t('common.submit')}
          </button>
          <button
            type="button"
            onClick={() => setFeedback('')}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg transition-colors text-sm font-medium"
          >
            {t('common.cancel')}
          </button>
        </div>
      </form>

      {showSuccess && (
        <div
          data-testid="feedback-success-message"
          className="mt-4 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg"
        >
          <p className="text-sm text-green-800 dark:text-green-200">
            {t('feedback.thank_you')}
          </p>
        </div>
      )}
    </div>
  );
}
