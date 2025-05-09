import { useState } from "react";
import { motion } from "framer-motion";

export function ContactForm() {
  // Form durumunu yönetmek için state tanımlama
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  // Form doğrulama durumu
  const [validation, setValidation] = useState({
    name: { valid: true, message: "" },
    email: { valid: true, message: "" },
    phone: { valid: true, message: "" },
    subject: { valid: true, message: "" },
    message: { valid: true, message: "" }
  });
  
  // Form gönderimi için yükleme durumu
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
  
  // Form değişikliklerini izleme ve doğrulama
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    
    // Gerçek zamanlı doğrulama
    validateField(name, value);
  };
  
  // Alan doğrulama
  const validateField = (name, value) => {
    let fieldValidation = { valid: true, message: "" };
    
    switch(name) {
      case "name":
        if (value.trim().length < 3) {
          fieldValidation = {
            valid: false,
            message: "İsim en az 3 karakter olmalıdır"
          };
        }
        break;
      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          fieldValidation = {
            valid: false,
            message: "Geçerli bir e-posta adresi giriniz"
          };
        }
        break;
      }
      case "phone": {
        const phoneRegex = /^(\+90|0)?\s*([1-9][0-9]{2})\s*([0-9]{3})\s*([0-9]{2})\s*([0-9]{2})$/;
        if (value && !phoneRegex.test(value.replace(/\s/g, ''))) {
          fieldValidation = {
            valid: false,
            message: "Geçerli bir telefon numarası giriniz (örn: 0555 123 45 67)"
          };
        }
        break;
      }
      case "subject":
        if (value.trim().length < 5) {
          fieldValidation = {
            valid: false,
            message: "Konu en az 5 karakter olmalıdır"
          };
        }
        break;
      case "message":
        if (value.trim().length < 20) {
          fieldValidation = {
            valid: false,
            message: "Mesajınız en az 20 karakter olmalıdır"
          };
        }
        break;
      default:
        break;
    }
    
    setValidation(prev => ({
      ...prev,
      [name]: fieldValidation
    }));
    
    return fieldValidation.valid;
  };
  
  // Form gönderimi
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Tüm alanları doğrula
    let isFormValid = true;
    
    Object.keys(formState).forEach(key => {
      // Telefon alanı isteğe bağlı olsun
      if (key === 'phone' && !formState[key]) return;
      
      const isFieldValid = validateField(key, formState[key]);
      if (!isFieldValid) isFormValid = false;
    });
    
    if (!isFormValid) return;
    
    setIsSubmitting(true);
    
    try {
      // API çağrısı simülasyonu
      await new Promise(resolve => setTimeout(resolve, 1800));
      
      // Form başarılı gönderildi, isSuccess'i true yapın
      setIsSuccess(true);
      
      // Formu sıfırlayın
      setFormState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      
      // KVKK onayını sıfırlayın
      setIsPrivacyChecked(false);
      
      // 4 saniye sonra başarı mesajını kaldır
      setTimeout(() => {
        setIsSuccess(false);
      }, 4000);
      
    } catch (error) {
      console.error("Form gönderimi sırasında hata oluştu:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrivacyChange = (e) => {
    setIsPrivacyChecked(e.target.checked);
  };

  return (
    <div className="grid md:grid-cols-5 gap-6"> {/* Artan boşluk */}
      {/* Sol Bölüm: İletişim Formu */}
      <div className="md:col-span-3 p-6 sm:p-8 bg-white dark:bg-dark-800 rounded-2xl border border-gray-100 dark:border-dark-700 shadow-sm dark:shadow-dark-900/10">
        {/* Başlık daha minimal */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Bizimle İletişime Geçin</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Hukuki danışmanlık için formu doldurarak mesajınızı bırakabilirsiniz.
          </p>
        </div>
        
        {isSuccess && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 rounded-lg p-4 mb-6 flex items-center">
            <svg className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-green-700 dark:text-green-300">Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.</p>
          </div>
        )}
        
        <motion.form 
          onSubmit={handleSubmit}
          className="space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* İsim Alanı - daha sade */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                İsim Soyisim
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                className={`block w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-700 border ${
                  validation.name.valid ? 'border-gray-200 dark:border-dark-600' : 'border-red-500 dark:border-red-500'
                } rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:focus:border-primary-500 transition-colors`}
                placeholder="Adınız ve soyadınız"
                required
              />
              {!validation.name.valid && (
                <p className="mt-1 text-xs text-red-500">
                  {validation.name.message}
                </p>
              )}
            </div>

            {/* Email Alanı - daha sade */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                E-posta
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                className={`block w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-700 border ${
                  validation.email.valid ? 'border-gray-200 dark:border-dark-600' : 'border-red-500 dark:border-red-500'
                } rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:focus:border-primary-500 transition-colors`}
                placeholder="email@adresiniz.com"
                required
              />
              {!validation.email.valid && (
                <p className="mt-1 text-xs text-red-500">
                  {validation.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Telefon Alanı - daha sade */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Telefon <span className="text-gray-400 dark:text-gray-500 text-xs font-normal">(İsteğe bağlı)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formState.phone}
                onChange={handleChange}
                className={`block w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-700 border ${
                  validation.phone.valid ? 'border-gray-200 dark:border-dark-600' : 'border-red-500 dark:border-red-500'
                } rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:focus:border-primary-500 transition-colors`}
                placeholder="0555 123 45 67"
              />
              {!validation.phone.valid && (
                <p className="mt-1 text-xs text-red-500">
                  {validation.phone.message}
                </p>
              )}
            </div>

            {/* Konu Alanı - daha sade */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Konu
              </label>
              <div className="relative">
                <select
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  className={`block w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-700 border ${
                    validation.subject.valid ? 'border-gray-200 dark:border-dark-600' : 'border-red-500 dark:border-red-500'
                  } rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:focus:border-primary-500 transition-colors appearance-none`}
                  required
                >
                  <option value="">Seçiniz...</option>
                  <option value="Hukuki Danışmanlık">Hukuki Danışmanlık</option>
                  <option value="Dava Süreci">Dava Süreci</option>
                  <option value="Sözleşme İnceleme">Sözleşme İnceleme</option>
                  <option value="İş Hukuku">İş Hukuku</option>
                  <option value="Aile Hukuku">Aile Hukuku</option>
                  <option value="Diğer">Diğer</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {!validation.subject.valid && (
                <p className="mt-1 text-xs text-red-500">
                  {validation.subject.message}
                </p>
              )}
            </div>
          </div>

          {/* Mesaj Alanı - daha sade */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Mesajınız
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formState.message}
              onChange={handleChange}
              className={`block w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-700 border ${
                validation.message.valid ? 'border-gray-200 dark:border-dark-600' : 'border-red-500 dark:border-red-500'
              } rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:focus:border-primary-500 transition-colors resize-none`}
              placeholder="Hukuki talebinizi veya sorunuzu anlatın..."
              required
            ></textarea>
            {!validation.message.valid && (
              <p className="mt-1 text-xs text-red-500">
                {validation.message.message}
              </p>
            )}
          </div>

          {/* KVKK Onay - daha sade */}
          <div className="flex items-start">
            <input
              id="privacy"
              name="privacy"
              type="checkbox"
              checked={isPrivacyChecked}
              onChange={handlePrivacyChange}
              required
              className="h-4 w-4 mt-1 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="privacy" className="ml-3 text-sm text-gray-500 dark:text-gray-400">
              <a href="/kvkk" className="text-primary-600 dark:text-primary-400 hover:underline">KVKK Aydınlatma Metni</a>&apos;ni okudum ve kabul ediyorum.
            </label>
          </div>

          {/* Gönder Butonu - daha sade */}
          <div className="pt-2">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg flex items-center justify-center transition-all"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <span className="inline-flex items-center">
                  <svg className="animate-spin mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Gönderiliyor...
                </span>
              ) : (
                <span>Gönder</span>
              )}
            </motion.button>
          </div>
        </motion.form>
      </div>
      
      {/* Sağ Bölüm: İletişim Bilgileri ve Harita */}
      <div className="md:col-span-2 rounded-2xl overflow-hidden">
        {/* Harita, üstte */}
        <div className="h-48 md:h-56 lg:h-64 bg-gray-200 dark:bg-dark-600 relative">
          <div id="contact-map" className="absolute inset-0 w-full h-full"></div>
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200/30 dark:bg-dark-600/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
        
        {/* İletişim Bilgileri, altta */}
        <div className="p-6 md:p-8 bg-white dark:bg-dark-800 border-t border-gray-100 dark:border-dark-700 rounded-b-2xl shadow-sm dark:shadow-dark-900/10">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">İletişim</h3>
          
          <ul className="space-y-4 text-sm">
            <li className="flex items-start space-x-3">
              <svg className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-gray-600 dark:text-gray-300">
                Levent Mah. Büyükdere Cad. No:201<br />
                D:77 Şişli, İstanbul 34394
              </span>
            </li>
            
            <li className="flex items-center space-x-3">
              <svg className="h-5 w-5 text-primary-500 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:+902121234567" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                +90 (212) 123 45 67
              </a>
            </li>
            
            <li className="flex items-center space-x-3">
              <svg className="h-5 w-5 text-primary-500 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:info@legalplatform.com" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                info@legalplatform.com
              </a>
            </li>
            
            <li className="flex items-start space-x-3">
              <svg className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-600 dark:text-gray-300">
                Pazartesi - Cuma: 09:00 - 18:00<br />
                Cumartesi: 10:00 - 14:00
              </span>
            </li>
          </ul>
          
          {/* Sosyal Medya - daha küçük ve minimal */}
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-dark-700">
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}