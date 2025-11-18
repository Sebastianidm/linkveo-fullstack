import React, { useState } from 'react';
import { AuthContext } from './AuthContext.js';
import { apiLogin, apiRegister } from '../services/authService.js';

// 1. Función auxiliar para recuperar el usuario guardado
const getInitialUser = () => {
  const savedUser = localStorage.getItem('user');
  try {
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
};

const getInitialToken = () => {
  return localStorage.getItem('token');
};

function AuthProvider({ children }) {
    const [token, setToken] = useState(getInitialToken()); 
    const [isAuth, setIsAuth] = useState(!!token); 
    
    // 2. Inicializamos el estado con lo que haya en localStorage
    const [user, setUser] = useState(getInitialUser()); 
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiLogin(email, password);
        
        setUser(data.user);
        setToken(data.token);
        setIsAuth(true);

        // 3. Guardamos AMBOS en localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user)); // Guardamos el objeto como texto

      } catch (err) {
        setError(err.message);
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

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

    const logout = () => {
        console.log("Cerrando sesión...");
        setUser(null);
        setToken(null);
        setIsAuth(false);
        
        // 4. Limpiamos AMBOS del localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

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

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider;