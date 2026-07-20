const express = require('express');
const router = express.Router();
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

// Get all menu items
router.get('/', (req, res) => {
    try {
        const menuItems = readData('menu.json');
        const { category, tag, popular } = req.query;
        
        let filtered = menuItems;
        if (category) filtered = filtered.filter(item => item.category === category);
        if (tag) filtered = filtered.filter(item => item.tags && item.tags.includes(tag));
        if (popular === 'true') filtered = filtered.filter(item => item.popular === true);

        res.json({
            success: true,
            count: filtered.length,
            data: filtered
        });
    } catch (error) {
        console.error('Menu Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching menu'
        });
    }
});

// Get single menu item
router.get('/:id', (req, res) => {
    try {
        const menuItems = readData('menu.json');
        const item = menuItems.find(i => i.id === parseInt(req.params.id));

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item not found'
            });
        }

        res.json({
            success: true,
            data: item
        });
    } catch (error) {
        console.error('Menu Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching item'
        });
    }
});

module.exports = router;