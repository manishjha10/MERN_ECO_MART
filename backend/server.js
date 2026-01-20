import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.join(__dirname, "config", "config.env")
});

import app from "./app.js";
import { connectMongoDatabase } from "./config/db.js";
import { log } from "console";
connectMongoDatabase();


//Handle  uncaught exceptions errors
process.on('uncaughtException', (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Server is shutting dowm dut to uncaught exception errors`);
    process.exit(1)
    
})


const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`Server is running on ${port}`);
}); 
 

 
process.on('unhandledRejection', (err)=>{
   console.log(`Error: ${err.message}`); 
   console.log(`Server is shuuting down , due to unhandle promise rejection`); 
   server.close(()=>{
     process.exit(1);
   })
})
