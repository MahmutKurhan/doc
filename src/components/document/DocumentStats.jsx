import { 
  DocumentIcon, 
  StarIcon, 
  ArrowDownTrayIcon, 
  CalendarDaysIcon,
  TagIcon,
  DocumentArrowDownIcon
} from "@heroicons/react/24/outline";

export function DocumentStats({ document }) {
  const stats = [
    { 
      label: 'Dosya Türü', 
      value: document.fileType.toUpperCase(),
      icon: <DocumentIcon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
    },
    { 
      label: 'Dosya Boyutu', 
      value: document.fileSize,
      icon: <DocumentArrowDownIcon className="h-5 w-5 text-gray-400" /> // veya DocumentTextIcon
    },
    { 
      label: 'İndirilme', 
      value: document.downloadCount,
      icon: <ArrowDownTrayIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
    },
    { 
      label: 'Değerlendirme', 
      value: `${document.rating}/5`,
      icon: <StarIcon className="h-5 w-5 text-amber-500 dark:text-amber-400" /> 
    },
    { 
      label: 'Son Güncelleme', 
      value: document.lastUpdate,
      icon: <CalendarDaysIcon className="h-5 w-5 text-gray-400" />
    },
    { 
      label: 'Versiyon', 
      value: document.version || '1.0',
      icon: <TagIcon className="h-5 w-5 text-gray-400" /> // veya CodeBracketIcon
    }
  ];

  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
        Belge Bilgileri
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div 
            key={stat.label} 
            className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-dark-700 hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors duration-200"
          >
            <div className="flex-shrink-0 mr-2">
              {stat.icon}
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}