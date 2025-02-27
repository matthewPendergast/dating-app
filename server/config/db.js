import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});

const setupDatabase = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                first_name VARCHAR(50),
                last_name VARCHAR(50),
                dob DATE,
                gender VARCHAR(10),
                password TEXT NOT NULL
            )
        `);
    } catch (err) {
        console.error("Database setup error:", err);
    }
};

setupDatabase();

export { pool };
