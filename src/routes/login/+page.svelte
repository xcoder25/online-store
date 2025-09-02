<script lang="ts">
    import { enhance } from '$app/forms';
    import { onMount } from 'svelte';

    export let form;

    let isSubmitting = false;

    onMount(() => {
        // This is a good place for initialization logic if needed.
        // The 'form' variable is already reactive, so no need to reset it here.
    });

    /**
     * Handles the form submission for registration.
     */
    async function handleLogin(event?: Event): Promise<void> {
        if (event) event.preventDefault();
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div class="relative w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl p-8 transform transition-all duration-300 ease-in-out hover:scale-[1.01]">
        <!-- Gradient background circles -->
        <div class="absolute inset-0 z-0 overflow-hidden rounded-2xl">
            <div class="absolute w-64 h-64 bg-orange-500 rounded-full opacity-10 blur-3xl -top-10 -left-10 animate-pulse"></div>
            <div class="absolute w-80 h-80 bg-orange-500 rounded-full opacity-10 blur-3xl -bottom-20 -right-20 animate-pulse-slow"></div>
        </div>

        <div class="relative z-10 text-center">
            <h1 class="text-3xl font-extrabold text-gray-900 mb-2 font-inter">Welcome back!</h1>
            <p class="text-gray-500 text-sm mb-8 font-inter">
                Sign in to your account.
            </p>

            {#if form?.message && !form?.success}
                <div class="bg-red-100 text-red-700 border border-red-300 rounded-xl p-4 mb-4 font-inter transition-all duration-300 ease-in-out">
                    <strong class="font-bold">Error:</strong> {form.message}
                </div>
            {/if}

            <form method="POST" action="?/login" use:enhance={() => {
                isSubmitting = true;
                return async ({ update }) => {
                    await update();
                    isSubmitting = false;
                };
            }} class="space-y-6 text-left">
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1 font-inter">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        class="w-full bg-gray-100 text-gray-900 border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-300 font-inter"
                    />
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-1 font-inter">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        class="w-full bg-gray-100 text-gray-900 border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-300 font-inter"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    class="w-full bg-orange-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all duration-300 hover:bg-orange-700 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-orange-500 font-inter"
                >
                    {#if isSubmitting}
                        <svg class="animate-spin h-5 w-5 mx-auto text-white" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    {:else}
                        Log In
                    {/if}
                </button>
            </form>
            
            <p class="text-sm text-gray-600 mt-6 font-inter">
                Don't have an account? 
                <a href="/register" class="text-orange-500 hover:underline transition-colors duration-200">Register here</a>
            </p>
        </div>
    </div>
</div>

<style>
    /* For the animated background circles */
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    @keyframes pulse-slow {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
    .animate-pulse {
        animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    .animate-pulse-slow {
        animation: pulse-slow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    .font-inter {
        font-family: 'Inter', sans-serif;
    }
</style>
