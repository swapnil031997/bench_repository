const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(bodyParser.json());


app.use(express.static('public'));

const db = mysql.createConnection({
	   host: 'database-1.cfsmwq2suar8.ap-south-1.rds.amazonaws.com',
	   user: 'admin',
	   password: 'Swapnil031997',
	   database: 'bench_portal_db'
});

db.connect((err) => {
	    if (err) throw err;
	    console.log('MySQL Connected...');
});


app.post('/register', (req, res) => {
	    const { username, password, role, email } = req.body;
	    const hashedPassword = bcrypt.hashSync(password, 8);

	    const sql = `INSERT INTO users (username, password, role, email) VALUES (?, ?, ?, ?)`;
	    db.query(sql, [username, hashedPassword, role, email], (err, result) => {
		            if (err) return res.status(500).send({ message: 'Error on the server.' });
		            res.status(201).send({ message: 'User registered successfully!' });
		        });
});


app.post('/login', (req, res) => {
	    const { username, password } = req.body;

	    const sql = `SELECT * FROM users WHERE username = ?`;
	    db.query(sql, [username], (err, results) => {
		            if (err) return res.status(500).send({ message: 'Error on the server.' });
		            if (results.length === 0) return res.status(404).send({ message: 'No user found.' });

		            const user = results[0];
		            const passwordIsValid = bcrypt.compareSync(password, user.password);
		            if (!passwordIsValid) return res.status(401).send({ message: 'Password is incorrect.' });

		            const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: 86400 }); // 24 hours
		            res.status(200).send({ auth: true, token });
		        });
});


app.get('/bench_resources', (req, res) => {
	    const sql = `SELECT * FROM bench_resources`;
	    db.query(sql, (err, results) => {
		            if (err) return res.status(500).send({ message: 'Error on the server.' });
		            res.status(200).send(results);
		        });
});


app.post('/bench_resources', (req, res) => {
	    const { category, first_name, last_name } = req.body;

	    const sql = `INSERT INTO bench_resources (category, first_name, last_name) VALUES (?, ?, ?)`;
	    db.query(sql, [category, first_name, last_name], (err, result) => {
		            if (err) return res.status(500).send({ message: 'Error on the server.' });
		            res.status(201).send({ message: 'Bench resource added successfully!' });
		        });
});


app.put('/bench_resources/:id/book', (req, res) => {
	    const { id } = req.params;
	    const { booked_by, booked_company } = req.body;

	    const sql = `UPDATE bench_resources SET booked_by = ?, booked_company = ? WHERE id = ?`;
	    db.query(sql, [booked_by, booked_company, id], (err, result) => {
		            if (err) return res.status(500).send({ message: 'Error on the server.' });
		            res.status(200).send({ message: 'Bench resource booked successfully!' });
		        });
});


app.put('/bench_resources/:id/release', (req, res) => {
	    const { id } = req.params;

	    const sql = `UPDATE bench_resources SET booked_by = NULL, booked_company = NULL WHERE id = ?`;
	    db.query(sql, [id], (err, result) => {
		            if (err) return res.status(500).send({ message: 'Error on the server.' });
		            res.status(200).send({ message: 'Bench resource released successfully!' });
		        });
});

app.listen(port, () => {
	    console.log(`Server running on port ${port}`);
});

