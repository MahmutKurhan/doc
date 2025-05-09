import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function ContactFAQ() {
  const [openIndexes, setOpenIndexes] = useState({
    left: null,
    center: null,
    right: null
  });
  
  // SSS öğeleri - 3 ayrı kolona bölünmüş
  const faqColumns = {
    left: [
      {
        id: 1,
        tag: "Danışmanlık",
        question: "İlk görüşme için nasıl randevu alabilirim?",
        answer: "İlk hukuki danışmanlık görüşmesini web sitemiz üzerinden, telefonla veya ofisimizi ziyaret ederek ayarlayabilirsiniz. Online platformumuz üzerinden video görüşme seçeneği de sunuyoruz."
      },
      {
        id: 2,
        tag: "Ücretlendirme",
        question: "Hizmet ücretleri nasıl belirleniyor?",
        answer: "Ücretlerimiz konunun karmaşıklığı, süre tahmini ve iş yüküne göre şekillendirilir. Her müvekkilimize şeffaf ve özel bir fiyatlandırma sunuyoruz."
      },
      {
        id: 7,
        tag: "Avukat Seçimi",
        question: "Hukuki ihtiyacıma göre nasıl avukat seçmeliyim?",
        answer: "Hukuki ihtiyacınıza yönelik uzmanlaşmış, alanında deneyimli ve referansları güçlü bir avukat seçimi yapmanız önemlidir. İlk görüşmede avukatın konunuza yaklaşımı ve sizinle kurduğu iletişim, doğru tercih yapmanıza yardımcı olur."
      },
      {
        id: 8,
        tag: "İtiraz Süreci",
        question: "Mahkeme kararına itiraz edilebilir mi?",
        answer: "Evet, mahkeme kararlarına karşı kanunda belirtilen sürelerde üst mahkemelere itiraz edilebilir. İtiraz süreci, kararın türüne göre istinaf veya temyiz yoluyla yapılır ve belirli yasal sürelere tabidir."
      }
    ],
    center: [
      {
        id: 3,
        tag: "Uzaktan Hizmet",
        question: "Farklı şehirden de hizmet alabilir miyim?",
        answer: "Evet, tam kapsamlı uzaktan hukuki danışmanlık hizmeti sunuyoruz. Güvenli video konferans sistemimiz, doküman paylaşımı ve dijital imza çözümleriyle fiziksel olarak ofisimize gelmeden tüm hukuki süreçlerinizi yönetebilirsiniz."
      },
      {
        id: 4,
        tag: "Süreçler",
        question: "Dava süreci nasıl işliyor?",
        answer: "Dava açıldıktan sonra yasal süreçlerin takibi, duruşmalara katılım ve müvekkillerimizin sürekli bilgilendirilmesi temel ilkemizdir. Dava sürecindeki her adım için detaylı bilgilendirme yapılır."
      },
      {
        id: 9,
        tag: "Ödeme",
        question: "Hizmet ücretini nasıl ödeyebilirim?",
        answer: "Hizmet ücretlerinizi banka havalesi, kredi kartı veya ofisimizde nakit olarak ödeyebilirsiniz. Uzaktan hizmet alan müvekkillerimiz için güvenli online ödeme seçenekleri de sunmaktayız."
      },
      {
        id: 10,
        tag: "Zamanlama",
        question: "Dava açmak için son tarih var mı?",
        answer: "Evet, hukuki işlemlerin çoğu için zamanaşımı ve hak düşürücü süreler mevcuttur. Bu süreler dava türüne göre değişiklik gösterir ve geçirilmesi halinde dava açma hakkı kaybedilebilir. Bu nedenle hukuki sorununuz olduğunda gecikmeden danışmanlık almanız önemlidir."
      }
    ],
    right: [
      {
        id: 5,
        tag: "Anlaşma",
        question: "Sözleşme incelemesi yaptırabilir miyim?",
        answer: "Evet, her türlü ticari veya bireysel sözleşmenizi detaylı inceleyerek yasal riskleri değerlendiriyor, hak ve yükümlülükleriniz hakkında kapsamlı hukuki danışmanlık sunuyoruz."
      },
      {
        id: 6,
        tag: "Gizlilik",
        question: "Bilgilerim gizli kalacak mı?",
        answer: "Müvekkil bilgileriniz ve davanıza ilişkin tüm belgeler avukatlık sırrı kapsamında tam gizlilikle korunur. Özel şifreli sistemlerimiz sayesinde dijital verileriniz de güvendedir."
      },
      {
        id: 11,
        tag: "Duruşmalar",
        question: "Davamda duruşmalara katılmak zorunda mıyım?",
        answer: "Dava türüne göre değişmekle birlikte bazı davalarda tarafların duruşmalara bizzat katılımı gerekirken, bazılarında avukatınız sizi temsilen katılabilir. İlgili davanın özellikleri doğrultusunda duruşmalara katılımınızın gerekip gerekmediği konusunda sizi bilgilendireceğiz."
      },
      {
        id: 12,
        tag: "Belgelendirme",
        question: "Hangi belgeleri hazırlamalıyım?",
        answer: "Hukuki sürecinizde gerekli olacak belgeler davanın türüne göre değişir. İlk görüşmede avukatınız, davanız için gerekli tüm belgelerin bir listesini size sunacak ve hazırlamanızda yardımcı olacaktır. Belgelerin eksiksiz ve zamanında hazırlanması sürecin hızlı ilerlemesi açısından önemlidir."
      }
    ]
  };

  const toggleFAQ = (column, index) => {
    setOpenIndexes(prev => ({
      ...prev,
      [column]: prev[column] === index ? null : index
    }));
  };

  // Pürüzsüz animasyonlar için varyantlar
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12
      }
    }
  };

  // SSS kartlarını oluşturan fonksiyon
  const renderFAQItems = (items, column) => {
    return items.map((item, index) => (
      <motion.div 
        key={item.id}
        variants={itemVariants}
        className={`group rounded-2xl border ${
          openIndexes[column] === index 
            ? 'bg-white dark:bg-dark-800 border-primary-200 dark:border-primary-900/30 shadow-xl dark:shadow-dark-900/40' 
            : 'bg-white/80 dark:bg-dark-800/80 border-gray-100 dark:border-dark-700 shadow-sm hover:shadow-md dark:shadow-dark-900/20 dark:hover:shadow-dark-900/30'
        } transition-all duration-300`}
      >
        <button
          onClick={() => toggleFAQ(column, index)}
          className="w-full text-left px-5 py-4 focus:outline-none"
        >
          <div className="flex items-start justify-between">
            <div>
              <span className={`inline-block text-xs font-medium tracking-wide uppercase mb-1.5 py-0.5 px-2 rounded-full ${
                openIndexes[column] === index
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                  : 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
              }`}>
                {item.tag}
              </span>
              <h3 className={`text-base font-medium leading-snug transition-colors duration-200 ${
                openIndexes[column] === index 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-gray-800 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400'
              }`}>
                {item.question}
              </h3>
            </div>
            
            <div className={`ml-3 flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full transition-all duration-300 ${
              openIndexes[column] === index 
                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rotate-180' 
                : 'bg-gray-100 dark:bg-dark-700 text-gray-500 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-dark-600'
            }`}>
              <svg 
                className="w-4 h-4 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            </div>
          </div>
        </button>

        <AnimatePresence>
          {openIndexes[column] === index && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: "auto", 
                opacity: 1,
                transition: { 
                  height: { duration: 0.3 }, 
                  opacity: { duration: 0.4, delay: 0.1 } 
                }
              }}
              exit={{ 
                height: 0, 
                opacity: 0,
                transition: { 
                  height: { duration: 0.3 }, 
                  opacity: { duration: 0.2 } 
                }
              }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-4">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-primary-200/50 dark:via-primary-800/30 to-transparent mb-4"></div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50/80 to-white dark:from-dark-800/90 dark:to-dark-900">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Sıkça Sorulan Sorular
          </h2>
          <div className="mt-3 h-1 w-12 bg-primary-500/70 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
            Hukuki süreçlerle ilgili en çok merak edilen konuları derledik. 
            Aradığınız cevabı bulamazsanız bizimle iletişime geçebilirsiniz.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Sol Sütun */}
          <motion.div 
            className="space-y-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {renderFAQItems(faqColumns.left, 'left')}
          </motion.div>
          
          {/* Orta Sütun - Yukarıda */}
          <motion.div 
            className="space-y-5 md:-mt-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {renderFAQItems(faqColumns.center, 'center')}
          </motion.div>
          
          {/* Sağ Sütun */}
          <motion.div 
            className="space-y-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {renderFAQItems(faqColumns.right, 'right')}
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <a 
            href="/faq" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 transition-colors shadow-sm hover:shadow-md"
          >
            <span>Tüm soruları görüntüle</span>
            <svg 
              className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}