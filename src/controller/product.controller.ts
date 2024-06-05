import { RequestHandler } from "express";
import dbConnection from "../config/dbConnection";
import path from "path";
import fs from 'fs';



const addProduct: RequestHandler = async (req, res) => {
    const { title, ratings, image, price, description, tag, gst, shipCost } = req.body;
    // console.log("image beg", image.path)
    console.log(req.body)
    // const images = req.file?.buffer.toString('base64'); // Assuming you're using multer to handle file uploads
    try {

        if (!image) {
            return res.status(400).json({ success: false, message: "Image is required" });
        }

        const images = fs.readFileSync('src/uploads/' + image.path);

        // Convert image to a buffer
        const imageData = Buffer.from(images);
        console.log("image in buff", imageData)

        const query = `INSERT INTO product (title, image, ratings, price, description, tag, path, gst, shipCost) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const product = await dbConnection.query(query, [title, imageData, ratings, price, description, tag, image.path, gst, shipCost]);
        console.log(product)
        if (product) {
            const responseData = {
                message: "success",
                status: 200,
                product: {
                    title,
                    image,
                    ratings,
                    price,
                    tag,
                    description,
                },
            };
            console.log(responseData);
            res.status(200).json({
                success: true,
                data: responseData,
                message: "Item added to cart successfully",
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Failed to add item to cart",
            });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

const getProduct: RequestHandler = async (req, res) => {
    try {
        // Perform the database query
        const query = `SELECT * FROM product`;
        dbConnection.query(query, (error, result) => {
            if (error) {
                res.status(500).send("Unable to fetch product");
                console.log(error);
                return;
            }
            res.status(200).json({
                success: true,
                data: result,
            });
        })

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal server error");
    }
}

const getProductID: RequestHandler = async (req, res) => {
    const { id } = req.body;
    try {
        const query = `SELECT * FROM product WHERE id ='${id}'`;
        dbConnection.query(query, (error, result) => {
            if (error) {
                res.status(500).send("Unable to fetch product");
                console.log(error);
                return;
            }
            res.status(200).json({
                success: true,
                data: result,
            });
        })

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal server error");
    }
}

const getProductCat: RequestHandler = async (req, res) => {
    const { category } = req.body;
    try {
        const query = `SELECT * FROM product WHERE category ='${category}'`;
        dbConnection.query(query, (error, result) => {
            if (error) {
                res.status(500).send("Unable to fetch product");
                console.log(error);
                return;
            }
            res.status(200).json({
                success: true,
                data: result,
            });
        })

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal server error");
    }
}


export { addProduct, getProduct, getProductID, getProductCat };