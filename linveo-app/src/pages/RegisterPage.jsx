import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [localError, setLocalError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const { register, loading, error: authError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError(null);
    setSuccessMessage(null);

    // Validaciones locales
    if (password !== confirmPassword) {
      setLocalError("Las contraseñas no coinciden");
      return;
    }
    if (password.length < 6) {
      setLocalError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    const success = await register(email, password);

    if (success) {
      setSuccessMessage("¡Cuenta creada correctamente!");
      // Redirigir tras 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#F5F5F7]">
      
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 transition-all">
        
        {/* ESTADO DE ÉXITO (VISTA ALTERNATIVA) */}
        {successMessage ? (
          <div className="text-center py-10">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Bienvenido a bordo!</h3>
            <p className="text-gray-500">{successMessage}</p>
            <p className="text-sm text-gray-400 mt-4">Redirigiendo al login...</p>
          </div>
        ) : (
          // FORMULARIO NORMAL
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Crear Cuenta
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Empieza a organizar tus enlaces hoy mismo
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              
              {/* MENSAJES DE ERROR */}
              {(localError || authError) && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl p-3 text-center animate-pulse">
                  {localError || authError}
                </div>
              )}

              <div className="space-y-4">
                {/* EMAIL */}
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="block w-full rounded-xl border-0 py-3.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0071e3] sm:text-sm sm:leading-6 bg-gray-50/50"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <label htmlFor="password" className="sr-only">Contraseña</label>
                  <input
                    id="password"
                    type="password"
                    required
                    className="block w-full rounded-xl border-0 py-3.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0071e3] sm:text-sm sm:leading-6 bg-gray-50/50"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* CONFIRM PASSWORD */}
                <div>
                  <label htmlFor="confirmPassword" className="sr-only">Confirmar Contraseña</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    className="block w-full rounded-xl border-0 py-3.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0071e3] sm:text-sm sm:leading-6 bg-gray-50/50"
                    placeholder="Confirmar contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* BOTÓN DE REGISTRO (NEGRO, PARA DIFERENCIAR DEL LOGIN) */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center rounded-full bg-gray-900 py-3 px-4 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:opacity-70 transition-all"
              >
                {loading ? 'Creando cuenta...' : 'Registrarse'}
              </button>

              <div className="text-center text-sm mt-4">
                <span className="text-gray-500">¿Ya tienes cuenta? </span>
                <Link to="/login" className="font-medium text-[#0071e3] hover:text-[#0077ed] hover:underline">
                  Inicia sesión
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}