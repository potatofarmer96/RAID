import React, { useState, useEffect } from 'react';
import axios from "axios";

export default function Inventory() {
    const [data, setData] = useState([]);
    useEffect(() => {
        // Make a GET request to your Express.js backend endpoint
        axios.get('http://localhost:3001/getInventory') // api call
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

    }, [data]);

    // console.log("MY DATA", data)
    return (
        <div>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.fruit_name}</td>
                            <td>{item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}