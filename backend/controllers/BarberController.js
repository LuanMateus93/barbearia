const Barber = require('../models/Barber');
const moment = require('moment');

// Registro de Barbeiro
exports.registerBarber = async (req, res) => {
  const { email, password, name, bio, services, workingHours } = req.body;
  try {
    const existingBarber = await Barber.findOne({ email });
    if (existingBarber) return res.status(400).json({ msg: 'Barbeiro já registrado' });

    const newBarber = new Barber({ email, password, name, bio, services, workingHours });
    await newBarber.save();

    res.status(201).json({ msg: 'Barbeiro registrado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login de Barbeiro
exports.loginBarber = async (req, res) => {
  const { email, password } = req.body;
  try {
    const barber = await Barber.findOne({ email });
    if (!barber) return res.status(400).json({ msg: 'Barbeiro não encontrado' });

    if (barber.password !== password) return res.status(400).json({ msg: 'Credenciais inválidas' });

    req.session.barber = barber;
    res.status(200).json({ msg: 'Login realizado com sucesso', barber });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Logout de Barbeiro
exports.logoutBarber = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ msg: 'Erro ao deslogar' });
    }
    res.status(200).json({ msg: 'Logout realizado com sucesso' });
  });
};

// Atualizar Bio e Serviços do Barbeiro
exports.updateBarber = async (req, res) => {
  const { id } = req.params;
  const { bio, services } = req.body;
  try {
    if (req.session.barber._id !== id) {
      return res.status(403).json({ msg: 'Acesso negado' });
    }

    const updatedBarber = await Barber.findByIdAndUpdate(id, { bio, services }, { new: true });
    res.status(200).json({ msg: 'Barbeiro atualizado com sucesso', barber: updatedBarber });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar Barbeiros
exports.getBarbers = async (req, res) => {
  try {
    const barbers = await Barber.find();
    res.status(200).json(barbers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Definir horários de trabalho
exports.setWorkingHours = async (req, res) => {
  const { id } = req.params;
  const { workingHours } = req.body;
  try {
    if (req.session.barber._id !== id) {
      return res.status(403).json({ msg: 'Acesso negado' });
    }

    const updatedBarber = await Barber.findByIdAndUpdate(id, { workingHours }, { new: true });
    res.status(200).json({ msg: 'Horários de trabalho definidos com sucesso', barber: updatedBarber });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Bloquear Horário
exports.blockTime = async (req, res) => {
  const { start, end, reason } = req.body;
  try {
    const barber = await Barber.findById(req.session.barber._id);
    if (!barber) return res.status(400).json({ msg: 'Barbeiro não encontrado' });

    // Verificar se o horário já está bloqueado
    const overlappingBlockedTime = barber.blockedTimes.some(time => {
      return (
        (start >= time.start && start < time.end) ||
        (end > time.start && end <= time.end) ||
        (start <= time.start && end >= time.end)
      );
    });

    if (overlappingBlockedTime) {
      return res.status(400).json({ msg: 'Horário já está bloqueado' });
    }

    barber.blockedTimes.push({ start, end, reason });
    await barber.save();

    res.status(201).json({ msg: 'Horário bloqueado com sucesso', blockedTimes: barber.blockedTimes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Desbloquear Horário
exports.unblockTime = async (req, res) => {
  const { timeId } = req.params;
  try {
    const barber = await Barber.findById(req.session.barber._id);
    if (!barber) return res.status(400).json({ msg: 'Barbeiro não encontrado' });

    const timeToRemove = barber.blockedTimes.id(timeId);
    if (!timeToRemove) {
      return res.status(404).json({ msg: 'Horário não encontrado' });
    }

    timeToRemove.remove();
    await barber.save();

    res.status(200).json({ msg: 'Horário desbloqueado com sucesso', blockedTimes: barber.blockedTimes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar Horários Bloqueados do Barbeiro
exports.getBlockedTimes = async (req, res) => {
  try {
    const barber = await Barber.findById(req.session.barber._id);
    if (!barber) return res.status(400).json({ msg: 'Barbeiro não encontrado' });

    res.status(200).json(barber.blockedTimes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
