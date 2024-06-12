const express = require('express');
const router = express.Router();
const {
  registerBarber,
  loginBarber,
  logoutBarber,
  getBarbers,
  updateBarber,
  blockTime,
  unblockTime,
  getBlockedTimes,
  setWorkingHours
} = require('../controllers/BarberController');

const isBarberLoggedIn = (req, res, next) => {
  if (req.session.barber) {
    next();
  } else {
    res.status(401).json({ msg: 'Barbeiro não está logado' });
  }
};

router.post('/register', registerBarber);
router.post('/login', loginBarber);
router.post('/logout', isBarberLoggedIn, logoutBarber);
router.get('/', getBarbers);
router.put('/:id', isBarberLoggedIn, updateBarber);
router.post('/block-time', isBarberLoggedIn, blockTime);
router.delete('/block-time/:timeId', isBarberLoggedIn, unblockTime);
router.get('/blocked-times', isBarberLoggedIn, getBlockedTimes);
router.put('/:id/working-hours', isBarberLoggedIn, setWorkingHours); // Definir horários de trabalho

module.exports = router;
