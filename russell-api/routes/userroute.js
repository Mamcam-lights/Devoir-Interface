const express = require('express');
const router = express.Router();
const user = require('./user');

router.get('/', user.getAll);
router.get('/:email', user.getOne);
router.post('/', user.create);
router.put('/:email', user.update);
router.delete('/:email', user.remove);

module.exports = router;