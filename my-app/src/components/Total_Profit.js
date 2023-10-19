import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default function Total_revenue(){
    const [revenuedata, setRevenueData]= useState(0);
    //making a GET request
    useEffect (() => {
        axios.get('http://localhost:3001/getTotalRevenue') 
        .then ((response) => {
            setRevenueData(response.data[0]);
            // console.log('CMY Data',response)
            // console.log('CMY Data1',data)
        })
        .catch((error) => {
            console.error('Error fetching data', error);
        });
    },[revenuedata])

    return (
        <div>
            <label>Total Revenue</label>
            <label>${revenuedata.total_price}</label>
        </div>
    )
}