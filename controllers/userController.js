const prisma = require('../prisma/index');
const cookieToken = require('../utils/cookieToken');

//user signup
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    //check
    if (!name || !email || !password)
      throw new Error('Please provide all fields');
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    //send user a token
    cookieToken(user, res);
  } catch (error) {
    throw new Error(error);
  }
};

//user login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new Error('Please provide email and password');
    const user = await prisma.user.findUnique({
      where: { email },
    });
    // user not found
    if (!user) throw new Error('User not found');
    // password mismatch
    // if (!user.password !== password) throw new Error('Password is incorrect');
    //valid user
    cookieToken(user, res);
  } catch (error) {
    throw new Error(error);
  }
};

//logout
exports.logout = async (req, res, next) => {
  try {
    res.clearCookie('token');
    res.json({
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
};
