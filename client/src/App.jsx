import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CartDrawer from './components/CartDrawer';
import ChatBox from './components/ChatBox';
import './App.css';

export default function App() {
  const [page, setPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setPage('home');
  };

  return (
    <div className="app">
      <Navbar 
        onNavigate={(targetPage) => setPage(targetPage)} 
        onCartClick={() => setIsCartOpen(true)}
        onSelectCategory={handleSelectCategory}
      />

      <main style={{ paddingBottom: '3rem' }}>
        {page === 'home' && (
          <Home 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
          />
        )}
        {page === 'login' && <Login onSwitchToRegister={() => setPage('register')} />}
        {page === 'register' && <Register onSwitchToLogin={() => setPage('login')} />}
      </main>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />

      <ChatBox />
    </div>
  );
}
