import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default function Form2() {
    //defining the state of a form 
    const [form, setForm] = useState({
        apple: 0,
        banana: 0,
        pear: 0,
        orange: 0,
    });

    //by default the status of successmessage is false
    const [successMessage, setSuccessMessage] = useState(false);

    //handle submit
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            apple: form.apple,
            banana: form.banana,
            pear: form.pear,
            orange: form.orange,
            totalPrice: parseFloat(totalPrice())
        }

        const apiUrl = 'http://localhost:3001/purchase';

        console.log('Data to send', data);
        console.log('Request URL', apiUrl);

        //the put api when submitting for updating inventory
        axios.put(apiUrl, data)
            .then((response) => {
                console.log('PUT request successful:', response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        //this is for storing the transaction into the db
        axios.post(apiUrl, data)
            .then((response) => {
                setSuccessMessage(true);
                setTimeout(() => setSuccessMessage(false), 3000); // Show for 3 seconds
                console.log('POST request successful:', response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });


        // Reset the form inputs by setting the state to their initial values
        setForm({ apple: 0, banana: 0, pear: 0, orange: 0 });
    }

    // Reset the form inputs by setting the state to their initial values
    const resetForm = () => {
        setForm({ apple: 0, banana: 0, pear: 0, orange: 0 });
    };

    //calculate total price
    const totalPrice = () => {
        const hashMap = {
            apple: 2.00,
            banana: 1.50,
            pear: 2.30,
            orange: 1.80,
        };

        return (
            form.apple * hashMap.apple +
            form.banana * hashMap.banana +
            form.pear * hashMap.pear +
            form.orange * hashMap.orange
        ).toFixed(2); // To display the total price with 2 decimal places
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-auto">
                        <label>
                            Apple
                        </label>
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-primary" onClick={() => { setForm({ ...form, apple: form.apple - 1 }) }}>-</button>
                    </div>
                    <div className="col-auto">
                        <label>{form.apple}</label>
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-primary" onClick={() => { setForm({ ...form, apple: form.apple + 1 }) }}>+</button>

                    </div>
                </div>

                <div className="row">
                    <div className="col-auto">
                        <label>
                            Banana
                        </label>
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-primary" onClick={() => { setForm({ ...form, banana: form.banana - 1 }) }}>-</button>
                    </div>
                    <div className="col-auto">
                        <label>{form.banana}</label>
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-primary" onClick={() => { setForm({ ...form, banana: form.banana + 1 }) }}>+</button>

                    </div>
                </div>

                <div className="row">
                    <div className="col-auto">
                        <label>
                            Pear
                        </label>
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-primary" onClick={() => { setForm({ ...form, pear: form.pear - 1 }) }}>-</button>
                    </div>
                    <div className="col-auto">
                        <label>{form.pear}</label>
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-primary" onClick={() => { setForm({ ...form, pear: form.pear + 1 }) }}>+</button>

                    </div>
                </div>

                <div className="row">
                    <div className="col-auto">
                        <label>
                            Orange
                        </label>
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-primary" onClick={() => { setForm({ ...form, orange: form.orange - 1 }) }}>-</button>
                    </div>
                    <div className="col-auto">
                        <label>{form.orange}</label>
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-primary" onClick={() => { setForm({ ...form, orange: form.orange + 1 }) }}>+</button>

                    </div>
                </div>



                <div className="row">
                    <div className="col-auto">
                        <label>Total price</label>
                    </div>
                    <div className="col-auto">
                        <p>${totalPrice()}</p>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary btn-sm" onClick={resetForm}>Purchase</button>
                    </div>
                </div>

                {successMessage && (
                    <div className="row">
                        <div className="col-auto">
                            <div className="alert alert-success">Success: Purchase was successful!</div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}
