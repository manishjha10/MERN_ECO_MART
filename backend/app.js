// import express  from 'express';
// import product from './routes/productRoutes.js'; 
// import user from './routes/userRoutes.js';
// import order from './routes/orderRoutes.js';
// import payment from './routes/paymentRoutes.js';
// import errorHandleMiddleware from './middlewares/error.js';
// import cookieParser from 'cookie-parser';
// import fileUpload from 'express-fileupload';
// import dotenv from 'dotenv'; 

// const app = express(); 


// // Middleware
// // app.use(express.json()); 
// // app.use(cookieParser());
// // app.use(fileUpload())

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(
//     fileUpload({
//         limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
//         useTempFiles: true,
//         tempFileDir: "./tmp/"
//     })
// );

// app.use(cookieParser());



// //Routes
// app.use("/api/v1", product); 
// app.use("/api/v1", user); 
// app.use("/api/v1", order); 
// app.use("/api/v1", payment); 

// app.use(errorHandleMiddleware)
// dotenv.config({path:'backend/config/config.env'})
// export default app;



import express from "express";
import product from "./routes/productRoutes.js";
import user from "./routes/userRoutes.js";
import order from "./routes/orderRoutes.js";
import payment from "./routes/paymentRoutes.js";
import contact from "./routes/contactRoutes.js";
import errorHandleMiddleware from "./middlewares/error.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import path from 'path'
import { fileURLToPath } from "url";


// const _filename=fileURLToPath(import.meta.url)
// const _dirname=path.dirname(_filename)
// ✅ ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();



app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

// 🔥 IMPORTANT: increase limit for base64 images
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(cookieParser());

// enable CORS for frontend with credentials
app.use(
    cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        credentials: true,
    })
);

// Routes
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", contact);

// //Serve static files
// app.use(express.static(path.join(_dirname,'../frontend/dist')));
// app.get("*", (_,res)=>{
//     res.sendFile(path.resolve(_dirname, '../frontend/dist/index.html'))
// }) 

// =======================
// SERVE FRONTEND (PROD)
// =======================
// Serve frontend
// app.use(express.static(path.join(__dirname, '../frontend/dist')));

// app.use((req, res) => {
//     res.sendFile(
//         path.resolve(__dirname, '../frontend/dist/index.html')
//     );
// });
// console.log("NODE_ENV =", process.env.NODE_ENV);





app.use(errorHandleMiddleware); 
 
if (process.env.NODE_ENV !== 'PRODUCTION')
{
    dotenv.config({ path: "./config/config.env" });
}

export default app;
