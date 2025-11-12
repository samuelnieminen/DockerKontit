// A MODULE FOR ACCESSING POSTGRESQL DATABASES
// ===========================================

// EXTERNAL LIBARIES
// -----------------

// Library for handling .env variables
const dotenv =require ('dotenv');

// Class for creating PG-pool objects using PG library
const Pool = require('pg').Pool

// SETTINGS
// --------


// Initialize .env for use and save variables to be exported
dotenv.config()
const currentEnv = process.env;
console.log(currentEnv.RUN_ENV);

// Define variables to store database host address and port
let HOST = ''
let PORT = ''

// Read RUN_ENV to change between production and development
if (currentEnv.RUN_ENV == 'dev') {
    // Read development environment variables from .env
    HOST = process.env.POSTGRESQL_DEV_HOST; // localhost
    PORT = process.env.POSTGRESQL_USER_PORT; // 5434

} else {
    //Read production environment variables
    HOST = currentEnv.POSTGRESQL_PROD_HOST; // Container postgresql
    PORT = currentEnv.POSTGRESQL_CONTAINER_PORT; // Container port 5432
};

// Define independent variables for connection settings
const DATABASE = currentEnv.POSTGRESQL_DB;
const USER = currentEnv.POSTGRESQL_USER;
const PASSWORD = currentEnv.POSTGRESQL_USER_PASSWORD;

// Database connection settings
const connection = {
    host: HOST,
    port: PORT,
    database: DATABASE,
    user: USER,
    password: PASSWORD
};


// Create a new Pool object for queries
const pool = new Pool(connection);

// DATABASE OPERATIONS
// -------------------

// Get all rows from table kontti
const getContainerData = async () => {
    let query = 'SELECT * FROM public.kontit';
    let resultset = await pool.query(query);
    return resultset;
}
console.log(connection)
// getContainerData().then(resultset => console.log(resultset.rows));

// Export functions needed by the main app
module.exports = {currentEnv, connection, getContainerData}