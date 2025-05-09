import { CheckCircleIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export function PricingCard({ price }) {
  const features = [
    "Word ve PDF formatında indirme",
    "Düzenlenebilir içerik",
    "1 yıl boyunca güncellemeler",
    "7/24 teknik destek"
  ];

  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Başlık şeridi */}
      <div className="bg-primary-50 dark:bg-primary-900/20 px-6 py-4 border-b border-primary-100 dark:border-primary-800/30">
        <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-300 text-center">
          Standart Paket
        </h3>
      </div>
      
      <div className="p-6">
        {/* Fiyat kısmı */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center">
            <span className="text-4xl font-bold text-gray-900 dark:text-gray-100 bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
              {price}
            </span>
            <span className="text-2xl font-bold ml-1 text-gray-800 dark:text-gray-200">₺</span>
          </div>
          <div className="mt-2 flex items-center justify-center space-x-1">
            <span className="text-sm text-gray-500 dark:text-gray-400">KDV Dahil</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
              Tek Seferlik Ödeme
            </span>
          </div>
        </div>

        {/* Özellikler listesi */}
        <ul className="space-y-3.5 mb-7">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* Satın alma butonu */}
        <button className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-dark-800 text-white py-3 px-4 rounded-lg transition-colors font-medium flex items-center justify-center">
          <span>Hemen Satın Al</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
        
        {/* Garanti notu */}
        <div className="mt-4 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
          <ShieldCheckIcon className="h-4 w-4 mr-1 text-primary-500 dark:text-primary-400" />
          <span>30 gün para iade garantisi</span>
        </div>
      </div>
    </div>
  );
}