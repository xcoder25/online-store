<script>
  import { onMount } from 'svelte';
  
  /**
   * @typedef {object} PageData
   * @property {Array<import('pocketbase').RecordModel>} products
   */
  
  /** @type {PageData} */
  export let data;
  let products = data.products;
</script>

<svelte:head>
  <title>Jason Stores | Modern Shopping</title>
</svelte:head>

<section class="bg-[#121212] text-white py-20 px-6 text-center overflow-hidden relative">
  <div class="absolute inset-0 z-0 opacity-20" style="background: radial-gradient(circle, rgba(246, 139, 30, 0.4) 0%, rgba(18, 18, 18, 0) 70%);"></div>
  <div class="relative z-10">
    <h1 class="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in-up">Welcome to Jason Stores</h1>
    <p class="text-lg md:text-xl text-gray-300 mb-6 animate-fade-in-up-delay">Shop everything you need, delivered fast.</p>
    <a href="/shop" class="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105">
      Start Shopping
    </a>
  </div>
</section>

<section class="py-16 px-4 sm:px-6 bg-white">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center sm:text-left">Featured Products</h2>
    {#if products && products.length > 0}
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {#each products.slice(0, 8) as product}
          <a href={`/product/${product.id}`} class="block bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="w-full h-44 sm:h-56 overflow-hidden">
              <img src={`http://localhost:8090/api/files/${product.collectionId}/${product.id}/${product.image}`} alt={product.name} class="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
            </div>
            <div class="p-4 sm:p-5">
              <h3 class="font-semibold text-base text-gray-800 truncate mb-1">{product.name}</h3>
              <p class="text-gray-500 text-xs line-clamp-2 mb-3">{product.description}</p>
              <div class="mt-2 flex justify-between items-center">
                <span class="text-orange-500 font-bold text-lg">₦{product.price}</span>
                <button class="bg-gray-900 text-white text-sm px-4 py-2 rounded-full hover:bg-orange-500 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block -mt-0.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Add
                </button>
              </div>
            </div>
          </a>
        {/each}
      </div>
    {:else}
      <p class="text-center text-gray-500">No featured products found. Please check back later!</p>
    {/if}
  </div>
</section>

<section class="bg-gray-50 py-12 px-4 sm:px-6">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center sm:text-left">Shop by Category</h2>
    <div class="grid grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
      <a href="/category/phones" class="block bg-white border border-gray-200 rounded-xl p-4 sm:p-6 text-center hover:bg-orange-50 hover:border-orange-200 transition-all duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-orange-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <h3 class="text-sm sm:text-base font-medium text-gray-800">Phones</h3>
      </a>
      <a href="/category/fashion" class="block bg-white border border-gray-200 rounded-xl p-4 sm:p-6 text-center hover:bg-orange-50 hover:border-orange-200 transition-all duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-orange-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.01 12.01 0 003 9c0 5.591 3.824 10.29 9 11.691 5.176-1.401 9-6.1 9-11.691a12.01 12.01 0 00-.382-2.816z" />
        </svg>
        <h3 class="text-sm sm:text-base font-medium text-gray-800">Fashion</h3>
      </a>
      <a href="/category/electronics" class="block bg-white border border-gray-200 rounded-xl p-4 sm:p-6 text-center hover:bg-orange-50 hover:border-orange-200 transition-all duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-orange-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9.75 17M12 18h.01M17.25 17L17.25 17M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-sm sm:text-base font-medium text-gray-800">Electronics</h3>
      </a>
      <a href="/category/beauty" class="block bg-white border border-gray-200 rounded-xl p-4 sm:p-6 text-center hover:bg-orange-50 hover:border-orange-200 transition-all duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-orange-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.311 8.875A10.01 10.01 0 0112 18a10.01 10.01 0 01-8.311-9.125l-.75-.75a1 1 0 01-.061-1.353l.75-.75A1 1 0 0112 3a1 1 0 01.061 1.353l-.75.75a10.01 10.01 0 01-8.311 9.125M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-sm sm:text-base font-medium text-gray-800">Beauty</h3>
      </a>
      <a href="/category/home" class="block bg-white border border-gray-200 rounded-xl p-4 sm:p-6 text-center hover:bg-orange-50 hover:border-orange-200 transition-all duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-orange-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l-7 7-7-7" />
        </svg>
        <h3 class="text-sm sm:text-base font-medium text-gray-800">Home</h3>
      </a>
      <a href="/category/groceries" class="block bg-white border border-gray-200 rounded-xl p-4 sm:p-6 text-center hover:bg-orange-50 hover:border-orange-200 transition-all duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-orange-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h18M3 6h18M3 9h18M3 12h18M3 15h18M3 18h18M3 21h18" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5h6" />
        </svg>
        <h3 class="text-sm sm:text-base font-medium text-gray-800">Groceries</h3>
      </a>
    </div>
  </div>
</section>

<section class="py-16 px-6 text-center bg-gray-900 text-white">
  <div class="max-w-xl mx-auto">
    <h2 class="text-3xl font-bold mb-3">Don't Miss Out!</h2>
    <p class="text-gray-300 mb-6">Join our community and get access to exclusive deals and special offers.</p>
    <a href="/signup" class="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105">
      Create Account
    </a>
  </div>
</section>

<style>
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
  }

  .animate-fade-in-up-delay {
    animation: fadeInUp 0.8s ease-out 0.2s forwards;
    opacity: 0; /* Ensures it starts hidden */
  }
</style>