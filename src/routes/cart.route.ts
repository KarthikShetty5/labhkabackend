import { Router } from 'express'
import { addCart, deleteCart, fetchCart } from '../controller/cart.controller'

const route = Router()

route.post("/add", addCart)
route.post("/fetch", fetchCart)
route.post("/delete", deleteCart)

export default route