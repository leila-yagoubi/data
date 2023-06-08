import { registerUser, checkUser, generateToken, retrieveMatchingCities,updateUser } from "../services/userService.mjs";
import { info, error } from "../services/loggers.mjs";
import { usershema } from '../models/usermodel.mjs';



async function update(req, res) {
  try {
    const { email, newName, newUsername } = req.body;

    const result = await updateUser(email, newName, newUsername);

    if (result.status) {
      info.log('User updated', { email });
      res.status(200).json({ status: true, message: result.message });
    } else {
      res.status(400).json({ status: false, error: result.error });
    }
  } catch (error) {
    error.log('Error updating user', { error: error.message });
    res.status(500).json({ status: false, error: 'Failed to update user' });
  }
}




async function register(req, res) {
  try {
    const { email, password, wilaya_code } = req.body;

    // استدعاء دالة تسجيل المستخدم من الخدمة
    const result = await registerUser(email, password, wilaya_code);

    if (result.status) {
      const matchingCities = result.matchingCities;

      // قم بتخزين matchingCities في الجلسة أو الرمز المميز للاستفادة منها عند تسجيل الدخول
      req.session.matchingCities = matchingCities;
      console.log("Matching Cities:", matchingCities);
      res.status(200).json({ status: true, message: result.message, matchingCities: req.session.matchingCities });
    } else {
      res.status(400).json({ status: false, error: result.error });
    }
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ status: false, error: 'Failed to register user' });
  }
}






// تسجيل الدخول
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("--", password);

    const user = await checkUser(email);
    console.log("-user-", user);

    if (!user) {
      res.status(401).json({ status: false, error: 'user does not exist' });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (isMatch === false) {
      res.status(401).json({ status: false, error: 'invalid password' });
      return;
    }

    const matchingCities = await retrieveMatchingCities(user.wilaya_code);
    console.log("Matching Cities:", matchingCities);
    req.session.matchingCities = matchingCities;

    let tokenData = { _id: user._id, email: user.email };
    const token = await generateToken(tokenData, "secretKey", '1h');

    if (!res.headersSent) {
      res.status(200).json({ status: true, token: token, matchingCities: req.session.matchingCities });
    }

  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ status: false, error: error.message });
    }
  }
};


export  {
register,
  login,
  update
};
