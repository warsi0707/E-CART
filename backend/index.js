
import express from 'express'
import cors from 'cors'
import ConnectDB from "./utils/DatabaseConnect.js"
import authRouter from "./routes/authRoute.js"
import productRouter from "./routes/productRoute.js"
import { FRONTEND_URL } from './config/Config.js'
import sellerRouter from './routes/sellerRoute.js'
import path from "path"
const app = express()
import { fileURLToPath } from "url";
import userRouter from './routes/userRoute.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "category", "token"]
}))
app.get("/", (req, res)=>{
    res.send("Hello world")
})
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/seller", sellerRouter)
app.use("/api/v1/product", productRouter)
app.use("/api/v1/user", userRouter)

const main =async ()=>{
    try{
        await ConnectDB()
        app.listen(3000)
        console.log("App listing on port 3000")
    }catch(error){
        console.log(error)
    }
}
main()