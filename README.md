# banco_api

Hola! Soy Laura, Welcome :)

# Proyecto de Sistema de Transferencias Bancarias

Bienvenido al repositorio del proyecto de Sistema de Transferencias Bancarias. Este proyecto es una aplicación de ejemplo que simula un sistema para realizar transferencias bancarias entre cuentas de distintas divisas. El sistema está desarrollado utilizando Node.js, Express y PostgreSQL.

## Características

- Permite a los usuarios crear cuentas en diferentes divisas.
- Permite realizar transferencias entre cuentas, con conversión de divisas si es necesario.
- Aplica una comisión del 1% en transferencias a terceros.

## Tecnologías Utilizadas

- Node.js: Plataforma de ejecución de JavaScript.
- Express: Marco de aplicación web para Node.js.
- PostgreSQL: Sistema de gestión de bases de datos relacional.
- Axios: Biblioteca para realizar solicitudes HTTP.
- ...

## Instrucciones de Uso

1. Clona este repositorio: `git clone https://github.com/tu-usuario/tu-repositorio.git`
2. Instala las dependencias: `npm install`
3. Crea una base de datos PostgreSQL y configura las credenciales.
5. Inicia el servidor: `npm run dev`, Deje el nodemon en los Dev Tools para facilidad.
6. Accede a la aplicación desde tu navegador: `http://localhost:4000`

## API Endpoints

- `GET /transactions`: Obtiene las transacciones del usuario logueado, con opciones de filtrado por fechas y cuenta origen.
- `POST /transfer`: Realiza una transferencia entre cuentas.

## Mejoras

- Mejorar los eventos asincronos para utilizar promesas junto con un mejor manejo en validaciones y manejo de errores.
- Autenticacion de usuarios.
- Historial de transacciones.
- Agregar Frontend interactivo, junto con Notificaciones y alertas.
- Optimizar el rendimiento junto con pruebas unitarias



## Postman test and Postgres DB
![Captura de Pantalla 2023-08-26 a la(s) 11 45 25 a m](https://github.com/laurasgm/banco_api/assets/32622393/3d062a1e-3d48-4a55-bf21-480827cf85fc)

## prueba con cuentas iniciales de 2000 y 500 en su valor, tomando comision y convirtiendo a moneda
<img width="376" alt="Captura de Pantalla 2023-08-26 a la(s) 1 30 01 p m" src="https://github.com/laurasgm/banco_api/assets/32622393/71a44178-b71b-442c-9715-1e43f08e134d">

![Captura de Pantalla 2023-08-26 a la(s) 1 30 13 p m](https://github.com/laurasgm/banco_api/assets/32622393/4976507d-719c-47e7-a4a9-b3245fc98601)

![Captura de Pantalla 2023-08-26 a la(s) 1 30 19 p m](https://github.com/laurasgm/banco_api/assets/32622393/001d4491-d323-4366-8ed9-3e6099207334)

<img width="639" alt="Captura de Pantalla 2023-08-26 a la(s) 1 29 47 p m" src="https://github.com/laurasgm/banco_api/assets/32622393/55976c7e-66a2-43a6-a65d-eb0203411d48">

## DB evidencia
<img width="1176" alt="Captura de Pantalla 2023-08-26 a la(s) 12 02 05 p m" src="https://github.com/laurasgm/banco_api/assets/32622393/b039d1b9-25e5-46e3-b11f-3f2ace715c24">
