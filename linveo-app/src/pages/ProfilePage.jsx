import React from 'react';
import { useAuth } from '../hooks/useAuth';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  // Extraemos el nombre del email para simular un nombre de usuario
  // (Ej: "test@test.com" -> "Test")
  const simulatedName = user?.email ? user.email.split('@')[0] : 'Usuario';
  const displayName = simulatedName.charAt(0).toUpperCase() + simulatedName.slice(1);

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-12 px-4 sm:px-6 lg:px-8">
      
      {/* CONTENEDOR PRINCIPAL */}
      <div className="max-w-2xl mx-auto">
        
        {/* TARJETA DE PERFIL */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
          
          {/* HEADER CON FONDO DEGRADADO */}
          <div className="h-32 bg-gradient-to-r from-blue-500 to-[#0071e3]"></div>
          
          {/* SECCIÓN DEL AVATAR (Superpuesto) */}
          <div className="relative px-8 pb-8">
            <div className="absolute -top-16 left-8">
              <div className="h-32 w-32 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center shadow-md">
                {/* Avatar Placeholder SVG */}
                <svg className="h-16 w-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            
            {/* INFORMACIÓN PRINCIPAL */}
            <div className="pt-20">
              <h1 className="text-3xl font-bold text-gray-900">{displayName}</h1>
              <p className="text-gray-500 font-medium">{user?.email}</p>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 mt-2 ring-1 ring-inset ring-blue-700/10">
                Plan Gratuito
              </span>
            </div>
          </div>

          {/* DIVISOR */}
          <div className="border-t border-gray-100"></div>

          {/* DETALLES DE LA CUENTA */}
          <div className="px-8 py-6 space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Información de la Cuenta</h3>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Campo: ID de Usuario */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">ID de Usuario</label>
                <div className="block w-full rounded-xl border-0 py-2.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-200 bg-gray-50 sm:text-sm">
                  #{user?.id || '1234'}
                </div>
              </div>

              {/* Campo: Fecha de Registro (Simulada) */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Miembro desde</label>
                <div className="block w-full rounded-xl border-0 py-2.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-200 bg-gray-50 sm:text-sm">
                  Noviembre 2025
                </div>
              </div>
            </div>
          </div>

          {/* DIVISOR */}
          <div className="border-t border-gray-100"></div>

          {/* ZONA DE ACCIONES */}
          <div className="bg-gray-50 px-8 py-6 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              ¿Deseas salir de la aplicación?
            </p>
            <button
              onClick={logout}
              className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-100 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>

        </div>
        
        {/* COPYRIGHT / FOOTER PEQUEÑO */}
        <p className="text-center text-xs text-gray-400 mt-8">
          Linkveo ID • Versión 1.0.0
        </p>

      </div>
    </div>
  );
}