# 1. Imagen base
FROM python:3.10-slim

# 2. Directorio de trabajo
WORKDIR /app

# 3. Copiar requisitos
COPY requirements.txt .

# 4. Instalar dependencias
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copiar código
COPY . .

# 6. Exponer el puerto 8001
EXPOSE 8001

# 7. Comando de inicio (Puerto 8001)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]