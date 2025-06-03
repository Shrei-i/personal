# syntax=docker/dockerfile:1
FROM python:3.12-slim

# 1) установка зависимостей
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 2) копируем сам проект
COPY . .

# 3) открываем порт, на котором будет висеть Uvicorn
EXPOSE 8000

# 4) запускаем FastAPI-приложение
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
