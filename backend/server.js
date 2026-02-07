// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";
// import app from "./app.js";
// import { connectMongoDatabase } from "./config/db.js";
// import { log } from "console";
// import { v2 as cloudinary } from 'cloudinary';
// import Razorpay from 'razorpay'; 



// if (process.env.NODE_ENV !== 'PRODUCTION')
// {
//     dotenv.config({ path: "./config/config.env" });
// }


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);



// dotenv.config({
//     path: path.join(__dirname, "config", "config.env")
// });



// // if(process.env.NODE_ENV !== 'PRODUCTION')
// // {    
// //     dotenv.config({ path: "./config/config.env" });
// // }



// connectMongoDatabase();

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET 
// });

// //Handle  uncaught exceptions errors
// process.on('uncaughtException', (err)=>{
//     console.log(`Error: ${err.message}`);
//     console.log(`Server is shutting dowm dut to uncaught exception errors`);
//     process.exit(1)
    
// })


// const port = process.env.PORT || 3000;
// export const instance = new Razorpay({
//     key_id: process.env.RAZORPAY_API_KEY,
//     key_secret: process.env.RAZORPAY_API_SECRET,
// });

// // instance.orders.all().then(console.log).catch(console.error);




// const server = app.listen(port, () => {
//     console.log(`Server is running on ${port}`);
// }); 
 

 
// process.on('unhandledRejection', (err)=>{
//    console.log(`Error: ${err.message}`); 
//    console.log(`Server is shuuting down , due to unhandle promise rejection`); 
//    server.close(()=>{
//      process.exit(1);
//    })
// })

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import app from "./app.js";
import { connectMongoDatabase } from "./config/db.js";
import { v2 as cloudinary } from "cloudinary";
import Razorpay from "razorpay";

// Load env ONCE
dotenv.config({ path: "./config/config.env" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect DB
connectMongoDatabase();

// Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Razorpay
export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    process.exit(1);
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});
