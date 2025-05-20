import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import './App.css'
import ForumPage from './pages/ForumPage';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/forums/:id" element={<ForumPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App
