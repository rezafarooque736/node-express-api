import dotenv from "dotenv";
import app from "./app.js";
import { config } from "./config/config.js";
import connectToMongoDB from "./config/db.js";

dotenv.config({
  path: "./.env",
});

const PORT = config.PORT;
console.log({ PORT });

connectToMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  })
  .catch(error => {
    console.log("Error while connecting to mongodb database");
  });
