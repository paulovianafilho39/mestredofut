
import React, { useState, useEffect } from 'react';
import { Gamepad2, Info, Loader2, Calendar, Trophy as TrophyIcon, RefreshCcw } from 'lucide-react';

interface Fixture {
  fixture: {
    id: number;
    date: string;
    status: { short: string };
  };
  league: {
    name: string;
    logo: string;
    round: string;
  };
  teams: {
    home: { name: string; logo: string };
    away: { name: string; logo: string };
  };
}

const RealGames: React.FC = () => {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRealGames = async () => {
    const today = new Date().toISOString().split('T')[0];
    const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${today}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'c484aa22f7msh9bc29e66eecdfd6p143b31jsnbe256014c8b9',
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
      }
    };

    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(url, options);
      if (!response.ok) throw new Error('O servidor de resultados não respondeu. Tente novamente em alguns minutos.');
      
      const data = await response.json();
      setFixtures(data.response || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRealGames();
  }, []);

  const groupedFixtures = fixtures.reduce((acc: { [key: string]: Fixture[] }, fixture) => {
    const leagueName = fixture.league.name;
    if (!acc[leagueName]) acc[leagueName] = [];
    acc[leagueName].push(fixture);
    return acc;
  }, {});

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-700 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-orbitron font-bold text-[#39FF14] neon-text uppercase tracking-tighter">
            Jogos do Dia
          </h2>
          <p className="text-slate-400 mt-2 flex items-center font-medium">
            <Calendar size={16} className="mr-2 text-[#39FF14]" />
            Programação oficial internacional • Horário de Brasília
          </p>
        </div>
        <button 
          onClick={fetchRealGames}
          disabled={isLoading}
          className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-center text-[#39FF14] hover:bg-slate-800 transition-all shadow-lg active:rotate-180"
        >
          <RefreshCcw size={24} className={isLoading ? 'animate-spin' : ''} />
        </button>
      </header>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-t-4 border-l-4 border-[#39FF14] rounded-full animate-spin"></div>
            <Gamepad2 className="absolute inset-0 m-auto text-[#39FF14] animate-pulse" size={32} />
          </div>
          <p className="text-slate-500 font-orbitron text-[10px] uppercase tracking-[0.4em] animate-pulse">Sincronizando Estádios...</p>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/20 p-12 rounded-[3rem] text-center space-y-4">
          <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
             <Info size={32} />
          </div>
          <p className="text-red-500 font-bold text-lg">{error}</p>
          <button 
            onClick={fetchRealGames}
            className="mt-6 px-10 py-3 bg-red-500 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all"
          >
            Tentar Sincronizar
          </button>
        </div>
      ) : Object.keys(groupedFixtures).length === 0 ? (
        <div className="bg-slate-900/40 p-20 rounded-[3rem] border border-slate-800 text-center">
          <Info className="mx-auto text-slate-700 mb-6" size={64} />
          <p className="text-slate-400 font-bold uppercase tracking-widest">Nenhum jogo programado para agora.</p>
        </div>
      ) : (
        <div className="space-y-16">
          {(Object.entries(groupedFixtures) as [string, Fixture[]][]).map(([leagueName, matches]) => (
            <div key={leagueName} className="space-y-6">
              <div className="flex items-center space-x-4 px-4">
                <div className="w-10 h-10 p-2 bg-white rounded-2xl shadow-lg border border-slate-800">
                  <img src={matches[0].league.logo} alt={leagueName} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl font-orbitron font-bold text-slate-100 uppercase tracking-widest flex items-center">
                  {leagueName}
                  <span className="ml-4 text-[10px] bg-[#39FF14]/10 text-[#39FF14] px-4 py-1 rounded-full border border-[#39FF14]/20 font-black">
                    {matches.length} JOGOS
                  </span>
                </h3>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {matches.map((item) => (
                  <div 
                    key={item.fixture.id} 
                    className="bg-slate-900/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-slate-800 hover:border-[#39FF14]/40 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                      <TrophyIcon size={60} className="text-[#39FF14]" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col items-center space-y-3 w-1/3 text-center">
                        <div className="w-20 h-20 bg-slate-950 p-4 rounded-3xl border border-slate-800 group-hover:border-[#39FF14]/30 transition-all flex items-center justify-center shadow-inner">
                          <img src={item.teams.home.logo} alt={item.teams.home.name} className="max-w-full max-h-full object-contain drop-shadow-lg" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-tighter truncate w-full text-slate-300">{item.teams.home.name}</span>
                      </div>

                      <div className="flex flex-col items-center justify-center px-4">
                        <div className="bg-slate-950 px-4 py-1.5 rounded-full border border-slate-800 mb-3">
                          <span className="text-[10px] font-black text-[#39FF14] uppercase tracking-widest">
                            {item.fixture.status.short === 'NS' ? 'PPR' : item.fixture.status.short}
                          </span>
                        </div>
                        <div className="text-3xl font-black text-slate-800 italic group-hover:text-[#39FF14]/10 transition-colors">VS</div>
                        <div className="text-xs font-orbitron font-bold text-[#39FF14] mt-3 bg-[#39FF14]/5 px-4 py-2 rounded-xl border border-[#39FF14]/10 shadow-[0_0_10px_rgba(57,255,20,0.05)]">
                          {formatTime(item.fixture.date)}
                        </div>
                      </div>

                      <div className="flex flex-col items-center space-y-3 w-1/3 text-center">
                        <div className="w-20 h-20 bg-slate-950 p-4 rounded-3xl border border-slate-800 group-hover:border-[#39FF14]/30 transition-all flex items-center justify-center shadow-inner">
                          <img src={item.teams.away.logo} alt={item.teams.away.name} className="max-w-full max-h-full object-contain drop-shadow-lg" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-tighter truncate w-full text-slate-300">{item.teams.away.name}</span>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-800/50 flex justify-center">
                      <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">
                        {item.league.round}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-slate-900/80 border border-slate-800 p-10 rounded-[3rem] flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-[#39FF14]"></div>
        <div className="p-5 bg-[#39FF14]/10 text-[#39FF14] rounded-[2rem] shadow-inner">
          <Info size={32} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="font-bold text-xl mb-2 text-slate-100 uppercase tracking-tighter">Aviso ao Mestre</h4>
          <p className="text-sm text-slate-400 leading-relaxed font-medium">
            Esta tela exibe a programação mundial oficial. Para participar de nossas premiações, utilize exclusivamente o mural de palpites na aba <strong>Início</strong>, onde selecionamos as melhores partidas para você cravar!
          </p>
        </div>
      </div>
    </div>
  );
};

export default RealGames;
