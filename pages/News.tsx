
import React from 'react';
import { Newspaper, ChevronRight } from 'lucide-react';

const News: React.FC = () => {
  const news = [
    { title: 'Janela de Transferências aquece o mercado brasileiro', date: 'Há 2 horas', category: 'Mercado', img: 'https://picsum.photos/400/250?1' },
    { title: 'Seleção Brasileira convoca novos nomes para amistosos', date: 'Há 5 horas', category: 'Seleção', img: 'https://picsum.photos/400/250?2' },
    { title: 'Final da Copa do Brasil terá premiação recorde', date: 'Ontem', category: 'Nacional', img: 'https://picsum.photos/400/250?3' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-orbitron font-bold text-[#39FF14] neon-text">Notícias do Fut</h2>
          <p className="text-slate-400 mt-1">Fique por dentro de tudo que acontece no gramado</p>
        </div>
        <div className="flex space-x-2">
          {['Tudo', 'Nacional', 'Inter', 'Transferências'].map(c => (
            <button key={c} className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold hover:border-[#39FF14] transition-all">
              {c}
            </button>
          ))}
        </div>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((item, i) => (
          <article key={i} className="bg-slate-900/50 rounded-[2.5rem] border border-slate-800 overflow-hidden group cursor-pointer hover:border-[#39FF14]/50 transition-all">
            <div className="h-48 overflow-hidden relative">
              <img src={item.img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[#39FF14] text-[10px] font-black px-3 py-1 rounded-full border border-[#39FF14]/30 uppercase tracking-widest">
                {item.category}
              </div>
            </div>
            <div className="p-6">
              <p className="text-xs text-slate-500 font-bold mb-2">{item.date}</p>
              <h3 className="text-lg font-bold leading-tight group-hover:text-[#39FF14] transition-colors mb-4">{item.title}</h3>
              <button className="flex items-center text-xs font-black text-[#39FF14] uppercase tracking-tighter hover:translate-x-1 transition-all">
                Ler Matéria <ChevronRight size={14} className="ml-1" />
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="bg-slate-900/60 p-12 rounded-[3rem] border border-slate-800 text-center">
        <Newspaper className="mx-auto text-[#39FF14] mb-4 opacity-50" size={48} />
        <h3 className="text-xl font-orbitron font-bold mb-2">Assine nossa Newsletter</h3>
        <p className="text-slate-400 mb-6 max-w-md mx-auto">Receba palpites exclusivos e notícias direto no seu e-mail todos os dias.</p>
        <div className="flex max-w-sm mx-auto gap-2">
          <input placeholder="Seu melhor e-mail" className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-[#39FF14]" />
          <button className="bg-[#39FF14] text-black font-bold px-6 rounded-xl hover:scale-105 transition-all">OK</button>
        </div>
      </div>
    </div>
  );
};

export default News;
