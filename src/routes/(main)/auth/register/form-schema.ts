import { type } from 'arktype';

export const schema = type({
	login: 'string',
	password: 'string >= 8',
	confirmPassword: 'string >= 8',
	age: `string`
}).narrow((data, ctx) => {
	// Check if password and confirmPassword match
	if (data.password !== data.confirmPassword) {
		return ctx.reject({
			problem: 'Passwords do not match',
			// don't display the password in the error message!
			actual: '',
			path: ['confirmPassword']
		});
	}

	// Birth date should be in the past
	if (new Date(data.age) > new Date()) {
		return ctx.reject({
			problem: 'Use a date in the past',
			actual: '',
			path: ['age']
		});
	}

	return true;
});
