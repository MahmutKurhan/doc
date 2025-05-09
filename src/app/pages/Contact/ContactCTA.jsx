import { motion } from "framer-motion";

export function ContactCTA() {
  return (
    <section className="bg-primary-600 dark:bg-primary-900 py-16 relative overflow-hidden">
      {/* Dekoratif Elementler */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute right-0 top-0 h-full w-1/3" viewBox="0 0 400 400" fill="none">
          <g opacity="0.3" stroke="white" strokeWidth="2">
            <circle cx="200" cy="200" r="100" />
            <circle cx="200" cy="200" r="150" />
            <circle cx="200" cy="200" r="50" />
            <line x1="0" y1="200" x2="400" y2="200" />
            <line x1="200" y1="0" x2="200" y2="400" />
          </g>
        </svg>
        <svg className="absolute left-0 bottom-0 h-full w-1/3" viewBox="0 0 400 400" fill="none">
          <g opacity="0.3" stroke="white" strokeWidth="2">
            <path d="M0,100 L400,100" />
            <path d="M0,150 L400,150" />
            <path d="M0,200 L400,200" />
            <path d="M0,250 L400,250" />
            <path d="M0,300 L400,300" />
          </g>
        </svg>
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Hızlı İletişim
          </motion.h2>
          <motion.p 
            className="text-xl text-primary-100 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Acil hukuki desteğe mi ihtiyacınız var? 7/24 hizmet veren destek ekibimizle hemen iletişime geçin.
          </motion.p>
          
          <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-10">
            <motion.a 
              href="tel:+902121234567"
              className="flex items-center justify-center bg-white text-primary-700 px-8 py-4 rounded-xl font-medium hover:bg-primary-50 transition-colors"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +90 (212) 123 45 67
            </motion.a>
            
            <motion.a 
              href="https://wa.me/902121234567"
              className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-medium transition-colors"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347s-1.758-.868-2.031-.967-.47-.149-.669.149-.768.967-.941 1.165-.347.223-.644.074-1.255-.462-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059s-.018-.458.129-.606c.132-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521s-.669-1.611-.916-2.206c-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              WhatsApp İletişim
            </motion.a>
            
            <motion.a 
              href="mailto:info@legalplatform.com"
              className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-medium transition-colors"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              E-posta Gönder
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}