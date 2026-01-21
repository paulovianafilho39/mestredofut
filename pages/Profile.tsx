
import React, { useRef, useState } from 'react';
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db } from '../firebase';
import { UserProfile } from '../types';
import { Camera, MapPin, Heart, Calendar, Mail, Edit3, Loader2 } from 'lucide-react';

interface ProfileProps {
  user: UserProfile;
  onUpdate: (user: UserProfile) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert("A imagem deve ter no máximo 1MB");
        return;
      }

      const reader = new FileReader();
      setIsUploading(true);
      
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        try {
          const userRef = doc(db, "usuarios", user.uid);
          await updateDoc(userRef, { photoBase64: base64 });
          
          const updatedUser = { ...user, photoBase64: base64 };
          onUpdate(updatedUser);
          localStorage.setItem('mestre_user', JSON.stringify(updatedUser));
        } catch (error) {
          console.error("Erro ao salvar foto:", error);
          alert("Erro ao salvar no banco de dados.");
        } finally {
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 rounded-[3rem] border border-slate-800 overflow-hidden shadow-2xl relative">
        <div className="h-48 bg-gradient-to-r from-slate-900 via-[#39FF14]/10 to-slate-900 border-b border-slate-800"></div>
        
        <div className="px-8 pb-12">
          <div className="flex flex-col md:flex-row items-end -mt-20 gap-6 mb-12">
            <div className="relative group">
              <div className="w-40 h-40 rounded-[2.5rem] bg-slate-950 border-4 border-slate-800 overflow-hidden neon-border flex items-center justify-center">
                {isUploading ? (
                  <Loader2 className="animate-spin text-[#39FF14]" size={40} />
                ) : user.photoBase64 ? (
                  <img src={user.photoBase64} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-slate-700 font-orbitron">
                    {user.fullName.charAt(0)}
                  </div>
                )}
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="absolute bottom-2 right-2 p-3 bg-[#39FF14] text-black rounded-2xl shadow-lg hover:scale-110 transition-all disabled:opacity-50"
              >
                <Camera size={20} />
              </button>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
            </div>

            <div className="flex-1 pb-4">
              <h2 className="text-3xl font-orbitron font-bold text-[#39FF14] neon-text uppercase">{user.fullName}</h2>
              <p className="text-slate-400 font-medium">Mestre do Fut • Membro Elite</p>
            </div>

            <button className="mb-4 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-2xl font-bold flex items-center space-x-2 transition-all border border-slate-700">
              <Edit3 size={18} />
              <span>Editar Perfil</span>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-orbitron font-bold text-slate-300 border-l-4 border-[#39FF14] pl-4">Informações</h3>
              
              <div className="grid gap-4">
                <div className="flex items-center p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
                  <div className="p-3 bg-slate-900 text-[#39FF14] rounded-xl mr-4"><Mail size={20}/></div>
                  <div><p className="text-xs text-slate-500 uppercase font-bold">Email</p><p className="font-bold">{user.email}</p></div>
                </div>
                <div className="flex items-center p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
                  <div className="p-3 bg-slate-900 text-[#39FF14] rounded-xl mr-4"><Calendar size={20}/></div>
                  <div><p className="text-xs text-slate-500 uppercase font-bold">Idade</p><p className="font-bold">{user.age} anos</p></div>
                </div>
                <div className="flex items-center p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
                  <div className="p-3 bg-slate-900 text-[#39FF14] rounded-xl mr-4"><MapPin size={20}/></div>
                  <div><p className="text-xs text-slate-500 uppercase font-bold">Localização</p><p className="font-bold">{user.city}</p></div>
                </div>
                <div className="flex items-center p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
                  <div className="p-3 bg-slate-900 text-[#39FF14] rounded-xl mr-4"><Heart size={20}/></div>
                  <div><p className="text-xs text-slate-500 uppercase font-bold">Time do Coração</p><p className="font-bold">{user.favoriteTeam}</p></div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-orbitron font-bold text-slate-300 border-l-4 border-[#39FF14] pl-4">Estatísticas</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#39FF14]/5 p-6 rounded-[2rem] border border-[#39FF14]/20 text-center shadow-inner">
                  <p className="text-3xl font-black text-[#39FF14]">--</p>
                  <p className="text-xs text-slate-500 uppercase font-bold mt-1">Palpites</p>
                </div>
                <div className="bg-blue-500/5 p-6 rounded-[2rem] border border-blue-500/20 text-center shadow-inner">
                  <p className="text-3xl font-black text-blue-500">{user.score || 0}</p>
                  <p className="text-xs text-slate-500 uppercase font-bold mt-1">Pontuação</p>
                </div>
                <div className="bg-slate-950/80 p-6 rounded-[2rem] border border-slate-800 text-center col-span-2">
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.3em] mb-2">Status do Mestre</p>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#39FF14] h-full w-1/3 shadow-[0_0_10px_#39FF14]"></div>
                  </div>
                  <p className="text-[10px] text-[#39FF14] mt-2 font-bold italic">Rumo ao Topo do Ranking!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
