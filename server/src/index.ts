import express, { Express } from "express";
// importing the express module
import mongoose from "mongoose";
// importing cors - cross origin resource sharing  

import financialRecordRouter from "./routes/financial-records";
import cors from "cors";

//its not important to only make enviroment file, you have to import dotevn and create a path too
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// create an instance of an Express application
//typescript specific definition
const app: Express = express();

//will still work if we are not putting 3001
const port = process.env.PORT || 3001;

// .use extension is for middleware 
app.use(express.json());
app.use(cors());

//uri that connects to the mongo db database
//would have done it this way had we not made it into an env variable 
// const mongoURI: string =
//   "mongodb+srv://<user>:<password>@pfa.mdezxmu.mongodb.net/";

const mongoURI: string = process.env.MONGO_URI || '';
console.log('Mongo URI:', process.env.MONGO_URI);
//edge cases in database
mongoose
  .connect(mongoURI)
  .then(() => console.log("CONNECTED TO MONGODB!"))
  .catch((err) => console.error("Failed to Connect to MongoDB:", err));

//middleware for handeling url requests made to /financial-records
//defining routes 

//the app.use method from Express is used to mount middleware functions or routers to a specific path
app.use("/financial-records", financialRecordRouter);
// /financial-records. This is the base path. It means that any request starting with /financial-records will be handled by the 
//middleware or router provided as the second argument. For example, a request to /financial-records/create 
//or /financial-records/delete will be routed to financialRecordRouter.

//financialRecordRouter: This is the router middleware that will handle the requests matching the specified path. 
//financialRecordRouter is an Express router that you have defined elsewhere in your code. 
//It contains route definitions for handling various HTTP methods (GET, POST, PUT, DELETE) under the /financial-records path.

// start express as an Express server
app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});
//to run this express server in the terminal, use yarn start