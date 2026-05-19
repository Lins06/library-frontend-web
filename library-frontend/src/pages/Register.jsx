import React, { useState } from 'react';
import '../styles/login.css';

import {
  useNavigate,
  Link
} from 'react-router-dom';

import {
  User,
  Mail,
  Lock,
  Book,
  MapPin 
} from 'lucide-react';

import api from '../services/api';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    cep: '',
    street: '',
    city: ''
  });

  const [loading, setLoading] = useState(false);

  const handleCepChange = async (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Mantém apenas números
    
    setFormData(prev => ({
      ...prev,
      cep: value
    }));

    if (value.length === 8) {
      try {
        // Chamando o backend em vez de ViaCEP diretamente
        const response = await api.get(`/api/auth/address/${value}`);
        
        if (response.data.error) {
          alert('CEP não encontrado!');
          return;
        }

        setFormData(prev => ({
          ...prev,
          street: response.data.street,
          city: `${response.data.city} - ${response.data.state}`
        }));
      } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
        alert('Erro ao buscar CEP. Tente novamente.');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Senhas não coincidem');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        cep: formData.cep,
        street: formData.street,
        city: formData.city
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));

      alert('Conta criada com sucesso!');
      navigate('/dashboard');

    } catch (error) {
      console.log(error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Erro ao criar conta');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-section">
          <div className="logo">
            <Book size={48} strokeWidth={1.5} color="#2563eb" />
          </div>
          <h1 className="title-gradient">Cadastro</h1>
          <p className="subtitle">Crie sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group-custom">
            <User className="input-icon" />
            <input
              type="text"
              name="name"
              placeholder="Seu nome"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="input-group-custom">
            <Mail className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Seu email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="input-group-custom">
            <MapPin className="input-icon" />
            <input
              type="text"
              name="cep"
              maxLength="8"
              placeholder="Digite seu CEP (apenas números)"
              value={formData.cep}
              onChange={handleCepChange} 
              className="form-input"
              required
            />
          </div>

          {formData.street && (
            <div style={{ textAlign: 'left', fontSize: '13px', color: '#6b7280', marginBottom: '18px', paddingLeft: '4px' }}>
              📍 <strong>Endereço localizado:</strong> {formData.street}, {formData.city}
            </div>
          )}

          <div className="input-group-custom">
            <Lock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Sua senha"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="input-group-custom">
            <Lock className="input-icon" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar senha"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="login-button">
            {loading ? 'Criando...' : 'Criar Conta'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Já possui conta? <Link to="/login">Entrar</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;