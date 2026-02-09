
import React from 'react';
import { PieChart } from 'lucide-react';

const HousingChart: React.FC = () => {
  return (
    <div className="bg-slate-800/30 border border-white/5 p-6 rounded-2xl flex flex-col items-center justify-center min-h-[200px]">
      <PieChart className="w-12 h-12 text-indigo-500/50 mb-4" />
      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest text-center">
        Visualisasi Data Akan Datang
      </p>
    </div>
  );
};

export default HousingChart;
