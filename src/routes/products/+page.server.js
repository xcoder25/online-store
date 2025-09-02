import { error } from '@sveltejs/kit';
import { products } from '$lib/simulatedProducts.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    try {
        // Since we are not using PocketBase for products,
        // we can return the products from our local file.
        return {
            products: products
        };
    } catch (err) {
        console.error('Error loading products:', err);
        throw error(500, 'Could not load products.');
    }
}
