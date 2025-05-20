import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ForumPage from './pages/ForumPage';
import PostPage from './pages/PostPage';
import './App.css'

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/forums/:id" element={<ForumPage />} />
          <Route path="/posts/:id" element={<PostPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App
