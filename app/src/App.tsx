import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ForumPage from './pages/ForumPage';
import PostPage from './pages/PostPage';
import CreatePostPage from './pages/CreatePostPage';
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
          <Route path="/create-post/:id" element={<CreatePostPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App
