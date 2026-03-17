const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/authdb")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


app.listen(3000, () => console.log("Server running on http://localhost:3000"));



const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true // prevents duplicates
    },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
});

module.exports = mongoose.model("User", userSchema);