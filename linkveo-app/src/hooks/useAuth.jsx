/**
 * Custom Hook: useAuth
 * Descripción: Abstracción de consumo del contexto de autenticación.
 * Funcionalidad: 
 * - Facilita el acceso al AuthContext sin importar el hook useContext repetidamente.
 * - Implementa una validación "Fail-Fast" para asegurar que el componente 
 * esté correctamente envuelto por el AuthProvider.
 */

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.js';

export function useAuth() {
  const context = useContext(AuthContext);

  // Validación de seguridad para desarrollo:
  // Si context es undefined, significa que intentamos usar este hook fuera del Provider.
  if (!context) {
    throw new Error('Error Crítico: useAuth debe ser usado dentro de un AuthProvider');
  }

  return context;
}