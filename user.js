const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("User", userSchema);


app.get("/users/active", async (req, res) => {
    const users = await User.find({ isActive: true });
    res.json(users);
});

app.get("/users/age/:min", async (req, res) => {

    const minAge = req.params.min;

    const users = await User.find({
        age: { $gt: minAge }
    });

    res.json(users);
});