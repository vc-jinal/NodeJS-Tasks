import mysql from "mysql";

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "userauthentication"
});

connection.connect((error) => {
    if (error) return console.log('error', error);
    console.log("connection successfully to DB");
});

export default connection;