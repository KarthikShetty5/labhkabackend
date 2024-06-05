import { Router } from 'express'
import { addProduct, getProduct, getProductCat, getProductID } from '../controller/product.controller'


const route = Router()

route.post("/add", addProduct)
route.post("/get", getProduct)
route.post("/getid", getProductID)
route.post('/getcat', getProductCat)

export default route