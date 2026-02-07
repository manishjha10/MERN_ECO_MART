import express from 'express'; 
import { roleBasedAccess, verifyUserAuth } from '../middlewares/userAuth.js';
import { allMyOrders, createNewOrder, getAllOrders, getSingleOrder, updateOrderStatus, deleteOrder } from '../controller/orderController.js';

const router=express.Router(); 


router.route('/new/order').post(verifyUserAuth, createNewOrder)

router.route('/order/:id').get(verifyUserAuth, getSingleOrder)

router.route ('/admin/order/:id').
    put(verifyUserAuth, roleBasedAccess('admin'), updateOrderStatus)
    .delete(verifyUserAuth, roleBasedAccess('admin') , deleteOrder)

router.route('/orders/user').get(verifyUserAuth, allMyOrders)
router.route('/admin/orders').get(verifyUserAuth, roleBasedAccess('admin'), getAllOrders)


export default router; 