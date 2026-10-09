const express = require('express');
const router = express.Router({ mergeParams: true });
const reservation = require('../routes/reservationcontroller');

router.get('/', reservation.getAll);
router.get('/:idReservation', reservation.getOne);
router.post('/', reservation.create);
router.put('/:idReservation', reservation.update);
router.delete('/:idReservation', reservation.remove);

module.exports = router;