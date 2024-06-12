const User = require('../models/User');

// Registro de Usuário
exports.registerUser = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'Usuário já registrado' });

    const newUser = new User({ email, password, name });
    await newUser.save();

    res.status(201).json({ msg: 'Usuário registrado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login de Usuário
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Usuário não encontrado' });

    if (user.password !== password) return res.status(400).json({ msg: 'Credenciais inválidas' });

    req.session.user = user;
    res.status(200).json({ msg: 'Login realizado com sucesso', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Logout de Usuário
exports.logoutUser = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ msg: 'Erro ao deslogar' });
    }
    res.status(200).json({ msg: 'Logout realizado com sucesso' });
  });
};
