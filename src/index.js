import dotenv from "dotenv";
import connectToMongoDB from "./config/db";
import { config } from "./config/config";

// Load env variables at the start of the app
dotenv.config({
  path: "./env",
});

const PORT = config.port;

connectToMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  })
  .catch(error => {
    console.log("Error while connecting to mongodb database");
  });
