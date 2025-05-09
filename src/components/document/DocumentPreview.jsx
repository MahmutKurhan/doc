import { EyeIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

export function DocumentPreview({ document }) {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm overflow-hidden mb-6 group">
      <div className="relative">
        {/* Önizleme Görseli */}
        <div className="aspect-[16/9] bg-gray-100 dark:bg-dark-700">
          {document.image ? (
            <img
              src={document.image}
              alt={document.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <ArrowDownTrayIcon className="h-16 w-16 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">Görsel mevcut değil</span>
            </div>
          )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="space-y-3">
            <h3 className="text-white text-lg font-medium text-center">
              {document.title}
            </h3>
            <button className="inline-flex items-center px-4 py-2 rounded-lg bg-white text-gray-900 hover:bg-gray-100 transition-colors">
              <EyeIcon className="h-5 w-5 mr-2" />
              <span className="font-medium">Tam Ekran Görüntüle</span>
            </button>
          </div>
        </div>

        {/* Alt Bilgi Çubuğu */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent">
          <div className="p-4 flex items-center justify-between text-white">
            <div>
              <p className="text-sm font-medium">{document.fileType?.toUpperCase()}</p>
              <p className="text-xs opacity-75">{document.fileSize}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <EyeIcon className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium">{document.rating} / 5</span>
              </div>
              <div className="flex items-center">
                <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium">{document.downloadCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}