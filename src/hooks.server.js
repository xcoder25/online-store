import PocketBase from 'pocketbase'
import { serializeNonPOJOs } from '$lib/utils'
import * as env from '$env/static/public'

const pocketbaseUrl = env.PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090'

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
    event.locals.pb = new PocketBase(pocketbaseUrl)
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '')

    if (event.locals.pb.authStore.isValid && event.locals.pb.authStore.model) {
        event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model)
    } else {
        event.locals.user = undefined
    }

    const response = await resolve(event)

    response.headers.set(
        'set-cookie',
        event.locals.pb.authStore.exportToCookie({ secure: false })
    )

    return response
}
