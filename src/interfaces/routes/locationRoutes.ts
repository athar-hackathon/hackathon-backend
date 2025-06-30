import { Router } from 'express';
import { 
  getAllLocations, 
  getLocationById, 
  searchLocations, 
} from '../controllers/locationController';
import { validate } from '../middlewares/validate';
import { idParamSchema } from '../validators/commonSchemas';

const router = Router();

// Get all locations
router.get('/', getAllLocations);

// Search locations by filters
router.get('/search', searchLocations);
// Get location by ID
router.get('/:id', getLocationById);

export default router; 