import mysql from "mysql2";
const pool = mysql
    .createPool({
        host: "127.0.0.1",
        user: "matej_cizek",
        password: "brankari",
        database: "taskapp",
    })
    .promise();

export async function getBoulders() {
    const [rows] = await pool.query("SELECT * FROM Boulder");
    pool.end()
    return rows;
}

export async function getBoulder(id) {
    const [rows] = await pool.query(
        `
    SELECT *
    FROM Boulder
    WHERE boulder_id = ?`,
        [id]
    );
    pool.end()
    return rows;
}

export async function createBoulder(boulder) {
    const newBoulder = await pool.query(
        `
    INSERT INTO Boulder(boulder_name, boulder_grade, boulder_description)
    VALUES (?,?,?)`,
        [boulder.name, boulder.grade, boulder.description]
    );
    pool.end()
    return newBoulder;
}
