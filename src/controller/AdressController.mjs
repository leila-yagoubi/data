import { wilayaM } from '../models/AdressModels.mjs';
import{AdressM}from '../models/AdressModels.mjs'

const getAllwilaya = async (req, res) => {
  try {
    const allWilayas = await wilayaM.find();
    res.json({ status: true, success: allWilayas });
  } catch (error) {
    console.error(error);
    res.json({ status: false, message: 'Error fetching wilayas' });
  }
};

const getAllcommunes = async (req, res) => {
  try {
    const allCommunes = await AdressM.find();
    res.json({ status: true, success: allCommunes });
  } catch (error) {
    console.error(error);
    res.json({ status: false, message: 'Error fetching communes' });
  }
};

const getcom = async (req, res) => {
    const wilayaCode = req.params.wilayaCode;
  
    // Validate that wilayaCode is a number
    if (isNaN(wilayaCode)) {
      return res.json({ status: false, message: `Invalid wilaya code: ${wilayaCode}` });
    }
  
    try {
      const communes = await AdressM.find({ wilaya_code: wilayaCode });
      if (!communes.length) {
        return res.json({ status: false, message: `No communes found for wilaya ${wilayaCode}` });
      }
      res.json({ status: true, communes: communes });
    } catch (error) {
      console.error(error);
      res.json({ status: false, message: `Error fetching communes for wilaya ${wilayaCode}` });
    }
  };
  
  

export  {
  getAllcommunes,
  getAllwilaya,
  getcom
};
