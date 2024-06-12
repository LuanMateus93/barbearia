const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  barberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Barber', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },  // Usando String para armazenar a data formatada
  service: { type: String, required: true }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
