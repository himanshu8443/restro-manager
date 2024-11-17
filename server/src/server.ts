import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";
import productRoutes from "./routes/product";
import userRoutes from "./routes/user";
import billRoutes from "./routes/bill";


import { env } from "@/common/utils/envConfig";
import dbConnect from "./common/utils/dbConnect";

const logger = pino({ name: "server start" });
const app: Express = express();

dbConnect();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type', 
        'Authorization',
        'credentials', 
        'X-Requested-With',
        'Accept'
      ],
      exposedHeaders: ['Set-Cookie']
   }));
app.use(helmet());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bills", billRoutes);



export { app, logger };
