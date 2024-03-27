// script.js

// Function to handle button click event
function handleAddToCart() {
    alert("Item added to cart!");
}

// Add event listeners to all "Add to Cart" buttons
document.addEventListener("DOMContentLoaded", function() {
    var addToCartButtons = document.querySelectorAll(".product button");
    addToCartButtons.forEach(function(button) {
        button.addEventListener("click", handleAddToCart);
    });
});
