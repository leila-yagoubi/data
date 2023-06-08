import { info, error } from './loggers.mjs';
import { AdressM } from '../models/AdressModels.mjs';
import { usershema } from '../models/usermodel.mjs';
import jwt from 'jsonwebtoken';


async function updateUser(email, newName, newUsername) {
  try {
    const user = await usershema.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Update the user properties
    user.name = newName;
    user.username = newUsername;

    // Save the updated user
    await user.save();

    return { status: true, message: 'User updated successfully' };
  } catch (err) {
    throw new Error('Failed to update user');
  }
}



async function registerUser(email, password, wilaya_code) {
  try {
    // التحقق من وجود المستخدم بنفس البريد الإلكتروني
    const existingUser = await usershema.findOne({ email });
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const user = new usershema({ email, password, wilaya_code });
    await user.save();
    info.log('User registered', { email });

    // استعلام لاسترجاع البلديات المتوافقة وتخزينها في الجلسة أو الرمز المميز
    const matchingCities = await retrieveMatchingCities(wilaya_code);
// قم بتخزين matchingCities في الجلسة أو الرمز المميز للاستفادة منها عند تسجيل الدخول

return { status: true, message: 'User registered successfully', matchingCities };

  
    // قم بتخزين matchingCities في الجلسة أو الرمز المميز للاستفادة منها عند تسجيل الدخول


  } catch (err) {
    if (err.message === 'Email already exists') {
      return { status: false, error: 'Email already exists' };
    }
    error.log('Error registering user', { error: err.message });
    throw new Error('Failed to register user');
  }
}





async function checkUser(email) {
  try {
    return await usershema.findOne({ email });
  } catch (err) {
    throw err;
  }
}

function generateToken(tokenData, secretKey, expiresIn) {
  return jwt.sign(tokenData, secretKey, { expiresIn });
}

async function retrieveMatchingCities(wilayaCode) {
  // تعريف المتغير بقيمة افتراضية
  let matchingCities = [];
  try {
    // استعلام لاسترجاع البلديات المتوافقة مع الولاية المحددة
    const cities = await AdressM.find({ wilaya_code: wilayaCode });

    // استخراج أسماء البلديات بكلا اللغتين
    matchingCities = cities.map(city => ({
      commune_fr: city.commune_fr,
      commune_Ar: city.commune_Ar,
      wilaya_code: city.wilaya_code
    }));

    return matchingCities;
  } catch (err) {
    throw err;
  }
}

export {
  registerUser,
  checkUser,
  generateToken,
  retrieveMatchingCities,
    updateUser
};
