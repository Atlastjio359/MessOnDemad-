// ============================================================
// ORDERS PAGE - COMPLETE FUNCTIONALITY
// ============================================================

let currentOrderFilter = 'all';
let allOrders = [];

// ============================================================
// FETCH ORDERS FROM BACKEND
// ============================================================

async function fetchOrders() {
    try {
        const token = localStorage.getItem('messToken');
        if (!token) {
            return [];
        }

        const response = await fetch(`${API_URL}/orders`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const result = await response.json();
        
        if (result.success) {
            allOrders = result.data || [];
            return allOrders;
        } else {
            console.error('Error fetching orders:', result.message);
            return [];
        }
    } catch (error) {
        console.error('Fetch Orders Error:', error);
        return [];
    }
}

// ============================================================
// RENDER ORDERS
// ============================================================

async function renderOrders() {
    const container = document.getElementById('ordersList');
    if (!container) return;

    // Show loading state
    container.innerHTML = `
        <div style="text-align:center;padding:60px 20px;">
            <div style="font-size:3rem;margin-bottom:20px;">⏳</div>
            <h3 style="color:var(--text-muted);">Loading orders...</h3>
        </div>
    `;

    // Fetch orders
    const orders = await fetchOrders();

    // Update stats
    updateOrderStats(orders);

    // Filter orders
    let filteredOrders = orders;
    if (currentOrderFilter !== 'all') {
        filteredOrders = orders.filter(o => o.status === currentOrderFilter);
    }

    if (filteredOrders.length === 0) {
        container.innerHTML = `
            <div style="text-align:center;padding:60px 20px;background:var(--glass);border-radius:var(--radius);border:1px solid var(--glass-border);">
                <i class="fas fa-utensils" style="font-size:4rem;color:var(--text-muted);opacity:0.2;"></i>
                <h3 style="color:var(--text-muted);margin:15px 0 8px;">
                    ${orders.length === 0 ? 'No orders yet' : 'No ' + currentOrderFilter + ' orders'}
                </h3>
                <p style="color:var(--text-muted);opacity:0.6;margin-bottom:20px;">
                    ${orders.length === 0 ? 'Start ordering delicious meals now!' : 'Try a different filter'}
                </p>
                ${orders.length === 0 ? `
                <button class="btn btn-primary" onclick="switchPage('menu')">
                    <i class="fas fa-utensil-spoon"></i> Browse Menu
                </button>
                ` : `
                <button class="btn btn-outline" onclick="filterOrders('all')">
                    <i class="fas fa-list"></i> Show All Orders
                </button>
                `}
            </div>
        `;
        return;
    }

    let html = '<div style="display:flex;flex-direction:column;gap:20px;">';
    
    filteredOrders.forEach((order, index) => {
        const orderDate = new Date(order.createdAt);
        const formattedDate = orderDate.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
        const formattedTime = orderDate.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit'
        });

        // Check if order has been reviewed
        const hasRating = reviews.some(r => r.orderId === order.id);
        
        // Get status color
        const statusColors = {
            'confirmed': '#00b894',
            'preparing': '#fdcb6e',
            'out-for-delivery': '#6c5ce7',
            'delivered': '#00b894',
            'cancelled': '#e17055'
        };
        
        const statusIcons = {
            'confirmed': '✅',
            'preparing': '👨‍🍳',
            'out-for-delivery': '🚚',
            'delivered': '🏠',
            'cancelled': '❌'
        };

        // Order items list
        let itemsHtml = '';
        order.items.forEach(item => {
            itemsHtml += `
                <div style="display:flex;justify-content:space-between;padding:6px 0;color:var(--text-muted);font-size:0.95rem;border-bottom:1px solid var(--glass-border);">
                    <span>
                        <span style="font-size:1.2rem;">${item.icon || '🍽️'}</span>
                        ${item.name} 
                        <span style="color:var(--text-muted);font-size:0.8rem;">× ${item.quantity}</span>
                    </span>
                    <span style="font-weight:600;color:var(--text);">₹${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `;
        });

        html += `
            <div style="background:var(--glass);border-radius:16px;padding:20px;border:1px solid var(--glass-border);transition:all 0.3s ease;position:relative;overflow:hidden;" 
                 onmouseenter="this.style.transform='translateY(-4px)'" 
                 onmouseleave="this.style.transform='translateY(0)'">
                
                <!-- Order Header -->
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--glass-border);">
                    <div>
                        <span style="font-weight:700;color:var(--text);font-size:1.1rem;">
                            <i class="fas fa-hashtag" style="color:var(--accent);"></i> ${order.id}
                        </span>
                        <span style="color:var(--text-muted);font-size:0.85rem;margin-left:12px;">
                            <i class="far fa-calendar-alt"></i> ${formattedDate} at ${formattedTime}
                        </span>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px;">
                        <span style="padding:4px 14px;border-radius:20px;font-weight:600;font-size:0.75rem;text-transform:uppercase;background:${statusColors[order.status] || '#6c5ce7'}22;color:${statusColors[order.status] || '#6c5ce7'};border:1px solid ${statusColors[order.status] || '#6c5ce7'}44;">
                            ${statusIcons[order.status] || '📦'} ${order.status || 'confirmed'}
                        </span>
                        ${order.status === 'delivered' && !hasRating ? `
                            <span style="padding:4px 10px;border-radius:20px;background:#fd79a822;color:#fd79a8;font-size:0.7rem;font-weight:600;">
                                <i class="fas fa-star"></i> Rate Now
                            </span>
                        ` : ''}
                    </div>
                </div>

                <!-- Order Items -->
                <div style="background:rgba(255,255,255,0.02);border-radius:12px;padding:12px;margin:8px 0;">
                    ${itemsHtml}
                </div>

                <!-- Order Total & Delivery -->
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;margin-top:12px;padding-top:12px;border-top:1px solid var(--glass-border);">
                    <div>
                        <div style="font-size:1.2rem;font-weight:700;color:var(--text);">
                            Total: <span style="color:var(--accent);">₹${order.total.toFixed(2)}</span>
                        </div>
                        ${order.deliveryAddress ? `
                            <div style="color:var(--text-muted);font-size:0.8rem;margin-top:4px;">
                                <i class="fas fa-map-marker-alt" style="color:var(--accent);"></i> 
                                ${order.deliveryAddress.room || 'N/A'} • ${order.deliveryAddress.university || 'N/A'}
                            </div>
                        ` : ''}
                    </div>
                    <div style="color:var(--text-muted);font-size:0.9rem;text-align:right;">
                        <div><i class="fas fa-clock" style="color:var(--accent);"></i> ${order.deliveryTime || '30-40 min'}</div>
                        <div style="font-size:0.8rem;margin-top:4px;">
                            ${order.status === 'delivered' ? '✅ Delivered' : '🚚 In Progress'}
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:15px;padding-top:12px;border-top:1px solid var(--glass-border);">
                    ${order.status === 'delivered' && !hasRating ? `
                        <button class="btn btn-sm btn-secondary" onclick="rateOrder(${order.id})">
                            <i class="fas fa-star"></i> Rate This Order
                        </button>
                    ` : ''}
                    
                    ${hasRating ? `
                        <span style="padding:4px 12px;border-radius:20px;background:rgba(253,203,110,0.15);color:var(--accent);font-size:0.85rem;display:inline-flex;align-items:center;gap:5px;">
                            <i class="fas fa-check-circle"></i> Rated ⭐
                        </span>
                    ` : ''}

                    <button class="btn btn-sm btn-primary" onclick="reorder(${order.id})">
                        <i class="fas fa-redo"></i> Re-order
                    </button>
                    
                    <button class="btn btn-sm btn-outline" onclick="trackOrder(${order.id})">
                        <i class="fas fa-search-location"></i> Track
                    </button>

                    ${order.status !== 'cancelled' && order.status !== 'delivered' ? `
                        <button class="btn btn-sm btn-danger" onclick="cancelOrder(${order.id})">
                            <i class="fas fa-times"></i> Cancel Order
                        </button>
                    ` : ''}

                    <button class="btn btn-sm btn-success" onclick="shareOrder(${order.id})">
                        <i class="fas fa-share-alt"></i> Share
                    </button>
                </div>

                <!-- Progress Bar for Active Orders -->
                ${order.status !== 'delivered' && order.status !== 'cancelled' ? `
                    <div style="margin-top:15px;padding:10px;background:rgba(255,255,255,0.03);border-radius:10px;">
                        <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
                            <span style="font-size:0.75rem;color:var(--text-muted);">Order Status</span>
                            <span style="font-size:0.75rem;color:var(--accent);font-weight:600;">${order.status}</span>
                        </div>
                        <div style="width:100%;height:6px;background:var(--glass-border);border-radius:3px;overflow:hidden;">
                            <div style="height:100%;background:linear-gradient(90deg,var(--accent),var(--primary));border-radius:3px;width:${getProgressWidth(order.status)}%;transition:width 0.5s ease;"></div>
                        </div>
                        <div style="display:flex;justify-content:space-between;margin-top:4px;">
                            <span style="font-size:0.6rem;color:var(--text-muted);">Confirmed</span>
                            <span style="font-size:0.6rem;color:var(--text-muted);">Preparing</span>
                            <span style="font-size:0.6rem;color:var(--text-muted);">Out for Delivery</span>
                            <span style="font-size:0.6rem;color:var(--text-muted);">Delivered</span>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;

    // Update filter button styles
    updateFilterButtons();
}

// ============================================================
// GET PROGRESS WIDTH FOR STATUS BAR
// ============================================================

function getProgressWidth(status) {
    const progress = {
        'confirmed': 25,
        'preparing': 50,
        'out-for-delivery': 75,
        'delivered': 100,
        'cancelled': 0
    };
    return progress[status] || 0;
}

// ============================================================
// UPDATE ORDER STATISTICS
// ============================================================

function updateOrderStats(orders) {
    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
    
    // Calculate average rating from reviews
    let avgRating = 0;
    if (reviews.length > 0) {
        const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
        avgRating = totalRating / reviews.length;
    }

    // Get reward points from user
    const points = currentUser ? currentUser.rewardPoints || 0 : 0;

    document.getElementById('totalOrders').textContent = totalOrders;
    document.getElementById('totalSpent').textContent = `₹${totalSpent.toFixed(0)}`;
    document.getElementById('avgOrderRating').textContent = avgRating.toFixed(1);
    document.getElementById('rewardPoints').textContent = points;
}

// ============================================================
// FILTER ORDERS
// ============================================================

function filterOrders(filter) {
    currentOrderFilter = filter;
    renderOrders();
}

function updateFilterButtons() {
    const filters = ['all', 'confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'];
    filters.forEach(f => {
        const btn = document.getElementById(`filter${f.charAt(0).toUpperCase() + f.slice(1).replace('-', '')}`);
        if (btn) {
            if (f === currentOrderFilter) {
                btn.className = 'btn btn-sm btn-primary';
            } else {
                btn.className = 'btn btn-sm btn-outline';
            }
        }
    });
}

// ============================================================
// RE-ORDER FUNCTION
// ============================================================

async function reorder(orderId) {
    try {
        const token = localStorage.getItem('messToken');
        if (!token) {
            showFlash('⚠️ Please login first.', 'danger');
            return;
        }

        const response = await fetch(`${API_URL}/orders/${orderId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const result = await response.json();
        
        if (result.success) {
            const order = result.data;
            
            // Clear current cart
            cart = [];
            
            // Add items from the order to cart
            order.items.forEach(item => {
                const existing = cart.find(c => c.id === item.id);
                if (existing) {
                    existing.quantity += item.quantity;
                } else {
                    cart.push({
                        id: item.id,
                        name: item.name,
                        icon: item.icon || '🍽️',
                        price: item.price,
                        quantity: item.quantity
                    });
                }
            });
            
            // Save cart
            localStorage.setItem('messCart', JSON.stringify(cart));
            
            // Update cart display
            renderCart();
            showFlash(`🔄 ${order.items.length} items added to cart!`);
            switchPage('menu');
        } else {
            showFlash('❌ ' + result.message, 'danger');
        }
    } catch (error) {
        console.error('Re-order Error:', error);
        showFlash('❌ Error re-ordering. Please try again.', 'danger');
    }
}

// ============================================================
// TRACK ORDER
// ============================================================

function trackOrder(orderId) {
    // Find the order
    const order = allOrders.find(o => o.id === orderId);
    if (!order) {
        showFlash('❌ Order not found', 'danger');
        return;
    }

    const statusMessages = {
        'confirmed': '✅ Order confirmed! Your food is being prepared.',
        'preparing': '👨‍🍳 Your food is being prepared by our chefs!',
        'out-for-delivery': '🚚 Your order is on the way!',
        'delivered': '🏠 Order delivered! Enjoy your meal!',
        'cancelled': '❌ This order has been cancelled.'
    };

    showFlash(`
        📦 Order #${orderId} - ${order.status.toUpperCase()}
        ${statusMessages[order.status] || 'Order in progress'}
        ⏱️ Delivery Time: ${order.deliveryTime || '30-40 min'}
    `, 'info');
}

// ============================================================
// CANCEL ORDER
// ============================================================

async function cancelOrder(orderId) {
    if (!confirm(`Are you sure you want to cancel order #${orderId}?`)) {
        return;
    }

    try {
        const token = localStorage.getItem('messToken');
        if (!token) {
            showFlash('⚠️ Please login first.', 'danger');
            return;
        }

        // In a real app, you would have a PUT/PATCH endpoint
        // For now, we'll simulate cancellation
        const response = await fetch(`${API_URL}/orders/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status: 'cancelled' })
        });

        const result = await response.json();
        
        if (result.success) {
            showFlash(`✅ Order #${orderId} cancelled successfully.`);
            renderOrders();
        } else {
            showFlash('❌ ' + result.message, 'danger');
        }
    } catch (error) {
        console.error('Cancel Order Error:', error);
        showFlash('❌ Error cancelling order. Please try again.', 'danger');
    }
}

// ============================================================
// SHARE ORDER
// ============================================================

function shareOrder(orderId) {
    const order = allOrders.find(o => o.id === orderId);
    if (!order) {
        showFlash('❌ Order not found', 'danger');
        return;
    }

    const shareText = `
🍽️ Just ordered from Mess On-Demand!
📦 Order #${orderId}
💰 Total: ₹${order.total.toFixed(2)}
📅 ${new Date(order.createdAt).toLocaleDateString()}
✅ Status: ${order.status}

Delicious meals delivered fresh! 🚀
    `.trim();

    if (navigator.share) {
        navigator.share({
            title: 'My Mess On-Demand Order',
            text: shareText
        }).catch(() => {});
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            showFlash('📋 Order details copied to clipboard!');
        }).catch(() => {
            // Manual copy
            prompt('Copy this text:', shareText);
        });
    }
}

// ============================================================
// RATE ORDER (Navigate to Ratings)
// ============================================================

function rateOrder(orderId) {
    const order = allOrders.find(o => o.id === orderId);
    if (!order) {
        showFlash('❌ Order not found', 'danger');
        return;
    }

    // Switch to ratings page
    switchPage('ratings');
    
    // Pre-fill the review form
    if (order.items && order.items.length > 0) {
        document.getElementById('reviewItem').value = order.items[0].name;
    }
    
    // Store order ID for review submission
    document.getElementById('reviewOrderId').value = orderId;
    
    // Set reviewer name
    if (currentUser) {
        document.getElementById('reviewerName').value = currentUser.name;
    }
    
    // Focus on text area
    setTimeout(() => {
        document.getElementById('reviewText').focus();
    }, 500);
    
    showFlash(`📝 Please rate your order #${orderId}!`, 'info');
}

// ============================================================
// AUTO-REFRESH ORDERS (Every 30 seconds)
// ============================================================

let orderRefreshInterval = null;

function startOrderAutoRefresh() {
    if (orderRefreshInterval) {
        clearInterval(orderRefreshInterval);
    }
    orderRefreshInterval = setInterval(() => {
        // Only refresh if orders page is visible
        const ordersPage = document.getElementById('pageOrders');
        if (ordersPage && ordersPage.classList.contains('active')) {
            renderOrders();
        }
    }, 30000); // Refresh every 30 seconds
}

// ============================================================
// INITIALIZE ORDERS PAGE
// ============================================================

// Call this when page loads or when switching to orders page
function initOrdersPage() {
    renderOrders();
    startOrderAutoRefresh();
}

// Override switchPage to initialize orders when page is shown
const originalSwitchPage = switchPage;
switchPage = function(page) {
    originalSwitchPage(page);
    if (page === 'orders') {
        initOrdersPage();
    }
};

// ============================================================
// ADD HIDDEN FIELD FOR ORDER ID IN REVIEW FORM
// ============================================================

// Add this to your HTML ratings section (or dynamically)
document.addEventListener('DOMContentLoaded', function() {
    // Add hidden input for order ID if it doesn't exist
    const reviewForm = document.querySelector('.rating-section .form-group:last-child');
    if (reviewForm && !document.getElementById('reviewOrderId')) {
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.id = 'reviewOrderId';
        hiddenInput.value = '';
        reviewForm.parentNode.insertBefore(hiddenInput, reviewForm);
    }
});

// Update submitReview to use order ID
const originalSubmitReview = submitReview;
submitReview = function() {
    const orderId = document.getElementById('reviewOrderId')?.value;
    if (orderId) {
        // Pass order ID to review submission
        const reviewData = {
            rating: selectedRating,
            item: document.getElementById('reviewItem').value.trim() || 'General',
            text: document.getElementById('reviewText').value.trim(),
            orderId: parseInt(orderId)
        };
        // Submit review with order ID
        originalSubmitReview.call(this, reviewData);
    } else {
        originalSubmitReview.call(this);
    }
};