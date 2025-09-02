import { serializeNonPOJOs } from '$lib/utils';
import { error } from '@sveltejs/kit';

export const load = ({ locals }) => {
	const getProducts = async () => {
		try {
			const products = serializeNonPOJOs(await locals.pb.collection('products').getFullList());
			return products;
		} catch (err) {
			console.error('Error fetching products:', err);
			throw error(404, 'Failed to fetch products');
		}
	};

	return {
		products: getProducts()
	};
};
