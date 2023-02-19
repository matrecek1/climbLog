import mysql from "mysql2";
const pool = mysql
    .createPool({
        host: "127.0.0.1",
        user: "matej_cizek",
        password: "brankari",
        database: "taskapp",
    })
    .promise();

interface ClimbLogInput{
    climberId:number;
    boulderId:number;
    proposedGrade:string;
}
export const createClimbLog = async(log:ClimbLogInput) =>{
    const newLog = await pool.query(
        `
    INSERT INTO Climb_log(climber_id, boulder_id, proposed_grade)
    VALUES (?,?,?)`,
        [log.climberId, log.boulderId, log.proposedGrade]
    );
    return newLog;
}

export const getClimbLogs = async() =>{
    const [rows] = await pool.query(`
    SELECT * FROM Climb_log
    ;`)
    return rows
}

export const getClimbLog = async(id:number) =>{
    const [row] = await pool.query(`
    SELECT *
    FROM Climb_log
    WHERE climb_id = ?
    ;`, [id])
    return row
}