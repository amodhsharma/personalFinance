// importing required library 
import mongoose from "mongoose";

//defining an interface - an interface is the structure that the ts will fillow 
interface FinancialRecord {
  userId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
}

//defining the same in mongoose, mongoose and mongo have different ways of defining the same thing, here we have to define infdividually the type and whether it is required or not
const financialRecordSchema = new mongoose.Schema<FinancialRecord>({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  paymentMethod: { type: String, required: true },
});

//creating a new variable and giving it a name - FinancialRecord. and we are passing in it the financialRecordSchema
const FinancialRecordModel = mongoose.model<FinancialRecord>(
  "FinancialRecord",
  financialRecordSchema
);

export default FinancialRecordModel;