<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { addToCart } from '$lib/stores/cartStore';

    // The data object contains the products returned from the load function
    export let data;

    // Check if the user is authenticated from the layout data
    $: user = $page.data?.user;

    const handleAddToCart = (product: any) => {
        if (!user) {
            // If the user is not authenticated, redirect to the login page
            console.warn('User not authenticated. Redirecting to login page.');
            goto('/login');
            return; // Stop the function here
        }

        // If authenticated, add the product to the cart
        addToCart(product);
    };
</script>

<div class="container mx-auto px-4 py-8 font-inter">
    <h1 class="text-4xl font-extrabold text-gray-900 mb-8 text-center">Featured Products</h1>

    {#if !data.products || data.products.length === 0}
        <div class="text-center text-gray-500 text-xl py-20">No products found.</div>
    {:else}
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {#each data.products as product (product.id)}
                <div class="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 flex flex-col justify-between transform transition-all duration-300 hover:scale-[1.02]">
                    <div class="flex-grow">
                        <!-- Product Image -->
                        <div class="aspect-w-1 aspect-h-1 mb-4 overflow-hidden rounded-xl">
                            <img src={product.image} alt={product.name} class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                        </div>
                        
                        <!-- Product Details -->
                        <h2 class="text-lg font-semibold text-gray-800 line-clamp-2">{product.name}</h2>
                        <p class="text-sm text-gray-500 my-1">{product.category}</p>
                        <p class="text-xl font-bold text-orange-600">${product.price.toFixed(2)}</p>
                    </div>

                    <!-- Add to Cart Button -->
                    <button 
                        on:click={() => handleAddToCart(product)}
                        class="mt-4 w-full bg-orange-600 text-white font-bold py-2.5 px-4 rounded-xl shadow-lg transition-all duration-300 hover:bg-orange-700 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        Add to Cart
                    </button>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .font-inter {
        font-family: 'Inter', sans-serif;
    }
</style>
