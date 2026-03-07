import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, FolderGit2, Mail } from 'lucide-react';
import { Section } from '../types';

interface DynamicIslandProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
}

export const DynamicIsland: React.FC<DynamicIslandProps> = ({ activeSection, onNavigate }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = [
    { id: 'hero', icon: Home, label: 'Giriş' },
    { id: 'about', icon: User, label: 'Hakkımda' },
    { id: 'projects', icon: FolderGit2, label: 'Projeler' },
    { id: 'contact', icon: Mail, label: 'İletişim' },
  ];

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100]">
      <motion.div
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        onTouchStart={() => setIsExpanded(prev => !prev)}
        className="relative bg-[#0f0f0f]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-full overflow-hidden cursor-pointer"
        animate={{
          width: isExpanded ? 360 : 120,
          height: isExpanded ? 64 : 40,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.8 }}
      >
        <div className="absolute inset-0 flex items-center justify-center">

          {/* Collapsed */}
          <motion.div
            animate={{ opacity: isExpanded ? 0 : 1, scale: isExpanded ? 0.8 : 1 }}
            transition={{ duration: 0.15 }}
            className="absolute flex items-center gap-2 pointer-events-none"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            <span className="text-xs font-mono tracking-widest font-medium uppercase text-white/90">Menü</span>
          </motion.div>

          {/* Expanded */}
          <motion.div
            animate={{ opacity: isExpanded ? 1 : 0, y: isExpanded ? 0 : 8 }}
            transition={{ duration: 0.15, delay: isExpanded ? 0.05 : 0 }}
            className="absolute flex items-center justify-between w-full px-2"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { onNavigate(item.id as Section); setIsExpanded(false); }}
                  className="relative group flex flex-col items-center justify-center w-16 h-14"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white/10 rounded-2xl mx-1 my-1"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <Icon
                    size={20}
                    className={`relative z-10 transition-colors duration-150 ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white'}`}
                  />
                  {isActive && (
                    <div className="absolute -bottom-1 w-1 h-1 bg-accent rounded-full shadow-[0_0_5px_#3b82f6]" />
                  )}
                </button>
              );
            })}
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};