const request = require('supertest');
const app = require('../app.js');
const crypto = require('crypto');

const generateRandomUserData = () => {
	const randomUsername = '0x' + crypto.randomBytes(20).toString('hex');
	const randomEmail =
		'0x' +
		crypto.randomBytes(20).toString('hex') +
		'@' +
		crypto.randomBytes(10).toString('hex') +
		'.com';

	return { randomUsername, randomEmail };
};

const getAuthToken = async () => {
	const loginResponse = await request(app).post('/auth/login').send({
		username: 'admin',
		password: 'password',
	});

	expect(loginResponse.status).toBe(200);
	expect(loginResponse.body.message.token).toBeDefined();

	return loginResponse.body.message.token;
};

const makeUserRequest = async (method, url, token, data) => {
	const headers = token ? { Authorization: `Bearer ${token}` } : {};
	return request(app)[method](url).set(headers).send(data);
};

describe('User Controller', () => {
	describe('POST /user', () => {
		it('should return 200 status code when creating a new user', async () => {
			const token = await getAuthToken();
			const { randomUsername, randomEmail } = generateRandomUserData();

			const userResponse = await makeUserRequest('post', '/user', token, {
				username: randomUsername,
				emailaddress: randomEmail,
				password: 'password',
			});

			expect(userResponse.status).toBe(200);
		});

		it('should return 401 if no authorization header when fetching by account number', async () => {
			const { randomUsername, randomEmail } = generateRandomUserData();

			const userResponse = await makeUserRequest('post', '/user', null, {
				username: randomUsername,
				emailaddress: randomEmail,
				password: 'password',
			});

			expect(userResponse.status).toBe(401);
		});
	});

	describe('GET /user/all', () => {
		it('should return 200 status code when fetching all users', async () => {
			const token = await getAuthToken();

			const userResponse = await makeUserRequest('get', '/user/all', token);

			expect(userResponse.status).toBe(200);
		});

		it('should return 401 if no authorization header when fetching by account number', async () => {
			const userResponse = await makeUserRequest('get', '/user/all', null);

			expect(userResponse.status).toBe(401);
		});
	});

	describe('GET /user/identity/:identityNumber', () => {
		it('should return 200 status code when fetching by identity number', async () => {
			const token = await getAuthToken();

			const userResponse = await makeUserRequest(
				'get',
				`/user/identity/ff53b3f2-addd-4640-be30-014d3edf3a89`,
				token
			);

			expect(userResponse.status).toBe(200);
			expect(userResponse.body.message).toHaveProperty(
				'identityNumber',
				'ff53b3f2-addd-4640-be30-014d3edf3a89'
			);
		});

		it('should return 404 if user not found when fetching by account number', async () => {
			const token = await getAuthToken();

			const userResponse = await makeUserRequest('get', `/user/identity/test_error`, token);

			expect(userResponse.status).toBe(404);
		});

		it('should return 401 if no authorization header when fetching by account number', async () => {
			const userResponse = await makeUserRequest(
				'get',
				'/user/identity/ff53b3f2-addd-4640-be30-014d3edf3a89',
				null
			);

			expect(userResponse.status).toBe(401);
		});
	});

	describe('GET /user/account/:accountNumber', () => {
		it('should return 200 status code when fetching by account number', async () => {
			const token = await getAuthToken();

			const userResponse = await makeUserRequest('get', `/user/account/1`, token);
			expect(userResponse.status).toBe(200);
			expect(userResponse.body.message).toHaveProperty('accountNumber', 1);
		});

		it('should return 404 if user not found when fetching by account number', async () => {
			const token = await getAuthToken();

			const userResponse = await makeUserRequest('get', `/user/identity/0`, token);

			expect(userResponse.status).toBe(404);
		});

		it('should return 401 if no authorization header when fetching by account number', async () => {
			const userResponse = await makeUserRequest('get', '/user/identity/1', null);
			expect(userResponse.status).toBe(401);
		});
	});
});
