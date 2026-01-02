/**
 * Componente: Navbar
 * Descripción: Barra de navegación principal persistente (Sticky).
 * Funcionalidad: 
 * - Renderizado condicional de acciones basado en el estado de autenticación (Auth/Guest).
 * - Implementa diseño 'Glassmorphism' para mantener contexto visual al hacer scroll.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  // Consumo del contexto para determinar qué menú mostrar
  const { isAuth, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200 transition-all">
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Brand Identity */}
          <Link to="/" className="text-xl font-bold text-gray-800 tracking-tight hover:opacity-80 transition-opacity">
            Linkveo
          </Link>

          {/* Navegación Condicional */}
          {isAuth ? (
            // Vista de Usuario Autenticado
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
            // Vista de Visitante (Guest)
            <div className="flex items-center gap-6">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors shadow-sm"
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