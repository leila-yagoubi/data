import { Schema, model } from 'mongoose';

const pharmaciegardSchema = new Schema({
  namepharma: {
    type: String,  required: true, ref: 'pharmacies',
    select: 'namepharma'
  },
  commune_fr: {
    type: String,
  },
  guardDate: { type: Date, required: true },
  nuit: { type: Boolean, required: true },
  minuit: { type: Boolean, required: true },
  weekend: { type: Boolean, required: true },
});


const Pharmaciegard = model('PharmacieGards', pharmaciegardSchema);

export default Pharmaciegard;
