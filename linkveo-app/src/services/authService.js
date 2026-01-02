/**
 * Service: AuthService
 * Descripción: Capa de comunicación HTTP con el microservicio de Usuarios (User Service).
 * Responsabilidades:
 * - Gestionar el flujo de autenticación OAuth2 (Solicitud de Token).
 * - Registro de nuevos usuarios.
 * - Manejo de errores de red y propagación de mensajes del backend.
 */

import axios from 'axios';

// Endpoint base del microservicio de autenticación
const API_URL = 'http://localhost:8000';

/**
 * Realiza el inicio de sesión siguiendo el flujo OAuth2 Password Bearer.
 * * @param {string} email - Correo del usuario (se mapea a 'username' para FastAPI).
 * @param {string} password - Contraseña en texto plano.
 * @returns {Promise<Object>} Objeto con el token de acceso y perfil del usuario.
 */
export const apiLogin = async (email, password) => {
  try {
    // FastAPI (OAuth2) requiere datos en formato 'application/x-www-form-urlencoded'.
    // No acepta JSON para la solicitud de token.
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    // Paso 1: Obtener el Access Token
    const response = await axios.post(`${API_URL}/auth/token`, formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const token = response.data.access_token;

    // Paso 2: Obtener datos del perfil usando el token recién adquirido
    const userResponse = await axios.get(`${API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // Retornamos la estructura unificada que necesita el AuthContext
    return {
      token: token,
      user: userResponse.data
    };

  } catch (error) {
    // Propagamos el mensaje exacto del backend si existe (ej: "Incorrect password")
    throw new Error(error.response?.data?.detail || "Error al iniciar sesión");
  }
};

/**
 * Registra un nuevo usuario en el sistema.
 * * @param {string} email - Correo electrónico único.
 * @param {string} password - Contraseña segura.
 * @returns {Promise<Object>} Datos del usuario creado.
 */
export const apiRegister = async (email, password) => {
  try {
    // Generación automática de username para el MVP (email prefix + random suffix)
    const username = email.split('@')[0] + Math.floor(Math.random() * 1000);

    const response = await axios.post(`${API_URL}/auth/register`, {
      email: email,
      username: username,
      password: password
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Error al registrarse");
  }
};