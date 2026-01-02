/**
 * Page: ProfilePage
 * Descripción: Vista de configuración y detalles de la cuenta.
 * Responsabilidades:
 * - Visualización de identidad del usuario (Avatar generado, Email, ID).
 * - Acciones de cuenta (Cerrar Sesión).
 * - Diseño responsivo centrado (Card Layout).
 */

import React from 'react';
import { useAuth } from '../hooks/useAuth';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  // --- Lógica de Presentación (Derived State) ---
  // Generamos un nombre legible a partir del email (ej: sebastian@... -> Sebastian)
  // En un escenario real, esto vendría de una columna 'username' en la BD.
  const rawName = user?.email ? user.email.split('@')[0] : 'Usuario';
  const displayName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-12 px-4 sm:px-6 lg:px-8">

      {/* Layout Container */}
      <div className="max-w-2xl mx-auto">

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">

          {/* Visual Header (Banner) */}
          <div className="h-32 bg-gradient-to-r from-blue-500 to-[#0071e3]"></div>

          {/* Identity Section */}
          <div className="relative px-8 pb-8">
            {/* Avatar Superpuesto */}
            <div className="absolute -top-16 left-8">
              <div className="h-32 w-32 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center shadow-md">
                <svg className="h-16 w-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>

            {/* User Info */}
            <div className="pt-20">
              <h1 className="text-3xl font-bold text-gray-900">{displayName}</h1>
              <p className="text-gray-500 font-medium">{user?.email}</p>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 mt-2 ring-1 ring-inset ring-blue-700/10">
                Plan Gratuito
              </span>
            </div>
          </div>

          <div className="border-t border-gray-100"></div>

          {/* Account Details Grid */}
          <div className="px-8 py-6 space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Información de la Cuenta</h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">ID de Usuario</label>
                <div className="block w-full rounded-xl border-0 py-2.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-200 bg-gray-50 sm:text-sm font-mono">
                  #{user?.id || 'LOCAL-DEV'}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Miembro desde</label>
                <div className="block w-full rounded-xl border-0 py-2.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-200 bg-gray-50 sm:text-sm">
                  Noviembre 2025
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100"></div>

          {/* Danger Zone / Actions */}
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

        <p className="text-center text-xs text-gray-400 mt-8">
          Linkveo ID • Versión 1.0.0
        </p>

      </div>
    </div>
  );
}