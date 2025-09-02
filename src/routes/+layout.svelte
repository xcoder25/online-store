<script>
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import '../app.css';
	import { cartItems } from '$lib/stores/cartStore';

	// Data passed from the layout server.
	export let data;

	let username = '';
	let avatarUrl = null;
	let showMobileMenu = false;
	let cartCount = 0;

	$: {
		if (data.user) {
			username = data.user.name || data.user.username;
			avatarUrl = data.user.avatarUrl;
		} else {
			username = '';
			avatarUrl = null;
		}
	}

	$: {
		let count = 0;
		if ($cartItems) {
			for (const item of $cartItems) {
				count += item.quantity;
			}
		}
		cartCount = count;
	}
</script>

<div class="flex flex-col min-h-screen font-inter bg-gray-100">
	<!-- Header with conditional login/logout -->
	<header class="bg-white shadow-sm p-5 sticky top-0 z-50">
		<nav class="container mx-auto flex justify-between items-center">
			<!-- Logo and site name -->
			<a
				href="/"
				class="flex items-center space-x-3 text-2xl font-bold text-gray-900 transition-colors duration-200 hover:text-orange-600"
			>
				<div class="h-8 w-8 bg-gray-300 rounded-md"></div>
				<span>Jaben Stores</span>
			</a>
			<!-- Mobile menu button -->
			<button
				on:click={() => (showMobileMenu = !showMobileMenu)}
				class="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 transition-colors duration-200"
				aria-label="Toggle mobile menu"
			>
				<svg
					class="w-8 h-8"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16m-7 6h7"
					></path>
				</svg>
			</button>
			<!-- Navigation links and user/auth buttons (collapsible on mobile) -->
			<div
				class="md:flex md:items-center md:space-x-6 {showMobileMenu ? 'block' : 'hidden'} absolute md:relative top-full left-0 w-full bg-white md:bg-transparent shadow-md md:shadow-none transition-all duration-300 ease-in-out p-4 md:p-0"
			>
				<!-- Main navigation links and cart icon -->
				<div class="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
					<a
						href="/products"
						class="text-gray-700 font-semibold transition-colors duration-200 hover:text-orange-600"
					>
						Products
					</a>
					<a href="/cart" class="relative text-gray-700 hover:text-orange-600 transition-colors duration-200">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
							<path
								d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.75 3.75 0 003.694 2.46l.75.004h2.25m-1.5 0a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM12.75 12.75h3.75l3.5-7.5H20.25"
							/>
						</svg>
						{#if cartCount > 0}
							<div class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
								{cartCount}
							</div>
						{/if}
					</a>
				</div>
				
				<!-- Logged-in/Logged-out buttons -->
				{#if username}
					<!-- Logged-in view -->
					<div class="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0 md:ml-auto">
						<div class="flex items-center space-x-2">
							{#if avatarUrl}
								<img
									src={avatarUrl}
									alt="User avatar"
									class="h-8 w-8 rounded-full border border-gray-300"
								/>
							{:else}
								<div
									class="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700"
								>
									{username.charAt(0).toUpperCase()}
								</div>
							{/if}
							<span class="text-gray-700">{username}</span>
						</div>
						<form method="POST" action="/logout" class="w-full md:w-auto">
							<button
								type="submit"
								class="bg-red-500 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all duration-200 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 w-full md:w-auto"
							>
								Log Out
							</button>
						</form>
					</div>
				{:else}
					<!-- Logged-out view -->
					<div class="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0 md:ml-auto">
						<a
							href="/login"
							class="text-gray-700 font-semibold py-2 px-4 rounded-xl transition-colors duration-200 hover:text-orange-600 w-full md:w-auto"
						>
							Login
						</a>
						<a
							href="/register"
							class="bg-orange-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all duration-200 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full md:w-auto text-center"
						>
							Register
						</a>
					</div>
				{/if}
			</div>
		</nav>
	</header>

	<!-- Page content below -->
	<main class="flex-grow p-4">
		<!-- The @sveltekit/body element renders the current page's content here -->
		<slot />
	</main>
</div>

<!-- Global styles -->
<style>
	:global(body) {
		margin: 0;
		font-family: 'Inter', sans-serif;
	}
	/* Add any global styles here */
</style>
