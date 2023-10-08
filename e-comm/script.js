class ShoppingCart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem("cart")) || [];
        this.cartContainer = document.createElement("div");
        this.cartContainer.className = "cart-container";
        document.body.appendChild(this.cartContainer);
        this.products = [
            // Your product data goes here
            {
                id: 1,
                image: "image/athletic-cotton-socks-6-pairs.jpg",
                name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                rating: {
                  stars: 4.5,
                  count: 87
                },
                priceRupees: 1090,
                keywords: [
                  "socks",
                  "sports",
                  "apparel"
                ]
                },
                {
                    id: 2,
                    image: "image/intermediate-composite-basketball.jpg",
                    name: "Intermediate Size Basketball",
                    rating: {
                      stars: 4,
                      count: 127
                    },
                    priceRupees : 2095,
                    keywords : [
                      "sports",
                      "basketballs"
                    ] 
                },
                {
                    id: 3,
                image: "image/adults-plain-cotton-tshirt-2-pack-teal.jpg",
                name: "Adults Plain Cotton T-Shirt - 2 Pack",
                rating: {
                  stars: 4.5,
                  count: 56
                },
                priceRupees: 799,
                keywords: [
                  "tshirts",
                  "apparel",
                  "mens"
                ]
                }

        ];
        this.productsContainer = document.getElementById("products");
        this.viewCartLink = document.getElementById("view-cart");

        this.viewCartLink.addEventListener("click", () => this.updateCartDisplay());
        document.addEventListener("click", (event) => this.closeCart(event));
        
        this.renderProducts();
        this.updateCartDisplay();
    }

    renderProducts() {
        this.products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.className = "product";
            productDiv.innerHTML = `
                <img src="${product.image}">
                <h3>${product.name}</h3>
                <p>Rs${product.priceRupees}</p>
                <p>Rating: ${product.rating.stars} Count: ${product.rating.count}<br><br>
                <button onclick="shoppingCart.addToCart(${product.id})">Add to Cart</button>
            `;
            this.productsContainer.appendChild(productDiv);
        });
    }

    // Inside the ShoppingCart class
    addToCart = function (productId) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const product = Array.isArray(products) ? products.find(p => p.id === productId) : null;
    
        if (product) {
            const existingItemIndex = cart.findIndex(item => item.id === productId);
    
            if (existingItemIndex !== -1) {
                // If the product is already in the cart, increment the quantity
                cart[existingItemIndex].quantity += 1;
            } else {
                // If the product is not in the cart, add it
                cart.push({
                    id: productId,
                    quantity: 1,
                    name: product.name,
                    priceRupees: product.priceRupees,
                });
            }
    
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCart();
        } else {
            console.error(`Product with ID ${productId} not found.`);
        }
    };
    
    
updateCartDisplay() {
    this.cartContainer.innerHTML = "<h2>Shopping Cart</h2>";
    let total = 0;

    this.cart.forEach(item => {
        if (item && item.name && item.priceRupees && item.quantity) {
            const priceRupees = parseFloat(item.priceRupees);

            if (!isNaN(priceRupees)) {
                const cartItem = document.createElement("div");
                cartItem.className = "cart-item";

                cartItem.innerHTML = `
                    <p>Name: ${item.name}</p>
                    <p>Price: Rs${priceRupees.toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Total: Rs${(priceRupees * item.quantity).toFixed(2)}</p>
                `;
                this.cartContainer.appendChild(cartItem);
                total += priceRupees * item.quantity;
            } else {
                console.error(`Invalid priceRupees for item:`, item);
            }
        } else {
            console.error(`Invalid item in cart:`, item);
        }
    });

    const totalElement = document.createElement("div");
    totalElement.id = "total";
    totalElement.textContent = `Total: Rs${total.toFixed(2)}`;
    this.cartContainer.appendChild(totalElement);
}


    closeCart(event) {
        if (event.target !== this.viewCartLink && !this.cartContainer.contains(event.target)) {
            this.cartContainer.style.display = "none";
        }
    }
}

const shoppingCart = new ShoppingCart();
