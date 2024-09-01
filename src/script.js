const storeItems = {
    1: { id: 1, name: "Always Maxi Duo Sanitary Pads Super Plus x 18", price: 53.95 + (53.95 * 0.4), image: "src/images/always pad pack.jpeg" },
    2: { id: 2, name: "Lil-lets Tampons x32", price: 54.99 + (54.99 * 0.4), image: "src/images/lilets tampons.jpeg" },
    3: { id: 3, name: "Always Sensitive Sanitary Pads Ultra Super Plus", price: 52.95 + (52.95 * 0.4), image: "src/images/Always Sensitive Santary Pads Ultra Super Plus.webp" },
    4: { id: 4, name: "PURA Health Alcohol Wipes Hand Sanitizer", price: 32.50 + (32.50 * 0.4), image: "src/images/Alcohol Wipes Hand Sanitizer.webp" },
    5: {id: 5, name:"Dettol Hand Sanitizer", price:86.45+(86.45*0.4), image:"src/images/Hand Sanitizer.webp"},
    6: {id: 6, name:"Princess Hamper", price:120, image:"src/images/hamper graphic.png"}
};
document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery');
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById('cart-total');
    const cartButton = document.getElementById('cart-button');
    const checkoutSection = document.getElementById('checkout');
    const cartDetails = document.getElementById('cart-details');

    let cart = [];

    function createProductCards() {
        for (let key in storeItems) {
            const product = storeItems[key];

            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.setAttribute('data-id', product.id);

            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.name;
            productCard.appendChild(img);

            const name = document.createElement('h2');
            name.textContent = product.name;
            productCard.appendChild(name);

            const price = document.createElement('p');
            price.textContent = `R${product.price.toFixed(2)}`;
            productCard.appendChild(price);

            const quantityControl = document.createElement('div');
            quantityControl.classList.add('quantity-control');

            const minusButton = document.createElement('button');
            minusButton.textContent = '-';
            minusButton.addEventListener('click', function() {
                updateCartQuantity(product.id, 'decrement');
            });
            quantityControl.appendChild(minusButton);

            const quantityDisplay = document.createElement('span');
            quantityDisplay.classList.add('quantity-display');
            quantityDisplay.textContent = '0';
            quantityControl.appendChild(quantityDisplay);

            const plusButton = document.createElement('button');
            plusButton.textContent = '+';
            plusButton.addEventListener('click', function() {
                updateCartQuantity(product.id, 'increment');
            });
            quantityControl.appendChild(plusButton);

            productCard.appendChild(quantityControl);

            const addToCartButton = document.createElement('button');
            addToCartButton.classList.add('button');
            addToCartButton.textContent = 'Add to Cart';
            addToCartButton.addEventListener('click', function() {
                addToCart(product.id);
            });
            productCard.appendChild(addToCartButton);

            gallery.appendChild(productCard);
        }
    }

    function addToCart(productId) {
        const product = storeItems[productId];
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            const cartItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            };
            cart.push(cartItem);
        }

        updateCart();
        updateProductCardQuantity(productId);
    }

    function updateCartQuantity(productId, action) {
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            if (action === 'increment') {
                existingItem.quantity += 1;
            } else if (action === 'decrement' && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            } else if (action === 'decrement' && existingItem.quantity === 1) {
                cart = cart.filter(item => item.id !== productId);
            }

            updateCart();
            updateProductCardQuantity(productId);
        }
    }

    function updateProductCardQuantity(productId) {
        const productCard = document.querySelector(`.product-card[data-id="${productId}"]`);
        const quantityDisplay = productCard.querySelector('.quantity-display');
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            quantityDisplay.textContent = existingItem.quantity;
        } else {
            quantityDisplay.textContent = '0';
        }
    }

    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        let total = 0;
        let itemCount = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
            itemCount += item.quantity;
        });

        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = itemCount;
        }
        const cartTotal = document.getElementById('cart-total');
        if (cartTotal) {
            cartTotal.textContent = total.toFixed(2);
        }
    }

    cartButton.addEventListener('click', function() {
        // Toggle visibility of checkout section
        checkoutSection.style.display = 'block';
        document.querySelector('header').style.display = 'none';
        document.querySelector('nav').style.display = 'none';
        document.querySelector('.gallery').style.display = 'none';
        document.querySelector('.princess-hamper-information').style.display = 'none';

        // Update order summary in checkout section
        updateOrderSummary();
    });

    function updateOrderSummary() {
        const orderProductsContainer = document.querySelector('.order-products');
        const cartTotalElement = document.getElementById('cart-total');
        const paymentTotalElement = document.getElementById('payment-total');
        
        let cartTotal = 0;
        orderProductsContainer.innerHTML = ''; // Clear existing items

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            cartTotal += itemTotal;

            const productDiv = document.createElement('div');
            productDiv.classList.add('order-item');
            productDiv.innerHTML = `
                <p>${item.name}</p>
                <p>R${item.price.toFixed(2)}</p>
                <p>${item.quantity}</p>
                <p>R${itemTotal.toFixed(2)}</p>
            `;
            orderProductsContainer.appendChild(productDiv);
        });

        const deliveryFee = 35;
        const total = cartTotal + deliveryFee;

        cartTotalElement.textContent = cartTotal.toFixed(2);
        paymentTotalElement.textContent = total.toFixed(2);
    }

    

    // Form submission handling
    const checkoutForm = document.querySelector('#customer-information form');
    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Order Submitted!');
        localStorage.removeItem('cart');
    });

    createProductCards();
});
