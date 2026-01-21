
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db } from '../firebase';
import { Send, Calendar, Clock, Search, Trophy } from 'lucide-react';
import { Game, UserProfile } from '../types';

interface HomeProps {
  user: UserProfile;
}

const Home: React.FC<HomeProps> = ({ user }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [homeScore, setHomeScore] = useState<string>('0');
  const [awayScore, setAwayScore] = useState<string>('0');
  const [betAmount, setBetAmount] = useState<string>('10');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const q = query(collection(db, "games"), where("status", "==", "active"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const gamesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Game));
      setGames(gamesList);
    });
    return () => unsubscribe();
  }, []);

  const handleConfirmBet = async () => {
    if (!selectedGame) return;

    const ticketId = Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Salva na coleção 'bets' conforme estruturado para o Admin gerenciar
    await addDoc(collection(db, "bets"), {
      userId: user.uid,
      userName: user.fullName,
      gameId: selectedGame.id,
      homeScore: parseInt(homeScore),
      awayScore: parseInt(awayScore),
      amount: parseFloat(betAmount),
      status: 'pending',
      timestamp: serverTimestamp(),
      ticketId: ticketId
    });

    const ticket = `
🏆 *MESTRE DO FUT - TICKET DE APOSTA* 🏆
---------------------------------------
👤 *CLIENTE:* ${user.fullName}
📍 *CIDADE:* ${user.city}
❤️ *TIME:* ${user.favoriteTeam}
---------------------------------------
🏅 *CAMP:* ${selectedGame.championship}
⚽ *JOGO:* ${selectedGame.homeTeam} vs ${selectedGame.awayTeam}
📅 *DATA:* ${selectedGame.date} ${selectedGame.time}
---------------------------------------
🎯 *PALPITE:* ${homeScore} x ${awayScore}
💰 *VALOR:* R$ ${parseFloat(betAmount).toFixed(2)}
---------------------------------------
*ID:* ${ticketId}
_Envie este texto para validar seu palpite!_
    `.trim();

    const encodedMsg = encodeURIComponent(ticket);
    const adminWhatsApp = "5514998022771"; 
    window.open(`https://wa.me/${adminWhatsApp}?text=${encodedMsg}`, '_blank');
    setSelectedGame(null);
  };

  const filteredGames = games.filter(g => 
    g.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.awayTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.championship.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <section className="bg-slate-900/50 p-8 rounded-[3rem] border border-slate-800 backdrop-blur-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#39FF14]/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#39FF14]/10 transition-all"></div>
        <h2 className="text-3xl font-orbitron font-bold text-[#39FF14] mb-2 neon-text">Mural de Jogos</h2>
        <p className="text-slate-400 font-medium">Escolha a partida e crava seu resultado vencedor!</p>
        
        <div className="mt-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input 
            type="text" 
            placeholder="Buscar por time ou campeonato..."
            className="w-full bg-slate-950/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#39FF14] transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      <div className="grid gap-8">
        {filteredGames.length === 0 ? (
          <div className="p-20 text-center bg-slate-900/40 rounded-[3rem] border border-slate-800">
            <Trophy className="mx-auto text-slate-700 mb-6" size={64} />
            <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-sm animate-pulse">Aguardando novos jogos...</p>
          </div>
        ) : (
          filteredGames.map((game) => (
            <div key={game.id} className="relative bg-slate-900/40 border border-slate-800 rounded-[3rem] overflow-hidden hover:border-[#39FF14]/50 transition-all duration-300 group shadow-2xl">
              <div className="p-4 bg-slate-950/40 border-b border-slate-800/50 text-center">
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#39FF14] italic">
                   {game.championship}
                 </span>
              </div>

              <div className="p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex flex-col items-center space-y-4 flex-1 text-center">
                  <div className="w-24 h-24 bg-white/5 rounded-3xl p-3 flex items-center justify-center border border-slate-800 group-hover:border-[#39FF14]/30 transition-all shadow-inner">
                    <img src={game.homeLogo} alt={game.homeTeam} className="max-w-full max-h-full object-contain drop-shadow-lg" />
                  </div>
                  <span className="font-bold text-2xl text-slate-100 uppercase tracking-tighter">{game.homeTeam}</span>
                </div>

                <div className="flex flex-col items-center space-y-6">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center space-x-2 text-[10px] text-slate-500 uppercase tracking-widest font-black mb-3 bg-slate-950 px-4 py-2 rounded-full border border-slate-800">
                      <Calendar size={12} className="text-[#39FF14]" />
                      <span>{game.date}</span>
                      <Clock size={12} className="ml-3 text-[#39FF14]" />
                      <span>{game.time}</span>
                    </div>
                    <div className="text-5xl font-black text-[#39FF14] italic neon-text group-hover:scale-110 transition-transform">VS</div>
                  </div>
                  
                  <button onClick={() => setSelectedGame(game)} className="px-10 py-4 bg-[#39FF14] text-black font-bold rounded-2xl shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:scale-105 active:scale-95 transition-all font-orbitron text-xs tracking-widest uppercase">
                    CRAVAR PLACAR
                  </button>
                </div>

                <div className="flex flex-col items-center space-y-4 flex-1 text-center">
                  <div className="w-24 h-24 bg-white/5 rounded-3xl p-3 flex items-center justify-center border border-slate-800 group-hover:border-[#39FF14]/30 transition-all shadow-inner">
                    <img src={game.awayLogo} alt={game.awayTeam} className="max-w-full max-h-full object-contain drop-shadow-lg" />
                  </div>
                  <span className="font-bold text-2xl text-slate-100 uppercase tracking-tighter">{game.awayTeam}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedGame && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setSelectedGame(null)}></div>
          <div className="relative bg-slate-900 border border-slate-800 w-full max-w-lg rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-300">
            <div className="p-8 md:p-10 space-y-10">
              <div className="text-center">
                <span className="text-[10px] font-black text-[#39FF14] uppercase tracking-widest bg-[#39FF14]/10 px-5 py-2 rounded-full mb-6 inline-block border border-[#39FF14]/20">{selectedGame.championship}</span>
                <h3 className="text-3xl font-orbitron font-bold text-slate-100 tracking-tighter uppercase">Confirmar Palpite</h3>
              </div>

              <div className="flex items-center justify-around gap-6 bg-slate-950/80 p-8 rounded-[2.5rem] border border-slate-800 shadow-inner">
                <div className="flex flex-col items-center space-y-4 flex-1">
                  <img src={selectedGame.homeLogo} className="w-14 h-14 object-contain" alt="" />
                  <input 
                    type="number" value={homeScore} onChange={(e) => setHomeScore(e.target.value)}
                    className="w-full h-20 text-center text-4xl font-black bg-slate-900 border-2 border-slate-800 rounded-3xl focus:border-[#39FF14] outline-none text-[#39FF14] transition-all" 
                  />
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{selectedGame.homeTeam}</span>
                </div>
                <div className="text-3xl font-black text-slate-800 italic">X</div>
                <div className="flex flex-col items-center space-y-4 flex-1">
                  <img src={selectedGame.awayLogo} className="w-14 h-14 object-contain" alt="" />
                  <input 
                    type="number" value={awayScore} onChange={(e) => setAwayScore(e.target.value)}
                    className="w-full h-20 text-center text-4xl font-black bg-slate-900 border-2 border-slate-800 rounded-3xl focus:border-[#39FF14] outline-none text-[#39FF14] transition-all" 
                  />
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{selectedGame.awayTeam}</span>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest text-center">Valor do Ticket (Mínimo R$ 10)</label>
                <div className="flex gap-2">
                  {['10', '20', '50', '100'].map(val => (
                    <button 
                      key={val} onClick={() => setBetAmount(val)}
                      className={`flex-1 py-4 rounded-2xl border-2 transition-all font-black text-lg ${betAmount === val ? 'bg-[#39FF14]/10 border-[#39FF14] text-[#39FF14] shadow-[0_0_10px_rgba(57,255,20,0.2)]' : 'bg-slate-950 border-slate-800 text-slate-600 hover:border-slate-700'}`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setSelectedGame(null)} className="flex-1 py-5 bg-slate-800 text-slate-400 font-bold rounded-2xl hover:bg-slate-700 transition-all uppercase text-xs tracking-widest">Cancelar</button>
                <button onClick={handleConfirmBet} className="flex-[2] py-5 bg-[#39FF14] text-black font-black rounded-2xl shadow-[0_0_25px_rgba(57,255,20,0.4)] flex items-center justify-center space-x-3 hover:scale-[1.02] transition-all uppercase text-xs tracking-widest">
                  <Send size={20} />
                  <span>Gerar Ticket</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
