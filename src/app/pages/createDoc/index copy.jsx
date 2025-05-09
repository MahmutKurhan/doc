import { useState, useEffect } from "react";
import mammoth from "mammoth";
import { saveAs } from "file-saver";
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { Page } from "components/shared/Page";
import { PublicHeader } from "components/modules/Header";
import { MainFooter } from "components/modules/Footer";

const CreateDoc = () => {
  const [docxContent, setDocxContent] = useState("");
  const [placeholders, setPlaceholders] = useState([]);
  const [values, setValues] = useState({});
  const [fileName] = useState("cagri.docx");
  const [loading, setLoading] = useState(false);
  const [originalDocBuffer, setOriginalDocBuffer] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [docxStatus, setDocxStatus] = useState('ready');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Her sayfada 5 alan göster
  
  // İlerleme bilgileri için hesaplamalar
  const completedFields = Object.values(values).filter(Boolean).length;
  const totalFields = placeholders.length;
  const completedPercentage = totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0;

  // İlerleme durumuna göre stil bilgileri
  const getProgressInfo = () => {
    if (completedPercentage >= 80) {
      return {
        color: 'emerald',
        emoji: '🎉',
        message: 'Harika! Neredeyse tamamlandı.',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )
      };
    } else if (completedPercentage >= 50) {
      return {
        color: 'blue',
        emoji: '👍',
        message: 'İyi gidiyorsunuz, devam edin!',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
          </svg>
        )
      };
    } else if (completedPercentage >= 20) {
      return {
        color: 'amber',
        emoji: '🧩',
        message: 'İyi başlangıç, devam edin.',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
          </svg>
        )
      };
    } else {
      return {
        color: 'gray',
        emoji: '🔍',
        message: 'Belgeyi doldurmaya başlayın.',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
        )
      };
    }
  };

  // İlerleme bilgisini al
  const progressInfo = getProgressInfo();
  
  // Dosya yükleme fonksiyonu

  // Input değerlerini güncelleme
  const handleInputChange = (id, value) => {
    setValues(prevValues => ({
      ...prevValues,
      [id]: value
    }));
    
    // Önizleme güncelleniyormuş animasyonu
    setPreviewLoading(true);
    setTimeout(() => setPreviewLoading(false), 300);
  };

  // Tüm alanları temizleme
  const handleClear = () => {
    const initialValues = {};
    placeholders.forEach(p => {
      initialValues[p.id] = "";
    });
    setValues(initialValues);
    
    // Temizleme animasyonu
    setPreviewLoading(true);
    setTimeout(() => setPreviewLoading(false), 300);
  };

  // Önizleme için HTML oluşturma
  const getPreviewHtml = () => {
    let previewHtml = docxContent;
    placeholders.forEach(placeholder => {
      const value = values[placeholder.id] || "___";
      // Global regex ile tüm eşleşmeleri değiştirelim (aynı etiket birden fazla yerde olabilir)
      const replaceRegex = new RegExp(escapeRegExp(placeholder.original), 'g');
      previewHtml = previewHtml.replace(replaceRegex, `<strong style="color: #007bff;">${value}</strong>`);
    });
    return previewHtml;
  };
  
  // Regex karakterlerini escape etmek için yardımcı fonksiyon
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  // Dosya indirme
  const handleDownload = async () => {
    try {
      if (!originalDocBuffer) {
        console.error("Orijinal dosya bulunamadı");
        return;
      }
      
      // PizZip ile docx (zip) dosyasını aç
      const zip = new PizZip(originalDocBuffer);
      
      // Docxtemplater ile belgeyi hazırla ve köşeli parantezleri yer tutucu olarak kullan
      const doc = new Docxtemplater();
      doc.loadZip(zip);
      
      // Önemli: Köşeli parantezleri yer tutucu olarak belirt
      doc.setOptions({
        delimiters: {
          start: '[',
          end: ']',
        },
      });
      
      // Değiştirilecek değerleri hazırlayalım
      const templateData = {};
      placeholders.forEach(placeholder => {
        // [SirketFULL] -> SirketFULL
        const key = placeholder.label;
        templateData[key] = values[placeholder.id] || "";
      });
      
      // Hata ayıklama için konsola yazdıralım
      console.log("Değiştirilecek alanlar:", templateData);
      
      // Değerleri ayarla
      doc.setData(templateData);

      // Belgeyi oluştur
      doc.render();
      
      // Değiştirilmiş belgeyi al
      const output = doc.getZip().generate({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      });
      
      // Dosyayı indir
      saveAs(output, `doldurulmus_${fileName}`);
      
    } catch (error) {
      console.error("Dosya indirilirken hata oluştu:", error);
      console.error("Hata detayları:", error.message, error.properties?.errors);
      alert("Dosya indirilirken bir hata oluştu, lütfen tekrar deneyin.");
    }
  };

  // Default olarak cagri.docx yükleme
  useEffect(() => {
    // Public klasöründen default dosyayı yükle
    const loadDefaultFile = async () => {
      try {
        setLoading(true);
        setDocxStatus('loading');
        const response = await fetch('/cagri.docx');
        const blob = await response.blob();
        const file = new File([blob], "cagri.docx", { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
        
        const arrayBuffer = await file.arrayBuffer();
        setOriginalDocBuffer(arrayBuffer); // Orijinal dosyayı saklayalım
        
        const result = await mammoth.convertToHtml({ arrayBuffer });
        setDocxContent(result.value);
        
        // Yer tutucuları bulma - Yeni regex ile her türlü köşeli parantez içeriğini bulalım
        const text = result.value;
        // Köşeli parantez içindeki herhangi bir metni yakalayan regex
        const regex = /\[([^\]]+)\]/g;
        let match;
        
        // Benzersiz yer tutucuları izlemek için bir set kullanalım
        const uniquePlaceholders = new Set();
        const newPlaceholders = [];
        
        while ((match = regex.exec(text)) !== null) {
          const label = match[1]; // Etiketin kendisi (köşeli parantez olmadan)
          const fullMatch = match[0]; // Tam eşleşme [etiket]
          
          // Aynı etiketi birden fazla kez eklemekten kaçınalım
          if (!uniquePlaceholders.has(label)) {
            uniquePlaceholders.add(label);
            
            newPlaceholders.push({
              id: `placeholder_${newPlaceholders.length}`,
              label: label,
              original: fullMatch,
              index: match.index
            });
          }
        }
        
        setPlaceholders(newPlaceholders);
        const initialValues = {};
        newPlaceholders.forEach(p => {
          initialValues[p.id] = "";
        });
        setValues(initialValues);
        setDocxStatus('ready');
        setLoading(false);
        
      } catch (error) {
        console.error("Varsayılan dosya yüklenirken hata oluştu:", error);
        setDocxStatus('error');
        setLoading(false);
      }
    };
    
    loadDefaultFile();
  }, []);
  
  // Placeholder'ları sayfalandırmak için fonksiyon
  const getPaginatedPlaceholders = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return placeholders.slice(indexOfFirstItem, indexOfLastItem);
  };

  // Sayfa değiştirme fonksiyonu
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Sayfa değiştiğinde animasyon
    setPreviewLoading(true);
    setTimeout(() => setPreviewLoading(false), 300);
  };

  return (
    <Page title="Belge Düzenleyici | Legal Platform" description="Belgedeki köşeli parantez içerisindeki değerleri doldurup özelleştirilmiş dokümanınızı oluşturun">
      <PublicHeader />
      
      <div className="py-12 bg-gray-50 dark:bg-dark-900 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 max-w-screen-xl">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Belge Düzenleyici</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Belgedeki köşeli parantez içerisindeki değerleri doldurup özelleştirilmiş dokümanınızı oluşturun.
            </p>
            
            {docxStatus === 'error' && (
              <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 dark:bg-red-900/30 dark:text-red-200 dark:border-red-600">
                <p className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Dosya yüklenirken bir hata oluştu. Lütfen tekrar deneyiniz.
                </p>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sol Taraf - Form */}
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-6 flex flex-col h-full">
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Belge Bilgileri</h2>
              
              {/* Kusursuz İlerleme Göstergesi - Sadece placeholders yüklendiyse göster */}
              {placeholders.length > 0 && !loading && (
                <div className="mb-6 animate-fadeIn">
                  {/* Üst yüzde çubuğunu kaldırıyoruz */}
                  
                  {/* İlerleme bilgisi - Geliştirilmiş modern tasarım */}
                  <div className="flex items-center justify-between mb-3 bg-gradient-to-r from-gray-50 to-white dark:from-dark-750 dark:to-dark-800 rounded-xl shadow-sm border border-gray-100 dark:border-dark-700 p-3">
                    <div className="flex items-center">
                      {/* Animasyonlu ve gelişmiş simge alanı */}
                      <div className="relative mr-3">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-200 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/20 rounded-full blur opacity-70"></div>
                        <span className="relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-white to-gray-100 dark:from-dark-700 dark:to-dark-600 shadow-md">
                          <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${
                            completedPercentage === 100 
                              ? 'bg-gradient-to-tr from-emerald-500 to-green-400 dark:from-emerald-400 dark:to-green-500'
                              : completedPercentage >= 50 
                                ? 'bg-gradient-to-tr from-blue-500 to-sky-400 dark:from-blue-400 dark:to-sky-500'
                                : completedPercentage >= 20
                                  ? 'bg-gradient-to-tr from-amber-500 to-yellow-400 dark:from-amber-400 dark:to-yellow-500'
                                  : 'bg-gradient-to-tr from-gray-500 to-gray-400 dark:from-gray-400 dark:to-gray-500'
                          } text-white transition-all duration-300 ${completedPercentage === 100 ? 'scale-110' : ''}`}>
                            {progressInfo.icon}
                          </span>
                        </span>
                      </div>
                      
                      {/* Geliştirilmiş ilerleme metni */}
                      <div>
  <div className="flex items-center">
    <span className={`text-sm font-semibold mr-2 ${
      completedPercentage === 100 
        ? 'bg-gradient-to-r from-emerald-600 to-green-500 dark:from-emerald-400 dark:to-green-300 text-transparent bg-clip-text'
        : 'text-gray-800 dark:text-white'
    }`}>
      {progressInfo.message}
    </span>
    <span className="text-xl leading-none animate-bounce-subtle">{progressInfo.emoji}</span>
    
    {/* İlerleme durumu ipucu */}
    {completedPercentage > 0 && completedPercentage < 100 && (
      <div className="ml-2 group relative">
        <button className="w-5 h-5 rounded-full bg-gray-100 dark:bg-dark-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </button>
        <div className="absolute left-0 bottom-full mb-2 w-48 p-2 bg-white dark:bg-dark-700 rounded-md shadow-lg text-xs text-left transform -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
          <div className="flex items-start mb-1">
            <svg className="h-4 w-4 text-primary-500 mt-0.5 mr-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-700 dark:text-gray-300">Kalan {totalFields - completedFields} alanı doldurarak belgenizi tamamlayabilirsiniz.</p>
          </div>
          <div className="absolute w-2 h-2 bg-white dark:bg-dark-700 transform rotate-45 left-0 -bottom-1 ml-1.5"></div>
        </div>
      </div>
    )}
  </div>
  
  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
    <div className={`px-2 py-1 rounded-md shadow-sm flex items-center ${
      completedPercentage === 100
        ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700/30' 
        : 'bg-white dark:bg-dark-700 border border-gray-100 dark:border-dark-600'
    }`}>
      <span className={`font-semibold ${
        completedPercentage === 100
          ? 'text-emerald-600 dark:text-emerald-400'
          : completedPercentage >= 50
            ? 'text-blue-600 dark:text-blue-400'
            : 'text-gray-700 dark:text-gray-300'
      }`}>{completedFields}</span>
      <span className="mx-1 text-gray-400 dark:text-gray-500">/</span>
      <span className="text-gray-600 dark:text-gray-400">{totalFields}</span>
      <span className="ml-1 text-gray-400 dark:text-gray-500 font-light">alan</span>
    </div>
    
    {/* Tahmini tamamlanma göstergesi */}
    <div className="ml-2 text-gray-500 dark:text-gray-400 flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="font-light">~{Math.ceil((totalFields - completedFields) * 0.5)} dk kaldı</span>
    </div>
  </div>
</div>

                    </div>
                    
                    {/* Modern sağ bilgi kartı - geliştirilmiş */}
                    <div className="hidden sm:flex flex-col items-center">
  <div className={`relative w-16 h-16 ${completedPercentage === 100 ? "animate-pulse-slow" : ""}`}>
    {/* Gelişmiş arka plan efekti */}
    <div className="absolute inset-0 rounded-full">
  {/* Yumuşak blur efekti için katmanlı arka plan */}
  <div className={`absolute inset-0 rounded-full blur-xl opacity-20 transform scale-90 ${
    completedPercentage === 100
      ? 'bg-gradient-to-br from-emerald-400 to-green-500 dark:from-emerald-400 dark:to-green-500'
      : completedPercentage >= 50 
        ? 'bg-gradient-to-br from-blue-400 to-sky-500 dark:from-blue-400 dark:to-sky-500'
        : 'bg-gradient-to-br from-amber-400 to-yellow-500 dark:from-amber-400 dark:to-yellow-500'
  }`}></div>
  
  {/* İkinci katman - daha keskin blur */}
  <div className={`absolute inset-0 rounded-full blur-md opacity-15 transform scale-75 ${
    completedPercentage === 100
      ? 'bg-gradient-to-tl from-emerald-300 to-green-400 dark:from-emerald-300 dark:to-green-400'
      : completedPercentage >= 50 
        ? 'bg-gradient-to-tl from-blue-300 to-sky-400 dark:from-blue-300 dark:to-sky-400'
        : 'bg-gradient-to-tl from-amber-300 to-yellow-400 dark:from-amber-300 dark:to-yellow-400'
  }`}></div>
</div>
    
    {/* İç halka */}
    <div className="absolute inset-1 rounded-full bg-white dark:bg-dark-800 shadow-inner"></div>
    
    {/* SVG dairesel ilerleme çubuğu */}
    <svg className="w-16 h-16 absolute transform -rotate-90" viewBox="0 0 36 36">
      <path
        className="stroke-[3] stroke-gray-200 dark:stroke-dark-600 fill-none opacity-75"
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path
        className={`stroke-[3.2] fill-none ${
          completedPercentage === 100 
            ? 'stroke-emerald-500 dark:stroke-emerald-400' 
            : completedPercentage >= 50 
              ? 'stroke-blue-500 dark:stroke-blue-400'
              : completedPercentage >= 20
                ? 'stroke-amber-500 dark:stroke-amber-400'
                : 'stroke-gray-400 dark:stroke-gray-600'
        } transition-all duration-1000 ease-out`}
        strokeDasharray={`${completedPercentage}, 100`}
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        strokeLinecap="round"
      />
    </svg>
    
    {/* İlerleme yüzdesi */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className={`flex flex-col items-center justify-center ${
        completedPercentage === 100 
          ? 'scale-110 transform transition-transform duration-500'
          : ''
      }`}>
        <div className={`text-lg font-bold ${
          completedPercentage === 100 
            ? 'text-emerald-600 dark:text-emerald-400' 
            : completedPercentage >= 50 
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-gray-700 dark:text-gray-300'
        }`}>
          {completedPercentage}
          <span className="text-xs font-normal opacity-70">%</span>
        </div>

      </div>
    </div>
  </div>
</div>

                  </div>
                  
                  {/* İlerleme çubuğu - Ultra modern tasarım */}
<div className="mt-4 relative">
  {/* İnce çizgiler */}
  <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-between">
    {[0, 25, 50, 75, 100].map((mark) => (
      <div key={mark} className="w-px h-full bg-gray-100 dark:bg-dark-700/70"></div>
    ))}
  </div>
  
  {/* Ana çubuk - Geliştirilmiş görünüm */}
  <div className="h-3 w-full bg-gray-50 dark:bg-dark-700/50 rounded-full overflow-hidden shadow-inner backdrop-blur-sm relative">
    {/* İnce desenli arka plan */}
    <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:6px_6px]"></div>
    
    {/* İlerleme çubuğu - Daha canlı */}
    <div 
      className={`h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${
        completedPercentage === 100 
          ? 'bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500 bg-size-200' 
          : completedPercentage >= 50 
            ? 'bg-gradient-to-r from-blue-500 via-sky-400 to-blue-500 bg-size-200'
            : completedPercentage >= 20
              ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-size-200'
              : 'bg-gradient-to-r from-gray-500 via-gray-400 to-gray-500 bg-size-200'
      }`}
      style={{ 
        width: `${completedPercentage}%`,
        boxShadow: completedPercentage > 0 ? '0 0 12px rgba(0, 0, 0, 0.12)' : 'none',
        backgroundPosition: completedPercentage === 100 ? 'right center' : 'left center',
        backgroundSize: '200% 100%',
        animation: completedPercentage === 100 ? 'shimmer 2s infinite' : 'none'
      }}
    >
      {/* İç parlama efekti */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
      
      {/* İlerleme parıltısı - Geliştirilmiş */}
      {completedPercentage > 0 && completedPercentage < 100 && (
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0 opacity-40 bg-gradient-to-r from-transparent via-white to-transparent"
            style={{ 
              animation: 'shinyStripe 2.5s infinite cubic-bezier(0.4, 0, 0.2, 1)', 
              backgroundSize: '200% 100%' 
            }}
          ></div>
        </div>
      )}
      
      {/* İlerleme noktası - Daha çekici */}
      {completedPercentage > 0 && (
        <div className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full shadow-lg ${
          completedPercentage === 100
            ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 dark:from-emerald-300 dark:to-emerald-500 border-2 border-white dark:border-dark-800' 
            : completedPercentage >= 50
              ? 'bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-300 dark:to-blue-500 border-2 border-white dark:border-dark-800'
              : 'bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-300 dark:to-amber-500 border-2 border-white dark:border-dark-800'
        }`}>
          {/* İç parlama */}
          <div className="absolute inset-[2px] rounded-full bg-gradient-to-b from-white/60 to-transparent opacity-80"></div>
          
          {/* Tamamlandı efekti */}
          {completedPercentage === 100 && (
            <>
              <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-2 h-2 text-white" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  </div>
  
  {/* Gelişmiş etkileşimli ilerleme noktaları */}
  <div className="flex justify-between mt-2.5 relative px-0.5">
    {[0, 25, 50, 75, 100].map((step, index) => {
      const isCompleted = completedPercentage >= step;
      const isCurrent = 
        (completedPercentage >= step && completedPercentage < (index < 4 ? step + 25 : 101)) || 
        (completedPercentage < 25 && step === 0);
      
      return (
        <div key={step} 
          className={`group flex flex-col items-center relative cursor-help transition-all duration-300 ${
            isCurrent ? 'scale-110' : ''
          }`}
        >
          {/* Geliştirilmiş nokta göstergesi */}
          <div 
            className={`w-3 h-3 rounded-full mb-2 transition-all duration-500 ${
              isCompleted 
                ? completedPercentage === 100 && step === 100
                  ? 'bg-gradient-to-br from-emerald-400 to-green-500 dark:from-emerald-300 dark:to-green-500 ring-2 ring-emerald-200 dark:ring-emerald-700/50 ring-offset-2 ring-offset-white dark:ring-offset-dark-800' 
                  : isCurrent
                    ? 'bg-gradient-to-br from-blue-400 to-sky-500 dark:from-blue-300 dark:to-sky-500 ring-2 ring-blue-200 dark:ring-blue-800/50 ring-offset-2 ring-offset-white dark:ring-offset-dark-800'
                    : completedPercentage >= 50 
                      ? 'bg-blue-500 dark:bg-blue-400 shadow-md shadow-blue-500/20 dark:shadow-blue-400/20'
                      : 'bg-amber-500 dark:bg-amber-400 shadow-md shadow-amber-500/20 dark:shadow-amber-400/20'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            {/* İç işaretçi - sadece tamamlanmış adımlarda görüntülenir */}
            {isCompleted && (
              <div className={`absolute inset-0 flex items-center justify-center ${
                (completedPercentage === 100 && step === 100) || isCurrent ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="w-1 h-1 rounded-full bg-white dark:bg-white/90"></div>
              </div>
            )}
          </div>
          
          {/* İlerleme ipucu baloncuğu - Geliştirilmiş */}
          <div className="absolute bottom-full -mb-1 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10">
            <div className={`px-2.5 py-1.5 text-xs font-medium rounded-md shadow-lg whitespace-nowrap transform -translate-y-1 group-hover:-translate-y-2 transition-transform backdrop-blur-sm ${
              isCompleted 
                ? completedPercentage === 100 && step === 100
                  ? 'bg-gradient-to-br from-emerald-50/90 to-green-50/90 text-emerald-800 border border-emerald-200/70 dark:from-emerald-900/70 dark:to-green-900/70 dark:text-emerald-300 dark:border-emerald-700/50'
                  : completedPercentage >= 50 
                    ? 'bg-gradient-to-br from-blue-50/90 to-sky-50/90 text-blue-800 border border-blue-200/70 dark:from-blue-900/70 dark:to-sky-900/70 dark:text-blue-300 dark:border-blue-700/50'
                    : 'bg-gradient-to-br from-amber-50/90 to-yellow-50/90 text-amber-800 border border-amber-200/70 dark:from-amber-900/70 dark:to-yellow-900/70 dark:text-amber-300 dark:border-amber-700/50'
                : 'bg-white/95 text-gray-800 border border-gray-200/70 dark:bg-dark-750/90 dark:text-gray-300 dark:border-dark-600/50 backdrop-blur-sm'
            }`}>
              <span className="font-semibold">
                {step === 0 && "Başlangıç"}
                {step === 25 && "Çeyrek"}
                {step === 50 && "Yarı"}
                {step === 75 && "Üç Çeyrek"}
                {step === 100 && "Tamamlandı"}
              </span>
              {step > 0 && step < 100 && (
                <span className="opacity-80 ml-1">({step}%)</span>
              )}
            </div>
            <div className={`h-1.5 w-1.5 transform rotate-45 absolute -bottom-0.5 left-1/2 -ml-0.5 ${
              isCompleted 
                ? completedPercentage === 100 && step === 100
                  ? 'bg-emerald-50/90 border-r border-b border-emerald-200/70 dark:bg-emerald-900/70 dark:border-emerald-700/50'
                  : completedPercentage >= 50 
                    ? 'bg-blue-50/90 border-r border-b border-blue-200/70 dark:bg-blue-900/70 dark:border-blue-700/50'
                    : 'bg-amber-50/90 border-r border-b border-amber-200/70 dark:bg-amber-900/70 dark:border-amber-700/50'
                : 'bg-white/95 border-r border-b border-gray-200/70 dark:bg-dark-750/90 dark:border-dark-600/50'
            }`}></div>
          </div>
          
          {/* Minimal yüzde değeri - Daha rafine */}
          <span className={`text-[10px] font-medium transition-all duration-300 ${
            isCompleted 
              ? completedPercentage === 100 && step === 100
                ? 'text-emerald-600 dark:text-emerald-400'  
                : completedPercentage >= 50 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-amber-600 dark:text-amber-400'
              : 'text-gray-400 dark:text-gray-500'
          } ${
            isCurrent ? 'transform translate-y-1' : ''
          }`}>
            {step}%
          </span>
        </div>
      );
    })}
  </div>
</div>
                  
                  {/* Tamamlanma durumunda görsel konfeti efekti */}
                  {completedPercentage === 100 && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 dark:from-emerald-900/20 dark:via-green-900/20 dark:to-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-lg text-center animate-fadeInUp relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-full">
                        {/* Gelişmiş konfeti efekti */}
                        {[...Array(8)].map((_, i) => (
                          <div 
                            key={i}
                            className={`absolute w-${Math.random() > 0.5 ? '1' : '1.5'} h-${Math.random() > 0.5 ? '1' : '1.5'} rounded-full`}
                            style={{
                              top: 0,
                              left: `${10 + (i * 10)}%`,
                              backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'][i % 6],
                              animation: `confetti-${(i % 3) + 1} ${1.5 + (i % 5) * 0.2}s infinite linear`
                            }}
                          ></div>
                        ))}
                      </div>
                      <div className="flex items-center justify-center relative z-10">
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium text-sm flex items-center bg-white dark:bg-dark-800 px-3 py-1.5 rounded-full shadow-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 animate-tada text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                          </svg>
                          <span className="mr-1">Harika!</span>
                          <span className="font-semibold">Tüm alanları doldurdunuz.</span>
                          <span className="ml-1">Belgeniz indirmeye hazır.</span>
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Çizgi - Sadece tamamlanmadığında görünür */}
                  {completedPercentage < 100 && (
                    <div className="mt-3 border-t border-gray-200 dark:border-dark-700"></div>
                  )}
                </div>
              )}
              
              {loading ? (
                <div className="flex items-center justify-center h-40">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
                  <span className="ml-3 text-gray-600 dark:text-gray-300">Yükleniyor...</span>
                </div>
              ) : (
                <>
                  {placeholders.length > 0 ? (
                    <div className="space-y-4">
                      {/* Sadece mevcut sayfadaki placeholder'ları göster */}
                      {getPaginatedPlaceholders().map((placeholder) => (
                        <div key={placeholder.id} className="form-field">
                          <label htmlFor={placeholder.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {placeholder.label}
                          </label>
                          <input
                            type="text"
                            id={placeholder.id}
                            value={values[placeholder.id] || ""}
                            onChange={(e) => handleInputChange(placeholder.id, e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-dark-700 dark:text-white"
                            placeholder="Değer girin"
                          />
                        </div>
                      ))}
                      
                      {/* Sayfalama Kontrolü */}
                      {placeholders.length > itemsPerPage && (
                        <div className="flex flex-wrap items-center justify-center mt-6 gap-1 sm:gap-2">
                          {/* Önceki Sayfa Butonu */}
                          <button
                            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`p-1.5 sm:px-3 sm:py-1.5 rounded border flex items-center justify-center min-w-[32px] ${
                              currentPage === 1 
                                ? 'text-gray-300 border-gray-200 cursor-not-allowed' 
                                : 'text-gray-700 border-gray-300 hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
                            }`}
                            aria-label="Önceki Sayfa"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                          
                          {/* Sayfa numaraları - Responsive */}
                          {(() => {
                            const totalPages = Math.ceil(placeholders.length / itemsPerPage);
                            let pagesToShow = [];
                            
                            // Toplam 7 sayfadan az varsa hepsini göster
                            if (totalPages <= 7) {
                              pagesToShow = Array.from({ length: totalPages }, (_, i) => i + 1);
                            }
                            // Çok sayfa varsa akıllı sayfalama yap
                            else {
                              // Her zaman ilk sayfayı göster
                              if (currentPage <= 4) {
                                // Başlardayız, ilk 5 sayfayı göster, sonra ... ve son sayfayı
                                pagesToShow = [1, 2, 3, 4, 5, 'ellipsis', totalPages];
                              } else if (currentPage >= totalPages - 3) {
                                // Sonlardayız, ilk sayfayı, ... ve son 5 sayfayı göster
                                pagesToShow = [1, 'ellipsis', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
                              } else {
                                // Ortadayız, ilk sayfayı, ..., mevcut sayfanın etrafındaki 3 sayfayı, ... ve son sayfayı göster
                                pagesToShow = [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages];
                              }
                            }
                            
                            return (
                              <>
                                {/* SM ekranlarda sayfa sayısı metni */}
                                <span className="hidden sm:inline text-xs text-gray-500 mx-1">
                                  {currentPage} / {totalPages}
                                </span>
                                
                                {/* Sayfa butonları */}
                                <div className="flex items-center space-x-1">
                                  {pagesToShow.map((page, index) => 
                                    page === 'ellipsis' ? (
                                      <span key={`ellipsis-${index}`} className="px-2 text-gray-500">…</span>
                                    ) : (
                                      <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`hidden sm:flex items-center justify-center rounded border min-w-[32px] h-8 ${
                                          currentPage === page
                                            ? 'bg-primary-600 text-white border-primary-600 dark:bg-primary-500 dark:border-primary-500'
                                            : 'text-gray-700 border-gray-300 hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
                                        }`}
                                      >
                                        {page}
                                      </button>
                                    )
                                  )}
                                </div>
                                
                                {/* Mobilde sayfa bilgisi (sayfa butonları yerine) */}
                                <span className="sm:hidden text-sm text-gray-600 dark:text-gray-400 mx-2 font-medium">
                                  {currentPage} / {totalPages}
                                </span>
                              </>
                            );
                          })()}
                          
                          {/* Sonraki Sayfa Butonu */}
                          <button
                            onClick={() => currentPage < Math.ceil(placeholders.length / itemsPerPage) && handlePageChange(currentPage + 1)}
                            disabled={currentPage === Math.ceil(placeholders.length / itemsPerPage)}
                            className={`p-1.5 sm:px-3 sm:py-1.5 rounded border flex items-center justify-center min-w-[32px] ${
                              currentPage === Math.ceil(placeholders.length / itemsPerPage)
                                ? 'text-gray-300 border-gray-200 cursor-not-allowed'
                                : 'text-gray-700 border-gray-300 hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
                            }`}
                            aria-label="Sonraki Sayfa"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 01-1.414-1.414l-4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      )}
                      
                      {/* Temizle Butonu */}
                      <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button
                          type="button"
                          onClick={handleClear}
                          className="px-6 py-2.5 border border-gray-300 dark:border-dark-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
                        >
                          Temizle
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-40 text-gray-500 dark:text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p>Dosyada köşeli parantez içeren etiket bulunamadı</p>
                      <p className="text-sm mt-1">Farklı bir dosya seçerek tekrar deneyebilirsiniz</p>
                    </div>
                  )}
                </>
              )}
            </div>
            
            {/* Sağ Taraf - Doküman Önizleme */}
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md overflow-hidden">
              <div className="border-b border-gray-200 dark:border-dark-700 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Doküman Önizleme</h2>
                </div>
                
                <div className="flex items-center">
                  {docxStatus === 'ready' ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mr-2 transition-all duration-300">
                      <svg className="w-2.5 h-2.5 mr-1.5 fill-current" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                      Belge hazır
                    </span>
                  ) : docxStatus === 'loading' ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 mr-2 transition-all duration-300">
                      <svg className="w-2.5 h-2.5 mr-1.5 fill-current animate-pulse" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                      Yükleniyor...
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2 transition-all duration-300">
                      <svg className="w-2.5 h-2.5 mr-1.5 fill-current" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                      Hata
                    </span>
                  )}
                  
                  <button 
                    onClick={handleDownload}
                    disabled={loading || placeholders.length === 0 || docxStatus !== 'ready'} 
                    className={`p-1.5 rounded-md flex items-center transition-all duration-200 ${
                      loading || placeholders.length === 0 || docxStatus !== 'ready'
                        ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' 
                        : 'hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                    }`}
                    title="Dokümanı İndir"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span className="text-xs md:text-sm">İndir</span>
                  </button>
                </div>
              </div>
              
              <div className="relative">
                {/* Yükleniyor göstergesi */}
                {previewLoading && (
                  <div className="absolute inset-0 bg-white/60 dark:bg-dark-900/60 flex items-center justify-center z-10 backdrop-blur-[1px] transition-opacity duration-300">
                    <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary-600 border-t-transparent"></div>
                  </div>
                )}
                
                {/* Doküman içeriği */}
                <div 
                  className="p-6 bg-white dark:bg-dark-800 min-h-[600px] max-h-[600px] overflow-auto custom-scrollbar" 
                  style={{ 
                    fontFamily: 'Times New Roman, serif',
                    backgroundImage: 'linear-gradient(#f1f5f9 1px, transparent 1px), linear-gradient(90deg, #f1f5f9 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '-1px -1px'
                  }}
                >
                  <div className="bg-white dark:bg-dark-800 p-8 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-200">
                    <div className="text-right mb-4 text-xs text-gray-500 dark:text-gray-400 flex justify-between items-center">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414a1 1 0 01-.707-.293H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                        </svg>
                        {fileName}
                      </span>
                      <div className="flex items-center">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-sm text-[10px] font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                          Önizleme
                        </span>
                      </div>
                    </div>
                    
                    <div 
                      className="document-preview transition-opacity duration-200"
                      style={{ minHeight: '400px' }}
                      dangerouslySetInnerHTML={{ __html: getPreviewHtml() }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-dark-700 px-6 py-3 bg-gray-50 dark:bg-dark-750 flex items-center justify-between">
                <div className="flex-1">
                  <button 
                    onClick={handleDownload}
                    disabled={loading || placeholders.length === 0 || docxStatus !== 'ready'} 
                    className={`px-5 py-2.5 transition-all duration-200 shadow-sm text-white font-medium rounded-lg flex items-center ${
                      loading || placeholders.length === 0 || docxStatus !== 'ready'
                        ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-70' 
                        : 'bg-primary-600 hover:bg-primary-700 hover:shadow-md active:translate-y-0.5'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Dokümanı İndir
                  </button>
                </div>
                <div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                      {placeholders.length} değiştirilebilir alan
                    </span>
                    {Object.values(values).filter(Boolean).length > 0 && (
                      <span className="text-xs text-green-600 dark:text-green-400">
                        {Object.values(values).filter(Boolean).length} alan dolduruldu
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MainFooter scrollToTopButton={true} />

    </Page>
  );
};

export default CreateDoc;