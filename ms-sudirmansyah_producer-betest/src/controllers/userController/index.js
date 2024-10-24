const add = require('./add.user.js');
const update = require('./update.user.js');
const deleteUser = require('./delete.user.js');
const getAll = require('./get.all.user.js');
const getByIdentityNumber = require('./get.byIdentityNumber.user.js');
const getByAccountNumber = require('./get.byAccountNumber.user.js');
module.exports = {
	add,
	update,
	deleteUser,
	getAll,
	getByIdentityNumber,
	getByAccountNumber,
};
