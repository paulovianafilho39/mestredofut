
import React from 'react';
import { ShieldCheck, Scale, AlertTriangle, HelpCircle } from 'lucide-react';

const Rules: React.FC = () => {
  const rules = [
    { title: 'Aposta Mínima', content: 'O valor mínimo obrigatório para cada palpite é de R$ 10,00 por ticket.', icon: ShieldCheck },
    { title: 'Confirmação via WhatsApp', content: 'Seu ticket só terá validade oficial após o envio do comprovante e validação pelo ADM no WhatsApp.', icon: Scale },
    { title: 'Resultado em 90 min', content: 'Vale apenas o placar do tempo regulamentar. Prorrogação e disputa de pênaltis não são contabilizados.', icon: AlertTriangle },
    { title: 'Pagamento de Prêmios', content: 'Os pagamentos dos vencedores são realizados em até 24 horas úteis após a conferência oficial.', icon: HelpCircle },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-slate-900/60 p-10 rounded-[3rem] border border-slate-800 shadow-2xl">
        <h2 className="text-3xl font-orbitron font-bold text-[#39FF14] mb-8 text-center uppercase tracking-tighter neon-text">Regulamento Mestre</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {rules.map((rule, idx) => {
            const Icon = rule.icon;
            return (
              <div key={idx} className="p-6 bg-slate-950/50 rounded-2xl border border-slate-800 hover:border-[#39FF14]/30 transition-all group">
                <div className="w-12 h-12 bg-[#39FF14]/10 text-[#39FF14] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-100 mb-2">{rule.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{rule.content}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-8 bg-amber-500/10 border border-amber-500/20 rounded-3xl">
          <h4 className="font-bold text-amber-500 flex items-center mb-4">
            <AlertTriangle className="mr-2" size={20} />
            Jogo Responsável
          </h4>
          <p className="text-slate-400 text-sm leading-relaxed">
            O Mestre do Fut é uma plataforma de entretenimento. Aposte apenas o que você pode perder. A participação de menores de 18 anos é terminantemente proibida por lei.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Rules;
