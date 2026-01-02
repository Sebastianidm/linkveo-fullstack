/**
 * AuthProvider.jsx
 * Contexto de Autenticación Global.
 * * Responsabilidad:
 * - Gestionar el estado de sesión del usuario (Token/User).
 * - Persistir la sesión en LocalStorage para resistir recargas de página.
 * - Exponer métodos de login, registro y logout a toda la aplicación.
 */

import React, { useState } from 'react';
import { AuthContext } from './AuthContext.js';
import { apiLogin, apiRegister } from '../services/authService.js';

// Helper: Recupera y parsea el usuario desde almacenamiento local de forma segura
const getInitialUser = () => {
  const savedUser = localStorage.getItem('user');
  try {
    return savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    return null; // Si el JSON está corrupto, iniciamos sin usuario
  }
};

// Helper: Recupera el token JWT almacenado
const getInitialToken = () => {
  return localStorage.getItem('token');
};

function AuthProvider({ children }) {
  // Inicialización de estado con persistencia (Lazy Initialization)
  const [token, setToken] = useState(getInitialToken());
  const [isAuth, setIsAuth] = useState(!!token); // Convierte string a boolean
  const [user, setUser] = useState(getInitialUser());

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Maneja el inicio de sesión contra el microservicio de usuarios.
   * Actualiza el estado global y persiste la sesión.
   */
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiLogin(email, password);

      // Actualización del estado en memoria
      setUser(data.user);
      setToken(data.token);
      setIsAuth(true);

      // Persistencia de sesión en navegador
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

    } catch (err) {
      setError(err.message);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Registra un nuevo usuario.
   * Retorna true/false para permitir redirección en la UI.
   */
  const register = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      await apiRegister(email, password);
      setError(null);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cierra la sesión, limpia el estado y el almacenamiento local.
   */
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuth(false);

    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    isAuth,
    user,
    token,
    loading,
    error,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;