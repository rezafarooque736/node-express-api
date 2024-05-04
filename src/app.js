import express, { urlencoded } from "express";
// import globalErrorHandler from "./middlewares/global-error-handler";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./config/config";

const app = express();

// cors configuration
app.use(
  cors({
    origin: config.corsOrigins,
    credentials: true,
  })
);

// allow json body
app.use(express.json({ limit: "16kb" }));

// allow params (query params)
app.use(urlencoded({ extended: true, limit: "16kb" }));

// allow storage public files like images, favicons, etc.
app.use(express.static("public"));

// parse cookies
app.use(cookieParser());

// Routes
app.get("/api/v1", (req, res, next) => {
  res.json({ message: "Welcome to elib apis" });
});

// global error handler
app.use(globalErrorHandler);

export default app;
