/**
 * Componente: ProtectedRoute (Route Guard)
 * Descripción: Envoltorio de seguridad para rutas privadas.
 * Funcionalidad: 
 * - Verifica si existe una sesión activa (isAuth).
 * - Si no hay sesión, redirige al login y limpia el historial de navegación.
 * - Si hay sesión, renderiza el contenido solicitado (children).
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

function ProtectedRoute({ children }) {
    // Obtenemos el estado de autenticación desde el Contexto Global
    const { isAuth } = useAuth();

    // Verificación de seguridad:
    if (!isAuth) {
        // Usamos 'replace' para evitar que el usuario pueda volver atrás con el botón del navegador
        return <Navigate to="/login" replace />;
    }

    // Si pasa la verificación, renderizamos la página hija
    return children;
}

export default ProtectedRoute;