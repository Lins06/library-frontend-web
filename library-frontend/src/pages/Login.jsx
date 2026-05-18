import React, { useState } from 'react';
import '../styles/login.css';
import { useNavigate, Link } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  Mail,
  Lock
} from 'lucide-react';
import api from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Envia os dados exatamente como o LoginRequestDTO espera
      const response = await api.post('/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      // 2. Salva o Token retornado pelo LoginResponseDTO
      localStorage.setItem('token', response.data.token);

      // 3. Salva os dados do usuário (ID, nome, email, etc.) vindo do backend
      localStorage.setItem('user', JSON.stringify(response.data));

      alert('Login realizado com sucesso!');
      navigate('/dashboard');

    } catch (error) {
      console.error(error);
      
      // OPTIMIZAÇÃO: Captura a mensagem real enviada pelo seu GlobalExceptionHandler do Spring Boot
      const errorMessage = error.response?.data?.message || 'Erro ao realizar login. Tente novamente mais tarde.';
      alert(errorMessage);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* LOGO */}
        <div className="logo-section">
          <div className="logo">
            <span className="logo-icon">📚</span>
          </div>
          <h1 className="title-gradient">Biblioteca</h1>
          <p>Bem-vindo de volta</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div className="input-group-custom">
            <Mail className="input-icon" />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group-custom">
            <Lock className="input-icon" />
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p style={{ marginTop: '20px', textAlign: 'center' }}>
          Não tem conta? <Link to="/register">Criar agora</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;