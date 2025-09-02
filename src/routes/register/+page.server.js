import { error } from '@sveltejs/kit';
import { generateUsername } from '$lib/utils.js';

export const actions = {
    register: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData());

        const name = String(body.name || '');
        const email = String(body.email || '');
        const password = String(body.password || '');
        const passwordConfirm = String(body.passwordConfirm || '');

        // Sanitize the name for username generation: remove spaces and convert to lowercase.
        const username = generateUsername(name.replace(/\s/g, '').toLowerCase());

        try {
            await locals.pb.collection('users').create({ username, email, password, passwordConfirm });
            await locals.pb.collection('users').requestVerification(email);
        } catch (err) {
            console.error('Error during registration:', err);

            // Defensively check for properties on the error object
            if (err && typeof err === 'object' && err.status === 400) {
                // If the error object has a status of 400, it's likely a bad request.
                throw error(400, 'Invalid registration data. Please check your information.');
            } else {
                // For all other errors, throw a generic server error.
                throw error(500, 'Something went wrong on our end. Please try again.');
            }
        }

        return { success: true, message: 'Registration successful. Please check your email to verify your account.' };
    }
};
