import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { syncDatabase } from "./config/database";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await syncDatabase();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        })
    } catch (error) {
        console.error("Error starting server : ", error);
    }
}

startServer();