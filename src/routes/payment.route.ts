import { Router } from 'express'
import { checkOut, paymentVerification } from '../controller/payment.controller'

const route = Router()

route.post("/checkout", checkOut)
route.post("/paymentverification", paymentVerification)

export default route