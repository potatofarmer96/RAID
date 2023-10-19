// reqire the express library that we downloaded
const express = require('express')
const mysql = require('mysql2')
const cors = require('cors'); // Import the cors middleware

//by calling express as a function we create an application
const app = express()

// Enable CORS for all routes
app.use(cors({ origin: '*' }));

//add body psarsing middlewareto handleJSON data
app.use(express.json());

//link to mysql
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'inventory'
})

//validate if the database is connected properly or not connect to inventory
db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
    }
    else {
        console.log('Connected to DataBase');
    }
});

//used to update quantity left in the fruit_inventory
app.put('/purchase', (req, res) => {
    //extra the data out from req.body
    const updateData = req.body;

    //check if the sent data is valid
    if (!updateData || typeof updateData !== 'object') {
        res.status(400).send('Invalid request data.');
        return;
    }

    //an array to ensure that all of the queries are updated properly
    const updatePromises = [];

    //loop through the updateData object to dynamically generate updater queries 
    for (const fruitName in updateData) {
        if (updateData.hasOwnProperty(fruitName)) {
            const decreaseBy = updateData[fruitName];

            if (typeof decreaseBy === 'number') {
                const updateQuery = `UPDATE fruit_inventory SET quantity = quantity - ? WHERE fruit_name = ?`;
                const promise = new Promise((resolve, reject) => {
                    db.query(updateQuery, [decreaseBy, fruitName], (err, results) => {
                        if (err) {
                            console.error(err);
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });
                updatePromises.push(promise);
            }
        }
    }
    //if everything is updated properly
    Promise.all(updatePromises)
        .then(() => {
            res.send('Quantities updated successfully.');
        })
        //if an error is thrown it will be caught
        .catch((error) => {
            res.status(500).send('Error updating quantities.');
        });

})

//adding the transaction into the database
app.post('/purchase', (req, res) => {
    //extra the data out from req.body
    const updateData = req.body;

    //check if the sent data is valid
    if (!updateData || typeof updateData !== 'object') {
        res.status(400).send('Invalid request data.');
        return;
    }

    // Construct the INSERT statement
    const insertSql = `INSERT INTO transaction (apple, banana, pear, orange, total_price) VALUES (?, ?, ?, ?, ?)`;
    const values = [updateData.apple, updateData.banana, updateData.pear, updateData.orange, updateData.totalPrice];

    // Execute the INSERT statement db1 for transaction table
    db.query(insertSql, values, (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error inserting data into the database.');
        } else {
            console.log('Data inserted successfully.');
            res.status(200).send('Data inserted into the database.');
        }
    });
});

// //obtain data from the mysql
app.get('/getInventory', (req, res) => {

    // Query the database to fetch data
    const query = `SELECT * FROM fruit_inventory`;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching data from the database: ' + err);
        res.status(500).send('Error fetching data from the database');
      } else {
        // You can send this data to an external API
        res.json(results)
      }
    });
});

app.get('/getTotalRevenue', (req, res) =>{
    //construct query
    const query = 'SELECT SUM(total_price) as total_price FROM transaction'

    db.query(query, (err, results) => {
        if (err){
            console.error('Error fetching data from the database: ' + err);
            res.status(500).send('Error fetching data from the database');
        } else {
                res.json(results);
            }
        }
    )
})

// Start the server port at 3001
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


