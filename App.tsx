
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { auth, db } from './firebase';
import Splash from './components/Splash';
import Layout from './components/Layout';
import Home from './pages/Home';
import AuthPage from './pages/Auth';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import RealGames from './pages/RealGames';
import Ranking from './pages/Ranking';
import Rules from './pages/Rules';
import Support from './pages/Support';
import News from './pages/News';
import { UserProfile } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Alterado para 'usuarios' conforme configurado no Firebase Console
        const userRef = doc(db, "usuarios", firebaseUser.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          setUser({ uid: firebaseUser.uid, ...userSnap.data() } as UserProfile);
        } else {
          // Caso o documento não exista (falha no cadastro), desloga
          auth.signOut();
        }
      } else {
        setUser(null);
      }
      
      setTimeout(() => setIsLoading(false), 2500);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <Router>
      <div className="relative min-h-screen">
        <Routes>
          {!user ? (
            <Route path="*" element={<AuthPage />} />
          ) : (
            <Route element={<Layout user={user} onLogout={() => auth.signOut()} />}>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/real-games" element={<RealGames />} />
              <Route path="/ranking" element={<Ranking />} />
              <Route path="/news" element={<News />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/support" element={<Support />} />
              <Route path="/profile" element={<Profile user={user} onUpdate={(u) => setUser(u)} />} />
              {/* Rota protegida do Admin */}
              {user.isAdmin && <Route path="/admin" element={<Admin user={user} />} />}
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
