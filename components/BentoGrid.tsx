import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles, Layers, Zap, ShieldCheck } from 'lucide-react';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: 1,
    title: "Project Olympyx",
    category: "Discord Botu",
    description: "Olympyx - Topluluğunun istekleri üzerine şekillenen, sunucunuzda düzeni sağlamak, eğlence katmak ve işinizi kolaylaştırmakta uzman bir bottur.",
    image: "https://cdn.discordapp.com/avatars/1411086675333087484/88163e70d7957ed3d8988cb0405995e9.png?size=4096", // High res
    tech: ["Limitsizlik", "Yapay Zeka", "Moderasyon"],
    link: "https://discord.gg/kAk45yKJrB"
  },
  {
    id: 2,
    title: "AzeDev",
    category: "Geliştiriciler Topluluğu ",
    description: "1000+ kaliteli developerle dolu, saniyeler içinde çözüm üreten ve share odaklı tasarlanan discord sunucusu.",
    image: "https://cdn.discordapp.com/icons/1423407174641520775/2d79e8ed711ea68a329d235b2e8a1281.png",
    tech: ["Aktif Topluluk", "Ücretsiz Altyapılar", "Kaliteli Projeler"],
    link: "#"
  },
  {
    id: 3,
    title: "PYX SPAM",
    category: "Patlatma Asistanınız",
    description: "Hızlı spam komutları,botu eklemeden otomatik mesaj göndertme ve koruma sistemleri sunan ideal ve güçlü bir spam botu.",
    image: "data:image/jpeg;base64,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",
    tech: ["Hız", "Patlatma", "Ücretsiz"],
    link: "#"
  },
  {
    id: 4,
    title: "BDFD IDE",
    category: "Akıllı Asistan",
    description: "Discord bot geliştiricileri için hazırlanmış bir kontrol paneli ve BDFD kod yardım platformu. Komut oluşturmayı kolaylaştırır ve bot sistemlerini daha hızlı geliştirmenizi sağlar.",
    image: "https://www.santanderopenacademy.com/content/dam/becasmicrosites/01-soa-blog/scripting_1.jpg",
    tech: ["Doğal Dil İşleme", "Otomasyon", "Makine Öğrenimi"],
    link: "#"
  }
];

export const BentoGrid: React.FC = () => {
  const [activeId, setActiveId] = useState<number>(1);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative">
      
      {/* Header Section */}
      <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-none">
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="pointer-events-auto"
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-accent/10 rounded-lg border border-accent/20">
                     <Layers className="text-accent" size={20} />
                </div>
                <span className="text-accent font-display font-medium tracking-widest text-sm uppercase">Portfolyo</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-display font-bold text-white leading-tight">
              PROJELER &<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-gray-200 to-gray-500">ÇÖZÜMLER</span>
            </h2>
        </motion.div>
        
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:max-w-sm text-right md:text-left pointer-events-auto"
        >
             <p className="text-white/60 text-lg font-light leading-relaxed">
                Her biri, karmaşık deneyimlerinizi basit ve şık bir deneyime dönüştürmek için tasarlandı.


                Tıklayarak Açabilirsin
            </p>
        </motion.div>
      </div>

      {/* Accordion Container */}
      <div className="flex flex-col md:flex-row gap-4 h-[800px] md:h-[600px] w-full">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            layout
            onClick={() => setActiveId(project.id)}
            onHoverStart={() => setActiveId(project.id)} // Desktop hover interaction
            className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-out border border-white/10 ${
              activeId === project.id 
                ? 'md:flex-[3] flex-[3] shadow-[0_0_50px_-10px_rgba(59,130,246,0.3)]' 
                : 'md:flex-[0.5] flex-[1] grayscale hover:grayscale-0'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <img 
                    src={project.image} 
                    alt={project.title} 
                    className={`w-full h-full object-cover transition-transform duration-1000 ${activeId === project.id ? 'scale-100' : 'scale-150'}`}
                />
                <div className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ${activeId === project.id ? 'opacity-30' : 'opacity-70'}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between overflow-hidden">
                
                {/* Header: ID & Icon */}
                <div className="flex justify-between items-start">
                    <span className="font-display font-bold text-2xl md:text-4xl text-white/20">0{project.id}</span>
                    <motion.div 
                        animate={{ rotate: activeId === project.id ? 45 : 0 }}
                        className={`p-3 rounded-full backdrop-blur-md transition-colors ${activeId === project.id ? 'bg-white text-black' : 'bg-white/10 text-white'}`}
                    >
                        <ArrowUpRight size={24} />
                    </motion.div>
                </div>

                {/* Info Section */}
                <div className="relative">
                    {/* Collapsed Vertical Title (Desktop Only) */}
                    {activeId !== project.id && (
                        <div className="hidden md:flex absolute bottom-0 left-0 -rotate-90 origin-bottom-left translate-y-full w-[400px]">
                             <h3 className="text-2xl font-bold text-white/80 whitespace-nowrap tracking-wider uppercase">{project.title}</h3>
                        </div>
                    )}

                    {/* Active Content */}
                    <AnimatePresence mode="wait">
                        {activeId === project.id && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                            >
                                <span className="inline-block py-1 px-3 rounded-full bg-accent/80 backdrop-blur-sm text-white text-xs font-bold tracking-wider uppercase mb-3 border border-white/20">
                                    {project.category}
                                </span>
                                <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 leading-none">
                                    {project.title}
                                </h3>
                                <p className="text-white/80 text-sm md:text-lg leading-relaxed max-w-lg mb-6 drop-shadow-lg">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t, i) => (
                                        <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/10">
                                            {i === 0 && <Zap size={12} className="text-yellow-400" />}
                                            {i === 1 && <ShieldCheck size={12} className="text-green-400" />}
                                            {i === 2 && <Sparkles size={12} className="text-purple-400" />}
                                            <span className="text-xs font-medium text-white">{t}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                    {/* Mobile Title when collapsed */}
                    <div className="md:hidden mt-4">
                        {activeId !== project.id && (
                            <h3 className="text-xl font-bold text-white">{project.title}</h3>
                        )}
                    </div>
                </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};