import Pharmaciegard from '../models/gardeModels.mjs';

import moment from 'moment';
import { error } from '../services/loggers.mjs';



// Create a new pharmagarde
const createpharmacie = async (req, res) => {
  try {
    const { namepharma, guardDate,commune_fr, nuit, minuit, weekend } = req.body;

    // Perform validation checks on the input data, if necessary

    const newPharmacie = await Pharmaciegard.create({
      namepharma,
      commune_fr,
      guardDate,
      nuit,
      minuit,
      weekend,
    });

    res.status(201).json(newPharmacie);
  } catch (error) {
    console.error('Failed to create pharmacy', error);
    res.status(500).json({ error: 'Failed to create pharmacy' });
  }
};

const getallgarde = async (req, res) => {
  const dateFormat = 'YYYY-MM-DD';
  const guardDate = moment(req.params.guardDate, dateFormat).toDate();

  if (!moment(guardDate).isValid()) {
    res.status(400).json({ error: 'تاريخ غير صالح' });
    return;
  }

  const startOfDay = moment(guardDate).startOf('day').toDate();
  const endOfDay = moment(guardDate).endOf('day').toDate();

  const query = {
    guardDate: { $gte: startOfDay, $lte: endOfDay }
  };

  try {
    const Pharmagard = await Pharmaciegard.find(query);
    if (!Pharmagard.length) {
      return res.json({ status: false, message: `No pharmacie found for pharmacie ${query}` });
    }
    // Return the list of pharmacies as a response
    res.json({ status: true, Pharmagard: Pharmagard });
  } catch (error) {
    console.error(error);
    res.json({ status: false, message: "Error getting pharmacies" });
  }
};

const getAllGardeByCommune = async (req, res) => {
  const communefr = req.params.communefr;
  console.log(communefr);
  if (!communefr) {
    return res.json({ status: false, message: "Commune not found" });
  }

  const dateFormat = 'YYYY-MM-DD';
  const guardDate = moment(req.params.guardDate, dateFormat).toDate();

  if (!moment(guardDate).isValid()) {
    res.status(400).json({ error: 'تاريخ غير صالح' });
    return;
  }

  const startOfDay = moment(guardDate).startOf('day').toDate();
  const endOfDay = moment(guardDate).endOf('day').toDate();

  const query = {
    commune_fr: { $regex: new RegExp('^' + communefr + '$', 'i') },
    guardDate: { $gte: startOfDay, $lte: endOfDay },
  };

  try {
    const pharmacie = await Pharmaciegard.find(query);
    if (!pharmacie.length) {
      return res.json({ status: false, message: `err` });
    }
    // Return the list of pharmacies as a response
    res.json({ status: true, pharmacie: pharmacie });
  } catch (error) {
    console.error(error);
    res.json({ status: false, message: "Error getting pharmacies" });
  }
};




const getstatepharma = async (req, res) => {
  const communefr = req.params.communefr;
  if (!communefr) {
    return res.json({ status: false, message: "Commune not found" });
  }

  const dateFormat = 'YYYY-MM-DD';
  const guardDate = moment(req.params.guardDate, dateFormat).toDate();

  if (!moment(guardDate).isValid()) {
    return res.status(400).json({ error: 'تاريخ غير صالح' });
  }

  const nuit = req.query.nuit === 'true';
  const minuit = req.query.minuit === 'true';
  const weekend = req.query.weekend === 'true';

  try {
    const pharmacies = await getPharmaciesByStatus(communefr, guardDate, nuit, minuit, weekend);

    if (!pharmacies.length) {
      return res.json({ status: false, message: `No pharmacie found for commune ${communefr} and guard date ${guardDate}` });
    }

    return res.json({ status: true, pharmacies: pharmacies });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'حدث خطأ أثناء جلب الصيدليات المناوبة' });
  }
};

async function getPharmaciesByStatus(communefr, guardDate, nuit, minuit, weekend) {
  const startOfDay = moment(guardDate).startOf('day').toDate();
  const endOfDay = moment(guardDate).endOf('day').toDate();

  const query = {
    commune_fr: { $regex: new RegExp('^' + communefr + '$', 'i') },
    guardDate: { $gte: startOfDay, $lte: endOfDay },
  };

  if (nuit) {
    query.nuit = true;
  }

  if (minuit) {
    query.minuit = true;
  }

  if (weekend) {
    query.weekend = true;
  }

  try {
    const pharmacies = await Pharmaciegard.find(query);

    return pharmacies;
  } catch (error) {
    console.error(error);
    throw new Error('حدث خطأ أثناء جلب الصيدليات المناوبة');
  }
}






export {
 createpharmacie,
getallgarde,
 getAllGardeByCommune,
 getstatepharma
}