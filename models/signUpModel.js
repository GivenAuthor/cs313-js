require('dotenv').config();
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString: connectionString,
    ssl: true
});

/*******************************
need to add user_id insertions
********************************/

function registerUser(req, result) {
    console.log('registering user');
    console.log(req.body.email);
    console.log(req.body.username);
    console.log(req.body.password);

    pool.connect();
    let sql = `SELECT email FROM user WHERE email = '${body.email}';`;
    pool.query(sql, (err, res) => {
        if (err) {
            console.log("Query Error");
            result.status(400).json({ message: `Error: ${err}`, data: null });
        }
        for (row in res.rows) {
            if (row.username == name)
                result.status(400).json({ message: `Error: email exists`, data: null });
        }
    });

    let sql = `SELECT username FROM user WHERE username = '${body.username}';`;
    pool.query(sql, (err, res) => {
        if (err) {
            console.log("Query Error");
            result.status(400).json({ message: `Error: ${err}`, data: null });
        }
        for (row in res.rows) {
            if (row.username == name)
                result.status(400).json({ message: `Error: username exists`, data: null });
        }
    });

    let insertPassword = `INSERT INTO user_password (password_contents) VALUES ('${req.body.password}');`;
    pool.query(insertPassword, (err, res) => {
        if (err) {
            console.log('Password insertion error');
            result.status(400).json({ message: `Error: ${err}`, data: null });
        }
        console.log('Inserted password into db');
    });

    let insert = `INSERT INTO user (username, email) VALUES ('${req.body.username}', '${req.body.email}');`;
    pool.query(insert, (err, res) => {
        if (err) {
            console.log('Username insertion error');
            result.status(400).json({ message: `Error: ${err}`, data: null });
        }
        console.log('Inserted username and email into db');
    });
    result.status(200).json({ message: 'Success' });
}

module.exports = {
    registerUser: registerUser
}