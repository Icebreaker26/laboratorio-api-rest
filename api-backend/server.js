const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 5000;

// Reto adicional: conexión a PostgreSQL real en lugar de memoria RAM
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/laboratorio_api',
});

app.use(express.json()); // Habilita la lectura de JSON en el cuerpo (body) de las peticiones

// Habilita CORS para que el frontend (puerto 8082) pueda consumir esta API (puerto 5000)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  next();
});

// Log de cada petición entrante (método + ruta) en la consola de Docker Compose
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// [GET] Obtener la lista completa de tareas
app.get('/api/tareas', async (req, res) => {
  const { rows } = await pool.query('SELECT id, texto FROM tareas ORDER BY id');
  res.json(rows);
});

// [POST] Crear una nueva tarea
app.post('/api/tareas', async (req, res) => {
  const { rows } = await pool.query(
    'INSERT INTO tareas (texto) VALUES ($1) RETURNING id, texto',
    [req.body.texto]
  );
  res.status(201).json(rows[0]);
});

// [DELETE] Vaciar la lista completa de tareas (Reto Calificable)
app.delete('/api/tareas/limpiar', async (req, res) => {
  await pool.query('TRUNCATE TABLE tareas RESTART IDENTITY');
  res.json({ mensaje: "Lista de tareas vaciada correctamente" });
});

// [DELETE] Eliminar una tarea específica mediante su ID en la URL
app.delete('/api/tareas/:id', async (req, res) => {
  const idEliminar = parseInt(req.params.id);
  await pool.query('DELETE FROM tareas WHERE id = $1', [idEliminar]);
  res.json({ mensaje: "Tarea eliminada correctamente" });
});

app.listen(PORT, () => console.log(`API REST corriendo en el puerto ${PORT}`));
