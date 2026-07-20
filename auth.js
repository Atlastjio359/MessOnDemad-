const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/auth');

const DATA_PATH = path.join(__dirname, '../../data');

function readData(filename) {
    try {
        const data = fs.readFileSync(path.join(DATA_PATH, filename), 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function writeData(filename, data) {
    try {
        fs.writeFileSync(path.join(DATA_PATH, filename), JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        return false;
    }
}

function generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
}

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phone, university, room, diet } = req.body;

        if (!name || !email || !password || !phone || !university || !room) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all fields'
            });
        }

        const users = readData('users.json');

        if (users.find(u => u.email === email)) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            name,
            email,
            password: hashedPassword,
            phone,
            university,
            room,
            diet: diet || 'veg',
            rewardPoints: 0
        };

        users.push(newUser);
        writeData('users.json', users);

        const token = generateToken(newUser.id);
        const { password: _, ...userWithoutPassword } = newUser;

        res.status(201).json({
            success: true,
            token,
            user: userWithoutPassword
        });
    } catch (error) {
        console.error('Register Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        const users = readData('users.json');
        const user = users.find(u => u.email === email);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const token = generateToken(user.id);
        const { password: _, ...userWithoutPassword } = user;

        res.json({
            success: true,
            token,
            user: userWithoutPassword
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// Get current user
router.get('/me', protect, (req, res) => {
    const { password: _, ...userWithoutPassword } = req.user;
    res.json({
        success: true,
        user: userWithoutPassword
    });
});

module.exports = router;