const express = require('express');
const router = express.Router();
const SeatController = require('../../controllers/seats');

/* GET seats listing. */
router.get('/', SeatController.findAll);
router.post('/', SeatController.create);
router.get('/:seatId', SeatController.findOne);
router.post('/:seatId', SeatController.update);
router.delete('/:seatId', SeatController.delete);

module.exports = router;
