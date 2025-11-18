# 1. Usamos la versión 22 (más moderna)
FROM node:22-alpine

# 2. Directorio de trabajo
WORKDIR /app

# 3. Copiamos dependencias
COPY package.json package-lock.json ./

# 4. Instalamos
RUN npm install

# 5. Copiamos el código
COPY . .

# 6. Puerto
EXPOSE 5173

# 7. Comando de inicio
CMD ["npm", "run", "dev", "--", "--host"]