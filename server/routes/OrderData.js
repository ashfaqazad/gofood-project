const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Import Order model

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    console.log("Order Data Received: ", data);


    // Validation: Ensure that order_data and email are not missing or empty
    if (!data || data.length === 0 || !req.body.email) {
        return res.status(400).send("Order data or email is missing or invalid.");
    }

    // Add Order_date at the start of the data array
    await data.splice(0, 0, { Order_date: req.body.order_date });

    // Check if email exists in the database
    let eId = await Order.findOne({ 'email': req.body.email });

    if (eId === null) {
        // If email does not exist, create a new order entry
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server Error: " + error.message);
        }
    } else {
        // If email exists, update the order entry
        try {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            ).then(() => {
                res.json({ success: true });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server Error: " + error.message);
        }
    }
});

router.post('/myOrderData', async (req, res) => {
    try {
        let eId = await Order.findOne({ 'email': req.body.email });
        if (!eId) {
            return res.status(404).send("Order not found.");
        }
        res.json({ orderData: eId });
    } catch (error) {
        res.status(500).send("Error: " + error.message);
    }
});

module.exports = router;
