import React, { useEffect, useState, useRef } from 'react';
import useWebSocket from 'react-use-websocket';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Code, Radio } from 'lucide-react';

const DISCORD_ID = '988829353297195089';

const track = {
  title: 'Zıtlıklarına Hastayım',
  artist: 'Yaşlı Amca',
  src: '/assets/zitliklar.mp3',
};

interface LanyardData {
  d: {
    discord_status: 'online' | 'idle' | 'dnd' | 'offline';
    listening_to_spotify: boolean;
    spotify: {
      song: string;
      artist: string;
      album_art_url: string;
    } | null;
    activities: Array<{
      name: string;
      state: string;
      details: string;
      assets?: { large_image?: string; }
    }>;
    kv: Record<string, string>;
  };
}

// ————— Music Player —————
const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.4);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const tryAutoplay = () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
      document.removeEventListener('click', tryAutoplay);
      document.removeEventListener('keydown', tryAutoplay);
    };

    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          document.addEventListener('click', tryAutoplay);
          document.addEventListener('keydown', tryAutoplay);
        });
    }

    return () => {
      document.removeEventListener('click', tryAutoplay);
      document.removeEventListener('keydown', tryAutoplay);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setProgress(audioRef.current.currentTime);
    setDuration(audioRef.current.duration || 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Number(e.target.value);
    setProgress(Number(e.target.value));
  };

  const handleEnded = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const formatTime = (s: number) => {
    if (isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={track.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadedMetadata={handleTimeUpdate}
      />

      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.button
            key="pill"
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl text-white/70 hover:text-white hover:border-white/20 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="flex items-end gap-[2px] h-4 w-5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className={`w-[3px] rounded-full ${isPlaying ? 'bg-blue-400' : 'bg-white/40'}`}
                  animate={isPlaying ? { height: ['40%', '100%', '60%', '80%', '40%'] } : { height: '40%' }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
                />
              ))}
            </div>
            <span className="text-xs font-medium tracking-wide">
              {isPlaying ? track.title : 'Müzik'}
            </span>
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            className="w-72 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-2xl p-4 shadow-2xl"
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-end gap-[2px] h-4 w-5">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className={`w-[3px] rounded-full ${isPlaying ? 'bg-blue-400' : 'bg-white/30'}`}
                    animate={isPlaying ? { height: ['40%', '100%', '60%', '80%', '40%'] } : { height: '40%' }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
                  />
                ))}
              </div>
              <span className="text-[10px] text-white/30 tracking-widest uppercase">Arka Plan Müziği</span>
              <button onClick={() => setIsExpanded(false)} className="text-white/30 hover:text-white/70 transition-colors text-lg leading-none">×</button>
            </div>

            <div className="mb-3">
              <p className="text-white font-medium text-sm truncate">{track.title}</p>
              <p className="text-white/40 text-xs">{track.artist}</p>
            </div>

            <div className="mb-3">
              <input
                type="range" min={0} max={duration || 1} step={0.1} value={progress}
                onChange={handleSeek}
                className="w-full h-[3px] rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, rgba(96,165,250,0.8) ${(progress / (duration || 1)) * 100}%, rgba(255,255,255,0.1) ${(progress / (duration || 1)) * 100}%)` }}
              />
              <div className="flex justify-between text-[10px] text-white/30 mt-1">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 mb-3">
              <button onClick={togglePlay} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-all hover:scale-105">
                {isPlaying ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                )}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="rgba(255,255,255,0.3)"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" /></svg>
              <input
                type="range" min={0} max={1} step={0.01} value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-[3px] rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, rgba(255,255,255,0.5) ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%)` }}
              />
              <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.3)"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ————— Discord Status + Music Player birlikte —————
export const DiscordStatus: React.FC = () => {
  const [data, setData] = useState<LanyardData['d'] | null>(null);
  const { sendJsonMessage, lastJsonMessage } = useWebSocket('wss://api.lanyard.rest/socket');

  useEffect(() => {
    sendJsonMessage({ op: 2, d: { subscribe_to_id: DISCORD_ID } });
  }, [sendJsonMessage]);

  useEffect(() => {
    if (lastJsonMessage) {
      const msg = lastJsonMessage as any;
      if (msg?.t === 'INIT_STATE' || msg?.t === 'PRESENCE_UPDATE') {
        setData(msg.d);
      }
    }
  }, [lastJsonMessage]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      case 'dnd': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const spotify = data?.spotify;
  const codingActivity = data?.activities?.find(a => a.name === "Visual Studio Code");
  const statusColor = data ? getStatusColor(data.discord_status) : '';

  return (
    <div className="fixed bottom-4 left-4 z-[190]">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col gap-2 items-start"
      >
        {/* Music Player — her zaman en üstte */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <MusicPlayer />
        </motion.div>

        {/* Discord Status */}
        {data && (
          <>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/5 rounded-full shadow-2xl">
              <div className="relative">
                <div className={`w-2 h-2 rounded-full ${statusColor} animate-pulse`} />
                <div className={`absolute inset-0 w-2 h-2 rounded-full ${statusColor} opacity-50 blur-[3px]`} />
              </div>
              <span className="text-[10px] font-mono font-bold text-white/80 uppercase tracking-wider">
                {data.discord_status === 'dnd' ? 'Rahatsız Etmeyin' : data.discord_status === 'idle' ? 'Boşta' : data.discord_status === 'online' ? 'Çevrimiçi' : 'Çevrimdışı'}
              </span>
            </div>

            <AnimatePresence>
              {spotify && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 p-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl max-w-[180px] md:max-w-xs"
                >
                  <img src={spotify.album_art_url} alt="Album Art" className="w-7 h-7 md:w-10 md:h-10 rounded-md shrink-0" />
                  <div className="flex flex-col overflow-hidden min-w-0">
                    <div className="flex items-center gap-1 text-[9px] text-green-400 font-bold uppercase tracking-wider mb-0.5">
                      <Music size={8} />
                      <span>Dinliyor</span>
                    </div>
                    <span className="text-white text-[10px] md:text-xs font-bold truncate">{spotify.song}</span>
                    <span className="text-white/50 text-[9px] md:text-[10px] truncate">{spotify.artist}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {codingActivity && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 p-2 bg-[#007acc]/20 backdrop-blur-xl border border-[#007acc]/30 rounded-xl max-w-[180px] md:max-w-xs"
                >
                  <Code size={16} className="text-[#007acc] shrink-0 md:w-6 md:h-6" />
                  <div className="flex flex-col overflow-hidden min-w-0">
                    <div className="flex items-center gap-1 text-[9px] text-[#007acc] font-bold uppercase tracking-wider mb-0.5">
                      <Radio size={8} />
                      <span>Kodluyor</span>
                    </div>
                    <span className="text-white text-[10px] md:text-xs font-bold truncate">{codingActivity.details}</span>
                    <span className="text-white/50 text-[9px] md:text-[10px] truncate">{codingActivity.state}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </motion.div>
    </div>
  );
};