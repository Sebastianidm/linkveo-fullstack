import axios from 'axios';

// URL de tu microservicio de USUARIOS (Puerto 8000)
const API_URL = 'http://localhost:8000'; 

export const apiLogin = async (email, password) => {
  try {
    // 1. FastAPI espera los datos como form-data para OAuth2
    const formData = new URLSearchParams();
    formData.append('username', email); // FastAPI usa 'username' internamente
    formData.append('password', password);

    // 2. Pedimos el token
    const response = await axios.post(`${API_URL}/auth/token`, formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const token = response.data.access_token;

    // 3. Con el token, pedimos los datos del usuario
    const userResponse = await axios.get(`${API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // 4. Devolvemos el formato que espera nuestro AuthProvider
    return {
      token: token,
      user: userResponse.data 
    };

  } catch (error) {
    // Si falla, lanzamos un error legible
    throw new Error(error.response?.data?.detail || "Error al iniciar sesión");
  }
};

export const apiRegister = async (email, password) => {
  try {
    // Generamos un username simple basado en el email
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