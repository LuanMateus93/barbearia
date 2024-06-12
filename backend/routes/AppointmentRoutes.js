const express = require('express');
const router = express.Router();
const { createAppointment, getAppointments, updateAppointment, deleteAppointment } = require('../controllers/AppointmentController');

const isLoggedIn = (req, res, next) => {
  if (req.session.user || req.session.barber) {
    next();
  } else {
    res.status(401).json({ msg: 'Não está logado' });
  }
};

router.post('/', isLoggedIn, createAppointment);
router.get('/', isLoggedIn, getAppointments);
router.put('/:id', isLoggedIn, updateAppointment);
router.delete('/:id', isLoggedIn, deleteAppointment);

module.exports = router;
