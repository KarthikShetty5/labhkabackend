import dbConnection from "../config/dbConnection";
import dotenv from 'dotenv';
import { createCartTable } from './CartModel.model'; // Adjust the path as needed
import { createUserTable } from './UserModel.model'; // Adjust the path as needed
import { createOrderTable } from './OrderModel.model'; // Adjust the path as needed
import { createProductTable } from './ProductModal.model'; // Adjust the path as needed

dotenv.config();

const dbName = process.env.NAME;

const createDataBase = () => {
    dbConnection.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            return;
        }
        console.log('Connected to MySQL database');

        // Check if the database already exists
        dbConnection.query(`SHOW DATABASES LIKE '${dbName}'`, (err, result) => {
            if (err) {
                console.error('Error checking database existence:', err);
                return;
            }

            if (result.length === 0) {
                // Database doesn't exist, create it
                dbConnection.query(`CREATE DATABASE ${dbName}`, (err) => {
                    if (err) {
                        console.error('Error creating database:', err);
                        return;
                    }
                    console.log('Database created');

                    // Use the newly created database and initialize tables
                    useDatabaseAndInitialize();
                });
            } else {
                console.log('Database already exists');

                // Use the existing database and initialize tables
                useDatabaseAndInitialize();
            }
        });
    });
}

const useDatabaseAndInitialize = () => {
    dbConnection.query(`USE ${dbName}`, (err) => {
        if (err) {
            console.error(`Error selecting database: ${dbName}`, err);
            return;
        }
        console.log(`Using database: ${dbName}`);

        // Call the functions to create tables
        createCartTable();
        createUserTable();
        createOrderTable();
        createProductTable();
    });
}

export { createDataBase }
