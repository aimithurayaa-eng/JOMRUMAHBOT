
import React, { useRef, useEffect } from 'react';
import { Send, User, Bot, Circle, Loader2 } from 'lucide-react';
import { Message } from '../types';

interface ChatInterfaceProps {
  messages: Message[];
  input: string;
  setInput: (val: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, input, setInput, onSendMessage, isLoading }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const renderContent = (content: string, role: 'user' | 'assistant') => {
    return content.split('\n').map((line, i) => {
      if (line.trim() === '') return <div key={i} className="h-4" />;
      const isBullet = line.trim().startsWith('•') || line.trim().startsWith('*');
      const parts = line.split(/(\*\*.*?\*\*)/g);

      return (
        <div key={i} className={`flex items-start gap-2 mb-1 ${isBullet ? 'pl-4' : ''}`}>
          {isBullet && <Circle className="w-1.5 h-1.5 mt-2 fill-indigo-400 text-indigo-400 shrink-0" />}
          <p className="text-[14px] leading-relaxed font-medium text-white">
            {parts.map((part, j) => (part.startsWith('**') && part.endsWith('**')) 
              ? <span key={j} className="text-white font-black bg-white/20 px-1.5 py-0.5 rounded shadow-sm">{part.slice(2, -2)}</span> 
              : part)}
          </p>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-12 py-8 space-y-10 custom-scrollbar">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
            <div className={`flex gap-4 max-w-[90%] md:max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${m.role === 'user' ? 'bg-slate-700 border-white/10' : 'bg-indigo-600 border-indigo-400'}`}>
                {m.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={`relative px-5 py-4 rounded-[2rem] border ${m.role === 'user' ? 'bg-slate-700/80 border-white/10 rounded-tr-none' : 'bg-indigo-950/40 border-indigo-500/20 rounded-tl-none'}`}>
                {renderContent(m.content, m.role)}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start ml-14">
            <div className="bg-slate-800/60 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
              <span className="text-xs text-slate-400">Memproses...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-8 bg-gradient-to-t from-[#1e293b] to-transparent">
        <div className="max-w-4xl mx-auto relative group">
          <div className="flex items-center gap-2 bg-[#1a2333]/90 p-2 rounded-full border border-white/10 shadow-2xl focus-within:border-white/20 transition-all">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSendMessage()}
              placeholder="Tanya JOMRUMAHBOT..."
              className="flex-1 bg-transparent py-4 px-8 text-white outline-none"
            />
            <button 
              onClick={onSendMessage}
              disabled={isLoading || !input.trim()}
              className="w-14 h-14 rounded-full flex items-center justify-center bg-indigo-600/20 hover:bg-indigo-600/40 transition-all border border-white/10"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
