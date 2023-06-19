const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    number_of_seats: { type: Number, required: true },
    amenities: { type: String, required: true },
    price_per_hour: { type: Number, required: true },
});

module.exports = mongoose.model("Room", roomSchema);
