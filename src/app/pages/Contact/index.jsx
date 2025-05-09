import { useState, useEffect } from "react";
import { Page } from "components/shared/Page";
import { PublicHeader } from "components/modules/Header";
import { MainFooter } from "components/modules/Footer";
import { motion } from "framer-motion";
import { ContactHero } from "./ContactHero";
import { ContactForm } from "./ContactForm";
import { ContactFAQ } from "./ContactFAQ";
import { ContactCTA } from "./ContactCTA";

export default function Contact() {
  // Animasyonlu ekrana giriş kontrolü
  const [animationComplete, setAnimationComplete] = useState(false);
  
  useEffect(() => {
    // Sayfa yüklendiğinde haritayı başlat
    if (typeof window !== "undefined" && window.mapboxgl) {
      const mapboxgl = window.mapboxgl;
      mapboxgl.accessToken = "YOUR_MAPBOX_TOKEN"; // Gerçek projede token kullanın
      
      const map = new mapboxgl.Map({
        container: "contact-map",
        style: "mapbox://styles/mapbox/light-v10",
        center: [29.0335, 41.0082], // İstanbul koordinatları
        zoom: 13
      });
      
      // Harita marker'ı
      new mapboxgl.Marker({ color: "#4F46E5" })
        .setLngLat([29.0335, 41.0082])
        .addTo(map);
        
      return () => map.remove();
    }
  }, [animationComplete]);

  // Animasyon varyantları
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <Page 
      title="İletişim | Legal Platform" 
      description="Hukuki sorularınız için iletişime geçin. 7/24 uzman desteği ile yanınızdayız."
      canonicalUrl="/contact"
    >
      <PublicHeader cartItemCount={0} />
      
      {/* Hero Bileşeni */}
      <ContactHero />
      
      <main id="contact-form" className="bg-white dark:bg-dark-900 py-12 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onAnimationComplete={() => setAnimationComplete(true)}
          >
            <motion.div 
              variants={itemVariants} 
              className="bg-white dark:bg-dark-800 shadow-xl dark:shadow-black/20 rounded-2xl overflow-hidden"
            >
              {/* İletişim Formu Bileşeni */}
              <ContactForm />
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* SSS Bölümü */}
      <ContactFAQ />

      {/* Hızlı İletişim CTA Bölümü */}
      <ContactCTA />

      <MainFooter scrollToTopButton={true} />
    </Page>
  );
}