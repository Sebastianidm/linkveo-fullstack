/**
 * Page: LoginPage
 * Descripción: Vista de inicio de sesión.
 * Responsabilidades:
 * - Manejo de estado del formulario (Controlled Components).
 * - Comunicación con AuthContext para ejecutar la autenticación.
 * - Redirección automática (Route Guarding inverso) si ya existe sesión.
 * - Feedback visual de errores y estado de carga (Loading/Error UI).
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  // --- Local State (Form Data) ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // --- Global State & Navigation ---
  const { login, isAuth, loading, error } = useAuth();
  const navigate = useNavigate();

  /**
   * Effect: Auth Redirect Policy
   * Si el usuario ya está autenticado (isAuth=true),
   * prevenimos que acceda al login y lo redirigimos al Dashboard.
   */
  useEffect(() => {
    if (isAuth) {
      // 'replace: true' evita que el usuario pueda volver al login con el botón 'Atrás'
      navigate('/', { replace: true });
    }
  }, [isAuth, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevenimos el reload nativo del navegador
    await login(email, password);
  };

  return (
    // Layout Container: Centrado vertical/horizontal con fondo distintivo
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#F5F5F7]">

      {/* Auth Card Container */}
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">

        {/* Header Section */}
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Bienvenido de nuevo a Linkveo
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

          {/* Feedback Visual: Mensajes de Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3 text-center animate-pulse">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Input: Email */}
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="relative block w-full rounded-xl border-0 py-3.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-[#0071e3] sm:text-sm sm:leading-6 bg-gray-50/50 transition-all"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Input: Password */}
            <div>
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full rounded-xl border-0 py-3.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-[#0071e3] sm:text-sm sm:leading-6 bg-gray-50/50 transition-all"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Action Button: Con estado de carga */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-full bg-[#0071e3] py-3 px-4 text-sm font-semibold text-white hover:bg-[#0077ed] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 transition-all shadow-md hover:shadow-lg"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Ingresando...
                </span>
              ) : 'Ingresar'}
            </button>
          </div>

          {/* Footer: Redirección a Registro */}
          <div className="text-center text-sm">
            <span className="text-gray-500">¿No tienes cuenta? </span>
            <Link to="/register" className="font-medium text-[#0071e3] hover:text-[#0077ed] hover:underline transition-colors">
              Regístrate ahora
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}