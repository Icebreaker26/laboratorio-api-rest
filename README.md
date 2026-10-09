# Laboratorio #3 Cloud Computing — Construcción y Consumo de APIs REST

Sistema de tareas (To-Do List) con backend Express (API REST en memoria) y frontend
HTML/JS consumiéndola con `fetch()`, orquestados con Docker Compose.

## Estructura

```
laboratorio-api-rest/
  api-backend/     Express — API REST (GET, POST, DELETE) en memoria
  app-frontend/     Nginx — HTML + JS que consume la API
  docker-compose.yml
```

## Despliegue

```bash
docker compose up --build
```

- Frontend: http://localhost:8082
- Backend:  http://localhost:5000/api/tareas

## Endpoints

| Método | Ruta                    | Descripción                          |
|--------|-------------------------|---------------------------------------|
| GET    | /api/tareas             | Lista las tareas                      |
| POST   | /api/tareas             | Crea una tarea                        |
| DELETE | /api/tareas/limpiar     | Vacía toda la lista (Reto Calificable) |
| DELETE | /api/tareas/:id         | Elimina una tarea puntual             |

## Reto Calificable

Se agregó el botón **"Vaciar Lista de Tareas"** en el frontend, que llama al endpoint
`DELETE /api/tareas/limpiar`, el cual reinicia el arreglo `tareas` en el backend
(`tareas = []`).

## Reto adicional (no implementado)

Conectar el backend a una base de datos real (PostgreSQL/MongoDB) en lugar de memoria
— queda pendiente como mejora opcional.
