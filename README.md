#  Linkveo - Full Stack Resource Monitor

> Plataforma SaaS de gestión y monitoreo de recursos digitales, construida sobre una arquitectura de microservicios moderna y contenerizada.

![Linkveo Dashboard](./linveo-app/public/screenshot.png)


##  Descripción del Proyecto

**Linkveo** no es un monolito tradicional. Es un sistema distribuido diseñado para la escalabilidad y el mantenimiento eficiente. El objetivo principal es permitir a los usuarios organizar recursos web y, crucialmente, **visualizar el estado de salud (health check)** de los mismos mediante una interfaz reactiva e intuitiva.

El proyecto simula la **observabilidad de sistemas**, permitiendo detectar visualmente si un recurso está `Operativo`, presenta `Latencia Alta` o está `Caído`, similar a los paneles de control industrial o de infraestructura TI.

##  Arquitectura & Stack Tecnológico

El sistema está desacoplado en servicios independientes orquestados mediante Docker:

###  Frontend (Client-Side)
La interfaz de usuario se centra en el rendimiento y la experiencia de monitoreo.
* **Core:** React + Vite (SPA de alto rendimiento).
* **UI/UX:** Tailwind CSS con diseño Glassmorphism y Lucide React para iconografía consistente.
* **Features Clave:**
    * **Sentinel Badge Component:** Sistema visual de monitoreo de latencia y estado.
    * **Consumo API:** Axios con interceptores para manejo de JWT.
    * **Gestión de Estado:** React Context API + Custom Hooks.

###  Backend (Microservicios)
Dividido por dominios para asegurar la separación de responsabilidades:
* **Auth Service:** (Python/FastAPI) Maneja exclusivamente autenticación, hashing (Argon2) y emisión de JWT.
* **Link Core Service:** (Python/FastAPI) Gestiona el ciclo de vida de los recursos y realiza **Web Scraping** (BeautifulSoup4) para enriquecer los metadatos automáticamente.
* **Base de Datos:** PostgreSQL (Relacional) con SQLAlchemy ORM.

###  Infraestructura (DevOps)
* **Docker:** Contenerización individual de cada servicio y la base de datos.
* **Docker Compose:** Orquestación de la red interna, volúmenes y variables de entorno.

---

##  Instalación y Despliegue Rápido

Gracias a la contenerización, no necesitas instalar Python ni Node.js localmente. Solo necesitas **Docker Desktop**.

### 1. Clonar el repositorio
```bash
git clone [https://github.com/Sebastianidm/linkveo-fullstack.git](https://github.com/Sebastianidm/linkveo-fullstack.git)
cd linkveo-fullstack
