// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user: import('$lib/server/auth.ts').Session['user'];
			session: import('$lib/server/auth.ts').Session['session'];
		}
	}
}

export {};
