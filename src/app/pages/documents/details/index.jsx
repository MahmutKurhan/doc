// Import Dependencies
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeftIcon, BookmarkIcon, ShareIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";

// Local Imports
import { PublicHeader } from "components/modules/Header";
import { MainFooter } from "components/modules/Footer";
import { documents, documentCategories } from "data/documents";
import { PricingCard } from "components/document/PricingCard";
import { LawyerCard } from "components/document/LawyerCard";
import { DocumentStats } from "components/document/DocumentStats";
import { DocumentHeader } from "components/document/DocumentHeader";
import { DocumentContent } from "components/document/DocumentContent";
import { Page } from "components/shared/Page";
import { Spinner } from "components/ui";
import { DocumentPreview } from "components/document/DocumentPreview";
import { RelatedDocuments } from "components/document/RelatedDocuments"; // YENİ EKLENEN

// ----------------------------------------------------------------------

export function DocumentDetail() {
  const { id } = useParams();
  const [currentDocument, setCurrentDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  useEffect(() => {
    // Yükleme durumunu simüle et
    setLoading(true);
    
    setTimeout(() => {
      const doc = documents.find(d => d.id === id);
      setCurrentDocument(doc);
      setLoading(false);
      
      if (doc) {
        document.title = `${doc.title} | Legal Platform`;
      } else {
        document.title = "Belge Bulunamadı | Legal Platform";
      }
    }, 500);
  }, [id]);
  
  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    // Gerçek projede burada favori ekleme/çıkarma API çağrısı yapılacak
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentDocument?.title,
        text: currentDocument?.description,
        url: window.location.href
      }).catch(err => console.log('Paylaşım hatası:', err));
    } else {
      // Tarayıcı paylaşım API'sini desteklemiyorsa, kopyalama işlemi yapalım
      navigator.clipboard.writeText(window.location.href);
      alert('Bağlantı panoya kopyalandı!');
    }
  };

  const categoryName = currentDocument?.categoryId ? 
    documentCategories.find(c => c.id === currentDocument.categoryId)?.name : '';

  if (loading) {
    return (
      <Page title="Belge Yükleniyor">
        <PublicHeader cartItemCount={0} />
        <main className="flex-grow flex flex-col items-center justify-center py-12">
          <Spinner size={48} className="text-primary-500 mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Belge yükleniyor...</p>
        </main>
        <MainFooter scrollToTopButton={true} />
      </Page>
    );
  }

  if (!currentDocument) {
    return (
      <Page title="Belge Bulunamadı">
        <PublicHeader cartItemCount={0} />
        <main className="flex-grow flex items-center justify-center py-12">
          <div className="text-center max-w-lg px-4">
            <div className="bg-gray-100 dark:bg-dark-800 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Belge Bulunamadı
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Aradığınız belge sistemde mevcut değil veya kaldırılmış olabilir.
            </p>
            <Link to="/documents" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700">
              Tüm Belgelere Dön
            </Link>
          </div>
        </main>
        <MainFooter scrollToTopButton={true} />
      </Page>
    );
  }

  return (
    <Page title={`${currentDocument.title} | Legal Platform`}>
      <PublicHeader cartItemCount={0} />

      <main className="flex-grow bg-gray-50 dark:bg-dark-900 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Gezinme ve Üst Eylemler */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <Link to="/" className="hover:text-gray-700 dark:hover:text-gray-300">Ana Sayfa</Link>
                </li>
                <li className="flex items-center">
                  <ChevronRightIcon className="h-4 w-4 flex-shrink-0" />
                </li>
                <li>
                  <Link to="/documents" className="hover:text-gray-700 dark:hover:text-gray-300">Belgeler</Link>
                </li>
                {categoryName && (
                  <>
                    <li className="flex items-center">
                      <ChevronRightIcon className="h-4 w-4 flex-shrink-0" />
                    </li>
                    <li>
                      <Link to={`/documents?category=${currentDocument.categoryId}`} className="hover:text-gray-700 dark:hover:text-gray-300">
                        {categoryName}
                      </Link>
                    </li>
                  </>
                )}
                <li className="flex items-center">
                  <ChevronRightIcon className="h-4 w-4 flex-shrink-0" />
                </li>
                <li className="truncate max-w-[180px] sm:max-w-xs">
                  <span className="text-gray-800 dark:text-gray-300 font-medium">
                    {currentDocument.title}
                  </span>
                </li>
              </ol>
            </nav>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleBookmarkToggle}
                className={`inline-flex items-center px-3 py-1.5 rounded-md ${
                  isBookmarked 
                    ? 'text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' 
                    : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600'
                } hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors`}
              >
                {isBookmarked ? (
                  <BookmarkSolidIcon className="h-5 w-5 mr-1.5" />
                ) : (
                  <BookmarkIcon className="h-5 w-5 mr-1.5" />
                )}
                <span className="text-sm">{isBookmarked ? 'Kayıtlı' : 'Kaydet'}</span>
              </button>
              
              <button
                onClick={handleShare}
                className="inline-flex items-center px-3 py-1.5 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
              >
                <ShareIcon className="h-5 w-5 mr-1.5" />
                <span className="text-sm">Paylaş</span>
              </button>
              
              <Link
                to="/documents"
                className="inline-flex items-center px-3 py-1.5 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-1.5" />
                <span className="text-sm">Geri</span>
              </Link>
            </div>
          </div>
          
          {/* Ana İçerik Grid */}
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Ana İçerik - Sol Taraf */}
            <div className="lg:col-span-8">
              {/* Belge Önizleme */}
              <DocumentPreview document={currentDocument} />
              
              {/* Belge Detayları */}
              <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm transition-shadow hover:shadow-md mb-6">
                <DocumentHeader title={currentDocument.title} id={id} />
                <DocumentContent document={currentDocument} />
              </div>
  
              {/* Belge İstatistikleri */}
              <DocumentStats document={currentDocument} />

              {/* Benzer Belgeler Bileşeni - count parametresi 3'e güncellendi */}
              <RelatedDocuments currentDocumentId={id} count={3} />
            </div>
  
            {/* Sidebar - Sağ Taraf */}
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-6">
                {/* Hazırlayan Avukat */}
                <LawyerCard 
                  lawyer={currentDocument.lawyer}
                  className="bg-white dark:bg-dark-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                />
                
                {/* Ücretlendirme Kartı */}
                <PricingCard 
                  price={currentDocument.price}
                  className="bg-white dark:bg-dark-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <MainFooter scrollToTopButton={true} />
    </Page>
  );
}

export default DocumentDetail;