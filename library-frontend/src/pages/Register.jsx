import React, { useState } from 'react';
import '../styles/login.css';

import {
  useNavigate,
  Link
} from 'react-router-dom';

import {
  User,
  Mail,
  Lock
} from 'lucide-react';

import api from '../services/api';

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {

      alert('Senhas não coincidem');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(
        '/api/auth/register',
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword:
            formData.confirmPassword
        }
      );

      localStorage.setItem(
        'token',
        response.data.token
      );

      localStorage.setItem(
        'user',
        JSON.stringify(response.data)
      );

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

            <svg
              className="logo-svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>

          </div>
          <h1 className="title-gradient">
            Cadastro
          </h1>

          <p className="subtitle">
            Crie sua conta
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="login-form"
        >

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

          <button
            type="submit"
            disabled={loading}
            className="login-button"
          >

            {loading
              ? 'Criando...'
              : 'Criar Conta'
            }

          </button>

        </form>

        <div className="login-footer">

          <p>
            Já possui conta?
            {' '}

            <Link to="/login">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;