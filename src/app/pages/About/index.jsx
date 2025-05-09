import { motion } from "framer-motion";
import { Page } from "components/shared/Page";
import { PublicHeader } from "components/modules/Header";
import { MainFooter } from "components/modules/Footer";
import { TeamSection } from "./TeamSection";
import { TestimonialsSection } from "./TestimonialsSection";

export default function About() {
  return (
    <Page title="Hakkımızda | Legal Platform" description="20 yılı aşkın hukuki deneyimimizle yanınızdayız">
      <PublicHeader />
      
      {/* Hero Bölümü */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-dark-900/80 dark:to-dark-800">
        {/* Arkaplan deseni */}
        <div className="absolute inset-0 overflow-hidden mix-blend-soft-light opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: "url('/images/patterns/grid.svg')", backgroundSize: '24px' }}></div>
        </div>
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-80 dark:opacity-40">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 800 800" preserveAspectRatio="xMaxYMid slice">
              <defs>
                <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.05" />
                  <stop offset="70%" stopColor="#4F46E5" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.1" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              
              {/* Gelişmiş arka plan şekli */}
              <path 
                d="M400,0 L800,0 L800,800 L200,800 C300,600 600,700 400,300 C250,0 350,150 400,0Z" 
                fill="url(#heroGradient)" 
              />
              
              {/* Hukuk teması ana öğeleri */}
              <g opacity="0.6" filter="url(#glow)">
                <circle cx="650" cy="250" r="80" fill="url(#circleGradient)" opacity="0.7" />
                <circle cx="550" cy="450" r="40" fill="url(#circleGradient)" opacity="0.5" />
              </g>
              
     
              
              {/* Hukuk çekici simgesi */}
              <g transform="translate(670, 400)" opacity="0.7">
                <rect x="-15" y="-40" width="30" height="80" rx="5" fill="currentColor" />
                <rect x="-30" y="-50" width="60" height="20" rx="4" fill="currentColor" />
              </g>
              
            </svg>
          </div>
        </div>
        
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight drop-shadow-sm">
                Hukuk Alanında 
                <span className="relative inline-block px-2">
                  <span className="absolute inset-0 transform -skew-x-12 bg-primary-600/10 dark:bg-primary-500/20 rounded-lg"></span>
                  <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">20 Yıllık</span>
                </span> 
                Deneyim
              </h1>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                2003 yılından bu yana, müvekkillerimize en yüksek kalitede hukuki hizmet sunmak için çalışıyoruz. Farklı hukuk alanlarında uzmanlaşmış ekibimizle, sizin için en doğru çözümü bulmak önceliğimizdir.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <motion.a 
                  href="/contact" 
                  className="group px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg inline-flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-primary-500/20 hover:shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Hemen İletişime Geçin</span>
                  <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.a>
                <motion.a 
                  href="/services" 
                  className="group px-6 py-3 bg-white dark:bg-dark-700 text-primary-600 dark:text-primary-400 border border-gray-200 dark:border-dark-600 font-medium rounded-lg inline-flex items-center justify-center transition-all duration-200 shadow-sm hover:bg-gray-50 dark:hover:bg-dark-600 hover:shadow-md"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Hizmetlerimizi Keşfedin</span>
                  <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              </div>
              
              {/* İstatistikler */}
              <div className="mt-12 grid grid-cols-3 gap-4">
                {[
                  { value: '20+', label: 'Yıllık Deneyim' },
                  { value: '1000+', label: 'Mutlu Müvekkil' },
                  { value: '98%', label: 'Başarı Oranı' }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white/70 dark:bg-dark-700/70 backdrop-blur-sm p-3 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-dark-600 transform-gpu"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                    whileHover={{ translateY: -5, transition: { duration: 0.2 } }}
                  >
                    <span className="block text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-400 dark:to-primary-300">{stat.value}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="relative hidden md:block"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Ekip fotoğrafı için minimal ve şık tasarım */}
              <div className="relative h-[500px] overflow-hidden group">
                {/* Ana çerçeve */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/80 to-white/30 dark:from-primary-900/20 dark:to-dark-900/50 rounded-xl transform transition-all duration-500 group-hover:scale-[0.98] border border-white/20 dark:border-dark-600/30"></div>
                
                {/* İnce kenarlık efekti */}
                <div className="absolute inset-[1px] rounded-[11px] overflow-hidden shadow-inner p-3.5">
                  {/* Fotoğraf konteyneri */}
                  <div className="relative h-full w-full overflow-hidden rounded-lg">
                    {/* Ana fotoğraf */}
                    <img 
                      src="/images/about/team-photo.jpg" 
                      alt="Legal Platform Ekibi" 
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105 rounded-lg" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=2874&auto=format&fit=crop";
                      }}
                    />
                    
                    {/* Fotoğraf overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500"></div>
                    
                    {/* Ekip bilgi kartı - Değişmedi */}
                    <div className="absolute bottom-4 left-4 right-4 transform transition-all duration-500 group-hover:translate-y-[-4px]">
                      <div className="backdrop-blur-sm bg-white/10 dark:bg-dark-800/30 border border-white/20 dark:border-white/5 p-4 rounded-lg">
                        <h4 className="text-lg font-medium text-white mb-1">Uzman Hukuk Ekibi</h4>
                        <p className="text-sm text-white/80 font-light">Farklı uzmanlık alanlarına sahip deneyimli avukatlardan oluşan ekibimizle yanınızdayız.</p>
                      </div>
                    </div>
                    
                    {/* Yeniden konumlandırılmış Online Danışmanlık Etiketi */}
                    <motion.div 
                      className="absolute bottom-32 right-0 py-2 pl-3 pr-4 bg-gradient-to-r from-white/90 to-white/95 dark:from-dark-800/90 dark:to-dark-800/95 rounded-l-full shadow-md flex items-center gap-2 backdrop-blur-md border-y border-l border-white/30 dark:border-dark-600/40 group-hover:translate-x-[-5px] transition-all duration-500 ease-out"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                      whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
                    >
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 dark:bg-primary-400 opacity-60"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-500 dark:to-primary-400 shadow-sm"></span>
                      </span>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-200 tracking-wide">Online Danışmanlık</span>
                    </motion.div>
                  </div>
                </div>
                
                {/* Dekoratif elementler */}
                <div className="absolute top-0 right-0 h-16 w-16 bg-primary-500/10 dark:bg-primary-400/5 rounded-full blur-xl transform translate-x-1/2 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 h-24 w-24 bg-primary-600/10 dark:bg-primary-500/5 rounded-full blur-xl transform -translate-x-1/3 translate-y-1/3"></div>
                
                {/* Minimal çerçeve aksanları */}
                <div className="absolute top-2 left-2 h-12 w-[1px] bg-gradient-to-b from-white/80 to-white/0 dark:from-white/20 dark:to-white/0"></div>
                <div className="absolute top-2 left-2 h-[1px] w-12 bg-gradient-to-r from-white/80 to-white/0 dark:from-white/20 dark:to-white/0"></div>
                <div className="absolute bottom-2 right-2 h-12 w-[1px] bg-gradient-to-t from-white/80 to-white/0 dark:from-white/20 dark:to-white/0"></div>
                <div className="absolute bottom-2 right-2 h-[1px] w-12 bg-gradient-to-l from-white/80 to-white/0 dark:from-white/20 dark:to-white/0"></div>
                <motion.div 
                  className="absolute -top-4 -right-4 h-20 w-20 bg-white dark:bg-dark-800 rounded-full flex items-center justify-center shadow-md backdrop-blur-sm border border-gray-100/80 dark:border-dark-600/30 overflow-hidden group-hover:scale-105 transition-transform duration-500"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
                >
                  {/* İçerideki vurgu halkası */}
                  <div className="absolute inset-[3px] rounded-full border-2 border-primary-100 dark:border-primary-900/40"></div>
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary-700 to-primary-500 dark:from-primary-400 dark:to-primary-500 relative z-10">20<span className="text-primary-600/90 dark:text-primary-400/90">+</span></span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vizyon ve Misyon */}
{/* Vizyon ve Misyon - Premium Tasarım */}
<section className="py-28 bg-gradient-to-b from-white to-gray-50 dark:from-dark-800 dark:to-dark-900 relative overflow-hidden">
  {/* Gelişmiş arka plan desenleri */}
  <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
    <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-gradient-to-br from-primary-200 to-blue-100 dark:from-primary-700 dark:to-blue-900 rounded-full blur-[100px]"></div>
    <div className="absolute -bottom-64 -left-24 w-[400px] h-[400px] bg-gradient-to-tr from-primary-100 to-indigo-100 dark:from-primary-900 dark:to-indigo-900 rounded-full blur-[80px]"></div>
    <svg className="absolute top-0 left-0 w-full h-full opacity-[0.07] dark:opacity-[0.02]" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>
  
  <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
    <div className="max-w-4xl mx-auto text-center mb-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="inline-block mb-4"
      >
        <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-primary-50 dark:bg-primary-900/30 p-3 relative before:absolute before:inset-0 before:rounded-full before:border before:border-primary-100 dark:before:border-primary-800/50 before:scale-[1.15] before:opacity-70">
          <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
      </motion.div>

      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 leading-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        Vizyonumuz ve Misyonumuz
      </motion.h2>
      
      <motion.div
        className="w-24 h-1.5 bg-gradient-to-r from-primary-500 to-indigo-500 dark:from-primary-400 dark:to-indigo-400 mx-auto my-6 rounded-full"
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      ></motion.div>
      
      <motion.p
        className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        Hukuk dünyasına yön veren değerlerimiz ve hedeflerimiz doğrultusunda çalışıyoruz.
      </motion.p>
    </div>
    
    <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-stretch">
      {/* VİZYON KARTI */}
      <motion.div
        className="group relative perspective-1000"
        initial={{ opacity: 0, rotateY: 15, y: 20 }}
        whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <div className="relative z-10 h-full bg-white dark:bg-dark-700 rounded-2xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-dark-900/50 transform-gpu transition duration-500 group-hover:shadow-2xl dark:group-hover:shadow-dark-800/70">
          {/* Top accent decoration */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-500 dark:to-primary-400"></div>
          
          <div className="p-8 md:p-10 relative">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary-50 to-transparent dark:from-primary-900/10 dark:to-transparent rounded-full opacity-70 blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-shrink-0 relative">
                  <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-500 rounded-xl shadow-lg relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    {/* Icon pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <svg className="w-full h-full text-white" viewBox="0 0 80 80" fill="none">
                        <circle cx="10" cy="10" r="1.5" fill="currentColor" />
                        <circle cx="10" cy="25" r="1.5" fill="currentColor" />
                        <circle cx="10" cy="40" r="1.5" fill="currentColor" />
                        <circle cx="10" cy="55" r="1.5" fill="currentColor" />
                        <circle cx="10" cy="70" r="1.5" fill="currentColor" />
                        <circle cx="25" cy="10" r="1.5" fill="currentColor" />
                        <circle cx="25" cy="25" r="1.5" fill="currentColor" />
                        <circle cx="25" cy="40" r="1.5" fill="currentColor" />
                        <circle cx="25" cy="55" r="1.5" fill="currentColor" />
                        <circle cx="25" cy="70" r="1.5" fill="currentColor" />
                        <circle cx="40" cy="10" r="1.5" fill="currentColor" />
                        <circle cx="40" cy="25" r="1.5" fill="currentColor" />
                        <circle cx="40" cy="40" r="1.5" fill="currentColor" />
                        <circle cx="40" cy="55" r="1.5" fill="currentColor" />
                        <circle cx="40" cy="70" r="1.5" fill="currentColor" />
                        <circle cx="55" cy="10" r="1.5" fill="currentColor" />
                        <circle cx="55" cy="25" r="1.5" fill="currentColor" />
                        <circle cx="55" cy="40" r="1.5" fill="currentColor" />
                        <circle cx="55" cy="55" r="1.5" fill="currentColor" />
                        <circle cx="55" cy="70" r="1.5" fill="currentColor" />
                        <circle cx="70" cy="10" r="1.5" fill="currentColor" />
                        <circle cx="70" cy="25" r="1.5" fill="currentColor" />
                        <circle cx="70" cy="40" r="1.5" fill="currentColor" />
                        <circle cx="70" cy="55" r="1.5" fill="currentColor" />
                        <circle cx="70" cy="70" r="1.5" fill="currentColor" />
                      </svg>
                    </div>
                    <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  {/* Shadow/reflection effect */}
                  <div className="absolute -bottom-3 inset-x-3 h-2 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-500 blur-xl opacity-60"></div>
                </div>
                
                <div>
                  <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-500 dark:from-primary-400 dark:to-primary-300">Vizyonumuz</h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-primary-500/40 to-transparent rounded-full mt-2"></div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-dark-600/40 p-6 rounded-xl mb-8 border border-gray-100 dark:border-dark-600">
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                  Türkiye nin hukuki hizmetlere erişimini kolaylaştıran, teknoloji odaklı yaklaşımı ile hukuk alanında öncü ve yenilikçi bir firma olmak. Müvekkillerimizin haklarını en etkin şekilde korurken, adalet sistemine olan güveni pekiştirmek.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3D effect - shadow/reflection underneath card */}
        <div className="absolute inset-x-4 bottom-0 h-2/3 rounded-3xl bg-gradient-to-t from-gray-200/50 to-transparent dark:from-dark-900/10 dark:to-transparent transform-gpu -skew-x-1 scale-[0.94] blur-xl z-0"></div>
      </motion.div>
      
      {/* MİSYON KARTI */}
      <motion.div
        className="group relative perspective-1000"
        initial={{ opacity: 0, rotateY: -15, y: 20 }}
        whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="relative z-10 h-full bg-white dark:bg-dark-700 rounded-2xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-dark-900/50 transform-gpu transition duration-500 group-hover:shadow-2xl dark:group-hover:shadow-dark-800/70">
          {/* Top accent decoration */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-400 dark:from-blue-500 dark:to-indigo-400"></div>
          
          <div className="p-8 md:p-10 relative">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-50 to-transparent dark:from-blue-900/10 dark:to-transparent rounded-full opacity-70 blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-shrink-0 relative">
                  <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-xl shadow-lg relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    {/* Icon pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <svg className="w-full h-full text-white" viewBox="0 0 80 80" fill="none">
                        <rect x="10" y="10" width="10" height="10" rx="1" fill="currentColor" />
                        <rect x="10" y="25" width="10" height="10" rx="1" fill="currentColor" />
                        <rect x="10" y="40" width="10" height="10" rx="1" fill="currentColor" />
                        <rect x="10" y="55" width="10" height="10" rx="1" fill="currentColor" />
                        <rect x="25" y="10" width="10" height="10" rx="1" fill="currentColor" />
                        <rect x="25" y="25" width="10" height="10" rx="1" fill="currentColor" />
                        <rect x="25" y="40" width="10" height="10" rx="1" fill="currentColor" />
                        <rect x="25" y="55" width="10" height="10" rx="1" fill="currentColor" />
                        <rect x="40" y="10" width="10" height="10" rx="1" fill="currentColor" />
                        <rect x="40" y="25" width="10" height="10" rx="1" fill="currentColor" />
                        <rect x="40" y="40" width="10" height="10" rx="1" fill="currentColor" />
                        <rect x="40" y="55" width="10" height="10" rx="1" fill="currentColor" />
                        <rect x="55" y="10" width="10" height="10" rx="1" fill="currentColor" />
                        <rect x="55" y="25" width="10" height="10" rx="1" fill="currentColor" />
                        <rect x="55" y="40" width="10" height="10" rx="1" fill="currentColor" />
                        <rect x="55" y="55" width="10" height="10" rx="1" fill="currentColor" />
                      </svg>
                    </div>
                    <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  {/* Shadow/reflection effect */}
                  <div className="absolute -bottom-3 inset-x-3 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 blur-xl opacity-60"></div>
                </div>
                
                <div>
                  <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500 dark:from-blue-400 dark:to-blue-300">Misyonumuz</h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-500/40 to-transparent rounded-full mt-2"></div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-dark-600/40 p-6 rounded-xl mb-8 border border-gray-100 dark:border-dark-600">
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                  Müvekkillerimizin hukuki sorunlarına etik değerlerden taviz vermeden, profesyonel ve yenilikçi çözümler sunmak. Tüm hukuki süreçlerde şeffaf ve erişilebilir olmayı ilke edinerek, müvekkillerimizin memnuniyetini en üst seviyede tutmak.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3D effect - shadow/reflection underneath card */}
        <div className="absolute inset-x-4 bottom-0 h-2/3 rounded-3xl bg-gradient-to-t from-gray-200/50 to-transparent dark:from-dark-900/10 dark:to-transparent transform-gpu -skew-x-1 scale-[0.94] blur-xl z-0"></div>
      </motion.div>
    </div>
  </div>
</section>

{/* Değerlerimiz - Şık Tasarım */}
<section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-800 relative overflow-hidden">
  {/* Arkaplan süslemeleri */}
  <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
    <div className="absolute -bottom-64 -left-24 w-[500px] h-[500px] bg-gradient-to-br from-primary-100 to-blue-100 dark:from-primary-900/30 dark:to-blue-900/30 rounded-full blur-[100px]"></div>
    <div className="absolute -top-24 -right-24 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-100 to-primary-100 dark:from-indigo-900/30 dark:to-primary-900/30 rounded-full blur-[80px]"></div>
    <svg className="absolute top-0 left-0 w-full h-full opacity-[0.07] dark:opacity-[0.02]" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <pattern id="values-grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#values-grid)" />
    </svg>
  </div>
  
  <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
    <div className="max-w-3xl mx-auto text-center mb-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="inline-block mb-4"
      >
        <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/30 dark:to-blue-900/30 p-3 relative before:absolute before:inset-0 before:rounded-full before:border before:border-primary-100 dark:before:border-primary-800/50 before:scale-[1.15] before:opacity-70">
          <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
      </motion.div>

      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 leading-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        Temel Değerlerimiz
      </motion.h2>
      
      <motion.div
        className="w-24 h-1.5 bg-gradient-to-r from-primary-500 to-indigo-500 dark:from-primary-400 dark:to-indigo-400 mx-auto my-6 rounded-full"
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      ></motion.div>
      
      <motion.p
        className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        Çalışma prensiplerimizin temelinde bu değerler yatmaktadır.
      </motion.p>
    </div>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          icon: (
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          ),
          title: "Güvenilirlik",
          description: "Müvekkillerimizle kurduğumuz ilişkide güven esastır. Gizlilik ve dürüstlük ilkeleri çerçevesinde hareket ederiz.",
          color: "from-blue-600 to-primary-600 dark:from-blue-500 dark:to-primary-500"
        },
        {
          icon: (
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          ),
          title: "Profesyonellik",
          description: "Her dosyaya aynı ciddiyet ve özenle yaklaşır, sürekli kendimizi geliştirerek en güncel hukuki bilgilerle hizmet veririz.",
          color: "from-primary-600 to-indigo-600 dark:from-primary-500 dark:to-indigo-500"
        },
        {
          icon: (
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
          ),
          title: "İletişim",
          description: "Müvekkillerimize sürecin her aşamasında açık ve anlaşılır bilgiler sunar, sürekli iletişim halinde kalırız.",
          color: "from-indigo-600 to-blue-600 dark:from-indigo-500 dark:to-blue-500"
        },
        {
          icon: (
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          ),
          title: "Yenilikçilik",
          description: "Hukuki hizmetlerde teknolojiden faydalanır, zaman ve mekân sınırlarını aşan çözümler sunarız.",
          color: "from-primary-600 to-blue-600 dark:from-primary-500 dark:to-blue-500"
        },
        {
          icon: (
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ),
          title: "Ekip Çalışması",
          description: "Farklı alanlarda uzmanlaşmış avukatlarımızla birlikte çalışarak, en kapsamlı hukuki çözümleri üretiriz.",
          color: "from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500"
        },
        {
          icon: (
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
          ),
          title: "Adalet",
          description: "Adalet sistemine olan inancımızla, her zaman hakkın ve doğrunun yanında yer alırız.",
          color: "from-indigo-600 to-primary-600 dark:from-indigo-500 dark:to-primary-500"
        }
      ].map((value, index) => (
        <motion.div 
          key={index}
          className="relative group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
        >
          <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative z-10 h-full flex flex-col transform-gpu group-hover:-translate-y-1 border border-gray-100 dark:border-dark-700">
            {/* Renk çizgisi */}
            <div className={`h-1.5 bg-gradient-to-r ${value.color} w-full`}></div>
            
            <div className="p-6 flex-1">
              <div className="flex items-start mb-5">
                <div className={`flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center bg-gradient-to-br ${value.color} shadow-md group-hover:scale-110 transition-transform duration-300 mr-4`}>
                  {value.icon}
                  
                  {/* İkon paterni */}
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full text-white" viewBox="0 0 80 80" fill="none">
                      <path d="M20 20h40v40H20z" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" fill="none" />
                      <path d="M30 30h20v20H30z" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" fill="none" />
                      <path d="M10 10h60v60H10z" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" fill="none" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300">{value.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
            </div>
            
            {/* Gradient arka vurgu */}
            <div className={`absolute bottom-0 left-0 w-full h-24 bg-gradient-to-br ${value.color} opacity-5 blur-xl -z-10 transform-gpu transition-opacity duration-300 group-hover:opacity-10`}></div>
          </div>
          
          {/* 3D etki - gölge/yansıma */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-dark-700/30 dark:to-dark-800/30 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-500 -z-10 group-hover:blur-xl"></div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Ekibimiz Bileşeni */}
      <TeamSection />
      
      {/* Müvekkil Yorumları Bileşeni */}
      <TestimonialsSection />
      
      {/* İletişime Geç CTA */}
      <section className="py-16 bg-primary-600 dark:bg-primary-900">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Hukuki Desteğe mi İhtiyacınız Var?</h2>
            <p className="text-primary-100 mb-8">
              Deneyimli ekibimizle sizin için en iyi hukuki çözümü sunmak için hazırız. Sorularınız için bize ulaşın.
            </p>
            <a 
              href="/contact" 
              className="px-8 py-3.5 bg-white hover:bg-gray-50 text-primary-700 font-medium rounded-lg inline-flex items-center justify-center transition-colors shadow-lg hover:shadow-xl"
            >
              <span>İletişime Geçin</span>
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
      
      <MainFooter />
    </Page>
  );
}