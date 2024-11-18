import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";
import productRoutes from "./routes/product";
import userRoutes from "./routes/user";
import billRoutes from "./routes/bill";
import fileUpload from "express-fileupload";

import { env } from "@/common/utils/envConfig";
import dbConnect from "./common/utils/dbConnect";
import { cloudnairyconnect } from "./common/utils/cloudinaryConnect";

const logger = pino({ name: "server start" });
const app: Express = express();

dbConnect();
cloudnairyconnect();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Order of middleware is important
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "credentials",
      "X-Requested-With",
      "Accept",
    ],
    exposedHeaders: ["Set-Cookie"],
  })
);

// File upload middleware should come before JSON and urlencoded
app.use(
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: "/tmp/",
    debug: process.env.NODE_ENV === "development",
    abortOnLimit: true,
  })
);

// These should come after fileUpload middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bills", billRoutes);

export { app, logger };
