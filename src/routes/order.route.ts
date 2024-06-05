import { Router } from 'express'
import { addOrder, fetchID, fetchOrder } from '../controller/order.controller'


const route = Router()

route.post("/addOrder", addOrder)
route.post('/fetchOrder', fetchOrder)
route.post('/userID', fetchID)

export default route