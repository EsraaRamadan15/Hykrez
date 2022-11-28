import * as express from 'express';

const router = express.Router();

import { getAllCountries, getAllCities,AddCityForEgypt } from "./controller/lookup.js";

router.get('/GetAllCountries',getAllCountries)
router.get('/GetAllCitiesByCountry',getAllCities)
router.post('/addCityForEgypt',AddCityForEgypt)


export default router