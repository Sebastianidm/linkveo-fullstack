/**
 * Entry Point: main.jsx
 * Descripción: Punto de entrada de la aplicación React.
 * Responsabilidades:
 * - Configuración del Enrutador (Client-Side Routing) con react-router-dom.
 * - Definición de rutas públicas y protegidas (Route Guards).
 * - Inyección de Proveedores Globales (AuthProvider) para gestión de estado.
 * - Renderizado del árbol de componentes en el DOM.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layouts & Pages
import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

// Security Components
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Context Providers
import AuthProvider from './context/AuthProvider.jsx';
import './index.css';

// Configuración del Router (Data API de React Router v6.4+)
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Layout Principal (Navbar + Outlet)
    children: [
      {
        index: true, // Ruta raíz: '/'
        // Envolvemos la Home en ProtectedRoute para forzar autenticación
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/profile',
        // Ruta protegida: Solo accesible si hay sesión activa
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

// Renderizado del Árbol de la Aplicación
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* AuthProvider envuelve al Router para que el estado de autenticación 
      esté disponible durante la navegación y en todas las páginas.
    */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);