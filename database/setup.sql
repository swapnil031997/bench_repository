-- Create database if not exists
CREATE DATABASE IF NOT EXISTS bench_portal_db;

-- Use the database
USE bench_portal_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
	    id INT AUTO_INCREMENT PRIMARY KEY,
	    username VARCHAR(100) UNIQUE NOT NULL,
	    password VARCHAR(100) NOT NULL,
	    role VARCHAR(50) NOT NULL,
	    email VARCHAR(50) NOT NULL
	);

	-- Create bench_resources table
CREATE TABLE IF NOT EXISTS bench_resources (
	    id INT AUTO_INCREMENT PRIMARY KEY,
	    category VARCHAR(100) NOT NULL,
	    first_name VARCHAR(100) NOT NULL,
	    last_name VARCHAR(100) NOT NULL,
	    booked_by VARCHAR(100),
	    booked_company VARCHAR(100)
	);

	-- Insert data into users table
INSERT INTO users (username, password, role, email) VALUES
    ('admin', 'password123', 'admin', 'admin@coreco.com'),
    ('coreco', 'password456', 'user', 'company@coreco.com'),
    ('infosys', 'password123', 'admin', 'company@infosys.com'),
    ('accenture', 'password456', 'user', 'company@accenture.com'),
    ('google', 'password456', 'user', 'company@google.com'),
    ('wipro', 'password789', 'moderator', 'company@wipro.com');

-- Insert data into bench_resources table
INSERT INTO bench_resources (category, first_name, last_name, booked_by, booked_company) VALUES
    ('Developer', 'John', 'Doe', NULL, NULL),
    ('Engineer', 'Ashok', 'Lamba', NULL, NULL),
    ('Designer', 'Anna', 'Smith', NULL, NULL),
    ('Tester', 'Mike', 'Johnson', NULL, NULL);

