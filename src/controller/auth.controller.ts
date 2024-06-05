import { RequestHandler } from "express";
import dbConnection from "../config/dbConnection";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userRegister: RequestHandler = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const userId = ((length, chars) => Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join(''))(5, '0123456789');

    // Check if the email already exists in the database
    const queryCheck = `SELECT * FROM user WHERE email = '${email}'`;
    dbConnection.query(queryCheck, async (error, result) => {
      if (result.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        const queryInsert = `INSERT INTO user (userId, username, email, phone, password) VALUES (?, ?, ?, ?, ?)`;
        await dbConnection.query(queryInsert, [userId, username, email, phone, hashedPassword]);

        // Create JWT token for session management, and user management
        const token = jwt.sign({ userId }, 'secret123', { expiresIn: '1h' });
        res.cookie('token', token, {
          httpOnly: true,
          expires: new Date(Date.now() + 3600000), // Expires in 1 hour
        });

        return res.status(200).json({
          success: true,
          message: "User created successfully",
          users: { userId: userId },
        });
      }
    })
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
};


const userRef: RequestHandler = async (req, res) => {
  try {
    const { ref } = req.body;

    const queryCheck = `SELECT * FROM user WHERE userId = '${ref}'`;
    dbConnection.query(queryCheck, async (error, result) => {
      if (result.length > 0) {
        return res.status(200).json({
          success: true,
          message: "User related ref",
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "User unrelated ref",
        });
      }
    })
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
};



const userLogin: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const query = `SELECT userId, password FROM user WHERE email = ?`;
    dbConnection.query(query, [email], async (error, result) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }

      if (result.length === 0) {
        return res.status(400).json({
          success: false,
          message: "User not found"
        });
      }

      // Compare the hashed password from the database with the provided password
      const hashedPassword = result[0].password;
      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (!passwordMatch) {
        return res.status(400).json({
          success: false,
          message: "Incorrect password"
        });
      }
      const uid = result[0].userId;
      const token = jwt.sign({ uid }, 'secret123', { expiresIn: '1h' });
      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 3600000), // Expires in 1 hour
      });

      return res.status(200).json({
        success: true,
        message: "Passwords Matched",
        userIds: result
      });
    })

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
};

export { userLogin, userRegister, userRef };
