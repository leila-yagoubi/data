import express from 'express';

const router = express.Router();
import { getAllcommunes, getAllwilaya, getcom } from '../controller/AdressController.mjs';


router.get('/allCommunes',getAllcommunes);

router.get('/allwilaya',getAllwilaya);

router.get('/allcommunes/:wilayaCode',getcom);

export default router;