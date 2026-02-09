
import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: 'up' | 'down';
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, trend }) => {
  return (
    <div className="bg-slate-800/50 border border-white/5 p-4 rounded-2xl shadow-lg backdrop-blur-sm hover:border-white/10 transition-all">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
          {icon}
        </div>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
      </div>
      <div className="text-xl font-black text-white">
        {value.toLocaleString()}
      </div>
    </div>
  );
};

export default StatCard;
