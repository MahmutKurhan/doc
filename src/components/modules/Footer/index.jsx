// Import Dependencies
import { Link } from "react-router"; // react-router-dom yerine react-router kullanıldı
import { useState, useEffect } from "react";

// Import Icons
import {
  BuildingOfficeIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  MapPinIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

// Local Imports
import Logo from "assets/appLogo.svg?react";
import LogoType from "assets/logotype.svg?react";

// ----------------------------------------------------------------------

// CSS stillerini head'e ekleyelim
const injectStyles = () => {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = `
      .footer-link {
        position: relative;
        display: inline-block;
        transition: all 0.2s ease-in-out;
      }
      
      .footer-link::after {
        content: '';
        position: absolute;
        width: 0;
        height: 1px;
        bottom: -2px;
        left: 0;
        background-color: var(--primary-500, #3b82f6);
        transition: width 0.3s ease-in-out;
      }
      
      .dark .footer-link::after {
        background-color: var(--primary-400, #60a5fa);
      }
      
      .footer-link:hover::after {
        width: 100%;
      }
      
      .scroll-top-button {
        position: fixed;
        right: 20px;
        bottom: 20px;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 50;
      }
      
      .scroll-top-button.visible {
        opacity: 1;
        transform: translateY(0);
      }
      
      @media (prefers-reduced-motion) {
        .scroll-top-button {
          transition: opacity 0.1s ease;
          transform: none;
        }
      }
    `;
    document.head.appendChild(style);
  }
};

const footerLinks = [
  {
    title: "Şirket",
    links: [
      { label: "Hakkımızda", href: "/about" },
      { label: "Ekibimiz", href: "/team" },
      { label: "Kariyer", href: "/careers" },
      { label: "İletişim", href: "/contact" },
    ],
  },
  {
    title: "Hizmetler",
    links: [
      { label: "Hukuki Danışmanlık", href: "/services/legal-consultancy" },
      { label: "Sözleşme Hazırlama", href: "/services/contracts" },
      { label: "Davalar", href: "/services/lawsuits" },
      { label: "KVKK Uyumu", href: "/services/data-protection" },
    ],
  },
  {
    title: "Destek",
    links: [
      { label: "SSS", href: "/faq" },
      { label: "Yardım Merkezi", href: "/help" },
      { label: "Dökümanlar", href: "/documents" },
      { label: "Kullanım Koşulları", href: "/terms" },
      { label: "Gizlilik Politikası", href: "/privacy" },
      { label: "Çerez Politikası", href: "/cookies" },
    ],
  },
];

const contactInfo = {
  address: "Bağdat Caddesi No: 123 Kadıköy, İstanbul",
  phone: "+90 216 123 45 67",
  email: "info@legalfirm.com.tr",
  companyName: "Legal Danışmanlık & Avukatlık A.Ş.",
};

// ----------------------------------------------------------------------

export function MainFooter({ scrollToTopButton = true }) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  useEffect(() => {
    injectStyles();
    
    if (scrollToTopButton) {
      const handleScroll = () => {
        if (window.scrollY > 500) {
          setShowScrollTop(true);
        } else {
          setShowScrollTop(false);
        }
      };
      
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [scrollToTopButton]);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  return (
    <footer className="bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-dark-700">
      {/* Ana Footer İçeriği */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 md:grid-cols-2">
          {/* Logo ve İletişim Bilgileri */}
          <div className="space-y-6">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <Logo className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                <LogoType className="h-5 w-auto text-gray-800 dark:text-dark-50" />
              </Link>
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-4">
              <div className="flex items-start gap-3">
                <BuildingOfficeIcon className="h-5 w-5 flex-shrink-0 text-gray-400 dark:text-gray-500" />
                <span>{contactInfo.companyName}</span>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPinIcon className="h-5 w-5 flex-shrink-0 text-gray-400 dark:text-gray-500" />
                <span>{contactInfo.address}</span>
              </div>
              
              <div className="flex items-start gap-3">
                <DevicePhoneMobileIcon className="h-5 w-5 flex-shrink-0 text-gray-400 dark:text-gray-500" />
                <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="footer-link hover:text-primary-600 dark:hover:text-primary-400">
                  {contactInfo.phone}
                </a>
              </div>
              
              <div className="flex items-start gap-3">
                <EnvelopeIcon className="h-5 w-5 flex-shrink-0 text-gray-400 dark:text-gray-500" />
                <a href={`mailto:${contactInfo.email}`} className="footer-link hover:text-primary-600 dark:hover:text-primary-400">
                  {contactInfo.email}
                </a>
              </div>
            </div>
          </div>
          
          {/* Link Grupları */}
          {footerLinks.map((group) => (
            <div key={group.title} className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-600 dark:text-gray-300 footer-link hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      {/* Alt Footer */}
      <div className="bg-gray-50 dark:bg-dark-800 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} {contactInfo.companyName}. Tüm hakları saklıdır.
          </div>
          
          <div className="flex items-center space-x-6">
            <Link to="/terms" className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              Kullanım Koşulları
            </Link>
            <Link to="/privacy" className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              Gizlilik Politikası
            </Link>
            <Link to="/cookies" className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              Çerez Politikası
            </Link>
          </div>
        </div>
      </div>
      
      {/* Sayfa Başına Dön Butonu */}
      {scrollToTopButton && (
        <button 
          onClick={scrollToTop} 
          className={`scroll-top-button rounded-full bg-white p-2 text-gray-600 shadow-lg ring-1 ring-gray-200 hover:bg-gray-50 dark:bg-dark-800 dark:text-gray-300 dark:ring-dark-700 dark:hover:bg-dark-700 ${showScrollTop ? 'visible' : ''}`}
          aria-label="Sayfa başına dön"
        >
          <ChevronUpIcon className="h-5 w-5" />
        </button>
      )}
    </footer>
  );
}

// Basitleştirilmiş Footer (Küçük sayfalar için)
export function SimpleFooter() {
  useEffect(() => {
    injectStyles();
  }, []);
  
  return (
    <footer className="bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-dark-700 py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Logo className="h-7 w-7 text-primary-600 dark:text-primary-400" />
              <LogoType className="h-4 w-auto text-gray-800 dark:text-dark-50" />
            </Link>
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} {contactInfo.companyName}. Tüm hakları saklıdır.
          </div>
          
          <div className="flex items-center space-x-5">
            <Link to="/terms" className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              Kullanım Koşulları
            </Link>
            <Link to="/privacy" className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              Gizlilik Politikası
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}