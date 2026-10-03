import express from "express";
import product from "./routes/productRoutes.js";
import user from "./routes/userRoutes.js";
import order from "./routes/orderRoutes.js";
import payment from "./routes/paymentRoutes.js";
import contact from "./routes/contactRoutes.js";
import errorHandleMiddleware from "./middlewares/error.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// File upload
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

// Body parsers
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(cookieParser());

// CORS (safe for dev + prod)
app.use(
    cors({
        origin: process.env.FRONTEND_URL || true,
        credentials: true,
    })
);

// API routes
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", contact);

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});


// Error middleware
app.use(errorHandleMiddleware);

export default app;
