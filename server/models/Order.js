const mongoose = require('mongoose');  // Import mongoose
const { Schema } = mongoose;  // Extract Schema from mongoose

// Define the Item schema
const ItemSchema = new Schema({
    id: String,
    name: String,
    qty: String,
    size: String,
    price: Number,
    img: String  // Add img field here
});

// Define the Order schema
const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    order_data: {
        type: [[ItemSchema]],  // Array of arrays of items
        required: true
    }
});

module.exports = mongoose.model('Order', OrderSchema); // Export the Order model
