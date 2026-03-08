import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const DISCORD_ID = '988829353297195089';
const BASE_USERS = 20461;
const BASE_TIME = Date.now();

const stats = [
  { label: 'Sunucu', value: 86, suffix: '', static: true },
  { label: 'Kullanıcı', value: BASE_USERS, suffix: '', static: false },
  { label: 'Proje', value: 7, suffix: '', static: true },
];

function useCountUp(target: number, duration: number = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return count;
}

const StatItem: React.FC<{ label: string; value: number; index: number; live?: boolean }> = ({ label, value, index, live }) => {
  const [liveValue, setLiveValue] = useState(value);
  const displayed = useCountUp(liveValue, 1200);

  useEffect(() => {
    if (!live) return;
    // 5 dakikada 3 artır = her ~100 saniyede 1
    const interval = setInterval(() => {
      setLiveValue(prev => prev + 1);
    }, 100000);
    return () => clearInterval(interval);
  }, [live]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 + index * 0.15, duration: 0.5 }}
      className="flex flex-col items-center gap-0.5"
    >
      <span className="text-white font-bold text-lg md:text-4xl font-mono tabular-nums">
        {displayed.toLocaleString('tr-TR')}
      </span>
      <span className="text-white/30 text-[10px] md:text-xs uppercase tracking-widest">{label}</span>
    </motion.div>
  );
};

export const Hero: React.FC = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`)
      .then(res => res.json())
      .then(data => {
        const user = data?.data?.discord_user;
        if (user?.avatar) {
          setAvatarUrl(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="relative h-screen flex flex-col justify-center items-start px-6 md:px-24 z-10 pointer-events-none">

      {/* Sağ üst istatistik widget */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute top-8 right-8 hidden md:flex items-center gap-6 px-6 py-3 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md pointer-events-auto"
      >
        {stats.map((stat, i) => (
          <React.Fragment key={stat.label}>
            <StatItem label={stat.label} value={stat.value} index={i} live={!stat.static} />
            {i < stats.length - 1 && (
              <div className="w-[1px] h-8 bg-white/10" />
            )}
          </React.Fragment>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pointer-events-auto w-full"
      >
        {/* Slogan */}
        <div className="overflow-hidden mb-2">
          <motion.p
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-accent font-sans font-medium tracking-[0.15em] text-[10px] sm:text-xs md:text-base mb-4 uppercase"
          >
            Her Satır Bir Amaç, Her Proje Bir İmza
          </motion.p>
        </div>

        {/* Avatar + İsim */}
        <div className="flex items-center gap-4 md:gap-6 mb-4">
          {avatarUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative shrink-0"
            >
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                <img src={avatarUrl} alt="poseic" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0.5 right-0.5 w-3 h-3 md:w-4 md:h-4 rounded-full bg-green-500 border-2 border-black shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            </motion.div>
          )}

          <h1 className="font-display font-bold text-[clamp(3rem,12vw,9rem)] text-white leading-[0.9] tracking-tighter mix-blend-difference">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
              >
                {' '}
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
        </div>

        {/* Açıklama */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-5 max-w-xl text-sm sm:text-base md:text-xl text-gray-400 font-light leading-relaxed pr-2"
        >
          Sıradanlığın ötesinde, yaşayan ve nefes alan dijital botlar tasarlıyorum.
          Teknolojiyi estetikle birleştirerek, markanız için unutulmaz
          <span className="text-white font-medium"> web deneyimleri</span> ve
          <span className="text-white font-medium"> discord botları</span> üretiyorum.
        </motion.p>

        {/* Mobil istatistikler */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-8 flex items-center gap-6 md:hidden"
        >
          {stats.map((stat, i) => (
            <React.Fragment key={stat.label}>
              <StatItem label={stat.label} value={stat.value} index={i} live={!stat.static} />
              {i < stats.length - 1 && <div className="w-[1px] h-8 bg-white/10" />}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Mobil scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-10 flex items-center gap-3 md:hidden"
        >
          <div className="w-8 h-[1px] bg-white/20 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full w-1/2 bg-accent"
              animate={{ left: ['-50%', '100%'] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            />
          </div>
          <span className="text-[10px] text-white/30 font-sans tracking-widest uppercase">Kaydır</span>
        </motion.div>
      </motion.div>

      {/* Desktop scroll hint */}
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