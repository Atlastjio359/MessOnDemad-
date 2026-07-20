const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const fs = require('fs');
const path = require('path');

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

// Get all reviews
router.get('/', (req, res) => {
    try {
        const reviews = readData('reviews.json');
        res.json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } catch (error) {
        console.error('Reviews Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching reviews'
        });
    }
});

// Create review
router.post('/', protect, (req, res) => {
    try {
        const { rating, item, text, orderId } = req.body;

        if (!rating || !text || text.length < 10) {
            return res.status(400).json({
                success: false,
                message: 'Please provide rating and review (min 10 characters)'
            });
        }

        const reviews = readData('reviews.json');

        if (orderId) {
            const existing = reviews.find(r => r.orderId === orderId && r.name === req.user.name);
            if (existing) {
                return res.status(400).json({
                    success: false,
                    message: 'You already reviewed this order'
                });
            }
        }

        const newReview = {
            id: reviews.length > 0 ? Math.max(...reviews.map(r => r.id)) + 1 : 1,
            name: req.user.name,
            rating: rating,
            item: item || 'General',
            text: text,
            date: new Date().toISOString().split('T')[0],
            orderId: orderId || null
        };

        reviews.push(newReview);
        writeData('reviews.json', reviews);

        res.status(201).json({
            success: true,
            data: newReview
        });
    } catch (error) {
        console.error('Review Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error submitting review'
        });
    }
});

// Get user reviews
router.get('/user', protect, (req, res) => {
    try {
        const reviews = readData('reviews.json');
        const userReviews = reviews.filter(r => r.name === req.user.name);
        
        res.json({
            success: true,
            count: userReviews.length,
            data: userReviews
        });
    } catch (error) {
        console.error('Reviews Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching reviews'
        });
    }
});

module.exports = router;