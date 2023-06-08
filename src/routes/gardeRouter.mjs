import express from 'express';

const gardroute = express.Router();
import { createpharmacie, getAllGardeByCommune, getallgarde, getstatepharma, } from '../controller/gardeController.mjs';


gardroute.post('/creategard',createpharmacie);
gardroute.get('/state/:communefr/:guardDate', getstatepharma);
gardroute.get('/get/:guardDate', getallgarde);
gardroute.get('/garde/:communefr/:guardDate',getAllGardeByCommune);

export default gardroute;