import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Page } from "components/shared/Page";
import { PublicHeader } from "components/modules/Header";
import { MainFooter } from "components/modules/Footer";

// Blog kategorileri
const categories = [
  { id: "all", name: "Tümü" },
  { id: "hukuk-danismanligi", name: "Hukuk Danışmanlığı" },
  { id: "is-hukuku", name: "İş Hukuku" },
  { id: "ticaret-hukuku", name: "Ticaret Hukuku" },
  { id: "aile-hukuku", name: "Aile Hukuku" },
  { id: "ceza-hukuku", name: "Ceza Hukuku" },
];

// Popüler etiketler
const tags = [
  { id: "sozlesme", name: "Sözleşmeler" },
  { id: "dava", name: "Dava Süreçleri" },
  { id: "yargitay", name: "Yargıtay Kararları" },
  { id: "hak", name: "Hak ve Yükümlülükler" },
  { id: "kanun", name: "Kanun Değişiklikleri" },
  { id: "digital", name: "Dijital Hukuk" },
  { id: "kvkk", name: "KVKK" },
];

// Örnek blog yazıları
const blogPosts = [
  {
    id: 1,
    title: "İş Sözleşmelerinde Dikkat Edilmesi Gereken Hususlar",
    excerpt: "İş sözleşmesi hazırlarken veya imzalarken dikkat etmeniz gereken yasal unsurları ve haklarınızı detaylı olarak ele alıyoruz.",
    category: "is-hukuku",
    author: "Av. Mehmet Aydın",
    date: "15 Mart 2025",
    readTime: "8 dk",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop",
    imageAlt: "İş sözleşmesi imzalayan kişiler",
    featured: true,
    views: 1243,
    tags: ["sozlesme", "hak", "is-hukuku"]
  },
  {
    id: 2,
    title: "Son Yargıtay Kararları Işığında Kira Sözleşmeleri",
    excerpt: "Yargıtay'ın kira sözleşmeleri ile ilgili emsal kararları ve güncel yaklaşımları doğrultusunda kiraya veren ve kiracı ilişkilerini inceliyoruz.",
    category: "hukuk-danismanligi",
    author: "Av. Ayşe Yıldız",
    date: "10 Mart 2025",
    readTime: "6 dk",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Apartman ve bina görseli",
    views: 875,
    tags: ["sozlesme", "yargitay", "hak"]
  },
  {
    id: 3,
    title: "Şirket Kuruluşunda Hukuki Süreçler ve Dikkat Edilmesi Gerekenler",
    excerpt: "Şirket kuruluşu sırasında izlenmesi gereken yasal prosedürler, şirket türleri ve avantajları hakkında kapsamlı bir rehber.",
    category: "ticaret-hukuku",
    author: "Av. Can Demir",
    date: "5 Mart 2025",
    readTime: "10 dk",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop",
    imageAlt: "İş insanları toplantı yapıyor",
    featured: true,
    views: 1560,
    tags: ["ticaret-hukuku", "kanun"]
  },
  {
    id: 4,
    title: "Boşanma Sürecinde Velayet ve Nafaka Uygulamaları",
    excerpt: "Boşanma davalarında velayetin nasıl belirlendiği, nafaka hesaplamaları ve çocuğun üstün yararının nasıl gözetildiğine dair bilgiler.",
    category: "aile-hukuku",
    author: "Av. Zeynep Kaya",
    date: "28 Şubat 2025",
    readTime: "7 dk",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Aile fotoğrafı",
    views: 985,
    tags: ["aile-hukuku", "dava"]
  },
  {
    id: 5,
    title: "Dijital Suçlar ve Siber Hukuk Alanındaki Gelişmeler",
    excerpt: "Gelişen teknoloji ile birlikte ortaya çıkan dijital suçlar, yasal düzenlemeler ve korunma yöntemleri hakkında bilmeniz gerekenler.",
    category: "ceza-hukuku",
    author: "Av. Emre Yılmaz",
    date: "20 Şubat 2025",
    readTime: "9 dk",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Bilgisayar ve siber güvenlik konsepti",
    views: 1320,
    tags: ["ceza-hukuku", "digital"]
  },
  {
    id: 6,
    title: "KVKK Uyum Süreçleri ve Şirketlerin Sorumlulukları",
    excerpt: "Kişisel Verilerin Korunması Kanunu kapsamında şirketlerin yerine getirmesi gereken yükümlülükler ve uyum süreçleri.",
    category: "ticaret-hukuku",
    author: "Av. Elif Şahin",
    date: "15 Şubat 2025",
    readTime: "8 dk",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Veri güvenliği konsepti",
    views: 1100,
    tags: ["kvkk", "ticaret-hukuku", "digital"]
  },
  {
    id: 7,
    title: "İşyerinde Mobbing ve Hukuki Yaptırımları",
    excerpt: "İşyerinde psikolojik taciz olarak tanımlanan mobbing kavramı, unsurları ve mağdurların başvurabileceği hukuki yollar.",
    category: "is-hukuku",
    author: "Av. Mehmet Aydın",
    date: "10 Şubat 2025",
    readTime: "9 dk",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Ofis ortamı",
    views: 1450,
    tags: ["is-hukuku", "dava", "hak"]
  },
  {
    id: 8,
    title: "Yeni İmar Kanunu Değişiklikleri ve Etkileri",
    excerpt: "Son dönemde imar mevzuatında yapılan değişiklikler, kentsel dönüşüm ve mülk sahiplerinin hakları hakkında bilgiler.",
    category: "hukuk-danismanligi",
    author: "Av. Ayşe Yıldız",
    date: "5 Şubat 2025",
    readTime: "7 dk",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    imageAlt: "İnşaat alanı ve binalar",
    views: 930,
    tags: ["kanun", "hak"]
  },
];

// Sayfada gösterilecek yazı sayısı
const POSTS_PER_PAGE = 6;

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTag, setActiveTag] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewType, setViewType] = useState("grid"); // "grid" veya "list"
  const [sortBy, setSortBy] = useState("date"); // "date", "popular" veya "readTime"
  
  // Kategori, etiket, arama veya sıralama değiştiğinde filtreleme yap
  useEffect(() => {
    let filtered = blogPosts.filter(post => {
      const matchesCategory = activeCategory === "all" || post.category === activeCategory;
      const matchesTag = !activeTag || (post.tags && post.tags.includes(activeTag));
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesTag && matchesSearch;
    });
    
    // Sıralama uygula
    if (sortBy === "date") {
      // Tarihe göre sırala (en yeni önce)
      filtered = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "popular") {
      // Popülerliğe göre sırala (en çok görüntülenen önce)
      filtered = [...filtered].sort((a, b) => b.views - a.views);
    } else if (sortBy === "readTime") {
      // Okuma süresine göre sırala (en kısa önce)
      filtered = [...filtered].sort((a, b) => parseInt(a.readTime) - parseInt(b.readTime));
    }
    
    setFilteredPosts(filtered);
    setCurrentPage(1); // Filtre değiştiğinde ilk sayfaya dön
  }, [activeCategory, activeTag, searchTerm, sortBy]);
  
  // Sayfalama için gösterilecek yazıları hesapla
  const currentPosts = useMemo(() => {
    const indexOfLastPost = currentPage * POSTS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
    return filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  }, [filteredPosts, currentPage]);
  
  // Toplam sayfa sayısını hesapla
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  
  // Öne çıkan blog yazıları
  const featuredPosts = blogPosts.filter(post => post.featured);
  
  // En popüler yazılar (görüntülenme sayısına göre)
  const popularPosts = useMemo(() => {
    return [...blogPosts].sort((a, b) => b.views - a.views).slice(0, 4);
  }, []);

  // Filtreleri temizle
  const clearFilters = () => {
    setActiveCategory("all");
    setActiveTag("");
    setSearchTerm("");
    setSortBy("date");
  };
  
  return (
    <Page title="Blog | Hukuk Danışmanlığı" description="Hukuki bilgiler, güncel makaleler ve uzman görüşleriyle hukuk blogumuz">
      <PublicHeader />
      
      {/* Hero Bölümü */}
      <section className="relative py-16 md:py-20 bg-gradient-to-b from-slate-100 to-white dark:from-dark-900 dark:to-dark-800 overflow-hidden">
        {/* Arkaplan deseni */}
        <div className="absolute inset-0 overflow-hidden mix-blend-soft-light opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: "url('/images/patterns/grid.svg')", backgroundSize: '24px' }}></div>
        </div>
        
        {/* Dekoratif arka plan şekilleri */}
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px] bg-gradient-to-br from-primary-100 to-blue-100 dark:from-primary-900/30 dark:to-blue-900/30 rounded-full blur-[80px] opacity-70"></div>
        <div className="absolute -bottom-32 -left-32 w-[300px] h-[300px] bg-gradient-to-tr from-indigo-100 to-primary-100 dark:from-indigo-900/30 dark:to-primary-900/30 rounded-full blur-[60px] opacity-70"></div>
        
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Hukuk Dünyasından Güncel Bilgiler
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Alanında uzman hukukçularımızın kaleme aldığı makaleler, güncel hukuki gelişmeler ve önemli davaların analizleri ile hukuk dünyasını yakından takip edin.
            </motion.p>
            
            {/* Arama Kutusu */}
            <motion.div 
              className="relative max-w-xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <input
                type="text"
                placeholder="Blog yazılarında arayın..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-3.5 bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-600 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent pl-12 text-gray-900 dark:text-white transition-all duration-200"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </motion.div>
            
            {/* Popüler Etiketler */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {tags.slice(0, 5).map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => setActiveTag(activeTag === tag.id ? "" : tag.id)}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                      activeTag === tag.id
                        ? "bg-primary-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-dark-700 dark:text-gray-300 dark:hover:bg-dark-600"
                    }`}
                  >
                    #{tag.name}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Öne Çıkan Yazılar - Slider Tasarımı */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-slate-50 to-white dark:from-dark-900 dark:to-dark-850 border-y border-slate-100 dark:border-dark-700 overflow-hidden">
          <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
            <motion.div
              className="flex items-center justify-between mb-10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Öne Çıkan Yazılar</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Editörlerimiz tarafından seçilen makaleler</p>
              </div>
              <a 
                href="/blog?featured=true" 
                className="flex space-x-1 items-center text-sm text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
              >
                <span>Tümünü Gör</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>
            
            {/* Slider Kontrol Butonları */}
            <div className="relative">
              <div className="flex justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 z-10 px-2">
                <button 
                  className="w-10 h-10 rounded-full bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-dark-700 transition-colors"
                  onClick={() => document.getElementById('slider-container').scrollBy({left: -400, behavior: 'smooth'})}
                  aria-label="Önceki"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  className="w-10 h-10 rounded-full bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-dark-700 transition-colors"
                  onClick={() => document.getElementById('slider-container').scrollBy({left: 400, behavior: 'smooth'})}
                  aria-label="Sonraki"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Slider Ana Konteyner */}
              <div 
                id="slider-container"
                className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar py-4 px-2 -mx-2 gap-6"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {featuredPosts.map((post, index) => (
                  <motion.article 
                    key={post.id} 
                    className="group relative bg-white dark:bg-dark-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex-shrink-0 snap-center w-[85%] sm:w-[550px] border border-slate-200/50 dark:border-dark-700 transform-gpu hover:-translate-y-1"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="relative h-64 sm:h-72 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.imageAlt || post.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-80"></div>
                      <span className="absolute top-4 left-4 bg-primary-600/90 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1.5 rounded-md shadow-md">
                        {categories.find(cat => cat.id === post.category)?.name || 'Genel'}
                      </span>
                      {post.views && (
                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1.5 rounded-md flex items-center shadow-md">
                          <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {post.views.toLocaleString()}
                        </div>
                      )}
                      
                      <div className="absolute bottom-0 left-0 w-full p-6">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 drop-shadow-md">
                          {post.title}
                        </h3>
                        <div className="flex items-center space-x-3 text-xs text-white/90">
                          <span className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>{post.author}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{post.date}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow line-clamp-3">{post.excerpt}</p>
                      
                      {/* Etiketler */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map(tagId => {
                            const tag = tags.find(t => t.id === tagId);
                            return tag ? (
                              <button 
                                key={tagId}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setActiveTag(tagId);
                                }}
                                className="px-2.5 py-1 bg-slate-100 dark:bg-dark-700 text-slate-700 dark:text-gray-400 rounded-lg text-xs font-medium hover:bg-slate-200 dark:hover:bg-dark-600 border border-slate-200 dark:border-dark-700 transition-colors"
                              >
                                #{tag.name}
                              </button>
                            ) : null;
                          })}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-dark-700">
                        <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <svg className="w-4 h-4 mr-1.5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {post.readTime} okuma
                        </span>
                        <span className="inline-flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                          Devamını Oku
                          <svg className="ml-1.5 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    
                    <a href={`/blog/${post.id}`} className="absolute inset-0" aria-label={`${post.title} yazısını oku`}></a>
                  </motion.article>
                ))}
              </div>
              
              {/* Pagination Dots */}
              <div className="flex justify-center mt-8 space-x-2">
                {featuredPosts.map((_, index) => (
                  <button 
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${index === 0 ? 'bg-primary-600 w-6' : 'bg-gray-300 dark:bg-gray-600'}`}
                    onClick={() => {
                      const container = document.getElementById('slider-container');
                      const cards = container.querySelectorAll('article');
                      container.scrollTo({
                        left: cards[index].offsetLeft - container.offsetLeft,
                        behavior: 'smooth'
                      });
                    }}
                    aria-label={`Slide ${index + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* İçerik Bölümü - Ana İçerik ve Yan Menü */}
      <section className="py-16 bg-slate-50 dark:bg-dark-800">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Ana İçerik Bölümü */}
            <div className="lg:col-span-3">
              {/* Filtreleme Kontrolleri */}
              <div className="mb-8 flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tüm Yazılar</h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">({filteredPosts.length} yazı)</span>
                </div>
                
                <div className="flex flex-wrap gap-2 sm:gap-4 items-center">
                  {/* Sıralama Kontrolü */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none pl-3 pr-8 py-1.5 bg-white dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-md text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="date">En Yeniler</option>
                      <option value="popular">En Popüler</option>
                      <option value="readTime">Kısa Okumalar</option>
                    </select>
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Görünüm Tipi Kontrolü */}
                  <div className="inline-flex bg-white dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-md p-0.5 shadow-sm">
                    <button
                      onClick={() => setViewType("grid")}
                      className={`p-1.5 rounded-md ${viewType === "grid" ? "bg-gray-100 dark:bg-dark-600" : ""}`}
                      aria-label="Grid görünümü"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewType("list")}
                      className={`p-1.5 rounded-md ${viewType === "list" ? "bg-gray-100 dark:bg-dark-600" : ""}`}
                      aria-label="Liste görünümü"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Filtre Temizleme */}
                  {(activeCategory !== "all" || activeTag !== "" || searchTerm !== "" || sortBy !== "date") && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-primary-600 dark:text-primary-400 font-medium flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Filtreleri Temizle
                    </button>
                  )}
                </div>
              </div>
              
              {/* Kategori Filtreleri */}
              <div className="mb-10 overflow-x-auto hide-scrollbar">
                <motion.div 
                  className="flex space-x-2 min-w-max pb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        activeCategory === category.id
                          ? 'bg-primary-600 text-white shadow-md'
                          : 'bg-white dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 border border-slate-200 dark:hover:bg-dark-600 dark:border-dark-600 shadow-sm'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </motion.div>
              </div>
              
              {/* Blog Yazıları */}
              {currentPosts.length > 0 ? (
                <>
                  {/* Grid Görünümü */}
                  {viewType === "grid" && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      {currentPosts.map((post, index) => (
                        <motion.article 
                          key={post.id} 
                          className="group relative bg-white dark:bg-dark-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-slate-200 dark:border-dark-700 transform-gpu hover:-translate-y-1"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                          <div className="relative h-48 overflow-hidden">
                            <img 
                              src={post.image || `https://source.unsplash.com/random/600x400?law,${post.id}`} 
                              alt={post.imageAlt || post.title} 
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://source.unsplash.com/random/600x400?law,${post.id}`;
                              }}
                            />
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                            <span className="absolute top-3 left-3 bg-primary-600/90 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded">
                              {categories.find(cat => cat.id === post.category)?.name || 'Genel'}
                            </span>
                            {post.views && (
                              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded flex items-center">
                                <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                {post.views.toLocaleString()}
                              </div>
                            )}
                          </div>
                          
                          <div className="p-5 flex flex-col flex-grow">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                            
                            {/* Etiketler */}
                            {post.tags && post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mb-4">
                                {post.tags.slice(0, 2).map(tagId => {
                                  const tag = tags.find(t => t.id === tagId);
                                  return tag ? (
                                    <button 
                                      key={tagId}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setActiveTag(tagId);
                                      }}
                                      className="px-2 py-0.5 bg-slate-100 dark:bg-dark-700 text-slate-700 dark:text-gray-400 rounded text-xs font-medium hover:bg-slate-200 dark:hover:bg-dark-600 border border-slate-200 dark:border-dark-700"
                                    >
                                      #{tag.name}
                                    </button>
                                  ) : null;
                                })}
                                {post.tags.length > 2 && (
                                  <span className="px-2 py-0.5 bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 rounded text-xs font-medium">
                                    +{post.tags.length - 2}
                                  </span>
                                )}
                              </div>
                            )}
                            
                            <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-dark-700">
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                <span>{post.date}</span>
                                <span className="mx-1">•</span>
                                <span>{post.readTime} okuma</span>
                              </div>
                              <span className="inline-flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium">
                                Devamını Oku
                                <svg className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              </span>
                            </div>
                          </div>
                          
                          <a href={`/blog/${post.id}`} className="absolute inset-0" aria-label={`${post.title} yazısını oku`}></a>
                        </motion.article>
                      ))}
                    </div>
                  )}
                  
                  {/* Liste Görünümü */}
                  {viewType === "list" && (
                    <div className="space-y-6">
                      {currentPosts.map((post, index) => (
                        <motion.article 
                          key={post.id} 
                          className="group relative bg-white dark:bg-dark-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row border border-slate-200 dark:border-dark-700"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                          <div className="relative sm:w-1/3 h-48 sm:h-auto overflow-hidden">
                            <img 
                              src={post.image || `https://source.unsplash.com/random/600x400?law,${post.id}`} 
                              alt={post.imageAlt || post.title} 
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://source.unsplash.com/random/600x400?law,${post.id}`;
                              }}
                            />
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                            <span className="absolute top-3 left-3 bg-primary-600/90 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded">
                              {categories.find(cat => cat.id === post.category)?.name || 'Genel'}
                            </span>
                          </div>
                          
                          <div className="p-5 sm:p-6 sm:w-2/3 flex flex-col">
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                              <span>{post.date}</span>
                              <span className="mx-1">•</span>
                              <span>{post.readTime} okuma</span>
                              {post.views && (
                                <>
                                  <span className="mx-1">•</span>
                                  <span className="flex items-center">
                                    <svg className="w-3.5 h-3.5 mr-0.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    {post.views.toLocaleString()}
                                  </span>
                                </>
                              )}
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                              {post.title}
                            </h3>
                            
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{post.excerpt}</p>
                            
                            <div className="mt-auto flex flex-wrap items-center justify-between">
                              {/* Etiketler */}
                              {post.tags && post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5">
                                  {post.tags.map(tagId => {
                                    const tag = tags.find(t => t.id === tagId);
                                    return tag ? (
                                      <button 
                                        key={tagId}
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          setActiveTag(tagId);
                                        }}
                                        className="px-2 py-0.5 bg-slate-100 dark:bg-dark-700 text-slate-700 dark:text-gray-400 rounded text-xs font-medium hover:bg-slate-200 dark:hover:bg-dark-600 border border-slate-200 dark:border-dark-700"
                                      >
                                        #{tag.name}
                                      </button>
                                    ) : null;
                                  })}
                                </div>
                              )}
                              
                              <span className="inline-flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium mt-2 sm:mt-0">
                                Devamını Oku
                                <svg className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7m7-7H3" />
                                </svg>
                              </span>
                            </div>
                          </div>
                          
                          <a href={`/blog/${post.id}`} className="absolute inset-0" aria-label={`${post.title} yazısını oku`}></a>
                        </motion.article>
                      ))}
                    </div>
                  )}
                  
                  {/* Sayfalama */}
                  {totalPages > 1 && (
                    <div className="mt-12 flex justify-center">
                      <nav className="inline-flex rounded-md shadow">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className={`relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-sm font-medium ${
                            currentPage === 1 
                              ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-600'
                          }`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        
                        {[...Array(totalPages)].map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`relative inline-flex items-center px-4 py-2 border border-slate-300 dark:border-dark-600 ${
                              i === 0 ? '' : 'border-l-0'
                            } ${
                              i === totalPages - 1 ? '' : 'border-r-0'
                            } text-sm font-medium ${
                              currentPage === i + 1
                                ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-400 z-10 font-medium'
                                : 'bg-white dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-dark-600'
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                        
                        <button
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className={`relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-sm font-medium ${
                            currentPage === totalPages 
                              ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-600'
                          }`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </nav>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20 bg-white dark:bg-dark-800 rounded-xl shadow-sm">
                  <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Aradığınız kriterlere uygun yazı bulunamadı</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">Lütfen farklı bir arama terimi kullanın veya tüm kategorileri görüntüleyin.</p>
                  <button 
                    onClick={clearFilters} 
                    className="px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg inline-flex items-center transition-colors"
                  >
                    <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Tüm Yazıları Göster
                  </button>
                </div>
              )}
            </div>
            
            {/* Yan Menü */}
            <div className="lg:col-span-1 space-y-8">
              {/* Popüler Yazılar */}
              <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md border border-slate-200 dark:border-dark-700 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Popüler Yazılar</h3>
                <div className="space-y-4">
                  {popularPosts.map((post) => (
                    <a 
                      key={post.id} 
                      href={`/blog/${post.id}`}
                      className="group flex items-center space-x-3"
                    >
                      <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                        <img 
                          src={post.image || `https://source.unsplash.com/random/100x100?law,${post.id}`} 
                          alt={post.title} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://source.unsplash.com/random/100x100?law,${post.id}`;
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400">
                          {post.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {post.date} • {post.views.toLocaleString()} görüntülenme
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Tüm Etiketler */}
              <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md border border-slate-200 dark:border-dark-700 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Popüler Etiketler</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag.id}
                      onClick={() => setActiveTag(activeTag === tag.id ? "" : tag.id)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                        activeTag === tag.id
                          ? "bg-primary-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-dark-700 dark:text-gray-300 dark:hover:bg-dark-600"
                      }`}
                    >
                      #{tag.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Hızlı Bülten Aboneliği */}
              <div className="bg-gradient-to-br from-primary-600 to-indigo-600 dark:from-primary-800 dark:to-indigo-800 rounded-xl shadow-sm p-6 text-white">
                <h3 className="text-lg font-bold mb-3">Bültenimize Abone Olun</h3>
                <p className="text-primary-100 text-sm mb-4">Düzenli olarak hukuki gelişmeler ve yeni içeriklerden haberdar olun.</p>
                
                <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
                  <input
                    type="email"
                    placeholder="E-posta adresiniz"
                    className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                  />
                  <button 
                    type="submit" 
                    className="w-full px-4 py-2 bg-white text-primary-700 hover:text-primary-800 font-medium rounded-lg transition-colors"
                  >
                    Abone Ol
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Abonelik CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-indigo-700 dark:from-primary-900 dark:to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <svg className="absolute h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
            <g transform="translate(300,300)">
              <path d="M125,-160.4C159.9,-146.7,184.6,-107.3,190.4,-67.4C196.2,-27.5,183.2,12.9,169.3,51.5C155.5,90.1,140.9,127,115.2,157.1C89.5,187.2,52.7,210.6,12.5,204.9C-27.7,199.2,-70.2,164.4,-96.7,128.8C-123.1,93.1,-133.4,56.5,-148.7,13.6C-164,-29.3,-184.2,-78.5,-172.6,-104.6C-161,-130.7,-117.6,-133.6,-83,-142.6C-48.5,-151.5,-22.9,-166.5,11.9,-180.1C46.7,-193.6,90.1,-174.1,125,-160.4Z" fill="currentColor" />
            </g>
          </svg>
        </div>
        
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Güncel Hukuki Gelişmelerden Haberdar Olun
            </motion.h2>
            
            <motion.p 
              className="text-primary-100 mb-8 text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              E-posta bültenimize abone olarak, yeni yazılarımızdan ve hukuki gelişmelerden ilk siz haberdar olun.
            </motion.p>
            
            <motion.form 
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-5 py-3 bg-white dark:bg-dark-800/90 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
              <button 
                type="submit" 
                className="px-5 py-3 bg-white text-primary-700 hover:text-primary-800 font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Abone Ol
              </button>
            </motion.form>
            
            <motion.p 
              className="text-primary-200 text-sm mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Gizliliğinize önem veriyoruz. E-postanız hiçbir şekilde üçüncü taraflarla paylaşılmayacaktır.
            </motion.p>
          </div>
        </div>
      </section>
      
      <MainFooter scrollToTopButton={true} />
    </Page>
  );
}