<script>
	import { cartItems } from '$lib/stores/cartStore';
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';

	let total = 0;

	// Reactive statement to calculate the total price whenever the cart changes
	$: {
		total = $cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
	}

	function handleCheckout() {
		// Placeholder for future checkout logic
		console.log('Checkout clicked! This is where payment processing and order creation would go.');
	}
</script>

<div class="container mx-auto p-4 md:p-8">
	<h1 class="text-4xl font-bold text-gray-900 mb-6">Checkout</h1>

	{#if $cartItems.length === 0}
		<div in:fly={{ y: 20, duration: 500 }}>
			<p class="text-xl text-gray-600 mb-4">Your cart is empty. Please add some products to checkout.</p>
			<a
				href="/products"
				class="inline-block bg-orange-600 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition-all duration-200 hover:bg-orange-700"
			>
				Continue Shopping
			</a>
		</div>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			<!-- Order Summary -->
			<div class="col-span-1">
				<div class="bg-white rounded-xl shadow-md p-6">
					<h2 class="text-2xl font-bold text-gray-900 mb-4">Order Summary</h2>
					{#each $cartItems as item (item.id)}
						<div class="flex justify-between items-center mb-2">
							<div class="flex items-center">
								<img src={item.image} alt={item.name} class="w-12 h-12 object-cover rounded-md mr-4" />
								<div>
									<h3 class="text-lg font-semibold">{item.name}</h3>
									<p class="text-gray-600 text-sm">Qty: {item.quantity}</p>
								</div>
							</div>
							<p class="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
						</div>
					{/each}
					<div class="border-t pt-4 mt-4">
						<div class="flex justify-between font-semibold text-xl">
							<span>Order Total</span>
							<span>${total.toFixed(2)}</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Shipping and Payment Info -->
			<div class="col-span-1">
				<div class="bg-white rounded-xl shadow-md p-6">
					<h2 class="text-2xl font-bold text-gray-900 mb-4">Shipping Information</h2>
					<form on:submit|preventDefault={handleCheckout} class="space-y-4">
						<input type="text" placeholder="Full Name" class="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" required />
						<input type="email" placeholder="Email" class="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" required />
						<input type="text" placeholder="Address" class="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" required />
						<div class="flex space-x-4">
							<input type="text" placeholder="City" class="w-1/2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" required />
							<input type="text" placeholder="Zip Code" class="w-1/2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" required />
						</div>
						<button type="submit" class="w-full bg-green-500 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-200 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
							Complete Order
						</button>
					</form>
				</div>
			</div>
		</div>
	{/if}
</div>
