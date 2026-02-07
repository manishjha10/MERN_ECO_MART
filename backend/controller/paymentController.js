import { instance } from '../server.js'
import handleAsyncError from '../middlewares/handleAsyncError.js'
import crypto from 'crypto'; 

export const processPayment = handleAsyncError(async (req, res) => {

    const options = {
        amount: Number (req.body.amount*100),
        currency: "INR"
    }

    const order = await instance.orders.create(options)

    res.status(200).json({
        success: true,
        order
    })
})


//Send Api Key
export const sendAPIKey = handleAsyncError(async (req, res) => {

    res.status(200).json({
       key:process.env.RAZORPAY_API_KEY
    })
})

export const paymentVerification = handleAsyncError(async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body

    const body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET).update(body.toString()).digest("hex")
    const isAuthenticated = expectedSignature === razorpay_signature;
    if (isAuthenticated) {
        return res.status(200).json({
            success: true,
            message: "Payment Verified successfully",
            reference: razorpay_payment_id
        })
    } else {
        return res.status(200).json({
            success: false,
            message: "Payment Verified failed",
        })
    }

})
