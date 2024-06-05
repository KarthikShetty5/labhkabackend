import dbConnection from "../config/dbConnection";

const createProductTable = () => {
    const dbName = process.env.NAME;
    dbConnection.query(`USE ${dbName}`, (err) => {
        if (err) {
            console.error(`Error selecting database: ${dbName}`, err);
            return;
        }

        // Once the database is selected, proceed with the table creation
        const checkTableQuery = "SHOW TABLES LIKE 'Product'";
        dbConnection.query(checkTableQuery, (err, result) => {
            if (err) throw err;
            if (result.length === 0) {
                const createProductTableQuery = `
                    CREATE TABLE Product (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        title VARCHAR(255),
                        description TEXT,
                        category VARCHAR(255),
                        image LONGBLOB,
                        price DECIMAL(10, 2),
                        ratings FLOAT,
                        tag VARCHAR(255),
                        path VARCHAR(255),
                        gst VARCHAR(255),
                        shipCost VARCHAR(255)
                    )
                `;
                dbConnection.query(createProductTableQuery, (err) => {
                    if (err) throw err;
                    console.log('Product table created');
                });
            } else {
                console.log('Product table already exists');
            }
        });
    });
};

export { createProductTable };
