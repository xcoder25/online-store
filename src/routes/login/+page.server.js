import { error, redirect } from '@sveltejs/kit';

export const actions = {
    login: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData());

        try {
            await locals.pb.collection('users').authWithPassword(body.email, body.password);
        } catch (err) {
            console.error('Error during login:', err);

            // Defensive check for properties on the error object
            if (err && typeof err === 'object' && err.status === 400) {
                // If the error object has a status of 400, it's likely a bad request.
                return {
                    success: false,
                    message: 'Invalid email or password. Please try again.'
                };
            } else {
                // For all other errors, throw a generic server error.
                throw error(500, 'Something went wrong on our end. Please try again.');
            }
        }

        // Redirect the user to the home page after successful login.
        throw redirect(303, '/');
    }
};
