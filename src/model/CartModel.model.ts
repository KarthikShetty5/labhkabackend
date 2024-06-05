import dbConnection from "../config/dbConnection";

const createCartTable = () => {
    const dbName = process.env.NAME;

    // First, select the database
    dbConnection.query(`USE ${dbName}`, (err) => {
        if (err) {
            console.error(`Error selecting database: ${dbName}`, err);
            return;
        }

        // Once the database is selected, proceed with the table creation
        const checkTableQuery = "SHOW TABLES LIKE 'Cart'";
        dbConnection.query(checkTableQuery, (err, result) => {
            if (err) throw err;
            if (result.length === 0) {
                const createCartTableQuery = `
                    CREATE TABLE Cart (
                        id INT,
                        userId VARCHAR(255),
                        title VARCHAR(255),
                        image LONGBLOB,
                        price DECIMAL(10, 2),
                        count INT,
                        referralId VARCHAR(255) NULL,
                        gst VARCHAR(255),
                        shipCost VARCHAR(255)
                    )
                `;
                dbConnection.query(createCartTableQuery, (err) => {
                    if (err) throw err;
                    console.log('Cart table created');
                });
            } else {
                console.log('Cart table already exists');
            }
        });
    });
};

export { createCartTable };
