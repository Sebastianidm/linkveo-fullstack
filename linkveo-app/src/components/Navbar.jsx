import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  // 1. Recuperamos nuestra lógica de autenticación
  const { isAuth, logout } = useAuth();

  return (
    // 2. Aquí empieza el diseño de v0 (con clases Tailwind)
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-gray-800 tracking-tight">
            Linkveo
          </Link>

          {/* Acciones (Lógica condicional) */}
          {isAuth ? (
            // --- ESTADO: LOGUEADO ---
            <div className="flex items-center gap-6">
              <Link
                to="/profile"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Mi Perfil
              </Link>
              <button 
                onClick={logout}
                className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            // --- ESTADO: NO LOGUEADO ---
            <div className="flex items-center gap-6">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Iniciar Sesión
              </Link>
              {/* El botón de "Get Started" ahora lleva al registro */}
              <Link 
                to="/register"
                className="px-6 py-2 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
              >
                Empezar
              </Link>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}