# Laboratorio #3 Cloud Computing — Construcción y Consumo de APIs REST

Sistema de tareas (To-Do List) con backend Express (API REST contra PostgreSQL) y
frontend HTML/JS consumiéndola con `fetch()`, orquestados con Docker Compose.

## Estructura

```
laboratorio-api-rest/
  api-backend/      Express + pg — API REST (GET, POST, DELETE) contra PostgreSQL
  app-frontend/      Nginx — HTML + JS que consume la API
  docker-compose.yml
```

## Despliegue

```bash
docker compose up --build
```

- Frontend: http://localhost:8082
- Backend:  http://localhost:5000/api/tareas
- Postgres: localhost:5432 (usuario `postgres`, password `postgres`, db `laboratorio_api`)

El schema (`api-backend/schema.sql`) se carga automáticamente la primera vez que se
crea el volumen de la base de datos, con las dos tareas iniciales.

## Endpoints

| Método | Ruta                    | Descripción                          |
|--------|-------------------------|---------------------------------------|
| GET    | /api/tareas             | Lista las tareas                      |
| POST   | /api/tareas             | Crea una tarea                        |
| DELETE | /api/tareas/limpiar     | Vacía toda la lista (Reto Calificable) |
| DELETE | /api/tareas/:id         | Elimina una tarea puntual             |

## Reto Calificable

Se agregó el botón **"Vaciar Lista de Tareas"** en el frontend, que llama al endpoint
`DELETE /api/tareas/limpiar`, el cual vacía la tabla `tareas` en PostgreSQL
(`TRUNCATE TABLE tareas RESTART IDENTITY`).

## Reto adicional — Base de datos real (implementado)

El backend se conecta a **PostgreSQL** (en lugar de un arreglo en memoria) usando el
driver `pg`. Se agregó un servicio `db` en `docker-compose.yml` con un volumen
persistente (`db_data`), y el backend espera a que la base de datos esté `healthy`
antes de arrancar (`depends_on: condition: service_healthy`).

Esto se verificó reiniciando únicamente el contenedor del backend
(`docker compose restart mi-api-backend`) y comprobando que las tareas creadas
seguían presentes — es decir, el estado ya no vive en la RAM del proceso de Node,
sino en la base de datos.
