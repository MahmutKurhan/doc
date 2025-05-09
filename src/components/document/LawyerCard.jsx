import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import { BriefcaseIcon } from "@heroicons/react/24/outline";

export function LawyerCard({ lawyer, className }) {
  return (
    <div className={`p-6 bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 ${className}`}>
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
        Hazırlayan Avukat
      </h3>
      
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={lawyer.photo}
          alt={lawyer.name}
          className="h-16 w-16 rounded-full object-cover border-2 border-primary-100 dark:border-primary-900"
        />
        <div>
          <p className="font-medium text-gray-900 dark:text-gray-100">
            {lawyer.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {lawyer.specialization}
          </p>
          <div className="mt-1 flex items-center">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.floor(lawyer.rating || 4.5) ? (
                  <StarSolidIcon className="h-4 w-4 text-yellow-400" />
                ) : (
                  <StarIcon className="h-4 w-4 text-yellow-400" />
                )}
              </span>
            ))}
            <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
              ({lawyer.reviewCount})
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Deneyim Bilgisi */}
        <div className="border-t border-gray-200 dark:border-dark-700 pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400 flex items-center">
              <BriefcaseIcon className="h-4 w-4 mr-1" />
              Deneyim
            </span>
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {lawyer.experience} yıl
            </span>
          </div>
        </div>

        {/* Uzmanlık Alanları */}
        <div className="border-t border-gray-200 dark:border-dark-700 pt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Uzmanlık Alanları
          </p>
          <div className="flex flex-wrap gap-2">
            {lawyer.expertise?.map(area => (
              <span
                key={area}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* İletişim Butonları */}
        <div className="border-t border-gray-200 dark:border-dark-700 pt-4">
          <div className="grid grid-cols-2 gap-3">
            <button className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
              İletişime Geç
            </button>
            <button className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-dark-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-700">
              Profili Gör
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}