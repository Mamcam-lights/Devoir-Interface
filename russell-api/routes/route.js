const express = require('express');
const router = express.Router();
const catway = require('../routes/controller');

router.get('/', catway.getAll);
router.get('/:id', catway.getOne);
router.post('/', catway.create);
router.put('/:id', catway.update);
router.delete('/:id', catway.remove);

module.exports = router;