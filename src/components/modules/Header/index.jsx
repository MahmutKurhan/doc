// Import Dependencies
import { Link } from "react-router"; // react-router-dom yerine react-router kullanıldı
import { Fragment, useEffect, useState } from "react";
import { Popover, Transition, Menu } from "@headlessui/react";
import {
  ShoppingCartIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  SunIcon, // Gündüz modu ikonu için eklendi
  MoonIcon // Gece modu ikonu için eklendi
} from "@heroicons/react/24/outline";

// Local Imports
import Logo from "assets/appLogo.svg?react";
import LogoType from "assets/logotype.svg?react";

// ----------------------------------------------------------------------

// Navigation menü öğeleri
const navigation = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Dökümanlar", href: "/documents" },
  { name: "Hakkımızda", href: "/about" },
  { name: "İletişim", href: "/contact" },
];

// Dil seçenekleri
const languages = [
  { name: "Türkçe", code: "tr", flag: "🇹🇷" },
  { name: "English", code: "en", flag: "🇬🇧" },
  { name: "Deutsch", code: "de", flag: "🇩🇪" },
  { name: "Français", code: "fr", flag: "🇫🇷" },
];

// CSS stillerini head'e ekleyelim
const injectStyles = () => {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = `
      .nav-link {
        position: relative;
      }
      
      .nav-link::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: -2px;
        left: 0;
        background-color: var(--primary-500, #3b82f6);
        transition: width 0.3s ease-in-out;
      }
      
      .dark .nav-link::after {
        background-color: var(--primary-400, #60a5fa);
      }
      
      .nav-link:hover::after {
        width: 100%;
      }
      
      .nav-link.active::after {
        width: 100%;
      }
    `;
    document.head.appendChild(style);
  }
};

export function PublicHeader({ cartItemCount = 0 }) {
  // useLocation yerine manuel olarak aktif patika kontrolü
  const [currentPath, setCurrentPath] = useState("/");
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    // Sayfa yüklendiğinde ve URL değiştiğinde çalışacak
    setCurrentPath(window.location.pathname);
    
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    
    // Tarayıcı geçmişi değiştiğinde güncelle
    window.addEventListener('popstate', handleLocationChange);
    
    // CSS stillerini ekle
    injectStyles();
    
    // Mevcut tema durumunu kontrol et
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const isDarkMode = localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
      
      setDarkMode(isDarkMode);
      
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);
  
  // Tema değiştirme fonksiyonu
  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      
      return newMode;
    });
  };
  
  // Aktif bağlantıyı kontrol eden fonksiyon
  const isActive = (path) => {
    return currentPath === path;
  };
  
  // Dil değiştirme işlevi
  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    // Burada dil değişimi için gerekli işlemleri yapabilirsiniz
    // Örneğin i18n kütüphanesi ile dil değişimi, locale ayarı vb.
  };

  return (
    <header className="transition-content sticky top-0 z-20 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur backdrop-saturate-150 dark:border-dark-600 dark:bg-dark-900/95">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Popover>
          <div className="flex h-16 items-center justify-between">
            {/* Logo ve site başlığı */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <Logo className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                <LogoType className="hidden h-5 w-auto text-gray-800 dark:text-dark-50 sm:block" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:justify-end md:gap-x-6">
              <nav className="flex space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`nav-link inline-flex items-center border-b-0 px-1 pt-1 text-sm font-medium ${
                      isActive(item.href)
                        ? "active text-primary-600 dark:text-primary-400"
                        : "text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              
              <div className="flex items-center gap-x-4 border-l border-gray-200 pl-6 dark:border-dark-600">
                {/* Tema Değiştirme Butonu */}
                <button 
                  onClick={toggleDarkMode}
                  className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors"
                  aria-label={darkMode ? "Gündüz moduna geç" : "Gece moduna geç"}
                >
                  {darkMode ? (
                    <SunIcon className="h-5 w-5" />
                  ) : (
                    <MoonIcon className="h-5 w-5" />
                  )}
                </button>
                
                {/* Dil Seçimi */}
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">
                      <span className="mr-1">{currentLanguage.flag}</span>
                      <span className="hidden sm:inline-block text-sm font-medium mr-1">{currentLanguage.code.toUpperCase()}</span>
                      <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-dark-800">
                      <div className="py-1">
                        {languages.map((language) => (
                          <Menu.Item key={language.code}>
                            {({ active }) => (
                              <button
                                onClick={() => handleLanguageChange(language)}
                                className={`${
                                  active 
                                    ? 'bg-gray-100 text-gray-900 dark:bg-dark-700 dark:text-white' 
                                    : 'text-gray-700 dark:text-gray-300'
                                } group flex w-full items-center px-4 py-2 text-sm`}
                              >
                                <span className="mr-3 text-lg">{language.flag}</span>
                                <span>{language.name}</span>
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <Link
                  to="/cart"
                  className="group relative text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-xs text-white">
                    {cartItemCount}
                  </span>
                </Link>
                <Link
                  to="/account"
                  className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
                >
                  <UserIcon className="h-6 w-6" />
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-dark-800 dark:hover:text-white">
                <span className="sr-only">Menüyü aç</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
          </div>

          {/* Mobile menu panel */}
          <Transition
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute inset-x-0 top-0 z-30 origin-top-right transform bg-white p-2 transition md:hidden dark:bg-dark-900"
            >
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 dark:divide-dark-700">
                <div className="px-5 pt-4 pb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Logo className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                      <LogoType className="h-5 w-auto ml-2 text-gray-800 dark:text-dark-50" />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-dark-800 dark:hover:text-white">
                        <span className="sr-only">Menüyü kapat</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid gap-y-8">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`-m-3 flex items-center rounded-md p-3 ${
                            isActive(item.href)
                              ? "bg-gray-100 dark:bg-dark-800"
                              : "hover:bg-gray-50 dark:hover:bg-dark-800"
                          }`}
                        >
                          <span className={`text-base font-medium ${
                            isActive(item.href)
                              ? "text-primary-600 dark:text-primary-400"
                              : "text-gray-700 dark:text-gray-300"
                          }`}>
                            {item.name}
                          </span>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
                <div className="px-5 py-6">
                  <div className="flex flex-col space-y-4">
                    {/* Tema Değiştirme Butonu (Mobil) */}
                    <div className="border-b border-gray-200 pb-4 dark:border-dark-700">
                      <button
                        onClick={toggleDarkMode}
                        className="flex items-center justify-center w-full px-3 py-2 rounded-md bg-gray-50 text-gray-800 hover:bg-gray-100 dark:bg-dark-800 dark:text-gray-200 dark:hover:bg-dark-700"
                      >
                        {darkMode ? (
                          <>
                            <SunIcon className="h-5 w-5 mr-2" />
                            Gündüz Moduna Geç
                          </>
                        ) : (
                          <>
                            <MoonIcon className="h-5 w-5 mr-2" />
                            Gece Moduna Geç
                          </>
                        )}
                      </button>
                    </div>
                    
                    {/* Mobil görünüm için dil seçenekleri */}
                    <div className="border-b border-gray-200 pb-4 dark:border-dark-700">
                      <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Dil Seçimi</p>
                      <div className="grid grid-cols-2 gap-2">
                        {languages.map((language) => (
                          <button
                            key={language.code}
                            onClick={() => handleLanguageChange(language)}
                            className={`flex items-center justify-center rounded-md py-2 px-3 text-sm ${
                              currentLanguage.code === language.code
                                ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                                : 'bg-gray-50 text-gray-800 hover:bg-gray-100 dark:bg-dark-800 dark:text-gray-200 dark:hover:bg-dark-700'
                            }`}
                          >
                            <span className="mr-2 text-lg">{language.flag}</span>
                            {language.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Link
                        to="/account"
                        className="flex items-center text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                      >
                        <UserIcon className="h-5 w-5 mr-2" />
                        Hesabım
                      </Link>
                      <Link
                        to="/cart"
                        className="flex items-center text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                      >
                        <ShoppingCartIcon className="h-5 w-5 mr-2" />
                        Sepetim
                        <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs text-white">
                          {cartItemCount}
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </header>
  );
}