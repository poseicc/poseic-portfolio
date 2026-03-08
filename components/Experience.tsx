import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ChevronDown } from 'lucide-react';

const experiences = [
  {
    id: 1,
    year: '2026',
    title: 'Geliştirici Topluluğu Kurucusu',
    company: 'AzeDev & CodeShare Sunucusu',
    tags: ['Topluluk', 'Kodlama', 'Eğitim'],
    description:
      '1000+ kaliteli geliştiriciden oluşan bir topluluk kurdum. Kod paylaşımı ve öğrenme odaklı bir platform oluşturarak geliştiricilerin bir araya gelmesini sağladım.',
  },
  {
    id: 2,
    year: '2026',
    title: 'Web Yazılımcısı & Portfolio Geliştirici',
    company: 'Freelance',
    tags: ['React', 'TypeScript', 'Vite'],
    description:
      'Birden fazla kişisel ve müşteri portfolyosu tasarladım ve geliştirdim. Modern web teknolojileriyle özgün, animasyonlu ve performanslı siteler inşa ediyorum.',
  },
  {
    id: 3,
    year: '2026',
    title: 'Priv Sunucusu Kurucusu',
    company: 'Özel / VIP Topluluk',
    tags: ['VIP', 'Özel Topluluk', 'Yönetim'],
    description:
      'Seçkin üyelere yönelik özel bir topluluk platformu kurdum. Erişim kontrollü, kaliteli içerik odaklı bir ortam oluşturdum.',
  },
  {
    id: 4,
    year: '2025',
    title: 'Discord Botu Kurucusu',
    company: 'Olympyx & PYX SPAM',
    tags: ['Bot Geliştirme', 'Yapay Zeka', 'Moderasyon'],
    description:
      'Topluluğun ihtiyaçlarına göre şekillenen, yapay zeka destekli moderasyon ve spam sistemleri içeren Discord botları kurdum ve geliştirdim.',
  },
  {
    id: 5,
    year: '2025',
    title: 'Tedarik Mağazası Kurucusu',
    company: 'Dijital Mağaza',
    tags: ['E-ticaret', 'Dijital Ürün', 'Satış'],
    description:
      'Dijital ürün ve hizmet satışı yapan bir tedarik mağazası kurdum. Müşteri yönetimi, ürün listeleme ve sipariş süreçlerini sıfırdan organize ettim.',
  },
  {
    id: 6,
    year: '2025',
    title: 'Minecraft Sunucusu Kurucusu',
    company: 'OlympCraft',
    tags: ['Oyun', 'Topluluk', 'Yönetim'],
    description:
      'OlympCraft adıyla kendi Minecraft sunucumu kurdum ve büyüttüm. Eklenti geliştirme, topluluk yönetimi ve sunucu altyapısını sıfırdan oluşturdum.',
  },
  {
    id: 7,
    year: '2024 — 2025',
    title: 'Reklam & Invite Ödül Sunucusu Kurucusu',
    company: 'Özel Projeler',
    tags: ['Büyüme', 'Otomasyon', 'Yönetim'],
    description:
      'Sunucu büyütme odaklı invite ödül sistemleri ve reklam platformları kurdum. Otomasyon ile binlerce kullanıcıya ulaşan sistemler tasarladım.',
  },
];

export const Experience: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section id="experience" className="min-h-screen py-16 md:py-24 px-6 md:px-8 relative flex flex-col justify-center">
      {/* Glow */}
      

      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <Briefcase className="text-accent" size={18} />
            <span className="text-accent font-medium tracking-widest text-xs uppercase">Geçmiş, Tecrübe</span>
          </div>
          <h2 className="text-3xl md:text-6xl font-display font-bold text-white">
            DENEYIM & <span className="text-gray-500">KURUCULUK</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Sol çizgi */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10 hidden md:block" />

          <div className="flex flex-col gap-2">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                <div
                  className={`md:pl-8 relative cursor-pointer group`}
                  onClick={() => setOpenId(openId === exp.id ? null : exp.id)}
                >
                  {/* Dot */}
                  <div className={`absolute left-[-4px] top-5 w-2 h-2 rounded-full border hidden md:block transition-colors duration-300 ${
                    openId === exp.id ? 'bg-accent border-accent' : 'bg-black border-white/20 group-hover:border-accent/50'
                  }`} />

                  <div className={`rounded-xl border transition-all duration-300 px-5 py-4 ${
                    openId === exp.id
                      ? 'border-[#3b4a6b] bg-[#111827]'
                      : 'border-[#1e2433] bg-[#0d1117] hover:border-[#2d3548] hover:bg-[#111827]'
                  }`}>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 min-w-0">
                        <span className="text-[10px] text-white/30 font-mono shrink-0 hidden md:block w-28">
                          {exp.year}
                        </span>
                        <div className="min-w-0">
                          <p className="text-[10px] text-white/30 font-mono md:hidden mb-0.5">{exp.year}</p>
                          <h3 className="text-white font-semibold text-sm md:text-base truncate">{exp.title}</h3>
                          <p className="text-accent/70 text-xs">{exp.company}</p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: openId === exp.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="shrink-0 text-white/30 group-hover:text-white/60 transition-colors"
                      >
                        <ChevronDown size={16} />
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {openId === exp.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 md:pl-32">
                            <p className="text-gray-400 text-sm leading-relaxed mb-3">
                              {exp.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {exp.tags.map((tag, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] px-2 py-1 rounded bg-white/5 text-white/60 border border-white/10"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};