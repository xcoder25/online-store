<script>
    import { cartItems, clearCart } from '$lib/stores/cartStore';
    import { fly } from 'svelte/transition';

    let orderTotal = 0;

    $: {
        orderTotal = $cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    // Use a reactive statement to clear the cart only after the page has loaded
    // and the summary is displayed.
    $: if ($cartItems.length > 0) {
        clearCart();
    }
</script>

<div class="container mx-auto p-4 md:p-8 flex flex-col items-center text-center" in:fly={{ y: 20, duration: 800 }}>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-24 w-24 text-green-500 mb-6 animate-bounce"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
    >
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <h1 class="text-4xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
    <p class="text-xl text-gray-600 mb-8">Thank you for your purchase.</p>

    {#if orderTotal > 0}
        <div class="bg-white rounded-xl shadow-md p-6 w-full max-w-2xl text-left mb-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Order Summary</h2>
            <ul class="divide-y divide-gray-200">
                {#each $cartItems as item (item.id)}
                    <li class="flex justify-between items-center py-4">
                        <div class="flex items-center">
                            <img src={item.image} alt={item.name} class="w-16 h-16 object-cover rounded-xl border mr-4" />
                            <div>
                                <h3 class="font-semibold text-gray-900">{item.name}</h3>
                                <p class="text-gray-500">Quantity: {item.quantity}</p>
                            </div>
                        </div>
                        <span class="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                {/each}
            </ul>
            <div class="flex justify-between font-bold text-xl mt-4 pt-4 border-t">
                <span>Total</span>
                <span>${orderTotal.toFixed(2)}</span>
            </div>
        </div>
    {/if}

    <a href="/products" class="bg-orange-600 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition-all duration-200 hover:bg-orange-700">
        Continue Shopping
    </a>
</div>
