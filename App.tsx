import React, { useState, useEffect } from 'react';
import { Scene3D } from './components/Scene3D';
import { CustomCursor } from './components/CustomCursor';
import { DynamicIsland } from './components/DynamicIsland';
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
import { Contact } from './components/Contact';
import { GithubRepos } from './components/GithubRepos';
import { DiscordStatus } from './components/DiscordStatus';
import { LoadingScreen } from './components/LoadingScreen';
import { AiChat } from './components/AiChat';
import { MusicPlayer } from './components/MusicPlayer';
import { Section } from './types';
import { motion, useScroll, useSpring } from 'framer-motion';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<Section>('hero');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollToSection = (section: Section) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(section);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as Section);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-background text-white selection:bg-accent selection:text-white overflow-hidden">

      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[150] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat brightness-100 contrast-150"></div>

      {/* Vignette */}
      <div className="fixed inset-0 pointer-events-none z-[40] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]"></div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 origin-left z-[200]"
        style={{ scaleX }}
      />

      {/* Global Components */}
      <CustomCursor />
      <Scene3D />
      <DynamicIsland activeSection={activeSection} onNavigate={scrollToSection} />
      <DiscordStatus />
      <MusicPlayer />

      {/* Content Sections */}
      <main className="relative z-10 flex flex-col gap-0 md:gap-0 pb-32">
        <section id="hero" className="min-h-screen">
          <Hero />
        </section>

        <section id="projects" className="min-h-screen py-16 md:py-24 flex flex-col justify-center relative">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
          <BentoGrid />
          <GithubRepos />
        </section>

        <section id="about" className="min-h-[50vh] flex items-center justify-center px-6 md:px-8 relative py-16 md:py-24">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="max-w-4xl text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="h-[1px] w-8 bg-accent/50" />
                <span className="text-accent text-xs font-medium tracking-widest uppercase">Vizyon</span>
                <div className="h-[1px] w-8 bg-accent/50" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-accent mb-6 tracking-tight">
                VİZYON & YAKLAŞIM
              </h2>
              <p className="text-base sm:text-lg md:text-2xl leading-relaxed text-gray-300 font-light mb-6">
                Kod yazmak benim için sadece bir meslek değil — bir sanat formu. Her satırda bir amaç,
                her projede bir kimlik bırakıyorum. Teknolojiyi estetikle harmanlayarak, insanların
                sadece kullandığı değil,{' '}
                <span className="text-white font-medium italic">hissettiği</span>{' '}
                şeyler inşa ediyorum.
              </p>
              <p className="text-base sm:text-lg md:text-2xl leading-relaxed text-gray-300 font-light">
                Sıradan çözümler beni tatmin etmiyor. Performans, tasarım ve deneyim — üçü aynı anda
                mükemmel olmak zorunda. Çünkü iyi bir ürün gözle değil,{' '}
                <span className="text-white font-medium italic">ruhla</span>{' '}
                algılanır.
              </p>
            </motion.div>
          </div>
        </section>

        <section id="contact">
          <Contact />
        </section>

        <AiChat />
      </main>
    </div>
  );
};

export default App;