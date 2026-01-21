
import React, { useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { auth, db } from '../firebase';
import { User, Mail, Lock, MapPin, Heart, Calendar, Loader2 } from 'lucide-react';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    city: '',
    favoriteTeam: '',
    age: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const { user } = userCredential;

        // Trava ADM específica solicitada
        const isAdmin = 
          user.email?.toLowerCase() === 'suportemestredofut@gmail.com' || 
          user.uid === 't6GM6PC7piV5rmRIWANz2H18WMg1';

        const userData = {
          fullName: formData.fullName,
          email: formData.email,
          city: formData.city,
          favoriteTeam: formData.favoriteTeam,
          age: parseInt(formData.age),
          isAdmin: isAdmin,
          score: 0,
          uid: user.uid
        };

        // Salvando na coleção correta: 'usuarios'
        await setDoc(doc(db, "usuarios", user.uid), userData);
      }
    } catch (error: any) {
      alert("Erro Mestre: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <div className="w-full max-w-xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 md:p-12 rounded-[3rem] shadow-2xl z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-orbitron font-bold text-[#39FF14] neon-text mb-2">MESTRE DO FUT</h1>
          <p className="text-slate-400">{isLogin ? 'Entre em campo e mostre sua habilidade!' : 'Crie sua conta para começar a palpitar!'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type="text" name="fullName" placeholder="Nome Completo" 
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:border-[#39FF14] outline-none"
                  value={formData.fullName} onChange={handleInputChange} required
                />
              </div>
              <div className="relative">
                <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type="number" name="age" placeholder="Idade" 
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:border-[#39FF14] outline-none"
                  value={formData.age} onChange={handleInputChange} required
                />
              </div>
              <div className="relative">
                <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type="text" name="city" placeholder="Cidade/Estado" 
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:border-[#39FF14] outline-none"
                  value={formData.city} onChange={handleInputChange} required
                />
              </div>
              <div className="relative">
                <Heart size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type="text" name="favoriteTeam" placeholder="Time do Coração" 
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:border-[#39FF14] outline-none"
                  value={formData.favoriteTeam} onChange={handleInputChange} required
                />
              </div>
            </div>
          )}

          <div className="relative">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="email" name="email" placeholder="Seu E-mail" 
              className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:border-[#39FF14] outline-none"
              value={formData.email} onChange={handleInputChange} required
            />
          </div>

          <div className="relative">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="password" name="password" placeholder="Sua Senha" 
              className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:border-[#39FF14] outline-none"
              value={formData.password} onChange={handleInputChange} required
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#39FF14] text-black font-bold py-5 rounded-2xl shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:scale-[1.01] transition-all text-lg font-orbitron flex items-center justify-center"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : (isLogin ? 'ENTRAR AGORA' : 'FINALIZAR CADASTRO')}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="text-slate-400 hover:text-[#39FF14] transition-colors">
            {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Entre aqui'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
