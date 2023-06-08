import express from 'express';

const routerpharma = express.Router();
import { createpharma, deletePharma, updatepharma, getPharma, getPharmaciesByCommune, getPharmaciesByname } from '../controller/pharmaController.mjs';




routerpharma.get('/pharma/:communefr',getPharmaciesByCommune);
routerpharma.get('/pharmas/:name',getPharmaciesByname);

  
routerpharma.get('/pharma',getPharma);

routerpharma.post('/created',createpharma);

routerpharma.delete('/:pharmaId' , deletePharma);

routerpharma.put('/:pharmaId', updatepharma);



export default routerpharma;



