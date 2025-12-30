# Linkveo

Linkveo es una plataforma Full Stack diseñada para la gestión inteligente de marcadores y enlaces. Utiliza una arquitectura de microservicios, contenedores con Docker y una interfaz moderna con estética *Glassmorphism* inspirada en el ecosistema de Apple.

## Características Principales

* **Organización por Colecciones:** Estructura de carpetas estilo ChatGPT/Discord para organizar tus proyectos.
* **Scraping Automático:** Extracción automática de títulos e imágenes de previsualización al guardar un enlace.
* **Diseño Premium:** Interfaz responsiva con efectos de desenfoque, degradados y componentes pulidos con Tailwind CSS.
* **Seguridad:** Sistema de autenticación de usuarios para proteger tus colecciones privadas.

## Stack Tecnológico

### Frontend
* **React + Vite:** Para una interfaz de usuario rápida y reactiva.
* **Tailwind CSS:** Diseño basado en utilidades con enfoque en Glassmorphism.
* **Lucide React:** Set de iconos minimalistas y consistentes.

### Backend (Microservicios)
* **FastAPI (Python):** Dos servicios independientes para la gestión de usuarios y el procesamiento de enlaces.
* **SQLAlchemy:** ORM para la comunicación con la base de datos.
* **Pydantic:** Validación de datos y esquemas de API.

### Infraestructura y Base de Datos
* **Docker & Docker Compose:** Orquestación de toda la plataforma en contenedores aislados.
* **PostgreSQL:** Base de datos relacional robusta para el almacenamiento persistente.

## Instalación y Despliegue Local

Para levantar el proyecto completo, solo necesitas tener instalado **Docker Desktop** y seguir estos pasos:

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/Sebastianidm/linkveo-fullstack.git](https://github.com/Sebastianidm/linkveo-fullstack.git)
    cd linkveo-fullstack
    ```

2.  **Levantar los servicios:**
    ```bash
    docker-compose up --build
    ```

3.  **Acceso:**
    * **App (Frontend):** `http://localhost:5173`
    * **Auth Service API:** `http://localhost:8000/docs`
    * **Link Service API:** `http://localhost:8001/docs`

---

**Nota:** Recuerda que si es la primera vez que lo instalas, debes registrarte en la pantalla de `/register` para crear tu usuario en la base de datos local.
