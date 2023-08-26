const { Pool } = require('pg');
const axios = require('axios');

// Configuración de la conexión a la base de datos
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'banco_api',
    password: 'lending',
    port: 5432,
});

// Función para obtener tasas de cambio desde la API externa
async function getExchangeRates(baseCurrency, finalCurrency, amount) {
    console.log(baseCurrency);
    console.log(finalCurrency);
    console.log(amount);

    const apiKey = 'dHUbEA8j1Shxe6KgOYIUQFEnzVeV27gd';
    const apiUrl = `https://api.apilayer.com/fixer/convert?to=${finalCurrency}&from=${baseCurrency}&amount=${amount}`;

    const config = {
        headers: {
            'apikey': apiKey
        }
    };

    try {
        const response = await axios.get(apiUrl, config);
        return response.data.result;
    } catch (error) {
        console.error('Error al obtener las tasas de cambio:', error);
        throw error;
    }
}

const getTransacciones = async (req, res) => {
    const { from, to, sourceAccountID } = req.query;

    try {
        let query = 'SELECT * FROM transacciones WHERE 1 = 1'; // Consulta base con condición siempre verdadera

        if (from) {
            query += ` AND fecha_hora >= '${from}'`;
        }
        if (to) {
            query += ` AND fecha_hora <= '${to}'`;
        }
        if (sourceAccountID) {
            query += ` AND cuenta_origen_id = ${sourceAccountID}`;
        }

        const transactions = await pool.query(query);
        res.json(transactions.rows);
    } catch (error) {
        console.error('Error al obtener transacciones:', error);
        res.status(500).send('Error interno del servidor');
    }
};

const crearTransfer = async (req, res) => {
    const { accountFrom, accountTo, amount, date, description } = req.body;

    try {
        // Obtener la moneda de la cuenta de origen desde la base de datos
        const queryAccountFrom = await pool.query('SELECT divisas.codigo as codigo, cuentas.usuario_id as usuario FROM cuentas LEFT JOIN divisas ON cuentas.divisa_id = divisas.divisa_id WHERE cuenta_id = $1', [accountFrom]);
        const accountFromCurrency = queryAccountFrom.rows[0].codigo;
        const usuarioAccountFrom = queryAccountFrom.rows[0].usuario;

        // Obtener la moneda de la cuenta de destino desde la base de datos
        const queryAccountTo = await pool.query('SELECT divisas.codigo as codigo, cuentas.usuario_id as usuario FROM cuentas LEFT JOIN divisas ON cuentas.divisa_id = divisas.divisa_id WHERE cuenta_id = $1', [accountTo]);
        const accountToCurrency = queryAccountTo.rows[0].codigo;
        const usuarioAccountTo = queryAccountTo.rows[0].usuario;

        // Calcular monto y conversión de divisas si es necesario
        let convertedAmount = amount; // Por defecto, sin conversión
        console.log(usuarioAccountFrom);
        console.log(usuarioAccountTo);

        if (accountFromCurrency !== accountToCurrency) {
            // Obtén las tasas de cambio desde la API (usando la moneda de la cuenta de origen)
            const exchangeRates = await getExchangeRates(accountFromCurrency, accountToCurrency, amount);
            console.log(exchangeRates);
            finalAmount = exchangeRates;
        }else{
            finalAmount = convertedAmount
        }

        // Calcular comisión y monto final
        // Si la cuenta de origen es diferente seria un tercero y aplica la comision 
        const isThirdPartyTransfer = usuarioAccountTo != usuarioAccountFrom;

        if (isThirdPartyTransfer) {
            const commission = amount * 0.01;
            console.log(commission, "comision");

            // Aplicar comisión a la cuenta origen
            await pool.query(
                'UPDATE cuentas SET capital = capital - $1 WHERE cuenta_id = $2',
                [commission, accountFrom]
            );
        }

        // Realizar la transferencia y actualizar saldos de cuentas
        const client = await pool.connect();
        try {
            await client.query('BEGIN'); // Iniciar transacción

            // Actualizar saldo de la cuenta origen
            await client.query(
                'UPDATE cuentas SET capital = capital - $1 WHERE cuenta_id = $2',
                [convertedAmount, accountFrom]
            );

            // Actualizar saldo de la cuenta destino
            await client.query(
                'UPDATE cuentas SET capital = capital + $1 WHERE cuenta_id = $2',
                [finalAmount, accountTo]
            );

            // Insertar la transacción en la tabla de transacciones
            const newTransfer = await client.query(
                'INSERT INTO transacciones (cuenta_origen_id, cuenta_destino_id, monto, fecha_hora, descripcion) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [accountFrom, accountTo, finalAmount, date, description]
            );

            await client.query('COMMIT'); // Confirmar transacción
            res.json(newTransfer.rows[0]);
        } catch (error) {
            await client.query('ROLLBACK'); // Deshacer cambios en caso de error
            console.error('Error al crear transferencia:', error);
            res.status(500).send('Error interno del servidor');
        } finally {
            client.release(); // Liberar el cliente de la base de datos
        }
    } catch (error) {
        console.error('Error al obtener tasas de cambio:', error);
        res.status(500).send('Error interno del servidor');
    }
};

module.exports = {
    getTransacciones,
    crearTransfer
}