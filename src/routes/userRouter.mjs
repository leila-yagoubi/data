import express from 'express';

const routeruser = express.Router();
import { login, register, update } from '../controller/usercontroller.mjs';
import { retrieveMatchingCities } from '../services/userService.mjs';


routeruser.post('/retrieveMatchingCities',retrieveMatchingCities);
routeruser.post('/singup', register);
routeruser.post('/login', login);
routeruser.post('/update',update);
export default routeruser;