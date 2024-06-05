import dbConnection from "../config/dbConnection";

const createOrderTable = () => {
    const dbName = process.env.NAME;
    dbConnection.query(`USE ${dbName}`, (err) => {
        if (err) {
            console.error(`Error selecting database: ${dbName}`, err);
            return;
        }

        // Once the database is selected, proceed with the table creation
        const checkTableQuery = "SHOW TABLES LIKE 'Orders'";
        dbConnection.query(checkTableQuery, (err, result) => {
            if (err) throw err;
            if (result.length === 0) {
                const createOrderTableQuery = `
                    CREATE TABLE Orders (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        orderId VARCHAR(255),
                        email VARCHAR(255),
                        name VARCHAR(255),
                        phone VARCHAR(255),
                        amount INT NOT NULL,
                        amountPaid BOOLEAN,
                        userId VARCHAR(255),
                        paymentMethod VARCHAR(255),
                        itemCount INT,
                        shippingAddress VARCHAR(255)
                    )
                `;
                dbConnection.query(createOrderTableQuery, (err) => {
                    if (err) throw err;
                    console.log('Orders table created');
                });
            } else {
                console.log('Orders table already exists');
            }
        });
    });
};

export { createOrderTable };
