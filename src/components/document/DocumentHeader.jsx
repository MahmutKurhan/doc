import { useState } from 'react';

export function DocumentHeader({ title, id }) {
  // Referans kodu oluşturma - Daha anlamlı ve profesyonel
  const referenceCode = id ? `HUK-${String(id).padStart(5, '0')}` : 'HUK-00000';
  
  // Kopyalama durumunu izlemek için state
  const [copied, setCopied] = useState(false);
  
  // Kopyalama fonksiyonu
  const handleCopy = () => {
    navigator.clipboard.writeText(referenceCode);
    setCopied(true);
    
    // 2 saniye sonra bildirimi kaldır
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="p-6 border-b border-gray-200 dark:border-dark-700">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h1>
        <div className="inline-flex items-center px-3 py-1.5 bg-gray-50 dark:bg-dark-800 text-gray-700 dark:text-gray-300 rounded-md text-sm border border-gray-200 dark:border-dark-700 shadow-sm">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="font-medium text-gray-600 dark:text-gray-400">Referans:</span>
          <div className="relative ml-2">
            <span 
              className="font-mono bg-white dark:bg-dark-700 px-2 py-0.5 rounded border border-gray-200 dark:border-dark-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-600 transition-colors flex items-center" 
              title="Kopyalamak için tıklayın" 
              onClick={handleCopy}
            >
              {referenceCode}
              {copied && (
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded shadow-lg">
                  Kopyalandı!
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}