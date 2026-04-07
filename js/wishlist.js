// ─── Wishlist Core Logic ───────────────────────────────────────────────────

function getWishlist() {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
}

function saveWishlist(wishlist) {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function isWishlisted(name) {
    return getWishlist().some(item => item.name === name);
}

function toggleWishlist(product) {
    let wishlist = getWishlist();
    const index = wishlist.findIndex(item => item.name === product.name);

    if (index === -1) {
        wishlist.push(product);
        saveWishlist(wishlist);
        return true; // added
    } else {
        wishlist.splice(index, 1);
        saveWishlist(wishlist);
        return false; // removed
    }
}

// ─── Inject Heart Buttons into Product Cards ──────────────────────────────

function setupWishlistButtons() {
    const cards = document.querySelectorAll(".card");
    if (cards.length === 0) return;

    cards.forEach(card => {
        // Avoid double-injecting
        if (card.querySelector(".wishlist-btn")) return;

        const nameEl = card.querySelector("strong");
        const priceEl = card.querySelector("small");
        const imgEl = card.querySelector("img");

        if (!nameEl) return;

        const name = nameEl.innerText.trim();
        const price = priceEl ? Number(priceEl.innerText.replace("₹", "").trim()) : 0;
        const img = imgEl ? imgEl.src : "";

        const liked = isWishlisted(name);

        const btn = document.createElement("button");
        btn.className = "wishlist-btn" + (liked ? " wishlisted" : "");
        btn.title = liked ? "Remove from Wishlist" : "Save to Wishlist";
        btn.setAttribute("aria-label", "Wishlist");
        btn.innerHTML = liked ? "&#10084;" : "&#9825;"; // ❤ vs ♡

        btn.addEventListener("click", () => {
            const product = { name, price, img };
            const added = toggleWishlist(product);
            btn.innerHTML = added ? "&#10084;" : "&#9825;";
            btn.classList.toggle("wishlisted", added);
            btn.title = added ? "Remove from Wishlist" : "Save to Wishlist";

            showWishlistToast(added ? `💛 "${name}" saved to Wishlist!` : `Removed "${name}" from Wishlist`);
        });

        // Place the button absolutely on the card image corner
        card.style.position = "relative";
        card.appendChild(btn);
    });
}

// ─── Toast Notification ───────────────────────────────────────────────────

function showWishlistToast(message) {
    let toast = document.getElementById("wishlist-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "wishlist-toast";
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => toast.classList.remove("show"), 2800);
}

// ─── Wishlist Page Renderer ───────────────────────────────────────────────

function loadWishlistPage() {
    const container = document.getElementById("wishlist-items");
    const countEl = document.getElementById("wishlist-count");
    if (!container) return;

    const wishlist = getWishlist();

    if (countEl) countEl.textContent = wishlist.length;

    if (wishlist.length === 0) {
        container.innerHTML = `
            <div class="wishlist-empty">
                <div class="wishlist-empty-icon">🎁</div>
                <h3>Your wishlist is empty</h3>
                <p>Save products you love by clicking the <strong>♡</strong> heart button on any gift card.</p>
                <a href="index.html" class="btn btn-primary mt-3">Explore Gifts</a>
            </div>`;
        return;
    }

    container.innerHTML = wishlist.map((item, index) => `
        <div class="wishlist-card" id="wcard-${index}">
            <img src="${item.img}" alt="${item.name}" class="wishlist-img" />
            <div class="wishlist-info">
                <h5>${item.name}</h5>
                <p class="wishlist-price">₹${item.price.toLocaleString()}</p>
            </div>
            <div class="wishlist-actions">
                <button class="btn btn-sm btn-outline-primary" onclick="moveToCart(${index})">🛒 Add to Cart</button>
                <button class="btn btn-sm btn-outline-danger" onclick="removeFromWishlist(${index})">🗑 Remove</button>
            </div>
        </div>
    `).join("");
}

function removeFromWishlist(index) {
    let wishlist = getWishlist();
    const removed = wishlist.splice(index, 1)[0];
    saveWishlist(wishlist);
    showWishlistToast(`Removed "${removed.name}" from Wishlist`);
    loadWishlistPage();
}

function moveToCart(index) {
    let wishlist = getWishlist();
    const item = wishlist[index];

    // Use existing cart logic
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(c => c.name === item.name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    showWishlistToast(`🛒 "${item.name}" added to cart!`);
}

// ─── Badge Counter on Nav ─────────────────────────────────────────────────

function updateWishlistBadge() {
    const badge = document.getElementById("wishlist-nav-badge");
    if (!badge) return;
    const count = getWishlist().length;
    badge.textContent = count;
    badge.style.display = count > 0 ? "inline-flex" : "none";
}

// ─── Init ─────────────────────────────────────────────────────────────────

window.addEventListener("DOMContentLoaded", () => {
    setupWishlistButtons();
    updateWishlistBadge();
    loadWishlistPage();
});
