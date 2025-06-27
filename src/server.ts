import dotenv from "dotenv";
import app from "./app";

dotenv.config();

app.listen(process.env.PORT, () => console.log("Server running on http://localhost:4000"));