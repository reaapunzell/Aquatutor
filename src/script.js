const storeItems = {
    1: { id: 1, name: "Always Maxi Duo Sanitary Pads Super Plus x 18", price: 53.95 +(53.95*0.4), image: "src/images/always pad pack.jpeg" },
    2: { id: 2, name: "Lil-lets Tampons x32", price: 54.99 + (54.99*0.4), image: "src/images/lilets tampons.jpeg" },
    3: {id: 3, name: "Always Sensitive Santary Pads Ultra Super Plus", price: 52.95 + (52.95*0.4), image:"src/images/Always Sensitive Santary Pads Ultra Super Plus.webp"},
    4: { id: 4, name: "PURA HealthAlcohol Wipes Hand Sanitizer", price: 32.50+(32.50*0.4), image: "src/images/Alcohol Wipes Hand Sanitizer.webp"}
};

document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery');
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById('cart-total');

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

            const button = document.createElement('button');
            button.classList.add('add-to-cart');
            button.textContent = 'Add to Cart';
            button.addEventListener('click', function() {
                addToCart(product.id);
            });
            productCard.appendChild(button);

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
    }

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} x ${item.quantity} - R${(item.price * item.quantity).toFixed(2)}`;
            cartItems.appendChild(li);

            total += item.price * item.quantity;
        });
        cartTotal.textContent = total.toFixed(2);
    }

    createProductCards();
});
