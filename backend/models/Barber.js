const mongoose = require('mongoose');

const BarberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  bio: { type: String },
  type: { type: String, default: 'barber' },
  services: [{
    name: { type: String, required: true },
    price: { type: Number, required: true }
  }],
  blockedTimes: [{
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    reason: { type: String }
  }]
});

module.exports = mongoose.model('Barber', BarberSchema);
