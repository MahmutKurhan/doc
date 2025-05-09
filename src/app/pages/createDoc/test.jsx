import { useState, useEffect } from 'react';
import { Page } from "components/shared/Page";
import { PublicHeader } from "components/modules/Header";
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

export default function CreateDoc() {
  const [formData, setFormData] = useState({
    madde1: '',
    madde2: '',
    sozlesmeTarihi: '',
    tarafAdi: '',
    tarafTcKimlik: ''
  });
  
  const [previewLoading, setPreviewLoading] = useState(false);
  const [docxTemplate, setDocxTemplate] = useState(null);
  const [docxStatus, setDocxStatus] = useState('loading'); // 'loading', 'ready', 'error'

  // DOCX şablonunu yükleme
  useEffect(() => {
    setDocxStatus('loading');
    fetch('/test1.docx')
      .then(response => {
        if (!response.ok) {
          throw new Error('Şablon dosyası bulunamadı');
        }
        return response.arrayBuffer();
      })
      .then(buffer => {
        setDocxTemplate(buffer);
        setDocxStatus('ready');
      })
      .catch(error => {
        console.error('Şablon yükleme hatası:', error);
        setDocxStatus('error');
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Önizleme güncelleniyormuş animasyonu
    setPreviewLoading(true);
    setTimeout(() => setPreviewLoading(false), 300);
  };

  const handleClear = () => {
    setFormData({
      madde1: '',
      madde2: '',
      sozlesmeTarihi: '',
      tarafAdi: '',
      tarafTcKimlik: ''
    });
    
    // Temizleme animasyonu
    setPreviewLoading(true);
    setTimeout(() => setPreviewLoading(false), 300);
  };

  const generateDocument = () => {
    if (docxStatus !== 'ready') {
      alert('DOCX şablonu yüklenemedi. Lütfen daha sonra tekrar deneyin.');
      return null;
    }

    try {
      // DOCX dosyasını yükleme
      const zip = new PizZip(docxTemplate);
      const doc = new Docxtemplater();
      doc.loadZip(zip);

      // Değişkenleri belirleme
      const formattedDate = formData.sozlesmeTarihi ? 
        new Date(formData.sozlesmeTarihi).toLocaleDateString('tr-TR') : '';

      // Şablondaki değişkenleri değiştirme
      doc.setData({
        MADDE_1: formData.madde1 || ' ',
        MADDE_2: formData.madde2 || ' ',
        TARAF_ADI: formData.tarafAdi || ' ',
        TARAF_TC_KIMLIK: formData.tarafTcKimlik || ' ',
        SOZLESME_TARIHI: formattedDate || ' '
      });

      // Dokümanı oluşturma
      doc.render();

      // Oluşturulan dokümanı döndürme
      const out = doc.getZip().generate({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      });

      return out;
    } catch (error) {
      console.error('Doküman oluşturma hatası:', error);
      alert('Doküman oluşturulurken bir hata oluştu: ' + error.message);
      return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Dokümanı oluştur
    const docBlob = generateDocument();
    if (!docBlob) return;
    
    // Dokümanı indir
    const fileName = formData.tarafAdi 
      ? `sozlesme_${formData.tarafAdi.replace(/\s+/g, '_')}.docx` 
      : 'yeni_sozlesme.docx';
      
    saveAs(docBlob, fileName);
  };

  return (
    <Page title="Doküman Oluştur | Legal Platform" description="Şablonlarınız üzerinden doküman oluşturun">
      <PublicHeader />
      
      <div className="py-12 bg-gray-50 dark:bg-dark-900 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 max-w-screen-xl">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Doküman Oluştur</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Aşağıdaki bilgileri doldurarak özel dokümanınızı oluşturun.
            </p>
            
            {docxStatus === 'error' && (
              <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 dark:bg-red-900/30 dark:text-red-200 dark:border-red-600">
                <p className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  DOCX şablonu bulunamadı. Lütfen /public klasöründe test1.docx dosyasının olduğunu kontrol edin.
                </p>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sol Taraf - Form */}
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Doküman Bilgileri</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="madde1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Madde 1 İçeriği
                    </label>
                    <textarea
                      id="madde1"
                      name="madde1"
                      rows="4"
                      value={formData.madde1}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-dark-700 dark:text-white"
                      placeholder="İşbu sözleşmenin konusu..."
                    ></textarea>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Bu içerik dokümandaki {'{MADDE_1}'} alanına yerleştirilecektir.
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="madde2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Madde 2 İçeriği
                    </label>
                    <textarea
                      id="madde2"
                      name="madde2"
                      rows="4"
                      value={formData.madde2}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-dark-700 dark:text-white"
                      placeholder="Tarafların yükümlülükleri..."
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="tarafAdi" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Taraf Adı
                      </label>
                      <input
                        type="text"
                        id="tarafAdi"
                        name="tarafAdi"
                        value={formData.tarafAdi}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-dark-700 dark:text-white"
                        placeholder="Adı Soyadı"
                      />
                    </div>
                    <div>
                      <label htmlFor="tarafTcKimlik" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        TC Kimlik No
                      </label>
                      <input
                        type="text"
                        id="tarafTcKimlik"
                        name="tarafTcKimlik"
                        value={formData.tarafTcKimlik}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-dark-700 dark:text-white"
                        placeholder="11111111111"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="sozlesmeTarihi" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Sözleşme Tarihi
                    </label>
                    <input
                      type="date"
                      id="sozlesmeTarihi"
                      name="sozlesmeTarihi"
                      value={formData.sozlesmeTarihi}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-dark-700 dark:text-white"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleClear}
                    className="px-6 py-2.5 border border-gray-300 dark:border-dark-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
                  >
                    Temizle
                  </button>
                  <button
                    type="submit"
                    disabled={docxStatus !== 'ready'}
                    className={`px-6 py-2.5 text-white font-medium rounded-lg transition-colors shadow-sm hover:shadow 
                      ${docxStatus === 'ready' ? 'bg-primary-600 hover:bg-primary-700' : 'bg-gray-400 cursor-not-allowed'}`}
                  >
                    {docxStatus === 'loading' ? 'Şablon Yükleniyor...' : 'Dokümanı İndir'}
                  </button>
                </div>
              </form>
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
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mr-2">
                      <svg className="w-2 h-2 mr-1 fill-current" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                      Şablon hazır
                    </span>
                  ) : docxStatus === 'loading' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 mr-2">
                      <svg className="w-2 h-2 mr-1 fill-current animate-pulse" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                      Yükleniyor...
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">
                      <svg className="w-2 h-2 mr-1 fill-current" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                      Hata
                    </span>
                  )}
                  
                  <button 
                    onClick={handleSubmit}
                    disabled={docxStatus !== 'ready'} 
                    className={`p-1.5 rounded-md flex items-center ${docxStatus === 'ready' 
                      ? 'hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-600 dark:text-gray-300' 
                      : 'text-gray-400 dark:text-gray-600 cursor-not-allowed'}`}
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
                  <div className="absolute inset-0 bg-white/50 dark:bg-dark-900/50 flex items-center justify-center z-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
                  </div>
                )}
                
                {/* Doküman içeriği */}
                <div 
                  className="p-10 bg-white dark:bg-dark-800 min-h-[600px] overflow-auto" 
                  style={{ 
                    fontFamily: 'Times New Roman, serif',
                    backgroundImage: 'linear-gradient(#f0f0f0 1px, transparent 1px), linear-gradient(90deg, #f0f0f0 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '-1px -1px'
                  }}
                >
                  <div className="max-w-xl mx-auto bg-white dark:bg-dark-800 p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="text-right mb-4 text-xs text-gray-500 dark:text-gray-400 flex justify-between items-center">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0112.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                        </svg>
                        test1.docx
                      </span>
                      <span>Önizleme</span>
                    </div>
                    
                    <h1 className="text-center font-bold text-xl mb-6">SÖZLEŞME</h1>
                    
                    <div className="mb-8">
                      <p className="mb-2">
                        <span className="font-bold">Tarih:</span> {formData.sozlesmeTarihi ? new Date(formData.sozlesmeTarihi).toLocaleDateString('tr-TR') : '__.__.____'}
                      </p>
                      <p className="mb-2">
                        <span className="font-bold">Taraf:</span> {formData.tarafAdi || '_________________'}
                      </p>
                      <p className="mb-2">
                        <span className="font-bold">TC Kimlik No:</span> {formData.tarafTcKimlik || '_______________'}
                      </p>
                    </div>
                    
                    <div className="mb-6">
                      <h2 className="font-bold text-lg mb-2">MADDE 1 - KONU</h2>
                      <p className="text-gray-800 dark:text-gray-200 text-justify">
                        {formData.madde1 || (
                          <span className="text-primary-500 dark:text-primary-400 italic">
                            {'{MADDE_1}'} alanı buraya eklenecektir
                          </span>
                        )}
                      </p>
                    </div>
                    
                    <div className="mb-6">
                      <h2 className="font-bold text-lg mb-2">MADDE 2 - YÜKÜMLÜLÜKLER</h2>
                      <p className="text-gray-800 dark:text-gray-200 text-justify">
                        {formData.madde2 || (
                          <span className="text-gray-400 dark:text-gray-500 italic">
                            {'{MADDE_2}'} alanı buraya eklenecektir
                          </span>
                        )}
                      </p>
                    </div>
                    
                    <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-700">
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <p className="font-bold mb-2">İmza:</p>
                          <div className="h-16 border-b border-gray-400 dark:border-gray-600"></div>
                          <p className="mt-1">Yetkili</p>
                        </div>
                        <div>
                          <p className="font-bold mb-2">İmza:</p>
                          <div className="h-16 border-b border-gray-400 dark:border-gray-600"></div>
                          <p className="mt-1">{formData.tarafAdi || 'İsim'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-dark-700 px-6 py-3 bg-gray-50 dark:bg-dark-750 flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <span>Sayfa 1/1</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                  <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-dark-700 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span>1</span>
                  <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-dark-700 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}