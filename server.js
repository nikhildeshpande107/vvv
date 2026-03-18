const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

app.post("/users", async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json(user);
})

app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.delete("/users/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.send("Deleted");
});


module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");
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


const User = mongoose.model("User", {
    name: String,
    email: String
});
User.find() 


const cors = require("cors");
app.use(cors());