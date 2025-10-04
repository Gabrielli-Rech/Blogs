// src/App.js
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePostPage from './pages/CreatePostPage';

function App() {
  return (
    <Router>
      <div>
        <nav>
          {/* Adiciona o novo link de navegação */}
          <Link to="/">Home</Link> | <Link to="/login">Login</Link> | <Link to="/register">Cadastrar</Link> | <Link to="/create-post">Criar Post</Link>
        </nav>
        <hr />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Adiciona a nova rota */}
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;