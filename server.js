// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userProfiles', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Create a schema
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    bio: String,
    avatar: String
});

// Create a model
const User = mongoose.model('User', userSchema);

// POST endpoint to add a new user
app.post('/api/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send('User profile saved successfully!');
    } catch (err) {
        res.status(400).send('Error saving user profile: ' + err.message);
    }
});
// Get all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send('Error fetching users: ' + err.message);
    }
});

// Start the server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
