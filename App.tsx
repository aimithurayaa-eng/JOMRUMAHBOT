
import React, { useState } from 'react';
import { LayoutDashboard, RefreshCcw, Zap, MapPin, TrendingUp, Building2, Sparkles } from 'lucide-react';
import { Message } from './types';
import { callGemini } from './services/geminiService';
import ChatInterface from './components/ChatInterface';
import StatCard from './components/StatCard';
import { getTopDeficitDaerah } from './data/mockData';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hai! Saya **JOMRUMAHBOT** 🤖\n\nSila tanya tentang daerah pilihan anda.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const topDeficits = getTopDeficitDaerah(4);

  const handleSendMessage = async (textOverride?: string) => {
    const text = textOverride || input;
    if (!text.trim() || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setIsLoading(true);

    try {
      const response = await callGemini(text);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Ralat teknikal. Sila cuba lagi." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#1e293b] text-white overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500 blur-[100px]"></div>
      </div>

      <header className="relative bg-[#1e293b]/90 border-b border-white/10 px-6 py-4 flex justify-between items-center z-50 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-2.5 rounded-xl">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-black italic tracking-tighter">JOMRUMAH<span className="text-indigo-400">BOT</span></h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setMessages([{role:'assistant', content:'Sembang baru.'}])} className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10"><RefreshCcw className="w-4 h-4"/></button>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600/20 border border-indigo-500/30 rounded-full">
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[10px] font-black uppercase">Live NAPIC</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row relative z-10 overflow-hidden">
        {/* Left Sidebar - Quick Stats */}
        <div className="hidden lg:flex flex-col w-80 border-r border-white/10 p-6 space-y-6 overflow-y-auto">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-rose-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Defisit Tertinggi 2024</span>
          </div>
          <div className="space-y-4">
            {topDeficits.map(d => (
              <StatCard 
                key={d.DAERAH} 
                label={d.DAERAH} 
                value={d.Kecukupan_NAPIC} 
                icon={<MapPin className="w-4 h-4"/>} 
              />
            ))}
          </div>
          <div className="mt-auto p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl">
            <p className="text-[10px] text-slate-400 font-medium">Berdasarkan rekod NAPIC untuk status unit kediaman formal.</p>
          </div>
        </div>

        {/* Chat Interface Component */}
        <div className="flex-1 overflow-hidden">
          <ChatInterface 
            messages={messages}
            input={input}
            setInput={setInput}
            onSendMessage={() => handleSendMessage()}
            isLoading={isLoading}
          />
        </div>
      </main>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none opacity-30">
        <p className="text-[8px] font-black uppercase tracking-[0.6em]">JOMRUMAH ANALYTICS v2.5</p>
      </div>
    </div>
  );
};

export default App;
