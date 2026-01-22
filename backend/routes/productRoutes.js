import express from 'express';
import { createProducts, getAllProducts, updateProduct, deleteProduct, getSingleProduct,
    getAdminProducts, createReviewForProduct, getProduceReviews, deleteReview } from '../controller/productController.js';
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
.get(getAllProducts);


router.route("/admin/products")
    .get(verifyUserAuth, roleBasedAccess("admin"), getAdminProducts);
    

router.route("/admin/product/create").post(verifyUserAuth, roleBasedAccess("admin"), createProducts);



router.route("admin/product/:id")
    .put(verifyUserAuth, roleBasedAccess("admin") ,updateProduct)
    .delete(verifyUserAuth, roleBasedAccess("admin") ,deleteProduct);

router.route("/product/:id").get(getSingleProduct)
router.route("/review").put(verifyUserAuth , createReviewForProduct)
router.route("/reviews").get(getProduceReviews).delete(verifyUserAuth, deleteReview)






export default router;
