
import React, { useState } from 'react';
import { LayoutDashboard, RefreshCcw, Zap } from 'lucide-react';
import { Message } from './types';
import { callGemini } from './services/geminiService';
import ChatInterface from './components/ChatInterface';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Hai! Saya **JOMRUMAHBOT** 🤖\n\nSaya sedia membantu anda menganalisis data perumahan NAPIC 2024. Sila tanya tentang daerah atau negeri pilihan anda.' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      setMessages(prev => [...prev, { role: 'assistant', content: "Ralat teknikal dikesan. Sila muat semula halaman." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#1e293b] text-white overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-500/20 blur-[120px] rounded-full"></div>
      </div>

      {/* Simplified Header */}
      <header className="relative bg-[#1e293b]/95 border-b border-white/10 px-6 py-4 flex justify-between items-center z-50 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-2 rounded-xl shadow-lg">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-black italic tracking-tighter uppercase">
            JOMRUMAH<span className="text-indigo-400">BOT</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMessages([{ role: 'assistant', content: 'Sembang baru dimulakan. Apa yang anda ingin tahu tentang data perumahan hari ini?' }])} 
            className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all active:scale-90"
            title="Sembang Baru"
          >
            <RefreshCcw className="w-4 h-4 text-slate-400"/>
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600/10 border border-indigo-500/20 rounded-full">
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-200">AI Active</span>
          </div>
        </div>
      </header>

      {/* Main Content - Full Screen Chat */}
      <main className="flex-1 relative z-10 overflow-hidden flex flex-col">
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

      {/* Minimal Footer Tag */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none opacity-20 z-0">
        <p className="text-[8px] font-black uppercase tracking-[1em]">JOMRUMAH AI ANALYTICS</p>
      </div>
    </div>
  );
};

export default App;
