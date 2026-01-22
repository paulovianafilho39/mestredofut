
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, addDoc, doc, updateDoc, deleteDoc, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db } from '../firebase';
import { UserProfile, Game, Bet } from '../types';
import { Plus, Trash2, CheckCircle, XCircle, ShieldAlert, Maximize2, Users, Wallet, RefreshCw } from 'lucide-react';

interface AdminProps {
  user: UserProfile;
}

const CHAMPIONSHIPS = [
  "Campeonato Paulista",
  "Copa do Mundo",
  "Libertadores",
  "Brasileirão Série A",
  "Champions League",
  "Copa do Brasil",
  "Outros"
];

const Admin: React.FC<AdminProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'games' | 'sales'>('games');
  const [newGame, setNewGame] = useState({ home: '', away: '', date: '', time: '', championship: CHAMPIONSHIPS[0] });
  const [games, setGames] = useState<Game[]>([]);
  const [bets, setBets] = useState<Bet[]>([]);
  const [isActionLoading, setIsActionLoading] = useState<string | null>(null);

  useEffect(() => {
    // Carregamento direto sem verificação de Auth redirecionadora
    const unsubGames = onSnapshot(query(collection(db, "games"), orderBy("date", "desc"), limit(50)), (snap) => {
      setGames(snap.docs.map(d => ({ id: d.id, ...d.data() } as Game)));
    });
    const unsubBets = onSnapshot(query(collection(db, "bets"), orderBy("timestamp", "desc"), limit(100)), (snap) => {
      setBets(snap.docs.map(d => ({ id: d.id, ...d.data() } as Bet)));
    });
    return () => { unsubGames(); unsubBets(); };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleAddGame = async () => {
    if (!newGame.home || !newGame.away || !newGame.date) {
      alert("Preencha os campos obrigatórios!");
      return;
    }
    const getLogo = (name: string) => `https://fapi.dev/v1/team/logo?name=${encodeURIComponent(name)}`;
    try {
      const gameData = {
        homeTeam: newGame.home,
        awayTeam: newGame.away,
        homeLogo: getLogo(newGame.home), 
        awayLogo: getLogo(newGame.away),
        date: newGame.date,
        time: newGame.time,
        championship: newGame.championship,
        status: 'active'
      };
      await addDoc(collection(db, "games"), gameData);
      setNewGame({ home: '', away: '', date: '', time: '', championship: CHAMPIONSHIPS[0] });
    } catch (e) {
      alert("Erro ao salvar jogo no Firestore.");
    }
  };

  const updateBetStatus = async (id: string, status: 'valid' | 'invalid') => {
    setIsActionLoading(id);
    try {
      const betRef = doc(db, "bets", id);
      await updateDoc(betRef, { 
        status: status,
        validatedBy: user.email,
        validatedAt: new Date()
      });
    } catch (e) {
      alert("Erro na validação. Certifique-se de que o Firestore está configurado.");
    } finally {
      setIsActionLoading(null);
    }
  };

  const deleteGame = async (id: string) => {
    if (confirm("Deseja remover este jogo do mural?")) {
      await deleteDoc(doc(db, "games", id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="p-4 bg-[#39FF14]/10 rounded-2xl border border-[#39FF14]/20 shadow-[0_0_15px_rgba(57,255,20,0.1)]">
            <ShieldAlert size={32} className="text-[#39FF14]" />
          </div>
          <div>
            <h2 className="text-3xl font-orbitron font-bold text-[#39FF14] neon-text uppercase">Painel Central - Acesso Livre</h2>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Modo Desenvolvedor Ativo</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={toggleFullscreen}
            className="p-3 bg-slate-900 border border-slate-800 text-[#39FF14] rounded-xl hover:bg-slate-800 transition-all shadow-lg"
          >
            <Maximize2 size={20} />
          </button>
          <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button onClick={() => setActiveTab('games')} className={`px-6 py-2 rounded-xl transition-all font-bold text-xs uppercase tracking-widest ${activeTab === 'games' ? 'bg-[#39FF14] text-black shadow-[0_0_15px_rgba(57,255,20,0.4)]' : 'text-slate-500'}`}>Jogos</button>
            <button onClick={() => setActiveTab('sales')} className={`px-6 py-2 rounded-xl transition-all font-bold text-xs uppercase tracking-widest ${activeTab === 'sales' ? 'bg-[#39FF14] text-black shadow-[0_0_15px_rgba(57,255,20,0.4)]' : 'text-slate-500'}`}>Vendas</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/60 p-8 rounded-[2.5rem] border border-slate-800 flex items-center justify-between group hover:border-[#39FF14]/40 transition-all shadow-2xl">
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total de Tickets</p>
            <p className="text-3xl font-orbitron font-bold text-[#39FF14]">{bets.length}</p>
          </div>
          <Wallet className="text-[#39FF14]/10 group-hover:text-[#39FF14]/30 transition-all" size={48} />
        </div>
        <div className="bg-slate-900/60 p-8 rounded-[2.5rem] border border-slate-800 flex items-center justify-between group hover:border-blue-500/40 transition-all shadow-2xl">
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Jogos no Mural</p>
            <p className="text-3xl font-orbitron font-bold text-slate-100">{games.length}</p>
          </div>
          <Users className="text-slate-700/30 group-hover:text-blue-500/30 transition-all" size={48} />
        </div>
        <div className="bg-slate-900/60 p-8 rounded-[2.5rem] border border-slate-800 flex items-center justify-between group hover:border-amber-500/40 transition-all shadow-2xl">
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Aguardando Validação</p>
            <p className="text-3xl font-orbitron font-bold text-amber-500">{bets.filter(b => b.status === 'pending').length}</p>
          </div>
          <CheckCircle className="text-amber-500/10 group-hover:text-amber-500/30 transition-all" size={48} />
        </div>
      </div>

      {activeTab === 'games' ? (
        <div className="space-y-8">
          <section className="bg-slate-900/40 p-10 rounded-[3rem] border border-slate-800 shadow-inner">
            <h3 className="text-xl font-orbitron font-bold mb-8 flex items-center space-x-3 text-[#39FF14]">
              <div className="p-2 bg-[#39FF14]/10 rounded-lg"><Plus size={20} /></div>
              <span>Lançamento Rápido</span>
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest ml-2">Time de Casa</label>
                <input placeholder="Ex: Flamengo" className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 focus:border-[#39FF14] outline-none transition-all" value={newGame.home} onChange={e => setNewGame({...newGame, home: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest ml-2">Time Visitante</label>
                <input placeholder="Ex: Palmeiras" className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 focus:border-[#39FF14] outline-none transition-all" value={newGame.away} onChange={e => setNewGame({...newGame, away: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest ml-2">Campeonato</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 focus:border-[#39FF14] outline-none text-slate-300" value={newGame.championship} onChange={e => setNewGame({...newGame, championship: e.target.value})}>
                  {CHAMPIONSHIPS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest ml-2">Data do Jogo</label>
                <input type="date" className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 focus:border-[#39FF14] outline-none transition-all text-slate-400" value={newGame.date} onChange={e => setNewGame({...newGame, date: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest ml-2">Horário</label>
                <input type="time" className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 focus:border-[#39FF14] outline-none transition-all text-slate-400" value={newGame.time} onChange={e => setNewGame({...newGame, time: e.target.value})} />
              </div>
              <div className="flex items-end">
                <button onClick={handleAddGame} className="w-full bg-[#39FF14] text-black font-black rounded-2xl py-4 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(57,255,20,0.3)] uppercase text-xs font-orbitron tracking-widest">Ativar no Mural</button>
              </div>
            </div>
          </section>

          <div className="bg-slate-900/40 rounded-[3rem] border border-slate-800 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-950/50 border-b border-slate-800">
                    <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Liga</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Confronto</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-500 text-center tracking-[0.2em]">Data / Hora</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-500 text-right tracking-[0.2em]">Gerenciar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {games.map(game => (
                    <tr key={game.id} className="hover:bg-[#39FF14]/5 transition-all">
                      <td className="px-8 py-5">
                        <span className="text-[10px] bg-slate-950 text-[#39FF14] px-4 py-1.5 rounded-full font-black uppercase border border-[#39FF14]/10">{game.championship}</span>
                      </td>
                      <td className="px-8 py-5 font-bold flex items-center space-x-3">
                        <img src={game.homeLogo} className="w-7 h-7 object-contain" alt="" />
                        <span className="text-slate-200 uppercase tracking-tighter">{game.homeTeam} x {game.awayTeam}</span>
                        <img src={game.awayLogo} className="w-7 h-7 object-contain" alt="" />
                      </td>
                      <td className="px-8 py-5 text-center text-slate-500 font-mono text-xs font-bold">{game.date} • {game.time}</td>
                      <td className="px-8 py-5 text-right">
                        <button onClick={() => deleteGame(game.id)} className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"><Trash2 size={20} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900/40 rounded-[3rem] border border-slate-800 overflow-hidden shadow-2xl">
          <div className="p-8 bg-slate-950/50 border-b border-slate-800 flex justify-between items-center">
             <div className="flex items-center space-x-3">
               <div className="w-2 h-2 bg-[#39FF14] rounded-full animate-pulse"></div>
               <h3 className="font-orbitron font-black text-[#39FF14] text-xs uppercase tracking-[0.3em]">Fluxo de Tickets em Tempo Real</h3>
             </div>
             <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{bets.length} Movimentações</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-950/30">
                <tr>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Identificação</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-500 text-center tracking-[0.2em]">Cravada</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-500 text-right tracking-[0.2em]">Validação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {bets.map(bet => (
                  <tr key={bet.id} className="hover:bg-slate-800/30 transition-all">
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-100 uppercase tracking-tight">{bet.userName}</div>
                      <div className="text-[10px] text-slate-500 font-black uppercase tracking-[0.1em] mt-1">Ref: {bet.ticketId || 'LEGACY'}</div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="inline-flex items-center px-6 py-2 bg-slate-950 rounded-2xl border border-slate-800">
                        <span className="text-2xl font-black italic text-[#39FF14]">{bet.homeScore} x {bet.awayScore}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      {isActionLoading === bet.id ? (
                        <RefreshCw className="animate-spin text-[#39FF14] ml-auto" size={24} />
                      ) : bet.status === 'pending' ? (
                        <div className="flex justify-end space-x-3">
                          <button onClick={() => updateBetStatus(bet.id, 'valid')} className="p-3 bg-green-500/10 text-green-500 border border-green-500/20 rounded-2xl hover:bg-green-500/20 transition-all shadow-inner" title="Validar"><CheckCircle size={22} /></button>
                          <button onClick={() => updateBetStatus(bet.id, 'invalid')} className="p-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl hover:bg-red-500/20 transition-all shadow-inner" title="Reprovar"><XCircle size={22} /></button>
                        </div>
                      ) : (
                        <div className={`inline-block px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${bet.status === 'valid' ? 'bg-green-500/10 text-green-500 border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.1)]' : 'bg-red-500/10 text-red-500 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.1)]'}`}>
                          {bet.status === 'valid' ? 'Aprovado' : 'Cancelado'}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {bets.length === 0 && (
            <div className="p-20 text-center text-slate-600 font-black uppercase tracking-[0.3em] text-sm italic">Nenhuma aposta registrada.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
