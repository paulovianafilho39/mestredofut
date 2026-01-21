
import React from 'react';
import { Trophy, Medal, Star } from 'lucide-react';

const Ranking: React.FC = () => {
  const users = [
    { name: 'Ricardo Fut', points: 1250, wins: 45, level: 15 },
    { name: 'Maria Goleira', points: 1100, wins: 40, level: 12 },
    { name: 'Jorge Craque', points: 950, wins: 32, level: 10 },
    { name: 'Ana Atacante', points: 800, wins: 28, level: 8 },
    { name: 'Bruno Zagueiro', points: 650, wins: 20, level: 5 },
  ].sort((a, b) => b.points - a.points);

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-orbitron font-bold text-[#39FF14] neon-text">Ranking de Mestres</h2>
        <p className="text-slate-400 mt-2">Os melhores palpiteiros da temporada</p>
      </div>

      <div className="flex flex-col md:flex-row items-end justify-center gap-4 mb-8">
        {/* Podium 2 */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-slate-400 mb-4 overflow-hidden shadow-[0_0_15px_rgba(148,163,184,0.3)]">
            <img src="https://picsum.photos/100?1" alt="" />
          </div>
          <div className="bg-slate-800 border-t-4 border-slate-400 w-32 h-32 rounded-t-3xl flex flex-col items-center justify-center p-4">
            <Medal className="text-slate-400 mb-1" />
            <span className="font-bold text-sm text-center line-clamp-1">{users[1].name}</span>
            <span className="text-xs text-slate-400 font-black">{users[1].points} PTS</span>
          </div>
        </div>

        {/* Podium 1 */}
        <div className="flex flex-col items-center">
          <Trophy className="text-amber-500 w-10 h-10 animate-bounce mb-2" />
          <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-amber-500 mb-4 overflow-hidden neon-border">
            <img src="https://picsum.photos/100?2" alt="" />
          </div>
          <div className="bg-slate-900 border-t-4 border-amber-500 w-40 h-48 rounded-t-[2.5rem] flex flex-col items-center justify-center p-4 shadow-2xl">
            <span className="font-orbitron font-bold text-lg text-amber-500 text-center line-clamp-1">{users[0].name}</span>
            <span className="text-sm text-slate-400 font-bold uppercase tracking-wider">{users[0].points} PONTOS</span>
            <div className="mt-4 flex space-x-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#f59e0b" className="text-amber-500" />)}
            </div>
          </div>
        </div>

        {/* Podium 3 */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-amber-700 mb-4 overflow-hidden shadow-[0_0_15px_rgba(180,83,9,0.3)]">
            <img src="https://picsum.photos/100?3" alt="" />
          </div>
          <div className="bg-slate-800 border-t-4 border-amber-700 w-32 h-24 rounded-t-3xl flex flex-col items-center justify-center p-4">
            <Medal className="text-amber-700 mb-1" />
            <span className="font-bold text-sm text-center line-clamp-1">{users[2].name}</span>
            <span className="text-xs text-slate-400 font-black">{users[2].points} PTS</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/40 rounded-[2.5rem] border border-slate-800 overflow-hidden backdrop-blur-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-900">
              <th className="px-6 py-5 text-xs uppercase tracking-widest text-slate-500 font-bold">Posição</th>
              <th className="px-6 py-5 text-xs uppercase tracking-widest text-slate-500 font-bold">Mestre</th>
              <th className="px-6 py-5 text-xs uppercase tracking-widest text-slate-500 font-bold text-center">Nível</th>
              <th className="px-6 py-5 text-xs uppercase tracking-widest text-slate-500 font-bold text-right">Pontos</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i} className={`border-t border-slate-800 transition-all ${i === 0 ? 'bg-[#39FF14]/5' : 'hover:bg-slate-800/20'}`}>
                <td className="px-6 py-6">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    i === 0 ? 'bg-amber-500 text-black' : 
                    i === 1 ? 'bg-slate-400 text-black' :
                    i === 2 ? 'bg-amber-700 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {i + 1}
                  </span>
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden">
                      <img src={`https://picsum.photos/40?${i+10}`} alt="" />
                    </div>
                    <div>
                      <span className="font-bold block">{u.name}</span>
                      <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{u.wins} ACERTOS</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6 text-center">
                  <span className="px-3 py-1 bg-slate-800 text-xs font-bold rounded-lg border border-slate-700">LV {u.level}</span>
                </td>
                <td className="px-6 py-6 text-right font-black text-[#39FF14]">{u.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl"><Trophy size={24} /></div>
          <div>
            <h4 className="font-bold">Sistema de Pontuação</h4>
            <p className="text-xs text-slate-500">Placar exato (10 pts) | Diferença (7 pts) | Ganhador (5 pts)</p>
          </div>
        </div>
        <button className="px-6 py-3 bg-slate-800 rounded-xl text-xs font-bold hover:text-[#39FF14] transition-all">VER REGRAS</button>
      </div>
    </div>
  );
};

export default Ranking;
