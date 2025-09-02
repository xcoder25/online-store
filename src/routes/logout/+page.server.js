import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ locals }) => {
        // Clear the PocketBase auth store.
        locals.pb.authStore.clear();

        // Redirect the user to the login page.
        throw redirect(303, '/login');
    }
};
