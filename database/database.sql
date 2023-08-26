CREATE DATABASE banco_api

-- Crear tabla Usuarios
CREATE TABLE usuarios (
  usuario_id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  correo VARCHAR(100)
);

-- Crear tabla Divisas
CREATE TABLE divisas (
  divisa_id SERIAL PRIMARY KEY,
  nombre VARCHAR(50),
  codigo VARCHAR(5)
);

-- Crear tabla Cuentas
CREATE TABLE cuentas (
  cuenta_id SERIAL PRIMARY KEY,
  usuario_id INT REFERENCES usuarios(usuario_id),
  divisa_id INT REFERENCES divisas(divisa_id),
  capital DECIMAL(18, 2)
);

-- Crear tabla Transacciones
CREATE TABLE transacciones (
  transaccion_id SERIAL PRIMARY KEY,
  cuenta_origen_id INT REFERENCES cuentas(cuenta_id),
  cuenta_destino_id INT REFERENCES cuentas(cuenta_id),
  monto DECIMAL(18, 2),
  fecha_hora TIMESTAMP,
  descripcion TEXT
);


-- Datos de pruebas

INSERT INTO usuarios (nombre, correo) VALUES 
('laura', 'lauradev.tech@gmail.com')
('Usuario 1', 'usuario1@example.com'),
('Usuario 2', 'usuario2@example.com');

INSERT INTO divisas (nombre, codigo) VALUES
  ('Pesos Uruguayos', 'UYU'),
  ('Dólares Americanos', 'USD'),
  ('Euros', 'EUR');

INSERT INTO cuentas (usuario_id, divisa_id, capital)
VALUES
  (1, 1, 1000.00),
  (1, 2, 500.00),
  (2, 1, 1500.00),
  (2, 3, 2000.00);