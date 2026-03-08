import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Layers } from 'lucide-react';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: 1,
    title: "Project Olympyx",
    category: "Discord Botu",
    description: "Olympyx - Topluluğunun istekleri üzerine şekillenen uzman bir bottur.",
    image: "https://cdn.discordapp.com/avatars/1411086675333087484/88163e70d7957ed3d8988cb0405995e9.png?size=512", 
    tech: ["Limitsizlik", "Yapay Zeka", "Moderasyon"],
    link: "https://discord.gg/kAk45yKJrB"
  },
  {
    id: 2,
    title: "AzeDev",
    category: "Geliştiriciler Topluluğu",
    description: "1000+ kaliteli developerle dolu discord sunucusu.",
    image: "https://cdn.discordapp.com/icons/1423407174641520775/2d79e8ed711ea68a329d235b2e8a1281.png",
    tech: ["Aktif Topluluk", "Altyapılar", "Kaliteli"],
    link: "https://discord.gg/yVCCMMbzBJ"
  },
  {
    id: 3,
    title: "PYX SPAM",
    category: "Patlatma Asistanınız",
    description: "Hızlı spam komutları ve koruma sistemleri sunan güçlü bot.",
    image: "https://cdn.discordapp.com/attachments/1397889693429010553/1479835398749290537/what-is-a-server-jpg.png?ex=69ad7b9d&is=69ac2a1d&hm=5f6723286682b6178c8d785568cd8a12a7e9ae3b32b7c2ea7631115cd0ad44a0&", 
    tech: ["Hız", "Patlatma", "Ücretsiz"],
    link: "https://discord.gg/kAk45yKJrB"
  },
  {
    id: 4,
    title: "BDFD IDE",
    category: "Akıllı Asistan",
    description: "Discord bot geliştiricileri için kod yardım platformu.",
    image: "https://www.santanderopenacademy.com/content/dam/becasmicrosites/01-soa-blog/scripting_1.jpg",
    tech: ["Otomasyon", "Kodlama", "Hızlı"],
    link: ""
  }
];

export const BentoGrid: React.FC = () => {
  const [activeId, setActiveId] = useState<number>(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative py-10">
      
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="flex items-center gap-3 mb-2">
            <Layers className="text-accent" size={18} />
            <span className="text-accent font-medium tracking-widest text-xs uppercase">Portfolyo</span>
          </div>
          <h2 className="text-3xl md:text-6xl font-display font-bold text-white">
            PROJELER & <span className="text-gray-500">ÇÖZÜMLER</span>
          </h2>
        </motion.div>
      </div>

      {/* MOBILE: dikey liste */}
      {isMobile ? (
        <div className="flex flex-col gap-3">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveId(activeId === project.id ? 0 : project.id)}
              className="relative rounded-2xl overflow-hidden cursor-pointer border border-white/10"
            >
              {/* Kapalı durum */}
              {activeId !== project.id ? (
                <div className="flex items-center gap-4 p-4 bg-white/5">
                  <img src={project.image} alt={project.title} className="w-12 h-12 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-accent uppercase tracking-wider mb-0.5">{project.category}</p>
                    <h3 className="text-white font-bold text-base truncate">{project.title}</h3>
                  </div>
                  <ArrowUpRight size={18} className="text-white/40 shrink-0" />
                </div>
              ) : (
                /* Açık durum */
                <div className="relative h-64">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  <div className="absolute inset-0 p-5 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] text-accent uppercase tracking-wider bg-black/40 px-2 py-1 rounded-full border border-accent/20">{project.category}</span>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-full bg-white text-black"
                        >
                          <ArrowUpRight size={16} />
                        </a>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                      <p className="text-white/70 text-xs mb-3 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t, i) => (
                          <span key={i} className="text-[10px] px-2 py-1 rounded bg-white/10 text-white border border-white/10">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* DESKTOP: yatay accordion */
        <div className="flex gap-3 h-[550px] w-full">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              layout
              onClick={() => setActiveId(project.id)}
              onHoverStart={() => setActiveId(project.id)}
              className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                activeId === project.id
                  ? 'flex-[4] shadow-2xl shadow-blue-500/10'
                  : 'flex-[1] grayscale brightness-50'
              }`}
            >
              <div className="absolute inset-0">
                <img loading="lazy" src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              </div>

              <div className="absolute inset-0 p-5 flex flex-col justify-between">
                <div className="flex justify-between items-start z-20">
                  <span className="font-bold text-xl text-white/20">0{project.id}</span>
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                      activeId === project.id ? 'bg-white text-black' : 'bg-white/10 text-white'
                    }`}
                  >
                    <ArrowUpRight size={20} />
                  </motion.a>
                </div>

                <div className="relative z-10">
                  <AnimatePresence mode="wait">
                    {activeId === project.id ? (
                      <motion.div
                        key="active"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-white/70 text-sm line-clamp-2 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((t, i) => (
                            <span key={i} className="text-[10px] px-2 py-1 rounded bg-white/10 text-white border border-white/10">{t}</span>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.h3 key="inactive" className="text-lg font-bold text-white/50 truncate">
                        {project.title}
                      </motion.h3>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};