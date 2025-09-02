<script>
    import { products } from '$lib/simulatedProducts.js';
    import { addToCart, cartItems } from '$lib/stores/cartStore.js';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { fly } from 'svelte/transition';

    // Use a slice to create distinct sections for the homepage
    const featuredProducts = products.slice(0, 4);
    const newArrivals = products.slice(4, 8);

    // Check if the user is authenticated from the layout data
    $: user = $page.data?.user;

    const handleAddToCart = (product) => {
        if (!user) {
            // If the user is not authenticated, redirect to the login page
            console.warn('User not authenticated. Redirecting to login page.');
            goto('/login');
            return;
        }

        // If authenticated, add the product to the cart
        addToCart(product);
    };

    let showMobileMenu = false;
</script>

<!-- Mobile Menu Overlay -->
{#if showMobileMenu}
<div
    transition:fly={{ y: -50, duration: 250 }}
    class="fixed inset-0 bg-white z-40 p-6 flex flex-col items-center justify-center space-y-8 md:hidden"
>
    <button on:click={() => showMobileMenu = false} class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none" aria-label="Close mobile menu">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
    <a href="/" class="text-3xl font-extrabold text-gray-900 transition-colors duration-200 hover:text-orange-600">Home</a>
    <a href="/products" class="text-3xl font-extrabold text-gray-900 transition-colors duration-200 hover:text-orange-600">Products</a>
    {#if user}
        <span class="text-2xl font-bold text-gray-700">Hello, {user.name || user.username}!</span>
        <form method="POST" action="/logout">
            <button type="submit" class="w-full bg-red-500 text-white font-semibold py-3 px-8 text-xl rounded-full shadow-lg transition-colors duration-200 hover:bg-red-600">
                Log Out
            </button>
        </form>
    {:else}
        <a href="/login" class="w-full text-center text-3xl font-extrabold text-gray-900 transition-colors duration-200 hover:text-orange-600">Login</a>
        <a href="/register" class="w-full text-center bg-orange-600 text-white font-bold py-3 px-8 text-xl rounded-full shadow-lg transition-colors duration-200 hover:bg-orange-700">
            Register
        </a>
    {/if}
</div>
{/if}

<!-- Hero Section -->
<section class="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-24 rounded-b-3xl mb-12 shadow-inner">
    <div class="container mx-auto text-center">
        <h1 class="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-md">
            Welcome to Jaben Stores
        </h1>
        <p class="text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto drop-shadow-sm">
            Discover a world of unique products and exceptional craftsmanship.
        </p>
        <a href="/products" class="bg-white text-orange-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105">
            Shop Now
        </a>
    </div>
</section>

<!-- Featured Products Section -->
<section class="container mx-auto p-4 md:p-8">
    <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
        <p class="text-lg text-gray-600">Hand-picked items just for you.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each featuredProducts as product (product.id)}
            <a href={`/products/${product.id}`} class="block transform hover:scale-105 transition-transform duration-200">
                <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                    <img src={product.image} alt={product.name} class="w-full h-48 object-cover object-center" />
                    <div class="p-5 text-center flex flex-col items-center">
                        <h3 class="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                        <p class="text-gray-500 text-sm mb-3 truncate w-full">{product.description}</p>
                        <div class="flex items-center justify-center space-x-4 mt-auto">
                            <p class="text-xl font-bold text-orange-600">${product.price.toFixed(2)}</p>
                            <button
                                on:click|preventDefault={(e) => {
                                    e.stopPropagation(); // Prevents the parent link from being triggered
                                    handleAddToCart(product);
                                }}
                                class="bg-orange-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-orange-600 transition-colors duration-200"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </a>
        {/each}
    </div>
</section>

<!-- Why Choose Us Section -->
<section class="bg-gray-200 py-16 mt-12 rounded-3xl shadow-inner">
    <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
            <div class="bg-white p-6 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105">
                <div class="text-4xl text-orange-600 mb-4">✓</div>
                <h3 class="text-xl font-bold mb-2">Quality Products</h3>
                <p class="text-gray-600">Each item is carefully selected for its craftsmanship and durability.</p>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105">
                <div class="text-4xl text-orange-600 mb-4">🚚</div>
                <h3 class="text-xl font-bold mb-2">Fast Shipping</h3>
                <p class="text-gray-600">We ensure your order gets to your doorstep quickly and safely.</p>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105">
                <div class="text-4xl text-orange-600 mb-4">⭐</div>
                <h3 class="text-xl font-bold mb-2">Exceptional Service</h3>
                <p class="text-gray-600">Our support team is ready to help you with any questions or concerns.</p>
            </div>
        </div>
    </div>
</section>

<!-- New Arrivals Section -->
<section class="container mx-auto p-4 md:p-8 mt-12">
    <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-2">New Arrivals</h2>
        <p class="text-lg text-gray-600">The latest additions to our collection.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each newArrivals as product (product.id)}
            <a href={`/products/${product.id}`} class="block transform hover:scale-105 transition-transform duration-200">
                <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                    <img src={product.image} alt={product.name} class="w-full h-48 object-cover object-center" />
                    <div class="p-5 text-center flex flex-col items-center">
                        <h3 class="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                        <p class="text-gray-500 text-sm mb-3 truncate w-full">{product.description}</p>
                        <div class="flex items-center justify-center space-x-4 mt-auto">
                            <p class="text-xl font-bold text-orange-600">${product.price.toFixed(2)}</p>
                            <button
                                on:click|preventDefault={(e) => {
                                    e.stopPropagation(); // Prevents the parent link from being triggered
                                    handleAddToCart(product);
                                }}
                                class="bg-orange-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-orange-600 transition-colors duration-200"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </a>
        {/each}
    </div>
</section>
