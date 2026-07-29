<<<<<<< HEAD
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
const db=mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    waitForConnections:true,
    connectionLimit:10
});
db.getConnection()
    .then(()=>{
        console.log("Database terhubung");
    })
    .catch((error)=>{
        console.log(error.message);
    });

=======
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
const db=mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    waitForConnections:true,
    connectionLimit:10
});
db.getConnection()
    .then(()=>{
        console.log("Database terhubung");
    })
    .catch((error)=>{
        console.log(error.message);
    });

>>>>>>> bc0502961ea35b227441628e7da2cfa662999b71
export default db;