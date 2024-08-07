import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../../contexts/financial-record-context";
/*importing current user info from clerk */
export const FinancialRecordForm = () => {

    const [description, setDescription] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [paymentMethod, setPaymentMethod] = useState<string>("");
    const {addRecord} = useFinancialRecords();

    const {user} = useUser();
    /*assigning a variable user to the user imported from clerk*/

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        /*page doesnt refresh when we submit it */

        const newRecord = {
            userId: user?.id ?? "",
            //?? "" defines an edge case where if no user is inputted, we get returned an empty string 
            date: new Date(),
            description: description,
            amount: parseFloat(amount),
            category: category,
            paymentMethod: paymentMethod,
        }

        //creating a new function ( after creation of backend ) that would send the information of the newRecord to the backend
        addRecord(newRecord);
        //resertting all fields to default "" after we are done using them 
        setDescription("");
        setAmount("");
        setCategory("");
        setPaymentMethod("");

        
    };


    return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
       {/*leads to handle submit whenever we submit the form */}
        
        <div className="form-field">
          <label>Description:</label>
          <input
            type="text"
            required
            className="input"
            value={description}
            /*the valie here, which is 'description' is linked to the const above */
            onChange={(e) => setDescription(e.target.value)}
            /* we can write this too -> onChange={(e) => handleSubmit(e.target.value)} */
            /* on change is an event handler which invokes the function setDescription, e is the event object ( which holds of the current data of the event), taegrt is the entire input tag, value is the current value inputted */
        
          />
        </div>

        <div className="form-field">
          <label>Amount:</label>
          <input
            type="number"
            required
            className="input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label>Category:</label>
          <select
            required
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a Category</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Salary">Salary</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-field">
          <label>Payment Method:</label>
          <select
            required
            className="input"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Select a Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>

        <button type="submit" className="button">
          Add Record
        </button>
      </form>
    </div>
    );
};

