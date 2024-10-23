const request = require('supertest');
const app = require('../app.js');

describe('POST /auth/login', () => {
	it('should return 200 status code and a token', async () => {
		const response = await request(app).post('/auth/login').send({
			username: 'admin',
			password: 'password',
		});

		expect(response.statusCode).toBe(200);

		expect(response.body).toHaveProperty('is_error', false);
		expect(response.body).toHaveProperty('message');
		expect(response.body.message).toHaveProperty('token');

		expect(typeof response.body.message.token).toBe('string');
		expect(response.body.message.token).not.toHaveLength(0);
	});

	it('should return 401 if user does not exist', async () => {
		const response = await request(app).post('/auth/login').send({
			username: 'admin',
			password: 'bumiitudatar',
		});

		expect(response.statusCode).toBe(401);

		expect(response.body).toHaveProperty('is_error', true);
		expect(response.body).toHaveProperty('message');
		expect(response.body.message).toBe('Invalid username or password');
	});
});
