import { serializeNonPOJOs } from '$lib/utils';

export const load = ({ locals }) => {
    let user = locals.user;
    if (user) {
        // Construct the full avatar URL if an avatar exists
        if (user.avatar) {
            user.avatarUrl = `http://localhost:8090/api/files/users/${user.id}/${user.avatar}`;
        }
    }

    if (user) {
        return { user: serializeNonPOJOs(user) };
    }

    return { user: undefined };
};
