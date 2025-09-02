<script lang="ts">
    import { cartItems, cartSubtotal, removeFromCart, updateQuantity } from '$lib/stores/cartStore';

    // The cartItems store is reactive, so changes will automatically update the UI.

    const updateItemQuantity = (productId: string, newQuantity: number) => {
        updateQuantity(productId, newQuantity);
    };

    const removeItem = (productId: string) => {
        removeFromCart(productId);
    };
</script>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-extrabold text-gray-900 mb-8 text-center font-inter">Your Shopping Cart</h1>

    {#if $cartItems.length > 0}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Cart Items List -->
            <div class="md:col-span-2 space-y-4">
                {#each $cartItems as item (item.id)}
                    <div class="flex items-center space-x-4 p-4 bg-white rounded-2xl shadow-lg border border-gray-200">
                        <!-- Product Image -->
                        <img src={item.image} alt={item.name} class="w-24 h-24 object-cover rounded-xl" />

                        <!-- Product Details -->
                        <div class="flex-1">
                            <h2 class="text-lg font-semibold text-gray-800">{item.name}</h2>
                            <p class="text-sm text-gray-500">{item.category}</p>
                            <p class="text-orange-500 font-bold mt-1">${item.price.toFixed(2)}</p>
                        </div>

                        <!-- Quantity and Remove Button -->
                        <div class="flex items-center space-x-4">
                            <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                on:change={(e) => updateItemQuantity(item.id, parseInt(e.currentTarget.value))}
                                class="w-16 text-center border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-200"
                            />
                            <button on:click={() => removeItem(item.id)} class="text-gray-400 hover:text-red-500 transition-colors duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                {/each}
            </div>

            <!-- Order Summary -->
            <div class="md:col-span-1 p-6 bg-white rounded-2xl shadow-xl border border-gray-200 h-fit">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
                <div class="flex justify-between items-center mb-2">
                    <span class="text-gray-600">Subtotal</span>
                    <span class="font-semibold text-gray-800">${$cartSubtotal.toFixed(2)}</span>
                </div>
                <div class="flex justify-between items-center text-lg font-bold text-gray-900 mt-4 pt-4 border-t border-gray-300">
                    <span>Order Total</span>
                    <span>${$cartSubtotal.toFixed(2)}</span>
                </div>
                <a href="/checkout" class="block w-full text-center bg-orange-600 text-white font-bold py-3 mt-6 rounded-xl shadow-lg transition-all duration-300 hover:bg-orange-700 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-orange-500">
                    Proceed to Checkout
                </a>
            </div>
        </div>
    {:else}
        <div class="text-center py-20">
            <p class="text-xl text-gray-500 mb-4">Your cart is empty.</p>
            <a href="/products" class="text-orange-500 hover:underline">Start shopping</a>
        </div>
    {/if}
</div>

<style>
    .font-inter {
        font-family: 'Inter', sans-serif;
    }
</style>
