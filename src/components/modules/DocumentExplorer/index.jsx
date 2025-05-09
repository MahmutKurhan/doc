import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import {
  DocumentTextIcon,
  DocumentIcon,
  FolderIcon,
  CurrencyDollarIcon, // ArrowDownTrayIcon yerine bunu ekleyelim
  EyeIcon,
  MagnifyingGlassIcon,
  Bars3BottomLeftIcon,
  ArrowPathIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";

// Belge tipine göre ikon seçimi
const getDocumentIcon = (type) => {
  switch (type) {
    case "pdf":
      return <DocumentTextIcon className="h-5 w-5 text-red-500" />;
    case "doc":
    case "docx":
      return <DocumentTextIcon className="h-5 w-5 text-blue-500" />;
    case "xls":
    case "xlsx":
      return <DocumentTextIcon className="h-5 w-5 text-green-500" />;
    case "ppt":
    case "pptx":
      return <DocumentTextIcon className="h-5 w-5 text-orange-500" />;
    default:
      return <DocumentIcon className="h-5 w-5 text-gray-500" />;
  }
};

// Belge tarihini formatla
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('tr-TR', options);
};

export function DocumentExplorer({ documents = [], categories = [] }) {
  // İlk kategori yerine null ile başlayalım (tüm belgeler)
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const navigate = useNavigate();
  
  // Ekran boyutu değişimini takip et
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) { // lg breakpoint için 1024px kullanıyoruz (Tailwind lg)
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };
    
    // İlk yükleme
    handleResize();
    
    // Ekran boyutu değişince
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filtrelenmiş belgeler
  const filteredDocuments = useMemo(() => {
    let filtered = documents;
    
    // Kategori filtresi
    if (activeCategory) {
      filtered = filtered.filter(doc => doc.categoryId === activeCategory);
    }
    
    // Arama filtresi
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(term) || 
        (doc.description && doc.description.toLowerCase().includes(term))
      );
    }
    
    return filtered;
  }, [documents, activeCategory, searchTerm]);

  // Arama çubuğu için ortak bir bileşen
  const SearchInput = ({ mobile = false }) => (
    <div className={`relative ${mobile ? 'flex-1 ml-3' : 'mb-4'}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
      </div>
      <input
        type="search"
        placeholder="Belge ara..."
        className={`block w-full pl-10 pr-3 ${mobile ? 'py-1.5' : 'py-2'} ${mobile 
          ? 'bg-white dark:bg-dark-900 border-0 shadow-sm' 
          : 'bg-gray-50 dark:bg-dark-800 border-0'} rounded-md text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm("")}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <XMarkIcon className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300" />
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-gray-50 dark:bg-dark-800/50 rounded-lg p-4">
      {/* Mobil filtreleme başlığı */}
      <div className="lg:hidden flex items-center justify-between mb-4">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 px-3 py-1.5 bg-white dark:bg-dark-900 rounded-md shadow-sm"
        >
          <Bars3BottomLeftIcon className="h-5 w-5" />
          Kategoriler
        </button>
        
        <SearchInput mobile={true} />
      </div>
      
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-12">
        {/* Kategori Sidebar */}
        {showSidebar && (
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="bg-white dark:bg-dark-900 rounded-lg shadow-sm p-4 sticky top-20">
              <div className="hidden lg:block mb-4">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-left border-b pb-2 border-gray-100 dark:border-dark-700">
                  <FolderIcon className="h-5 w-5 text-primary-500" />
                  Belge Kategorileri
                </h3>
                
                <SearchInput />
              </div>
              
              <nav className="space-y-1.5">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors text-left ${
                    activeCategory === null
                      ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400 font-medium"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <DocumentIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span>Tüm Belgeler</span>
                  </div>
                  <span className="text-xs bg-gray-100 dark:bg-dark-800 px-2 py-0.5 rounded-full">
                    {documents.length}
                  </span>
                </button>
                
                {categories.map((category) => {
                  const docCount = documents.filter(doc => doc.categoryId === category.id).length;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors text-left ${
                        activeCategory === category.id
                          ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400 font-medium"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FolderIcon className={`h-4 w-4 ${
                          activeCategory === category.id 
                            ? "text-primary-500 dark:text-primary-400" 
                            : "text-gray-500 dark:text-gray-400"
                        }`} />
                        <span>{category.name}</span>
                      </div>
                      <span className="text-xs bg-gray-100 dark:bg-dark-800 px-2 py-0.5 rounded-full">
                        {docCount}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        )}
        
        {/* Belge Listesi */}
        <div className="lg:col-span-8 xl:col-span-9">
          <div className="bg-white dark:bg-dark-900 rounded-lg shadow-sm p-4 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-lg text-gray-900 dark:text-white">
                {activeCategory 
                  ? categories.find(c => c.id === activeCategory)?.name 
                  : searchTerm ? "Arama Sonuçları" : "Tüm Belgeler"}
              </h3>
              
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {filteredDocuments.length} belge bulundu
              </div>
            </div>
            
            {searchTerm && (
              <div className="inline-flex items-center mb-4 px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-full text-sm">
                <span className="mr-2">&ldquo;{searchTerm}&rdquo; araması</span>
                <button 
                  onClick={() => setSearchTerm("")}
                  className="ml-1 hover:text-primary-800 dark:hover:text-primary-300"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            )}
            
            {filteredDocuments.length > 0 ? (
              <div className="space-y-3">
                {filteredDocuments.map((doc) => (
                  <div 
                    key={doc.id}
                    className="p-4 bg-white dark:bg-dark-900 border border-gray-100 dark:border-dark-700 rounded-md hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors cursor-pointer"
                    onClick={() => navigate(`/documents/details/${doc.id}`)} // React Router'ın navigate fonksiyonunu import etmeyi unutmayın
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          {getDocumentIcon(doc.fileType)}
                          <h4 className="font-medium text-gray-900 dark:text-white text-base">
                            {doc.title}
                          </h4>
                        </div>
                        
                        {doc.description && (
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                            {doc.description}
                          </p>
                        )}
                        
                        <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <span>
                            {formatDate(doc.date)}
                          </span>
                          <span className="mx-2">•</span>
                          <span className="uppercase">{doc.fileType}</span>
                          <span className="mx-2">•</span>
                          <span>{doc.fileSize}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        {doc.viewable && (
                          <Link
                            to={`/documents/details/${doc.id}`}
                            className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 shadow-sm"
                            onClick={(e) => e.stopPropagation()} // Event bubble'ı engellemek için
                          >
                            <EyeIcon className="h-4 w-4 mr-1" />
                            Görüntüle
                          </Link>
                        )}
                        
                        {doc.downloadable && (
                          <button
                            disabled
                            className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 border border-primary-100 dark:border-primary-500/20 opacity-60 cursor-not-allowed"
                            onClick={(e) => e.stopPropagation()} // Event bubble'ı engellemek için
                          >
                            <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                            Satın Al
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 px-4 bg-gray-50 dark:bg-dark-800/50 rounded-lg">
                <DocumentIcon className="h-12 w-12 mx-auto mb-3 text-gray-400 dark:text-gray-500" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Belge bulunamadı</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {searchTerm 
                    ? `&ldquo;${searchTerm}&rdquo; ile eşleşen belge bulunamadı.` 
                    : "Bu kategoride henüz belge bulunmuyor."}
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory(null);
                  }}
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-dark-900"
                >
                  <ArrowPathIcon className="h-4 w-4 mr-1.5" />
                  Tüm belgeleri göster
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}