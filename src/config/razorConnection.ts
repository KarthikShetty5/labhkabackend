'use strict'
import Razorpay from 'razorpay';
import dotevn from "dotenv"
dotevn.config()


const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || ' ',
    key_secret: process.env.RAZORPAY_SECRET,
});

export { instance };