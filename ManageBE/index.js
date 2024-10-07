const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://duong3456789:1111@cluster0.x76l8mw.mongodb.net/Book");

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//Schema for books
const Book = mongoose.model("Book", {
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

// Add book
app.post("/addbook", async(req, res) =>{
    const book = new Book({
        id: req.body.id,
        name: req.body.name,
        author: req.body.author,
        year: req.body.year,
        quantity: req.body.quantity,
        price: req.body.price
    })
    console.log(book);
    await book.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    })
})

// Get book
app.get("/allbook", async(req, res) =>{
    let book = await Book.find({});
    console.log("book", book);
    res.send(book)
})

