// In your main app file (e.g., index.js)
const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const dotenv = require('dotenv');
const mongoDB = require('./db');  // Import the mongoDB function
const CreateUser = require('./routes/CreateUser'); // Update the path as needed
const DisplyData = require('./routes/DisplyData'); // Update the path as needed
const OrderData = require('./routes/OrderData'); // Update the path as needed

const cookieParser = require('cookie-parser');

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

// Connect to MongoDB
mongoDB();

// Use the route files
app.use('/api', CreateUser);  // Ensure the routes in CreateUser are prefixed with /api
app.use('/api', DisplyData);  // Ensure the routes in DisplyData are prefixed with /api
app.use('/api', OrderData);   // Corrected from './api' to '/api'

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
