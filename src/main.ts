// src/main.ts

document.addEventListener('DOMContentLoaded', () => {
    console.log("Admin Panel loaded.");

    // منطق برای Card View Toggle
    const cardViewToggle = document.getElementById('cardViewToggle') as HTMLInputElement;
    const toggleHandle = document.querySelector('#cardViewToggle + .toggle-switch-track .toggle-switch-handle') as HTMLElement; // انتخاب دقیق handle
    const orderGrid = document.querySelector('.order-grid') as HTMLElement; // المنت گرید سفارشات

    if (cardViewToggle && toggleHandle && orderGrid) {
        // تابع برای به‌روزرسانی حالت نمایش کارت‌ها بر اساس وضعیت تاگل
        const updateCardView = () => {
            if (cardViewToggle.checked) {
                toggleHandle.style.transform = 'translateX(24px)'; // به سمت راست
                toggleHandle.style.backgroundColor = 'var(--color-blue-500)'; // رنگ آبی
                orderGrid.classList.add('card-view-active');
                console.log('Card View is Active');
            } else {
                toggleHandle.style.transform = 'translateX(0)'; // به سمت چپ (موقعیت اولیه)
                toggleHandle.style.backgroundColor = 'var(--color-white)'; // رنگ سفید
                orderGrid.classList.remove('card-view-active');
                console.log('Card View is Inactive');
            }
        };

        // اضافه کردن event listener برای تغییر حالت
        cardViewToggle.addEventListener('change', updateCardView);

        // برای اطمینان از اعمال وضعیت اولیه هنگام بارگذاری صفحه
        updateCardView();
    }


    // Example: Handle filter changes (checkboxes/radio buttons)
    const filterCheckboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"][id^="filter"], input[type="radio"][name="recentOrders"]');
    filterCheckboxes.forEach(input => {
        input.addEventListener('change', (event) => {
            const target = event.target as HTMLInputElement;
            console.log(`Filter "${target.id}" changed to: ${target.checked || target.value}`);
            // Here you would implement logic to filter the displayed orders
            // e.g., fetch data based on filters or hide/show existing cards
        });
    });

    // Example: Dynamic order data (simple example)
    interface Order {
        id: string;
        customerName: string;
        customerID: string;
        total: number;
        items: { name: string; qty: number }[];
        notes: string;
        status: 'new' | 'in-progress' | 'ready' | 'cancelled';
    }

    const orders: Order[] = [
        { id: "S-01", customerName: "Alex Trie", customerID: "C-001", total: 27.50, items: [{ name: "Grilled Salmon with Vegetables", qty: 1 }, { name: "Garden Salad", qty: 1 }], notes: "No dressing on the salad.", status: "new" },
        { id: "D-38", customerName: "Jerome Bell", customerID: "C-002", total: 31.00, items: [{ name: "Beef Steak", qty: 1 }, { name: "Mashed Potatoes", qty: 1 }], notes: "Steak well-done, no gravy on potatoes.", status: "in-progress" },
        { id: "S-22", customerName: "Annette Black", customerID: "C-003", total: 39.50, items: [{ name: "Chicken Curry with Basmati Rice", qty: 1 }, { name: "Garden Salad", qty: 1 }], notes: "Mild spice level.", status: "ready" },
        // Add more orders as needed
    ];

    // Function to render orders (example - you'd likely make this more dynamic)
    function renderOrders(currentOrders: Order[]) {
        const orderListContainer = document.querySelector('.order-grid') as HTMLElement;
        if (orderListContainer) {
            orderListContainer.innerHTML = ''; // Clear existing orders

            currentOrders.forEach(order => {
                let statusClass = '';
                let statusText = '';
                if (order.status === 'new') {
                    statusClass = 'new';
                    statusText = 'New';
                } else if (order.status === 'in-progress') {
                    statusClass = 'in-progress';
                    statusText = 'In Progress';
                } else if (order.status === 'ready') {
                    statusClass = 'ready-to-serve';
                    statusText = 'Ready to Serve';
                } else if (order.status === 'cancelled') {
                    statusClass = 'cancelled';
                    statusText = 'Cancelled';
                }

                const orderCardHtml = `
                    <div class="order-card ${statusClass}">
                        <div class="card-header-top flex-container justify-between">
                            <div class="order-customer-info flex-container items-center">
                                <img src="https://via.placeholder.com/50" alt="Customer Avatar" class="customer-avatar">
                                <div>
                                    <p class="customer-name">${order.customerName}</p>
                                    <p class="customer-id">${order.customerID}</p>
                                </div>
                            </div>
                            <span class="order-status-badge">${statusText}</span>
                        </div>
                        <div class="order-total-price">$${order.total.toFixed(2)}</div>
                        <ul class="order-items-list flex-col space-y-2">
                            ${order.items.map(item => `
                                <li class="order-item flex-container justify-between items-center">
                                    <span class="item-name">${item.name}</span>
                                    <span class="item-qty">${item.qty}x</span>
                                </li>
                            `).join('')}
                        </ul>
                        <p class="order-notes">${order.notes}</p>
                        <button class="order-details-button">Order Details</button>
                    </div>
                `;
                orderListContainer.insertAdjacentHTML('beforeend', orderCardHtml);
            });
        }
    }

    // Initial render of orders
    renderOrders(orders);
});