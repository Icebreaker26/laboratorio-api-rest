CREATE TABLE IF NOT EXISTS tareas (
  id SERIAL PRIMARY KEY,
  texto TEXT NOT NULL
);

INSERT INTO tareas (texto) VALUES
  ('Aprender conceptos básicos de Docker'),
  ('Desplegar mi primer arquitectura de Microservicios');
