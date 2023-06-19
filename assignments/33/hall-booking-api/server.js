const express = require("express");
const mongoose = require("mongoose");
const Room = require("./models/Room");
const Booking = require("./models/Booking");

const app = express();
const port = 4000; // Choose any desired port number

// Connect to MongoDB database
mongoose
    .connect(
        "mongodb+srv://vetrivelannadurai:5LixL4zYPPkfKa37@cluster0.wgmlhvq.mongodb.net/?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("Connected to the database"))
    .catch((err) => console.error(err));

// Set up JSON parsing middleware
app.use(express.json());

// API endpoints
app.post("/rooms", async (req, res) => {
    try {
        const room = await Room.create(req.body);
        res.status(201).json(room);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating room" });
    }
});

app.post("/bookings", async (req, res) => {
    try {
        const booking = await Booking.create(req.body);
        res.status(201).json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating booking" });
    }
});

app.get("/rooms", async (req, res) => {
    try {
        const rooms = await Room.find().populate("bookings");
        res.json(rooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving rooms" });
    }
});

app.get("/bookings", async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("room_id", "room_name")
            .select("-__v");
        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving bookings" });
    }
});

app.get("/customers", async (req, res) => {
    try {
        const customers = await Booking.find()
            .populate("room_id", "room_name")
            .select("customer_name date start_time end_time");
        res.json(customers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving customers" });
    }
});

app.get("/customer-booking-count", async (req, res) => {
    try {
        const customerBookings = await Booking.aggregate([
            { $group: { _id: "$customer_name", count: { $sum: 1 } } },
            {
                $lookup: {
                    from: "rooms",
                    localField: "room_id",
                    foreignField: "_id",
                    as: "room",
                },
            },
            { $unwind: "$room" },
            {
                $project: {
                    _id: 0,
                    customer_name: "$_id",
                    room_name: "$room.room_name",
                    date: 1,
                    start_time: 1,
                    end_time: 1,
                    booking_id: "$_id",
                    booking_date: "$date",
                    booking_status: "booked",
                },
            },
        ]);
        res.json(customerBookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving customer bookings" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

/*
Note: Make sure to replace the MongoDB connection URL ('mongodb://localhost:27017/hallbooking') with your actual MongoDB database URL.

Run the server:
In the terminal, run the command: node server.js

Endpoints
Create a Room: POST /rooms
Book a Room: POST /bookings
List all Rooms with Booked Data: GET /rooms
List all customers with Booked Data: GET /customers
List how many times a customer has booked the room: GET /customer-booking-count


*/
