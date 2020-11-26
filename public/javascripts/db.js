import * as postgres from "pg";

const db_config = require('../../config.json')

const pool = new postgres.Pool({
    user: db_config.user,
    host: db_config.host,
    database: db_config.database,
    password: db_config.password,
    port: db_config.port
})

const dbQuery = async (text, params) => {
    try {
        const client = await pool.connect()
        let res = null
        try {
            await client.query('BEGIN')
            res = await client.query(text, params)
            await client.query('COMMIT')
        } catch (e) {
            await client.query('ROLLBACK')
            console.log('Query error')
        } finally {
            client.release();
            return res['rows'];
        }
    } catch (e) {
        console.log(e.stack)
        return null;
    }
}

export { dbQuery, pool }