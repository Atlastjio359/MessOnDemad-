# MessOnDemad 🍽️🏠🏠
Mess On-Demand is a comprehensive college food delivery platform designed specifically for hostel students. It bridges the gap between students craving home-style food and the mess/kitchen services on campus. The platform offers a seamless experience for browsing menus, ordering meals, tracking deliveries, and providing feedback—all from a single, intuitive interface.
College Food Portal with 3D UI, student login, 60+ menu items, special thali/tiffin with item details, bidding, ₹80 tiffin, sweets, chef specials, offers, order tracking, star ratings, cart, wallet, rewards, coupons, delivery time, dark/light theme &amp; responsive design. Complete food ordering solution!


# Why Mess On Demand 🎯🎯
🏫 Built for Students — Designed with college life in mind
🍱 Home-style Meals — Fresh, healthy, and affordable
⚡ Lightning Fast — Order in seconds, not minutes
📱 Mobile-First — Perfect for on-the-go ordering
🎨 Stunning UI — Glassmorphism design with 3D visuals
🔒 Secure — Local authentication with encrypted storage



# Technology Stack 🛠️🛠️
<div align="center">
Frontend Technologies
<table> <tr> <td align="center" width="100"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="50" /><br> <b>HTML5</b> </td> <td align="center" width="100"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="50" /><br> <b>CSS3</b> </td> <td align="center" width="100"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="50" /><br> <b>JavaScript</b> </td> <td align="center" width="100"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" width="50" /><br> <b>Three.js</b> </td> <td align="center" width="100"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" width="50" /><br> <b>PHP</b> </td> </tr> </table>

# Sections 📱📱
 
1. 🏠 Dashboard — Stats & quick links
2.🍽️ Menu — Full menu with filters
3.🍰 Sweets — Dessert section
4.⭐ Special Dishes — Chef's specials
5.👑 Special Thali — Premium meal combos
6.📦 ₹80 Tiffin — Daily tiffin specials
7.🏷️ Offers — Discounted deals
8.🚚 Orders — Order history
9.⭐ Ratings — Reviews & feedback
10.👤 Profile — User management


# 🍽️ Mess On-Demand - Ultimate College Food Delivery Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue.svg)](https://expressjs.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/mess-on-demand)](https://github.com/yourusername/mess-on-demand/issues)
[![GitHub stars](https://img.shields.io/github/stars/yourusername/mess-on-demand)](https://github.com/yourusername/mess-on-demand/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/mess-on-demand)](https://github.com/yourusername/mess-on-demand/network)

> **A complete, production-ready college food delivery platform** where students can order home-style meals, track orders in real-time, earn reward points, and share feedback. Built with modern web technologies for the ultimate user experience.

![Mess On-Demand Demo]("C:\Users\hp\OneDrive\Desktop\Devix26\Messondemand")

---

## 📋 Table of Contents

- [🌟 Features](#-features)
- [🎯 Problem Statement](#-problem-statement)
- [💡 Solution](#-solution)
- [🖥️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Quick Start](#-quick-start)
- [📦 Installation](#-installation)
- [🔧 Configuration](#-configuration)
- [📡 API Endpoints](#-api-endpoints)
- [🎨 UI Features](#-ui-features)
- [📊 Database Schema](#-database-schema)
- [🚢 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)
- [🙏 Acknowledgements](#-acknowledgements)
- [📞 Contact](#-contact)
- [📈 Project Status](#-project-status)
- [🎯 Roadmap](#-roadmap)
- [📚 Documentation](#-documentation)
- [❓ FAQ](#-faq)
- [💖 Support](#-support)

---

## 🌟 Features

### 🔐 Authentication & Security

| Feature | Description | Implementation |
|---------|-------------|----------------|
| **User Registration** | Students can create accounts with college details | bcrypt password hashing |
| **Secure Login** | JWT-based authentication with 7-day expiry | JSON Web Tokens |
| **Profile Management** | View and update user information | Protected routes |
| **Password Security** | Passwords never stored in plaintext | 10 rounds of bcrypt |
| **Session Persistence** | Stay logged in across browser sessions | localStorage tokens |

**Security Highlights:**
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT tokens with 7-day expiry
- ✅ Protected API routes
- ✅ Input validation & sanitization
- ✅ CORS configuration
- ✅ Environment variables for secrets

### 🍕 Menu Management

| Feature | Description | Details |
|---------|-------------|---------|
| **Full Menu Display** | All items with icons, descriptions, prices | 40+ pre-loaded items |
| **Category Filtering** | Filter by Veg, Non-Veg, All | Real-time filtering |
| **Smart Tag System** | Home-style, Healthy, Special, Festival | Visual badges |
| **Popular Items** | Starred items for quick selection | ⭐ Popular badge |
| **Special Offers** | Discounted items with original price | % OFF badges |
| **Item Details Modal** | Click any item to see full details | Thali items, Tiffin details |
| **24/7 Availability** | All items available anytime | Always on |

**Menu Categories:**
1. **Regular Meals** - Dal Khichdi, Paneer Butter Masala, etc.
2. **Non-Veg Specials** - Chicken Curry, Biryani, Mutton Rogan Josh
3. **Sweets** - Gulab Jamun, Ras Malai, Jalebi
4. **Special Dishes** - Chef's Specials, Signature Dishes
5. **Thali (Complete Meals)** - 7-10 item combos
6. **Tiffin (₹80 Box)** - Budget-friendly daily meals
7. **Offers** - Student Combos, Family Packs

### 🛒 Shopping Cart

| Feature | Description | Interaction |
|---------|-------------|-------------|
| **Add to Cart** | One-click add with + button | Instant feedback |
| **Quantity Management** | Increase/decrease with -/+ | Real-time updates |
| **Item Removal** | Remove items when quantity is 0 | Automatic cleanup |
| **Total Calculation** | Real-time total with subtotals | Live updates |
| **Cart Persistence** | Cart saved in localStorage | Survives page refresh |
| **Clear Cart** | Remove all items at once | Confirmation prompt |

**Cart Experience:**
- Real-time price updates
- Visual quantity indicators
- Smooth animations
- Persistent across sessions
- One-click ordering

### 📦 Order System

| Feature | Description | User Benefit |
|---------|-------------|--------------|
| **Place Order** | Convert cart to order instantly | Fast checkout |
| **Order Confirmation** | Order ID, Total, Delivery Time | Transparency |
| **Order History** | View all past orders | Track spending |
| **Order Status** | Confirmed → Preparing → Out for Delivery → Delivered | Real-time tracking |
| **Cancel Order** | Cancel before delivery | Flexibility |
| **Re-order** | One-click reorder of past orders | Convenience |

**Order Status Flow:**



