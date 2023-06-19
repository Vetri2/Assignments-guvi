// Rating according to value given
const productItems = document.querySelectorAll(".product-item");
productItems.forEach((item) => {
    const rating = item.getAttribute("data-rating");
    // Perform rating logic based on the value
});

// Disable Add to Cart button when added to cart
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
        button.disabled = true;
        button.classList.add("added-to-cart");
        button.textContent = "Added to Cart";
        // Add item to cart logic
    });
});

// Remove item from cart and enable Add to Cart button
const removeButtons = document.querySelectorAll(".remove");
removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const item = button.closest(".cart-item");
        // Remove item from cart logic
        const addToCartButton = item.querySelector(".add-to-cart");
        addToCartButton.disabled = false;
        addToCartButton.classList.remove("added-to-cart");
        addToCartButton.textContent = "Add to Cart";
    });
});
