// backend/routes/venueRoute.js
import express from 'express';
import { getAllVenues } from '../controllers/venueController.js';

const venueRouter = express.Router();

venueRouter.get('/all', getAllVenues);

export default venueRouter;