<script lang="ts">
    import '../app.css';
    import favicon from '$lib/assets/favicon.svg';

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<header class="w-full backdrop-blur-lg bg-white/50 p-4 border-b border-gray-200">
    <div class="container mx-auto flex items-center justify-between">
        <a href="/" class="text-2xl font-bold text-gray-900 tracking-wider transition-colors duration-300 hover:text-orange-500">
            <img src={favicon} alt="Logo" class="h-8 w-auto" />
        </a>
        <nav class="flex space-x-4">
            <a 
                href="/register" 
                class="px-4 py-2 rounded-full border border-orange-500 text-sm font-medium transition-colors duration-300 hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
                Register
            </a>
            <a 
                href="/login" 
                class="px-4 py-2 rounded-full bg-orange-600 text-white text-sm font-medium shadow-lg transition-colors duration-300 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
                Login
            </a>
        </nav>
    </div>
</header>

<main class="main-content">
    {@render children?.()}
</main>
