import express from "express";
import cors from "cors";
import dbPool from "./config/dbConnection"; // Assuming dbPool is your connection pool
import authRouter from "./routes/auth.route";
import cartRouter from "./routes/cart.route";
import productRouter from "./routes/product.route";
import paytmRouter from "./routes/payment.route";
import orderRouter from "./routes/order.route";
import { createCartTable } from "./model/CartModel.model";
import { createUserTable } from "./model/UserModel.model";
import { createProductTable } from "./model/ProductModal.model";
import { createDataBase } from "./model/DBModel.model";
import { createOrderTable } from "./model/OrderModel.model";
import multer from "multer";

const app = express();

// Define storage for the uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Rename uploaded files with a timestamp prefix
  }
});

// Create multer instance with the storage configuration
const upload = multer({ storage: storage });

// const upload = multer({ storage: multer.memoryStorage ()})

// Use middleware
app.use(express.json({ limit: '50mb' })); // Set maximum JSON request size
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: 'GET, POST, PUT, DELETE',
  credentials: true
}));

// Define routes
app.use("/auth", authRouter);
app.use("/cart", upload.single('image'), cartRouter);
app.use("/product", upload.single('image'), productRouter);
app.use("/paytm", paytmRouter);
app.use("/order", orderRouter);

// Route for getting paytm key
app.get("/paytm/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID })
);

// Call database initialization functions
createDataBase();
// createCartTable();
// createUserTable();
// createOrderTable();
// createProductTable();

// Start the server
const PORT: string = process.env.PORT || "4000";
app.listen(PORT, () =>
  console.log("Server started running at the PORT:", PORT)
);
