import { Schema, model } from 'mongoose';


const AdressModel = Schema({
    wilaya_code: { type: Number },
    commune_fr: { type: String },
    commune_Ar: { type: String },
});

const wilayaModel = Schema({

    wilaya_code: { type: Number },
    wilaya_fr: { type: String },
    wilaya_AR: { type: String }
   
});

// ../models/AdressModels.mjs

export const AdressM = model('communes', AdressModel);
export const  wilayaM= model('wilayas',wilayaModel );



