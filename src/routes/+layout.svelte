<script>
    import { page } from '$app/stores';
    import { fly } from 'svelte/transition';
    import '../app.css';

    // Data passed from the layout server.
    export let data;

    let username = '';
    let avatarUrl = null;

    $: {
        if (data.user) {
            username = data.user.name || data.user.username;
            avatarUrl = data.user.avatarUrl;
        } else {
            username = '';
            avatarUrl = null;
        }
    }
</script>

<div class="flex flex-col min-h-screen font-inter bg-gray-100">
    <!-- Header with conditional login/logout -->
    <header class="bg-white shadow-sm p-5 sticky top-0 z-50">
        <nav class="container mx-auto flex justify-between items-center">
            <a href="/" class="flex items-center space-x-3 text-2xl font-bold text-gray-900 transition-colors duration-200 hover:text-orange-600">
                <!-- Logo placeholder -->
                <div class="h-8 w-8 bg-gray-300 rounded-md"></div>
                <span>Jaben Stores</span>
            </a>
            <div class="flex items-center space-x-6">
                {#if username}
                    <!-- Logged-in view -->
                    <div class="flex items-center space-x-4">
                        {#if avatarUrl}
                            <img src={avatarUrl} alt="User avatar" class="h-8 w-8 rounded-full border border-gray-300">
                        {:else}
                            <div class="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
                                {username.charAt(0).toUpperCase()}
                            </div>
                        {/if}
                        <span class="text-gray-700">{username}!</span>
                        <form method="POST" action="/logout">
                            <button type="submit" class="bg-red-500 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all duration-200 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                                Log Out
                            </button>
                        </form>
                    </div>
                {:else}
                    <!-- Logged-out view -->
                    <a href="/login" class="text-gray-700 font-semibold py-2 px-4 rounded-xl transition-colors duration-200 hover:text-orange-600">
                        Login
                    </a>
                    <a href="/register" class="bg-orange-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all duration-200 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500">
                        Register
                    </a>
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
