import { motion } from "framer-motion";

export function ContactHero() {
  return (
    <motion.section 
      className="relative bg-gradient-to-b from-primary-50 to-white dark:from-dark-800 dark:to-dark-900 overflow-hidden py-16 sm:py-24 lg:py-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animasyonlu Arka Plan */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          <svg className="h-full w-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="2" fill="currentColor" className="text-primary-500 dark:text-primary-400" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* 3D Terazi Animasyonu - Sağ Köşe */}
        <motion.div 
          className="absolute right-0 top-0 w-64 h-64 md:w-96 md:h-96 opacity-10 dark:opacity-5"
          initial={{ rotate: -10, y: -20 }}
          animate={{ rotate: 0, y: 0 }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "reverse", 
            duration: 6,
            ease: "easeInOut"
          }}
        >
          <svg className="w-full h-full text-primary-700 dark:text-primary-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3C10.9 3 10 3.9 10 5H14C14 3.9 13.1 3 12 3M12 5C7 5 2.73 8.11 1 12.5 2.73 16.89 7 20 12 20S21.27 16.89 23 12.5C21.27 8.11 17 5 12 5M12 7C14.76 7 17 9.24 17 12S14.76 17 12 17 7 14.76 7 12 9.24 7 12 7M12 9C10.34 9 9 10.34 9 12S10.34 15 12 15 15 13.66 15 12 13.66 9 12 9Z" />
          </svg>
        </motion.div>
        
        {/* Animasyonlu Çizgiler - Sol Köşe */}
        <div className="absolute left-0 bottom-0 md:left-10 w-64 h-64 md:w-96 md:h-96 opacity-10 dark:opacity-5">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-primary-500 via-primary-600 to-transparent"
              style={{ top: `${i * 20}%` }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ 
                duration: 1.5, 
                delay: i * 0.2,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <motion.div 
            className="lg:col-span-6 text-center lg:text-left"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              <span className="block text-gray-900 dark:text-white">Her Zaman</span>
              <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Yanınızdayız
              </span>
            </h1>
            <p className="mx-auto lg:mx-0 mt-4 max-w-3xl text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Hukuki ihtiyaçlarınız için size özel çözümler sunuyoruz. Sorularınızı yanıtlamak, 
              süreçlerinizi hızlandırmak ve haklarınızı korumak için buradayız.
            </p>
            
            {/* CTA Butonları */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.a 
                href="#contact-form"
                className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl shadow-lg shadow-primary-500/20 flex items-center justify-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Bizimle İletişime Geçin
              </motion.a>
              <motion.a 
                href="tel:+902121234567"
                className="px-8 py-4 bg-white hover:bg-gray-50 text-primary-700 border border-primary-100 font-medium rounded-xl shadow-lg shadow-primary-500/10 flex items-center justify-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Hemen Arayın
              </motion.a>
            </div>
          </motion.div>
          
          {/* Adalet Terazisi Animasyonu */}
          <motion.div
            className="hidden lg:flex lg:col-span-6 justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="relative w-[350px] h-[350px]">
              {/* Terazi Zemini */}
              <motion.div 
                className="absolute bottom-0 w-full h-1/3 flex items-end justify-center"
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <div className="w-2/3 h-4 bg-primary-700 dark:bg-primary-800 rounded-t-md" />
              </motion.div>
              
              {/* Terazi Merkez Direği */}
              <motion.div 
                className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4 h-48 bg-gradient-to-t from-primary-800 to-primary-600 dark:from-primary-900 dark:to-primary-700"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1, delay: 1.3 }}
              />
              
              {/* Terazi Üst Çubuk */}
              <motion.div
                className="absolute top-20 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-primary-700 dark:bg-primary-800 rounded-full"
                initial={{ scaleX: 0, rotateZ: 0 }}
                animate={{ 
                  scaleX: 1, 
                  rotateZ: [-1, 1, -0.5, 0.5, 0], // Hafif sallanma efekti
                }}
                transition={{ 
                  duration: 1, 
                  delay: 1.4,
                  rotateZ: {
                    delay: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 4,
                    ease: "easeInOut" 
                  }
                }}
              >
                {/* Terazi Kefesi Sol */}
                <motion.div 
                  className="absolute -bottom-28 -left-2 w-24 h-24 rounded-full border-4 border-primary-600 dark:border-primary-700 flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    y: [0, -8, 0], // Yukarı-aşağı hafif sallanma efekti
                  }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 1.8,
                    y: {
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 2,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/40 rounded-full" />
                </motion.div>
                
                {/* Terazi Kefesi Sağ */}
                <motion.div
                  className="absolute -bottom-24 -right-2 w-24 h-24 rounded-full border-4 border-primary-600 dark:border-primary-700 flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.9 }}
                >
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/40 rounded-full" />
                </motion.div>
                
                {/* Terazi Keseleri Bağlantı İpi Sol */}
                <motion.div 
                  className="absolute top-0 left-0 w-px h-28 bg-primary-600 dark:bg-primary-700 origin-top"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.7, delay: 1.6 }}
                />
                
                {/* Terazi Keseleri Bağlantı İpi Sağ */}
                <motion.div 
                  className="absolute top-0 right-0 w-px h-24 bg-primary-600 dark:bg-primary-700 origin-top"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.7, delay: 1.6 }}
                />
              </motion.div>
              
              {/* Terazi Kafası */}
              <motion.div 
                className="absolute top-12 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary-500 dark:bg-primary-600 rounded-full overflow-hidden"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  delay: 1.5 
                }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ 
                    repeat: Infinity,
                    repeatDelay: 3,
                    duration: 1.5,
                    delay: 2
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white dark:to-dark-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      ></motion.div>
    </motion.section>
  );
}