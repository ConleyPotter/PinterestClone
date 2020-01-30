/* eslint-disable no-underscore-dangle */
/* eslint-disable no-useless-catch */
// come back to do something with the error
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { secretOrKey } = require('../../config/keys');
const validateRegisterInput = require('../validations/register');
const validateLoginInput = require('../validations/login');

const register = async (data) => {
  try {
    const { message, isValid } = validateRegisterInput(data);

    if (!isValid) {
      throw new Error(message);
    }

    const { name, email, password } = data;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error('This user already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User(
      {
        name,
        email,
        password: hashedPassword,
      },
      (err) => {
        if (err) throw err;
      },
    );

    user.save();
    const token = jwt.sign({ id: user.id }, secretOrKey);

    return {
      token, loggedIn: true, ...user._doc, password: null,
    };
  } catch (err) {
    throw err;
  }
};

const logout = async (data) => {
  const { id } = data;
  const leavingUser = await User.findById(id);
  const token = '';
  return {
    // eslint-disable-next-line no-underscore-dangle
    token, loggedIn: false, ...leavingUser._doc, password: null,
  };
};

const login = async (data) => {
  try {
    const { message, isValid } = validateLoginInput(data);

    if (!isValid) {
      throw new Error(message);
    }

    const { email, password } = data;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Email does not exist');
    }

    const passwordMatch = await bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      throw new Error('Password does not match');
    }

    const token = jwt.sign({ id: user.id }, secretOrKey);
    return {
      token, loggedIn: true, ...user._doc, password: null,
    };
  } catch (err) {
    // TODO: do some sort of error handling
    throw err;
  }
};

const verifyUser = async (data) => {
  try {
    const { token } = data;
    const decoded = await jwt.verify(token, secretOrKey);
    const { id } = decoded;
    const user = await User.findById(id);
    const loggedIn = !!user;
    return {
      loggedIn,
      username: user.username,
      id: user.id,
      admin: user.admin,
    };
  } catch (err) {
    return { loggedIn: false };
  }
};

module.exports = {
  register, logout, login, verifyUser,
};
