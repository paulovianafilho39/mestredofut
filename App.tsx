
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Splash from './components/Splash';
import Layout from './components/Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import RealGames from './pages/RealGames';
import Ranking from './pages/Ranking';
import Rules from './pages/Rules';
import Support from './pages/Support';
import News from './pages/News';
import { UserProfile } from './types';

// Usuário padrão com acesso total (Modo Livre)
const GUEST_MASTER: UserProfile = {
  uid: "mestre-full-access",
  fullName: "Mestre Desenvolvedor",
  email: "suportemestredofut@gmail.com",
  city: "Acesso Livre",
  favoriteTeam: "Todos",
  age: 99,
  isAdmin: true,
  score: 999,
  photoBase64: ""
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(GUEST_MASTER);

  useEffect(() => {
    // Apenas um delay visual para o Splash, sem checagem de Auth real
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <Router>
      <div className="relative min-h-screen">
        <Routes>
          <Route element={<Layout user={user!} onLogout={() => {}} />}>
            <Route path="/" element={<Home user={user!} />} />
            <Route path="/real-games" element={<RealGames />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/news" element={<News />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/support" element={<Support />} />
            <Route path="/profile" element={<Profile user={user!} onUpdate={(u) => setUser(u)} />} />
            <Route path="/admin" element={<Admin user={user!} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
