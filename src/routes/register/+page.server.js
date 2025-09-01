import { error, redirect  } from '@sveltejs/kit'
import { generateUsername } from '$lib/utils.js'

export const actions = {
    register: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())

        let nameStr = typeof body.name === 'string' ? body.name : '';
        let username = generateUsername(nameStr.split('').join('').toLowerCase())

        try {
            await locals.pb.collection('users').create({ username, ...body })
            await locals.pb.collection('users').requestVerification(String(body.email))
        } catch (err) {
            console.log('Error:', err);
            throw error(500, 'Something went wrong');
        }

        throw redirect(303, '/login');
    }
};