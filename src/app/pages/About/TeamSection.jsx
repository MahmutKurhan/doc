import { motion } from "framer-motion";

export function TeamSection() {
  const teamMembers = [
    {
      name: "Av. Ahmet Yılmaz",
      title: "Kurucu Ortak",
      image: "/images/team/member1.jpg",
      specialization: "Şirketler Hukuku",
      description: "20 yılı aşkın deneyimiyle ulusal ve uluslararası şirketlere hukuki danışmanlık sunmaktadır.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "ahmet@legalplatform.com"
      }
    },
    {
      name: "Av. Zeynep Kaya",
      title: "Ortak",
      image: "/images/team/member2.jpg",
      specialization: "İş Hukuku",
      description: "İş hukuku alanında uzmanlaşmış ve çalışma hayatının her aşamasında işçi ve işveren ilişkilerine hukuki çözümler sunmaktadır.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "zeynep@legalplatform.com"
      }
    },
    {
      name: "Av. Mehmet Demir",
      title: "Kıdemli Avukat",
      image: "/images/team/member3.jpg",
      specialization: "Gayrimenkul Hukuku",
      description: "Gayrimenkul projelerinin hukuki altyapısını oluşturma ve uyuşmazlıkların çözümünde geniş tecrübeye sahiptir.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "mehmet@legalplatform.com"
      }
    },
    {
      name: "Av. Ayşe Yıldız",
      title: "Kıdemli Avukat",
      image: "/images/team/member4.jpg",
      specialization: "Aile Hukuku",
      description: "Aile hukuku konusunda uzmanlaşmış olup, aile içi uyuşmazlıklarda çözüm odaklı yaklaşımlar sunmaktadır.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "ayse@legalplatform.com"
      }
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-dark-800">
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            className="text-3xl font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Uzman Ekibimiz
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
            Her biri kendi alanında uzmanlaşmış profesyonel kadromuz.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              className="bg-gray-50 dark:bg-dark-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4 w-full">
                    <span className="inline-block px-2 py-1 bg-primary-600 text-white text-xs font-medium rounded mb-2">
                      {member.specialization}
                    </span>
                    <h3 className="text-lg font-bold text-white">{member.name}</h3>
                    <p className="text-primary-100">{member.title}</p>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {member.description}
                </p>
                <div className="flex space-x-3">
                  <a 
                    href={member.social.linkedin} 
                    className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                    </svg>
                  </a>
                  <a 
                    href={member.social.twitter} 
                    className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a 
                    href={`mailto:${member.social.email}`} 
                    className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4.236l-8 4.882-8-4.882V6h16v2.236z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}