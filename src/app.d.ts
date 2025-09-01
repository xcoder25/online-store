import 'pocketbase';

declare global {
	namespace App {
		interface Locals {
			pb: import('pocketbase').default;
			user: import('pocketbase').Record | import('pocketbase').Admin | undefined;
		}
	}
}

export {};