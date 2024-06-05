import dbConnection from "../config/dbConnection";

const createUserTable = () => {
    const dbName = process.env.NAME;
    dbConnection.query(`USE ${dbName}`, (err) => {
        if (err) {
            console.error(`Error selecting database: ${dbName}`, err);
            return;
        }

        // Once the database is selected, proceed with the table creation
        const checkTableQuery = "SHOW TABLES LIKE 'User'";
        dbConnection.query(checkTableQuery, (err, result) => {
            if (err) throw err;
            if (result.length === 0) {
                const createUserTableQuery = `
                    CREATE TABLE User (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        userId VARCHAR(255),
                        username VARCHAR(50) NOT NULL,
                        email VARCHAR(100) NOT NULL,
                        phone VARCHAR(15),
                        password VARCHAR(255) NOT NULL
                    )
                `;
                dbConnection.query(createUserTableQuery, (err) => {
                    if (err) throw err;
                    console.log('User table created');
                });
            } else {
                console.log('User table already exists');
            }
        });
    });
};

export { createUserTable };
