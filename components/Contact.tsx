import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Globe } from 'lucide-react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_zytyfd5';
const TEMPLATE_ID = 'template_piopoe4';
const PUBLIC_KEY = 'UA-coVWUxaXBeXlsw';

// Discord icon SVG
const DiscordIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus('sending');
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        PUBLIC_KEY
      );
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 md:px-16 lg:px-24 py-24 relative z-10">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-mono tracking-widest">
          <Globe size={14} />
          İLETİŞİM
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl w-full">

        {/* Sol taraf */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-between items-center lg:items-start text-center lg:text-left"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
              Bir proje mi
              <br />
              <span className="text-gray-500 italic font-light">planlıyorsun?</span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed max-w-sm mt-6 mx-auto lg:mx-0">
               İster bir proje fikri, ister kurumsal bir dönüşüm olsun. 
          Kodlama ve botların kesişim noktasında buluşalım.
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-12 w-full max-w-sm mx-auto lg:mx-0">
            <motion.a
              href="https://discord.com/users/poseic"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 6 }}
              className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-[#5865F2]/20 flex items-center justify-center text-[#5865F2]">
                <DiscordIcon />
              </div>
              <div className="text-left">
                <p className="text-white/40 text-xs font-mono tracking-widest mb-0.5">DISCORD</p>
                <p className="text-white font-semibold text-sm">poseic</p>
              </div>
            </motion.a>

            <motion.a
              href="mailto:poseicc@gmail.com"
              whileHover={{ x: 6 }}
              className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Mail size={18} className="text-white" />
              </div>
              <div className="text-left">
                <p className="text-white/40 text-xs font-mono tracking-widest mb-0.5">E-POSTA</p>
                <p className="text-white font-semibold text-sm">poseicc@gmail.com</p>
              </div>
            </motion.a>
          </div>
        </motion.div>

        {/* Sağ taraf - Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-black border border-white/10 rounded-3xl p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-accent/20 flex items-center justify-center">
              <Send size={16} className="text-accent" />
            </div>
            <h3 className="text-white font-bold text-xl">Mesaj Gönderin</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="flex items-center gap-2 text-white/40 text-xs font-mono tracking-widest mb-2">
                ✦ ADINIZ
              </label>
              <input
                type="text"
                name="name"
                placeholder="poseic"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-accent/50 transition-colors"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-white/40 text-xs font-mono tracking-widest mb-2">
                @ E-POSTA
              </label>
              <input
                type="email"
                name="email"
                placeholder="eposta@adresiniz.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-accent/50 transition-colors"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="flex items-center gap-2 text-white/40 text-xs font-mono tracking-widest mb-2">
              □ MESAJINIZ
            </label>
            <textarea
              name="message"
              placeholder="Mesaj içeriğini giriniz..."
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-accent/50 transition-colors resize-none"
            />
          </div>

          <motion.button
            onClick={handleSubmit}
            whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={status === 'sending'}
            className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-base transition-all ${
              status === 'success'
                ? 'bg-green-500 text-white'
                : status === 'error'
                ? 'bg-red-500 text-white'
                : status === 'sending'
                ? 'bg-gray-600 text-white cursor-not-allowed'
                : 'bg-white text-black hover:bg-gray-100'
            }`}
          >
            {status === 'sending' && <span className="animate-spin mr-1">⏳</span>}
            {status === 'success' && '✅ '}
            {status === 'error' && '❌ '}
            {status === 'idle' && <Send size={18} />}
            {status === 'idle' ? 'Mesajı Gönder' :
             status === 'sending' ? 'Gönderiliyor...' :
             status === 'success' ? 'Mesaj Gönderildi!' :
             'Hata! Tekrar Dene'}
          </motion.button>
        </motion.div>
      </div>

      <footer className="mt-24 text-white/20 text-xs font-mono text-center">
        © 2026 poseic - All Rights Reserved
      </footer>
    </div>
  );
};