import axios from 'axios';

// URL de tu microservicio de LINKS (Puerto 8001)
const API_URL = 'http://localhost:8001';

export const apiGetLinks = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/links`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    // SOLUCIÓN 1: Usamos la variable 'error' imprimiéndola
    console.error("Error detallado al obtener links:", error);
    throw new Error("Error al cargar los enlaces");
  }
};

export const apiCreateLink = async (url, token) => {
  try {
    // Generamos un título automático simple
    let title = url;
    try {
      title = new URL(url).hostname;
    } catch (e) {
      // SOLUCIÓN 2: Usamos 'e' (aunque sea solo para saber que falló el parseo)
      console.warn("No se pudo extraer el hostname, usando URL completa:", e);
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
    // SOLUCIÓN 3: Usamos la variable 'error'
    console.error("Error detallado al crear link:", error);
    throw new Error("Error al guardar el enlace");
  }
};


export const apiDeleteLink = async (linkId, token) => {
  try {
    await axios.delete(`${API_URL}/links/${linkId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return true;
  } catch (error) {
    console.error("Error eliminando link:", error);
    throw new Error("No se pudo eliminar el enlace");
  }
};