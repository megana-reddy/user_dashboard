import express from "express" // 
import cors from "cors" // import cors to allow cross-origin requests
import dotenv from "dotenv" // dotenv is used to load environment variables
import connectDB from "./config/db.js" // connect to mongoDB
import router from "./routes/userRoutes.js"

dotenv.config(); // Reads dotenv files

connectDB();

const app = express(); // creates an express instance

// Middlewares
app.use(cors()); // frontend can access backend
app.use(express.json()); // Parse JSON bodies
app.use("/api/users", router);


app.get("/", (req, res) => {
    res.send("API is running...")
});

// start server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`)
})
