const { add } = require('../controllers/User/index.js');
const crypto = require('crypto');

require('./initiateTest.js');

describe('KAFKA user_add', () => {
	it('should return success true', async () => {
		const request = {
			userName: 'unittest_userName_' + crypto.randomBytes(16).toString('hex'),
			emailAddress: 'unittest_emailAddress_' + crypto.randomBytes(16).toString('hex'),
			password: crypto.createHash('md5').update('password').digest('hex'),
			accountNumber: Math.floor(Math.random() * 1000000000),
			identityNumber: 'unittest_identityNumber_' + crypto.randomBytes(16).toString('hex'),
		};
		const res = await add(request);
		expect(res.success).toBe(true);
	});
});
