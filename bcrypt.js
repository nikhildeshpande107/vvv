const bcrypt = require("bcryptjs");
const User = require("./models/User");

app.post("/signup", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // 🚀 Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ 
            name, 
            email, 
            password: hashedPassword,
            role: role || "user"
        });

        await newUser.save();

        res.status(201).json({ msg: "User created successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
const jwt = require("jsonwebtoken");




app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // ✅ include role in token
    const token = jwt.sign(
        { id: user._id, role: user.role },
        "secretkey",
        { expiresIn: "1h" }
    );

    res.json({ msg: "Login successful", token });
});

const blacklist = [];
function auth(req, res, next) {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) return res.status(401).json({ msg: "No token, access denied" });

    // 🚫 check blacklist
    if (blacklist.includes(token)) {
        return res.status(401).json({ msg: "Token expired (logged out)" });
    }

    try {
        const verified = jwt.verify(token, "secretkey");
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ msg: "Invalid token" });
    }
}
function isAdmin(req, res, next) {
    if (req.user.role !== "admin") {
        return res.status(403).json({ msg: "Admin access only" });
    }
    next();
}


app.get("/admin", auth, isAdmin, (req, res) => {
    res.json({ msg: "Welcome Admin 🚀" });
});

app.post("/logout", auth, (req, res) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    blacklist.push(token);

    res.json({ msg: "Logged out successfully" });
});