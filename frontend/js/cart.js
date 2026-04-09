console.log("cart.js loaded");

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existing = cart.find(item => item.name === product.name);

    if (existing) {
        existing.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(product.name + " added to cart!");
}



function setupAddToCartButtons() {
    const buttons = document.querySelectorAll(".addcart");
    if (buttons.length === 0) return;

    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".card");

            const product = {
                name: card.querySelector("strong").innerText,
                price: Number(card.querySelector("small").innerText.replace("₹", "")),
                img: card.querySelector("img").src
            };

            addToCart(product);
        });
    });
}


function loadCartPage() {
    const container = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");

    if (!container || !totalEl) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    container.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        container.innerHTML += `
            <div class="d-flex align-items-center mb-3 p-3 border rounded">
                <img src="${item.img}" width="80" class="me-3" />
                
                <div style="flex-grow:1">
                    <h5>${item.name}</h5>
                    <p>₹${item.price}</p>

                    <!-- Quantity Controls -->
                    <div class="d-flex align-items-center gap-2">
                        <button class="btn btn-sm btn-outline-secondary" onclick="decreaseQty(${index})">−</button>
                        <span class="px-2">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary" onclick="increaseQty(${index})">+</button>
                    </div>
                </div>

                <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">
                    Remove
                </button>
            </div>
        `;
    });

    totalEl.textContent = total;
}



function increaseQty(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartPage();
}

function decreaseQty(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartPage();
}



function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartPage();
}

window.onload = () => {
    setupAddToCartButtons();
    loadCartPage();
};


function decreaseQty(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } 
    else {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartPage();
}
