// Function to add an item to the cart
function addToCart(itemName, itemPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const newItem = {
        name: itemName,
        price: itemPrice,
        quantity: 1
    };

    const existingItemIndex = cart.findIndex(item => item.name === itemName);
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push(newItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Function to load the cart from localStorage on page load
function loadCart() {
    updateCartDisplay();
}

function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear existing items

    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item'); // Add the cart-item class

        const itemText = document.createElement('span');
        itemText.classList.add('item-text'); // Add the item-text class
        itemText.textContent = `${item.name} - R$${item.price} x ${item.quantity}`;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-button'); // Add the remove-button class
        
        // Create the icon element
        const icon = document.createElement('i');
        icon.className = 'fi fi-br-cross-circle'; // Set the icon class
        
        // Append the icon to the button
        removeButton.appendChild(icon);
        
        // Set the onclick event for the button
        removeButton.onclick = () => removeFromCart(index); // Call remove function with index

        itemDiv.appendChild(itemText); // Append the item text to the item div
        itemDiv.appendChild(removeButton); // Append the remove button to the item div
        cartItemsContainer.appendChild(itemDiv); // Append the item div to the cart items container
    });

    // Update total price
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total').textContent = total.toFixed(2); // Format to 2 decimal places
}

function removeFromCart(index) {
    // Get the current cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the item exists and its quantity
    if (cart[index].quantity > 1) {
        // Decrease the quantity by 1
        cart[index].quantity -= 1;
    } else {
        // If quantity is 1, remove the item from the cart
        cart.splice(index, 1);
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart display
    updateCartDisplay();
}
// Function to handle checkout
function checkout() {
    alert("Proceeding to checkout...");
}

// Function to toggle the cart sidebar
function toggleCart() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    cartSidebar.classList.toggle('active'); // Toggle the active class to show/hide
}

// Call loadCart on page load
window.onload = loadCart;