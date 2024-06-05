import { RequestHandler } from "express";
import dbConnection from "../config/dbConnection";

const addOrder: RequestHandler = async (req, res) => {
    const { orderId, email, name, phone, amount, amountPaid, userId, paymentMethod, itemCount, shippingAddress } = req.body;
    const query = `INSERT INTO orders (orderId, email, name, phone, amount, amountPaid, userId, paymentMethod, itemCount, shippingAddress) VALUES ('${orderId}', '${email}','${name}','${phone}', '${amount}', '${amountPaid}', '${userId}', '${paymentMethod}', '${itemCount}', '${shippingAddress}')`;

    dbConnection.query(query, (error, result) => {
        if (error) {
            return res.status(500).json({
                success: false,
                message: "Error adding Order to db",
                error: error
            });
        }
        return res.status(200).json({
            success: true,
            message: "Order added successfully",
            data: result
        });
    });
}


const fetchOrder: RequestHandler = async (req, res) => {
    const { order_id } = req.body;
    const query = `SELECT * FROM orders WHERE orderId = '${order_id}'`;

    dbConnection.query(query, (error, result) => {
        if (error) {
            return res.status(500).json({
                success: false,
                message: "Error fetching order",
                error: error
            });
        }
        return res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            data: result
        });
    });
}


const fetchID: RequestHandler = async (req, res) => {
    const { userId } = req.body;
    const query = `SELECT * FROM orders WHERE userId = '${userId}'`;

    dbConnection.query(query, (error, result) => {
        if (error) {
            return res.status(500).json({
                success: false,
                message: "Error fetching order",
                error: error
            });
        }
        return res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            data: result
        });
    });
}


export { addOrder, fetchOrder, fetchID }