import { useState, useEffect } from "react";
import { Link } from "react-router";
import { documents, documentCategories } from "data/documents";

export function RelatedDocuments({ currentDocumentId, count = 3 }) {
  const [randomDocuments, setRandomDocuments] = useState([]);
  
  // Rastgele belge seçme fonksiyonu
  const getRandomDocuments = () => {
    // Mevcut belge dışındaki belgeleri filtrele
    const availableDocs = documents.filter(doc => doc.id !== currentDocumentId);
    // Karıştır
    const shuffled = [...availableDocs].sort(() => 0.5 - Math.random());
    // Belirtilen sayıda belgeyi al
    setRandomDocuments(shuffled.slice(0, count));
  };
  
  // Component mount olduğunda rastgele belgeler seç
  useEffect(() => {
    getRandomDocuments();
  }, [currentDocumentId, count]);

  // Belge görseli alım fonksiyonu (kategori bazlı seçim kaldırıldı)
  const getDocumentImage = (doc) => {
    // Eğer belgenin özel bir resmi varsa kullan
    if (doc.image) {
      return doc.image;
    }
    
    // Belgenin resmi yoksa varsayılan göster
    return "/images/documents/default-doc.jpg";
  };
  
  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm transition-shadow hover:shadow-md mt-6">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Benzer Belgeler
          </h3>
          <button
            onClick={getRandomDocuments}
            className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium flex items-center"
            aria-label="Benzer belgeleri yenile"
          >
            Yenile
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        
        {randomDocuments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {randomDocuments.map((doc) => (
              <Link 
                key={doc.id} 
                to={`/documents/details/${doc.id}`}
                className="block group"
              >
                <div className="border border-gray-200 dark:border-dark-600 rounded-lg overflow-hidden flex flex-col h-full group-hover:border-primary-500 dark:group-hover:border-primary-500 transition-colors">
                  {/* Belge Görseli */}
                  <div className="relative w-full h-36 bg-gray-100 dark:bg-dark-700 overflow-hidden">
                    <img 
                      src={getDocumentImage(doc)} 
                      alt={doc.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/documents/default-doc.jpg";
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-12"></div>
                    <span className="absolute bottom-2 left-2 bg-gray-100 dark:bg-dark-700 rounded-full px-2.5 py-1 text-xs text-gray-600 dark:text-gray-400">
                      {documentCategories.find(c => c.id === doc.categoryId)?.name || "Genel"}
                    </span>
                  </div>
                  
                  {/* Belge Detayları */}
                  <div className="p-4 flex flex-col flex-grow">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-2 line-clamp-2 h-12">
                      {doc.title}
                    </h4>
                    
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                      {doc.description?.slice(0, 100) || "Bu belge için açıklama bulunmamaktadır."}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {doc.pageCount || "?"} Sayfa
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {doc.price.toLocaleString('tr-TR')} ₺
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Benzer belge bulunamadı.</p>
            <button className="mt-3 text-primary-600 dark:text-primary-400" onClick={getRandomDocuments}>
              Tekrar deneyin
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RelatedDocuments;