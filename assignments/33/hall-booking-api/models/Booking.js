const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    customer_name: { type: String, required: true },
    date: { type: Date, required: true },
    start_time: { type: String, required: true },
    end_time: { type: String, required: true },
    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true,
    },
});

module.exports = mongoose.model("Booking", bookingSchema);
