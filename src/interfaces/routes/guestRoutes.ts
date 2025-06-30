import { Router } from 'express';
import { submitGuestVolunteerFormController } from '../controllers/guestController';
import { validate } from '../middlewares/validate';
import { guestVolunteerFormSchema } from '../validators/guestVolunteerSchema';

const router = Router();

// Submit guest volunteer form
router.post('/volunteer', validate(guestVolunteerFormSchema), submitGuestVolunteerFormController);

export default router; 