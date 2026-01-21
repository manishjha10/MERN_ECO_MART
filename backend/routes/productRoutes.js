import express from 'express';
import { createProducts, getAllProducts, updateProduct, deleteProduct, getSingleProduct } from '../controller/productController.js';
import { roleBasedAccess, verifyUserAuth  } from '../middlewares/userAuth.js';

const router = express.Router();  

// // PUBLIC ROUTES
// router.get("/products", getAllProducts);
// router.get("/product/:id", getSingleProduct);


// // PROTECTED ROUTES
// router.post("/products", verifyUserAuth, createProducts);
// router.put("/product/:id", verifyUserAuth, updateProduct);
// router.delete("/product/:id", verifyUserAuth, deleteProduct);

router.route("/products")
.get(verifyUserAuth, getAllProducts)
.post(verifyUserAuth, roleBasedAccess("admin"), createProducts);

router.route("/product/:id")
    .put(verifyUserAuth, roleBasedAccess("admin") ,updateProduct)
    .delete(verifyUserAuth, roleBasedAccess("admin") ,deleteProduct)
.get(verifyUserAuth, getSingleProduct)



export default router;
