import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold fs-3" href="/dashboard">
          📚 Biblioteca
        </a>
        
        <div className="navbar-nav ms-auto">
          <span className="navbar-text me-3">
            Olá, <strong>{user?.name}</strong>
          </span>
          <button 
            className="btn btn-outline-danger" 
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right me-1"></i>
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;