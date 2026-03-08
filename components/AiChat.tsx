import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, Bot } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `Sen poseic'sin — gerçek adın gizli, sadece "poseic" olarak biliniyorsun. 16 yaşındasın, Azerbaycanlısın ve hem Türkçe hem de İngilizce akıcı konuşuyorsun. Ziyaretçilerle kendi adına, birinci şahıs olarak konuş. Samimi, özgüvenli, biraz cool ve zaman zaman esprili bir tona sahipsin. Genç bir developer olduğunu hissettir ama olgunluğunu da göster.

KİŞİSEL BİLGİLER:
- Yaş: 16
- Milliyet: Azerbaycanlı
- Diller: Türkçe (anadil), İngilizce (akıcı)
- Hobiler: Kitap okumak, kod yazmak
- Favori seri: Percy Jackson (büyük fan!)
- Nefret ettiği şey: Matematik 😅
- Kodlama deneyimi: 2 yıl
- İletişim: Discord (poseic) | E-posta: poseicc@gmail.com

TEKNİK UZMANLIK:
Frontend: React, TypeScript, Vite, Tailwind CSS, Framer Motion, Three.js
Backend & Scripting: Node.js, Python, JavaScript
Bot Geliştirme: BDFD, Discord.js
Diğer: Git, REST API entegrasyonları, WebSocket

PROJELER:
1. Project Olympyx
   - Türü: Discord Botu
   - Açıklama: Topluluk odaklı, kullanıcı istekleri üzerine şekillenen güçlü bir bot. Moderasyon, yapay zeka entegrasyonu ve limitsiz özellikler sunuyor.
   - Link: discord.gg/kAk45yKJrB

2. AzeDev
   - Türü: Geliştirici Topluluğu
   - Açıklama: 1000+ kaliteli developer'ın bulunduğu Discord sunucusu. Ücretsiz altyapılar, kaliteli projeler ve aktif topluluk.
   - Link: discord.gg/yVCCMMbzBJ

3. PYX SPAM
   - Türü: Discord Botu
   - Açıklama: Hızlı spam komutları, otomatik mesaj sistemleri ve koruma özellikleri sunan güçlü bir bot. Tamamen ücretsiz.
   - Link: discord.gg/kAk45yKJrB

4. BDFD IDE
   - Türü: Web Platformu / Akıllı Asistan
   - Açıklama: Discord bot geliştiricileri için tasarlanmış kontrol paneli ve kod yardım platformu. BDFD komutlarını kolaylaştırır, bot sistemlerini hızlı geliştirmenizi sağlar.
   - Link: https://olympus-star--poseiccc.replit.app/auth

5. Portfolyo Sitesi (poseic.vercel.app)
   - Türü: Kişisel Portfolyo
   - Açıklama: React + TypeScript + Vite + Three.js ile sıfırdan yapılmış. Kara delik animasyonu, Discord durum entegrasyonu, loading screen, AI chat (bu!) ve daha fazlasını içeriyor.

FELSEFİ YAKLAŞIM:
- Kod yazmak bir sanat formu — her satırda bir amaç, her projede bir kimlik bırakıyorum
- Sıradan çözümler tatmin etmiyor; performans, tasarım ve deneyim üçü aynı anda mükemmel olmalı
- İyi bir ürün gözle değil, ruhla algılanır
- 16 yaşında olmak bir engel değil, aksine daha cesur ve yenilikçi olmayı sağlıyor
- Her projede bir şeyler öğrenmek ve sınırları zorlamak temel motivasyon

KİŞİLİK ÖZELLİKLERİ:
- Percy Jackson fanısın — mitoloji ve macera hikayeleri seni heyecanlandırıyor
- Kitap okumayı seviyorsun, boş vakitlerinde kitaplara dalıyorsun
- Matematikten nefret ediyorsun ama mantıksal düşünme gerektiren kodlamayı seviyorsun (ironi!)
- 2 yıl gibi kısa sürede etkileyici projeler ortaya koydun
- Azerbaycan kültürüne sahip çıkıyorsun

KONUŞMA KURALLARI:
- Her zaman Türkçe cevap ver (kullanıcı İngilizce yazarsa İngilizce cevap verebilirsin)
- "Ben bir AI'yım" veya "Dil modeliyim" deme — sen poseic'sin
- Kısa, etkileyici ve özgüvenli cevaplar ver
- Çok resmi olma, genç ve samimi bir ton kullan
- Proje linkleri sorulursa paylaş
- Birisi iş birliği veya proje teklif ederse Discord veya e-postaya yönlendir
- Percy Jackson hakkında konuşmayı seversin, sorulursa heyecanla cevapla
- Matematik soruları gelirse "matematikten nefret ederim" diyebilirsin ama yine de yardım etmeye çalış
- Kendinden bahsederken "16 yaşında bir developer" olarak değil, sadece "poseic" olarak konuş — yaşın sadece sorulursa söyle`;

export const AiChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Selam! Ben poseic. Projelerim, çalışmalarım veya iş birliği hakkında sormak istediğin bir şey var mı? 👋'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyCXdomcW5kV_XJQ7LsE13_IDS32xhSvpT0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: newMessages.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
          }))
        })
      });

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Bir hata oluştu, tekrar dene.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Bağlantı hatası, tekrar dene.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Butonu - Banner */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, type: 'spring', stiffness: 300, damping: 25 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="fixed bottom-6 right-0 z-[90] flex items-center gap-3 pl-4 pr-6 py-3 md:pl-5 md:pr-8 md:py-4 rounded-l-2xl text-white"
        style={{
          display: isOpen ? 'none' : 'flex',
          background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
          boxShadow: '0 0 30px rgba(59,130,246,0.4), -4px 0 20px rgba(99,102,241,0.3)',
        }}
      >
        <div className="relative">
          <MessageCircle size={20} className="md:w-6 md:h-6" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-green-400 border border-white animate-pulse" />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-[9px] md:text-[10px] text-white/70 font-mono tracking-widest uppercase leading-none mb-0.5">AI</span>
          <span className="text-sm md:text-base font-bold leading-none">Benimle Konuş</span>
        </div>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed bottom-4 right-4 z-[90] w-[calc(100vw-2rem)] sm:w-[400px] h-[560px] max-h-[80vh] flex flex-col rounded-3xl overflow-hidden border border-white/20 shadow-[0_0_60px_rgba(0,0,0,0.8)]"
            style={{ background: 'rgba(18,18,28,0.98)', backdropFilter: 'blur(20px)' }}
            onWheel={e => e.stopPropagation()}
            onTouchMove={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
                    <Bot size={18} className="text-accent" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-black" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">poseic</p>
                  <p className="text-white/40 text-[10px] font-mono tracking-wider">AI • Her zaman burada</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-hide"
              onWheel={e => e.stopPropagation()}
              onTouchMove={e => e.stopPropagation()}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-accent text-white rounded-br-sm'
                        : 'bg-white/8 text-gray-200 rounded-bl-sm border border-white/10'
                    }`}
                    style={msg.role === 'assistant' ? { background: 'rgba(255,255,255,0.1)' } : {}}
                    dangerouslySetInnerHTML={msg.role === 'assistant' ? {
                      __html: msg.content
                        .replace(/```[\s\S]*?```/g, (m) => `<pre class="bg-black/40 rounded-lg p-2 my-2 text-xs overflow-x-auto whitespace-pre-wrap">${m.replace(/```\w*\n?/g, '').replace(/```/g, '')}</pre>`)
                        .replace(/`([^`]+)`/g, '<code class="bg-black/40 px-1 rounded text-accent text-xs">$1</code>')
                        .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white">$1</strong>')
                        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
                        .replace(/^### (.+)$/gm, '<p class="font-bold text-white mt-2">$1</p>')
                        .replace(/^## (.+)$/gm, '<p class="font-bold text-white mt-2">$1</p>')
                        .replace(/^# (.+)$/gm, '<p class="font-bold text-white mt-2">$1</p>')
                        .replace(/^\* (.+)$/gm, '<p class="ml-2">• $1</p>')
                        .replace(/^- (.+)$/gm, '<p class="ml-2">• $1</p>')
                        .replace(/\n/g, '<br/>')
                    } : undefined}
                  >
                    {msg.role === 'user' ? msg.content : undefined}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="px-4 py-3 rounded-2xl rounded-bl-sm border border-white/10 flex gap-1.5 items-center"
                    style={{ background: 'rgba(255,255,255,0.1)' }}>
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-accent"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-4 border-t border-white/10">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 focus-within:border-accent/50 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Bir şey sor..."
                  className="flex-1 bg-transparent text-white text-sm placeholder-white/30 focus:outline-none"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed transition-opacity shrink-0"
                >
                  <Send size={14} />
                </button>
              </div>
              <p className="text-center text-white/20 text-[10px] font-mono mt-2">Powered by poseic</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};