import { Schema, model } from 'mongoose';

const pharmaModel = new Schema({
  namepharma: {
    type: String,
    required: true
  },
  Numero_Tel: {
    type: String,
  },
  description: {
    type: String,
  },
 
  commune_fr: {
    type: String,
    
  },
  geolocation: {
    plus_code: { type: String },
    latitude: { type: String },
    longitude: { type: String }
  }
});

export const pharmaM = model('pharmacies', pharmaModel);

 

 
 