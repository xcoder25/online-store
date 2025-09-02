import { writable, derived } from 'svelte/store';

// A writable store for the cart items
export const cartItems = writable([]);

// A derived store to calculate the total number of items in the cart
export const cartCount = derived(cartItems, ($cartItems) => {
    return $cartItems.reduce((sum, item) => sum + item.quantity, 0);
});

// A derived store to calculate the subtotal of the items in the cart
export const cartSubtotal = derived(cartItems, ($cartItems) => {
    return $cartItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
});

// Function to add an item to the cart
export const addToCart = (product) => {
    cartItems.update((items) => {
        // Check if the item is already in the cart
        const itemIndex = items.findIndex((item) => item.id === product.id);

        if (itemIndex > -1) {
            // If it exists, increment the quantity
            items[itemIndex].quantity += 1;
        } else {
            // Otherwise, add the new item with a quantity of 1
            items.push({ ...product, quantity: 1 });
        }
        console.log(`Product added to cart:`, product);
        return items;
    });
};

// Function to remove an item from the cart
export const removeFromCart = (productId) => {
    cartItems.update((items) => items.filter((item) => item.id !== productId));
    console.log(`Product with id ${productId} removed from cart.`);
    return items;
};

// Function to clear the cart
export const clearCart = () => {
    cartItems.set([]);
    console.log('Cart has been cleared.');
};

// Function to update the quantity of a specific item
export const updateQuantity = (productId, newQuantity) => {
    cartItems.update((items) => {
        const item = items.find((item) => item.id === productId);
        if (item) {
            item.quantity = Math.max(0, newQuantity); // Ensure quantity is not negative
        }
        return items;
    });
};
