const { add, update, remove } = require('../controllers/User/index.js');
const crypto = require('crypto');

require('./initiateTest.js');

const generateUserRequest = () => ({
	userName: 'unittest_userName_' + crypto.randomBytes(16).toString('hex'),
	emailAddress: 'unittest_emailAddress_' + crypto.randomBytes(16).toString('hex'),
	password: crypto.createHash('md5').update('password').digest('hex'),
	accountNumber: Math.floor(Math.random() * 1000000000),
	identityNumber: 'unittest_identityNumber_' + crypto.randomBytes(16).toString('hex'),
});

describe('KAFKA User Tests', () => {
	let userInfo;

	beforeEach(async () => {
		const request = generateUserRequest();
		const res = await add(request);
		userInfo = res.message;
	});

	afterEach(async () => {
		if (userInfo && userInfo.id) {
			await remove({ user_id: userInfo.id });
		}
	});

	describe('user_add', () => {
		it('should return success true when adding a user', async () => {
			const request = generateUserRequest();
			const res = await add(request);
			expect(res.success).toBe(true);
		});
	});

	describe('user_update', () => {
		it('should return success true and modifiedCount must be 1 on message', async () => {
			const request = {
				user_id: userInfo.id,
				userName: 'unittest_userName_' + crypto.randomBytes(16).toString('hex'),
				emailAddress: 'unittest_emailAddress_' + crypto.randomBytes(16).toString('hex'),
				password: crypto.createHash('md5').update('password').digest('hex'),
			};
			const res = await update(request);
			expect(res.success).toBe(true);
			expect(res.message).toHaveProperty('modifiedCount', 1);
		});
	});

	describe('user_delete', () => {
		it('should return success true when deleting a user', async () => {
			const res = await remove({ user_id: userInfo.id });
			expect(res.success).toBe(true);
		});
	});
});
