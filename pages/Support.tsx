
import React from 'react';
import { MessageSquare, Mail, Phone, ExternalLink, HelpCircle } from 'lucide-react';

const Support: React.FC = () => {
  const whatsappUrl = "https://wa.me/5514998022771?text=Preciso%20de%20suporte%20no%20Mestre%20do%20Fut";
  const emailAddress = "suportemestredofut@gmail.com";

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-orbitron font-bold text-[#39FF14] neon-text">Suporte Mestre</h2>
        <p className="text-slate-400">Estamos aqui para ajudar com qualquer dúvida ou problema.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <section className="bg-slate-900/60 p-8 rounded-[2.5rem] border border-slate-800 hover:border-[#39FF14]/30 transition-all shadow-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center text-slate-100">
              <MessageSquare className="text-[#39FF14] mr-3" />
              Canais de Atendimento
            </h3>
            <div className="space-y-4">
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-800 hover:bg-[#39FF14]/5 hover:border-[#39FF14]/30 transition-all group"
              >
                <div className="flex items-center">
                  <div className="p-3 bg-green-500/10 text-green-500 rounded-xl mr-4 group-hover:scale-110 transition-transform"><Phone size={20} /></div>
                  <div>
                    <p className="font-bold text-slate-200">WhatsApp ADM</p>
                    <p className="text-xs text-slate-500">Clique para iniciar conversa</p>
                  </div>
                </div>
                <ExternalLink size={18} className="text-slate-600 group-hover:text-[#39FF14] transition-colors" />
              </a>
              <a 
                href={`mailto:${emailAddress}`}
                className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-800 hover:bg-[#39FF14]/5 hover:border-[#39FF14]/30 transition-all group"
              >
                <div className="flex items-center">
                  <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl mr-4 group-hover:scale-110 transition-transform"><Mail size={20} /></div>
                  <div>
                    <p className="font-bold text-slate-200">E-mail Suporte</p>
                    <p className="text-xs text-slate-500">{emailAddress}</p>
                  </div>
                </div>
                <ExternalLink size={18} className="text-slate-600 group-hover:text-[#39FF14] transition-colors" />
              </a>
            </div>
          </section>

          <section className="bg-[#39FF14]/5 p-8 rounded-[2.5rem] border border-[#39FF14]/20 shadow-lg">
            <h3 className="font-bold text-[#39FF14] mb-2 font-orbitron text-sm uppercase tracking-wider">Dúvida Rápida?</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Confira nossa seção de perguntas frequentes para obter respostas imediatas sobre pagamentos, regras e acesso ao sistema.
            </p>
            <button className="mt-6 w-full py-3 bg-[#39FF14] text-black font-bold rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_15px_rgba(57,255,20,0.3)]">
              Ver FAQ Completo
            </button>
          </section>
        </div>

        <section className="bg-slate-900/60 p-8 rounded-[2.5rem] border border-slate-800 shadow-xl">
          <h3 className="text-xl font-bold mb-6 flex items-center text-slate-100">
            <HelpCircle className="text-[#39FF14] mr-3" />
            Enviar Mensagem
          </h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Assunto do Contato</label>
              <select className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-[#39FF14] text-slate-300 transition-colors">
                <option>Problemas com Pagamento</option>
                <option>Dúvidas sobre o Regulamento</option>
                <option>Erro no Aplicativo</option>
                <option>Validação de Ticket</option>
                <option>Outros Assuntos</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Mensagem Detalhada</label>
              <textarea 
                rows={5}
                placeholder="Como podemos te ajudar hoje?"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-[#39FF14] resize-none text-slate-300 transition-colors placeholder:text-slate-700"
              ></textarea>
            </div>
            <button className="w-full py-4 bg-slate-800 text-slate-100 font-bold rounded-xl hover:bg-slate-700 hover:text-[#39FF14] transition-all border border-slate-700 font-orbitron text-xs tracking-widest uppercase">
              Enviar Solicitação
            </button>
          </form>
        </section>
      </div>
      
      <div className="text-center pb-8">
        <p className="text-slate-600 text-xs font-bold uppercase tracking-[0.2em]">© 2024 Mestre do Fut • Central de Atendimento</p>
      </div>
    </div>
  );
};

export default Support;
