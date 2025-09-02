import { redirect } from '@sveltejs/kit';
import { clearCart } from '$lib/stores/cartStore';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, locals }) => {
        const formData = await request.formData();
        const customerName = formData.get('fullName');
        const email = formData.get('email');

        // Simulate a checkout process. In a real-world scenario, you would
        // integrate with a payment gateway here and save the order to the database.
        console.log(`Simulating order for ${customerName} (${email}).`);
        console.log('Order received and is being processed.');

        // Clear the client-side cart store after the simulated order is placed.
        clearCart();

        // Redirect the user to a success page
        throw redirect(303, '/checkout/success');
    }
};
