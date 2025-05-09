import { motion } from "framer-motion";
import { useState } from "react";

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      name: "Mehmet Aydın",
      position: "ABC Şirketi CEO'su",
      image: "/images/testimonials/testimonial-1.jpg",
      quote: "Şirketimizin karmaşık hukuki süreçlerinde bize her zaman doğru yönlendirmelerle destek oldular. Profesyonel yaklaşımları ve uzmanlıkları sayesinde hukuki risklerimizi minimize etmeyi başardık.",
      rating: 5
    },
    {
      id: 2,
      name: "Ayşe Yılmaz",
      position: "XYZ Holding Finans Direktörü",
      image: "/images/testimonials/testimonial-2.jpg",
      quote: "Özellikle uluslararası ticaret konusundaki bilgi birikimi ve tecrübeleri bizim için çok değerliydi. Hem zamandan hem maliyetten tasarruf etmemizi sağladılar.",
      rating: 5
    },
    {
      id: 3,
      name: "Ali Kaya",
      position: "Teknoloji Girişimcisi",
      image: "/images/testimonials/testimonial-3.jpg",
      quote: "Startup şirketimiz için fikri mülkiyet haklarının korunması çok önemliydi. Sağladıkları hukuki danışmanlık sayesinde yatırımcılarla olan görüşmelerimiz daha güvenli ilerledi.",
      rating: 4
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Yıldız ikonunu oluşturan yardımcı fonksiyon
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg 
        key={index}
        className={`h-5 w-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-dark-900">
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            className="text-3xl font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Müvekkillerimizin Yorumları
          </motion.h2>
          <motion.div 
            className="w-12 h-1 bg-primary-600 mx-auto my-4"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>
          <motion.p 
            className="mt-4 text-lg text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Müvekkillerimizin memnuniyeti en büyük başarımızdır.
          </motion.p>
        </div>
        
        <div className="relative">
          <motion.div 
            className="relative mx-auto max-w-4xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8 md:p-12 relative z-10">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary-600 dark:bg-primary-700 rounded-full flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.92 3.845a1 1 0 10-1.84-.77l-1.2 2.88-3.236-1.35a1 1 0 10-.772 1.84l2.88 1.2-1.35 3.236a1 1 0 001.84.772l1.2-2.88 3.236 1.35a1 1 0 00.772-1.84l-2.88-1.2 1.35-3.236z" />
                </svg>
              </div>
              <blockquote>
                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed mb-6 relative z-10">
                  {testimonials[activeIndex].quote}
                </p>
                <div className="flex items-center mt-8">
                  <div className="h-14 w-14 rounded-full overflow-hidden bg-gray-200 dark:bg-dark-700">
                    <img 
                      src={testimonials[activeIndex].image} 
                      alt={testimonials[activeIndex].name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-gray-900 dark:text-white">{testimonials[activeIndex].name}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonials[activeIndex].position}</p>
                    <div className="flex mt-1">
                      {renderStars(testimonials[activeIndex].rating)}
                    </div>
                  </div>
                </div>
              </blockquote>
            </div>
            
            <div className="absolute -bottom-10 -right-16 w-32 h-32 bg-primary-100 dark:bg-primary-900/20 rounded-full z-0"></div>
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-primary-50 dark:bg-primary-900/10 rounded-full z-0"></div>
          </motion.div>
          
          <div className="flex justify-center mt-12 space-x-4">
            <button 
              onClick={prevTestimonial} 
              className="p-3 rounded-full bg-white dark:bg-dark-800 shadow hover:shadow-md transition-shadow focus:outline-none"
            >
              <svg className="h-6 w-6 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex space-x-2 items-center">
              {testimonials.map((_, index) => (
                <button 
                  key={index} 
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeIndex === index 
                      ? 'bg-primary-600 dark:bg-primary-500 w-8' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                ></button>
              ))}
            </div>
            
            <button 
              onClick={nextTestimonial} 
              className="p-3 rounded-full bg-white dark:bg-dark-800 shadow hover:shadow-md transition-shadow focus:outline-none"
            >
              <svg className="h-6 w-6 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}