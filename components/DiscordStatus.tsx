import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Code, Radio } from 'lucide-react';

const DISCORD_ID = '988829353297195089'; 

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

  if (!data) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      case 'dnd': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const statusColor = getStatusColor(data.discord_status);
  const spotify = data.spotify;
  const codingActivity = data.activities?.find(a => a.name === "Visual Studio Code");

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col gap-2 items-start"
      >
        {/* Status Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/5 rounded-full shadow-2xl">
          <div className="relative">
            <div className={`w-2 h-2 rounded-full ${statusColor} animate-pulse`} />
            <div className={`absolute inset-0 w-2 h-2 rounded-full ${statusColor} opacity-50 blur-[3px]`} />
          </div>
          <span className="text-[10px] font-mono font-bold text-white/80 uppercase tracking-wider">
            {data.discord_status === 'dnd' ? 'Rahatsız Etmeyin' : data.discord_status === 'idle' ? 'Boşta' : data.discord_status === 'online' ? 'Çevrimiçi' : 'Çevrimdışı'}
          </span>
        </div>

        {/* Spotify Activity */}
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

        {/* VS Code Activity */}
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
      </motion.div>
    </div>
  );
};