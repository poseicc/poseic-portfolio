import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <div className="relative h-screen flex flex-col justify-center items-start px-6 md:px-24 z-10 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pointer-events-auto w-full"
      >
        <div className="overflow-hidden mb-2">
            <motion.p 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-accent font-sans font-medium tracking-[0.2em] text-xs md:text-base mb-4 uppercase"
            >
                Her Satır Bir Amaç, Her Proje Bir İmza
            </motion.p>
        </div>
        
        <h1 className="font-display font-bold text-5xl sm:text-7xl md:text-9xl text-white leading-[0.9] tracking-tighter mix-blend-difference">
          <span className="block overflow-hidden">
             <motion.span 
               className="block"
               initial={{ y: "100%" }}
               animate={{ y: 0 }}
               transition={{ duration: 0.7, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
             >
               
             </motion.span>
          </span>
          <span className="block overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">
             <motion.span 
               className="block"
               initial={{ y: "100%" }}
               animate={{ y: 0 }}
               transition={{ duration: 0.7, delay: 0.45, ease: [0.33, 1, 0.68, 1] }}
             >
               poseic
             </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-6 max-w-xl text-base md:text-xl text-gray-400 font-light leading-relaxed pr-4"
        >
          Sıradanlığın ötesinde, yaşayan ve nefes alan dijital botlar tasarlıyorum. 
          Teknolojiyi estetikle birleştirerek, markanız için unutulmaz 
          <span className="text-white font-medium"> web deneyimleri</span> ve
          <span className="text-white font-medium"> discord botları</span> üretiyorum.
        </motion.p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 right-12 hidden md:block"
      >
        <div className="flex flex-col items-end text-right text-xs text-white/30 font-sans tracking-widest space-y-2">
          <span>KEŞFETMEK İÇİN KAYDIRIN</span>
          <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
             <motion.div 
                className="absolute top-0 w-full bg-accent h-1/2"
                animate={{ top: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
             />
          </div>
        </div>
      </motion.div>
    </div>
  );
};