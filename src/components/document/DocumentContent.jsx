import { Fragment } from "react";
import { IoDocumentText } from "react-icons/io5";
import { ShieldCheckIcon, LockOpenIcon, ClockIcon, DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import PropTypes from 'prop-types';

export function DocumentContent({ document }) {
  // Etiketler için tıklama işleyicisi
  const handleTagClick = (tag) => {
    console.log(`Etiket tıklandı: ${tag}`);
    // Burada etiketle ilgili işlemleri yapabilirsiniz
  };

  return (
    <div className="p-6 sm:p-8 space-y-8">
      {/* Belge İçeriği - İyileştirilmiş */}
      <div className="prose dark:prose-invert max-w-none border-b pb-6 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
          <DocumentArrowDownIcon className="h-6 w-6 mr-2 text-primary-500" />
          Belge Açıklaması
        </h2>
        <div className="bg-gray-50 dark:bg-dark-800 p-4 rounded-md">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {document.description || "Bu belge için açıklama bulunmamaktadır."}
          </p>
        </div>
        
        {document.content && (
          <Fragment>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">
              Örnek İçerik ve Kapsamı
            </h3>
            <div className="bg-white dark:bg-dark-700 p-4 rounded-md border-l-4 border-primary-500">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {document.content}
              </p>
            </div>
          </Fragment>
        )}
      </div>

      {/* Özellikler/Faydalar - Değiştirilmedi */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Belge Özellikleri
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <DocumentArrowDownIcon className="h-5 w-5 text-primary-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Hazır kullanım
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Satın aldıktan sonra hemen kullanabilirsiniz.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <ShieldCheckIcon className="h-5 w-5 text-primary-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Yasal güvence
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Avukatlar tarafından onaylanmıştır.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <LockOpenIcon className="h-5 w-5 text-primary-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Düzenlenebilir format
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                İhtiyacınıza göre özelleştirebilirsiniz.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <ClockIcon className="h-5 w-5 text-primary-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Zaman tasarrufu
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Belge oluşturma sürecinizi hızlandırın.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Etiketler - Zarif Yatay Tasarım */}
      <div className="bg-white dark:bg-dark-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center flex-wrap gap-2">
          <div className="flex items-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
              <line x1="7" y1="7" x2="7.01" y2="7"></line>
            </svg>
            <h2 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">Etiketler</h2>
          </div>
          
          {/* Ayraç */}
          <div className="h-5 w-px bg-gray-300 dark:bg-gray-600 mr-3"></div>
          
          {/* Etiketler */}
          {document.tags?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {document.tags.map((tag, index) => {
                // Daha zarif renk paletleri
                const colorVariants = [
                    'bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30 border-blue-200 dark:border-blue-800/50',
                    'bg-purple-50 text-purple-600 hover:bg-purple-100 dark:bg-purple-900/20 dark:text-purple-300 dark:hover:bg-purple-900/30 border-purple-200 dark:border-purple-800/50',
                    'bg-pink-50 text-pink-600 hover:bg-pink-100 dark:bg-pink-900/20 dark:text-pink-300 dark:hover:bg-pink-900/30 border-pink-200 dark:border-pink-800/50',
                    'bg-amber-50 text-amber-600 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-300 dark:hover:bg-amber-900/30 border-amber-200 dark:border-amber-800/50',
                    'bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-300 dark:hover:bg-green-900/30 border-green-200 dark:border-green-800/50',
                    'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-300 dark:hover:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800/50',
                  ];
                
                const colorClass = colorVariants[index % colorVariants.length];
                
                return (
                  <span
                    key={tag}
                    role="button"
                    onClick={() => handleTagClick(tag)}
                    aria-label={`Etiket: ${tag}`}
                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-sm ${colorClass} transition-colors duration-200 cursor-pointer`}
                  >
                    <span className="text-xs mr-1 opacity-70">#</span>
                    {tag}
                  </span>
                );
              })}
            </div>
          ) : (
            <span className="text-sm italic text-gray-500 dark:text-gray-400">
              Bu belge için henüz etiket eklenmemiş
            </span>
          )}
        </div>
      </div>

      {/* Onay Durumu - İyileştirilmiş */}
      {document.status?.isApproved && (
        <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg border border-green-200 dark:border-green-800 shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 dark:bg-green-800/30 p-2 rounded-full">
              <IoDocumentText className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-base font-medium text-green-800 dark:text-green-200">
                Onaylanmış Belge
              </h3>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span className="text-sm text-green-700 dark:text-green-400">
                  {document.status.reviewedBy} tarafından onaylandı
                </span>
                <span className="bg-green-100 dark:bg-green-800/50 px-2 py-0.5 rounded text-xs font-medium text-green-800 dark:text-green-300">
                  {document.status.approvedDate}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

DocumentContent.propTypes = {
  document: PropTypes.shape({
    description: PropTypes.string.isRequired,
    content: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    status: PropTypes.shape({
      isApproved: PropTypes.bool,
      reviewedBy: PropTypes.string,
      approvedDate: PropTypes.string
    })
  }).isRequired
};