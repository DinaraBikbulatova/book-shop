
const productsData = [
    { id: 1, name: "Если все кошки в мире исчезнут", price: 450, category: "философия", page: "product.html" },
    { id: 2, name: "Оно", price: 650, category: "ужасы", page: "product2.html" },
    { id: 3, name: "Вечеринка в Хэллоуин", price: 380, category: "детектив", page: "product3.html" }
];


let cart = [];


const addToCart = (productId) => {
    const product = productsData.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        renderCart();
        alert(`"${product.name}" добавлена в корзину`);
    }
};


const removeFromCart = (index) => {
    cart.splice(index, 1);
    renderCart();
};


const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
};

// Функция отображения корзины
const renderCart = () => {
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartList || !cartTotal) return;
    
    if (cart.length === 0) {
        cartList.innerHTML = '<li style="text-align: center; color: #6c757d; list-style: none;">Корзина пуста</li>';
        cartTotal.textContent = 'Итого: 0 ₽';
        return;
    }
    
    cartList.innerHTML = cart.map((item, index) => `
        <li class="cart-item" style="list-style: none;">
            <span>${item.name}</span>
            <div class="cart-item-info">
                <span>${item.price} ₽</span>
                <button class="remove-btn" data-index="${index}">✖</button>
            </div>
        </li>
    `).join('');
    
    cartTotal.textContent = `Итого: ${calculateTotal()} ₽`;
    
    
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(btn.dataset.index);
            removeFromCart(index);
        });
    });
};

// Функция оплаты
const checkout = () => {
    if (cart.length === 0) {
        alert('Корзина пуста! Добавьте товары для оплаты.');
    } else {
        alert('Покупка прошла успешно! Спасибо за заказ.');
        cart = [];
        renderCart();
    }
};


const filterProducts = (category) => {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const cardCategory = card.dataset.category;
        if (category === 'все' || cardCategory === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
};

// Инициализация страницы
document.addEventListener('DOMContentLoaded', () => {
    // Фильтр на странице каталога
    const filterSelect = document.getElementById('category-filter');
    if (filterSelect) {
        filterSelect.addEventListener('change', (e) => {
            filterProducts(e.target.value);
        });
    }
    
    // Кнопки "Добавить в корзину" (только на странице каталога)
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(btn.dataset.id);
            addToCart(productId);
        });
    });

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
});