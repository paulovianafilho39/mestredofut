
import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Trophy, 
  Gamepad2, 
  Info, 
  Headset, 
  User, 
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  CheckCircle2,
  Newspaper
} from 'lucide-react';
import { UserProfile, Notification } from '../types';

interface LayoutProps {
  user: UserProfile;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { 
      id: '1', 
      title: 'Palpite Validado!', 
      body: 'Seu palpite para Flamengo vs Palmeiras foi validado pelo ADM.', 
      type: 'bet', 
      timestamp: new Date(), 
      read: false 
    },
    { 
      id: '2', 
      title: 'Novo Jogo Adicionado', 
      body: 'Ceará vs Fortaleza já está disponível para palpites.', 
      type: 'game', 
      timestamp: new Date(Date.now() - 3600000), 
      read: true 
    }
  ]);

  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Início', path: '/', icon: Home },
    { name: 'Jogos Reais', path: '/real-games', icon: Gamepad2 },
    { name: 'Ranking', path: '/ranking', icon: Trophy },
    { name: 'Notícias', path: '/news', icon: Newspaper },
    { name: 'Regras', path: '/rules', icon: Info },
    { name: 'Suporte', path: '/support', icon: Headset },
    { name: 'Perfil', path: '/profile', icon: User },
  ];

  if (user.isAdmin) {
    menuItems.push({ name: 'Admin', path: '/admin', icon: Settings });
  }

  const handleLogout = () => {
    onLogout();
    navigate('/auth');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 transition-transform duration-300 lg:translate-x-0 lg:static
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h1 className="text-2xl font-orbitron font-bold text-[#39FF14] neon-text">MESTRE DO FUT</h1>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${isActive 
                      ? 'bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/30' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                  `}
                >
                  <Icon size={20} className={isActive ? 'animate-pulse' : ''} />
                  <span className="font-semibold">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 mt-auto">
            <div className="flex items-center p-3 mb-4 bg-slate-800/50 rounded-2xl border border-slate-700">
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden border border-[#39FF14]/20">
                {user.photoBase64 ? (
                  <img src={user.photoBase64} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[#39FF14] font-bold">{user.fullName.charAt(0)}</span>
                )}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-bold truncate text-[#39FF14]">{user.fullName}</p>
                <div className="flex items-center text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  <Trophy size={10} className="mr-1 text-amber-500" />
                  {user.score || 0} PTS
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-full space-x-2 px-4 py-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-all font-bold border border-red-500/20"
            >
              <LogOut size={18} />
              <span>Sair do Jogo</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        <header className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-slate-400 hover:text-[#39FF14] lg:hidden"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-orbitron font-bold text-[#39FF14] lg:hidden">MESTRE DO FUT</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className={`p-2 rounded-xl border border-slate-800 hover:border-[#39FF14]/40 transition-all relative ${isNotifOpen ? 'bg-[#39FF14]/10 text-[#39FF14]' : 'text-slate-400'}`}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold border-2 border-slate-900">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-[60] overflow-hidden">
                  <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                    <h3 className="font-bold">Notificações</h3>
                    <button onClick={markAllRead} className="text-xs text-[#39FF14] font-bold hover:underline">Marcar todas como lidas</button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-slate-500 text-sm">Nenhuma notificação por aqui.</div>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className={`p-4 border-b border-slate-800/50 flex space-x-3 transition-colors ${!n.read ? 'bg-[#39FF14]/5' : ''}`}>
                          <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${!n.read ? 'bg-[#39FF14]' : 'bg-slate-700'}`}></div>
                          <div>
                            <p className="text-sm font-bold text-slate-200">{n.title}</p>
                            <p className="text-xs text-slate-400 mt-1">{n.body}</p>
                            <p className="text-[10px] text-slate-600 mt-2 uppercase font-bold">{n.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="hidden lg:flex items-center px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl space-x-3">
              <Trophy size={16} className="text-amber-500" />
              <span className="text-sm font-black text-[#39FF14]">{user.score || 0} PTS</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
