
import React from 'react';

const Splash: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 text-[#39FF14] overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-5"></div>
      
      <div className="relative flex flex-col items-center space-y-8 animate-splash">
        <div className="w-24 h-24 border-4 border-[#39FF14] rounded-[2rem] flex items-center justify-center neon-border rotate-45 mb-4">
          <div className="-rotate-45">
            <span className="text-4xl font-bold font-orbitron">M</span>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-orbitron font-bold tracking-tighter neon-text uppercase italic">
          MESTRE<br/><span className="text-slate-100">DO FUT</span>
        </h1>
        
        <div className="flex space-x-3">
          <div className="w-2 h-2 bg-[#39FF14] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-[#39FF14] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-[#39FF14] rounded-full animate-bounce"></div>
        </div>
        
        <p className="text-slate-600 font-black uppercase tracking-[0.3em] text-[10px] absolute -bottom-24 whitespace-nowrap">
          Sincronizando Gramado...
        </p>
      </div>
    </div>
  );
};

export default Splash;
