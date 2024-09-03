const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://ashfaqazad:Yusraboto333@cluster0.dlgwnxv.mongodb.net/fastfood?retryWrites=true&w=majority";

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            // Deprecated options removed
        });

        console.log("Connected to MongoDB");

        // Fetch data from the specified collections
        const fetched_foodPanda = mongoose.connection.db.collection("food_panda");
        const foodPandaData = await fetched_foodPanda.find({}).toArray();

        const fetched_foodCategory = mongoose.connection.db.collection("foodCategory");
        const foodCategoryData = await fetched_foodCategory.find({}).toArray();

        // Store fetched data globally
        global.food_panda = foodPandaData;
        global.foodCategory = foodCategoryData;

    } catch (err) {
        console.error("Error connecting to MongoDB or fetching data:", err);
    }
};

module.exports = mongoDB;
