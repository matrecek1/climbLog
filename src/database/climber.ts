import mysql from "mysql2";
const pool = mysql
    .createPool({
        host: "127.0.0.1",
        user: "matej_cizek",
        password: "brankari",
        database: "taskapp",
    })
    .promise();

export async function createClimber(climber){
    const newClimber = await pool.query(
        `
    INSERT INTO Climber(first_name, last_name)
    VALUES (?,?)`,
        [climber.firstName, climber.lastName]
    );
    pool.end();
    return newClimber;
}

export async function getClimbers(){
    const [rows] = await pool.query(`SELECT * FROM Climber;`)
    pool.end()
    return rows
}
export async function getClimber(id){
    const [row] = await pool.query(`
    SELECT *
    FROM Climber
    WHERE climber_id = ?
    ;`, [id]);
    pool.end()
    return row
}