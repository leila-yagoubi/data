import {pharmaM} from '../models/pharmaModels.mjs';




const getPharmaciesByCommune = async (req, res) => {

    const communefr = req.params.communefr;

   
    console.log(communefr);
    if (!communefr) {
      return res.json({ status: false, message: "Commune not found" });
    }
  try {
    
//
    const pharmacies = await pharmaM.find({ commune_fr: { $regex: new RegExp('^' + communefr + '$', 'i') } });
    if (!pharmacies.length) {
      return res.json({ status: false, message: `No pharmacie found for commune ${communefr}` });
    }
    // Return the list of pharmacies as a response
    res.json({ status: true, pharmacies: pharmacies });
  } catch (error) {
    console.error(error);
    res.json({ status: false, message: "Error getting pharmacies" });
  }
};

const getPharmaciesByname = async (req, res) => {
  // الحصول على اسم البلدة من معلمة الطلب
  const name = req.params.name;
  
  // إيجاد كائن البلدة بواسطة الاسم
  console.log(name);
  if (!name) {
    return res.json({ status: false, message: "pharmacie not found" });
  }
  try {
    // البحث عن الصيدلية بواسطة اسمها
    const pharmacie = await pharmaM.find({ namepharma: name });
    if (!pharmacie.length) {
      return res.json({ status: false, message: `No pharmacie found for pharmacie ${name}` });
    }
    // إرجاع قائمة الصيدليات كاستجابة
    res.json({ status: true, pharmacie: pharmacie });
  } catch (error) {
    console.error(error);
    res.json({ status: false, message: "Error getting pharmacies" });
  }
};


const createpharma = async (req, res) => {
  try {
    // Extract the necessary data from the request body
    const { namepharma, Numero_Tel, description, commune_fr, geolocation } = req.body;

    // Create a new pharmacy object
    const pharmacy = new pharmaM({
      namepharma,
      Numero_Tel,
      description,
      commune_fr,
      geolocation,
    });

    // Save the pharmacy object to the database
    const createdPharmacy = await pharmacy.save();

    // Return the created pharmacy as a response
    res.status(201).json({ status: true, data: createdPharmacy });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Failed to create pharmacy" });
  }
};


/*
const createpharma = async (req, res) => {
  try {
    const { namepharma, Numero_Tel, description, commune_fr, geolocation } = req.body;

    // Find the wilaya and commune objects by name
    //const wilaya = await AdressM.findOne({ wilaya_name_fr });
    const communes = await AdressM.findOne({ commune_fr });
   // console.log(wilaya);
    console.log(communes);

    if (!communes) {
      return res.json({ status: false, message: "Address not found" });
    }

    // Create a new pharmacy object
    const newPharma = new pharmaM({
      namepharma,
      Numero_Tel,
      description,
     // wilaya: wilaya.wilaya_name_fr, // Use the object IDs instead of the names
      commune_fr: commune_fr,
      geolocation,
    });

    // Save the new pharmacy object to the database
    const savedPharma = await newPharma.save();

    
    res.json({ status: true, success: savedPharma });
  } catch (error) {
    console.error(error);
    res.json({ status: false, message: "Error creating pharmacy" });
  }
};*/

const getPharma = async (req, res) => {
  try {
    const pharmacies = await pharmaM.find();
    res.json({ status: true, success: pharmacies });
  
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong'
    });
  }
}







const deletePharma = async (req, res) => {
    try {
        const{pharmaId}=req.params;
        const deletePharma = await pharmaM.findByIdAndDelete(pharmaId);

        res.json({status:true, succes: deletePharma});

    } catch (error) {
        res.json({ status:false ,message:"erreur"});
    }
};

const updatepharma = async (req, res) => {
    try {

        const { namepharma, Numero_Tel, description, commune_fr, geolocation } = req.body;
const updatepharma = await pharmaM.findByIdAndUpdate(
  pharmaId, 
  { namepharma, Numero_Tel, description, commune_fr, geolocation }, 
  { new: true } // to return the updated document
);

        
     
     res.json(updatepharma);
    } catch (error) {
        res.json({status:false ,message:"erreur"});
    }
}


export {
    createpharma,
    getPharmaciesByCommune,
    deletePharma,
    updatepharma,
    getPharma, 
    getPharmaciesByname
};