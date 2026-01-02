/**
 * Service: LinkService
 * Descripción: Capa de comunicación con el microservicio de Recursos (Link Core).
 * Infraestructura: Se conecta al puerto 8001 (separado del Auth Service 8000).
 * Responsabilidades:
 * - CRUD de enlaces (Obtener, Crear, Eliminar).
 * - Inyección del Token JWT en los headers (Authorization).
 * - Manejo de errores de red.
 */

import axios from 'axios';

// Endpoint del microservicio de Links
const API_URL = 'http://localhost:8001';

/**
 * Obtiene el listado completo de enlaces del usuario.
 * @param {string} token - JWT para autorización Bearer.
 * @returns {Promise<Array>} Lista de objetos Link.
 */
export const apiGetLinks = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/links`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    // Propagamos el error para que el componente UI pueda mostrar una alerta o Toast
    throw new Error(error.response?.data?.detail || "Error al cargar los enlaces");
  }
};

/**
 * Crea un nuevo enlace.
 * Incluye lógica de fallback para generar un título si el usuario no provee uno.
 * @param {string} url - Dirección web a guardar.
 * @param {string} token - JWT.
 */
export const apiCreateLink = async (url, token) => {
  try {
    // Lógica de Negocio (Client-Side):
    // Intentamos extraer el hostname (ej: youtube.com) como título por defecto.
    let title = url;
    try {
      title = new URL(url).hostname;
    } catch (e) {
      // Si la URL es inválida o relativa, usamos un título genérico
      title = "Nuevo Enlace";
    }

    const response = await axios.post(`${API_URL}/links`,
      {
        title: title,
        url: url
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Error al guardar el enlace");
  }
};

/**
 * Elimina un enlace por su ID.
 * @param {number} linkId - ID único del recurso.
 * @param {string} token - JWT.
 */
export const apiDeleteLink = async (linkId, token) => {
  try {
    await axios.delete(`${API_URL}/links/${linkId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return true;
  } catch (error) {
    throw new Error("No se pudo eliminar el enlace");
  }
};