console.log("cart.js loaded");

// Helper function to get auth headers
function getAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
}

// Check if user is logged in
function isLoggedIn() {
    return !!localStorage.getItem("token");
}

async function addToCart(product) {
    if (!isLoggedIn()) {
        alert("Please login to add items to cart");
        window.location.href = "./login.html";
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/cart/add", {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({
                name: product.name,
                price: product.price,
                image: product.image || product.img
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Failed to add to cart");
            return;
        }

        alert(product.name + " added to cart!");
        loadCartPage(); // Refresh cart display

    } catch (error) {
        console.error("Error adding to cart:", error);
        alert("Something went wrong");
    }
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
                image: card.querySelector("img").src
            };

            addToCart(product);
        });
    });
}

async function loadCartPage() {
    const container = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");

    if (!container || !totalEl) return;

    if (!isLoggedIn()) {
        container.innerHTML = "<p>Please login to view your cart</p>";
        totalEl.textContent = "0";
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/cart", {
            headers: getAuthHeaders()
        });

        const cart = await response.json();

        if (!response.ok) {
            container.innerHTML = "<p>Error loading cart</p>";
            return;
        }

        container.innerHTML = "";
        let total = 0;

        cart.items.forEach((item) => {
            total += item.price * item.quantity;

            container.innerHTML += `
                <div class="d-flex align-items-center mb-3 p-3 border rounded">
                    <img src="${item.image}" width="80" class="me-3" />

                    <div style="flex-grow:1">
                        <h5>${item.name}</h5>
                        <p>₹${item.price}</p>

                        <!-- Quantity Controls -->
                        <div class="d-flex align-items-center gap-2">
                            <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity('${item.name}', ${item.quantity - 1})">−</button>
                            <span class="px-2">${item.quantity}</span>
                            <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity('${item.name}', ${item.quantity + 1})">+</button>
                        </div>
                    </div>

                    <button class="btn btn-sm btn-danger" onclick="removeItem('${item.name}')">
                        Remove
                    </button>
                </div>
            `;
        });

        totalEl.textContent = total;

    } catch (error) {
        console.error("Error loading cart:", error);
        container.innerHTML = "<p>Error loading cart</p>";
    }
}

async function updateQuantity(name, quantity) {
    if (!isLoggedIn()) return;

    try {
        const response = await fetch("http://localhost:5000/api/cart/update", {
            method: "PATCH",
            headers: getAuthHeaders(),
            body: JSON.stringify({ name, quantity })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Failed to update quantity");
            return;
        }

        loadCartPage(); // Refresh cart

    } catch (error) {
        console.error("Error updating quantity:", error);
        alert("Something went wrong");
    }
}

async function removeItem(name) {
    if (!isLoggedIn()) return;

    try {
        const response = await fetch(`http://localhost:5000/api/cart/remove/${encodeURIComponent(name)}`, {
            method: "DELETE",
            headers: getAuthHeaders()
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Failed to remove item");
            return;
        }

        loadCartPage(); // Refresh cart

    } catch (error) {
        console.error("Error removing item:", error);
        alert("Something went wrong");
    }
}

window.onload = () => {
    setupAddToCartButtons();
    loadCartPage();
};
