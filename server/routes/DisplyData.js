const express = require('express');
const router = express.Router();

router.get('/foodData', (req, res) => {
    try {
        // Assuming global.food_panda and global.foodCategory are the correct data structures
        res.send({
            foodPanda: global.food_panda,
            foodCategory: global.foodCategory
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
