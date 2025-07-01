import { Router } from 'express';
import { submitGuestVolunteerFormController } from '../controllers/guestController';
import { validate } from '../middlewares/validate';
import { guestVolunteerFormSchema } from '../validators/guestVolunteerSchema';
import { getAllPlansController, getMostPopularPlansController } from '../controllers/planController';

const router = Router();

// Submit guest volunteer form
router.post('/volunteer', validate(guestVolunteerFormSchema), submitGuestVolunteerFormController);
router.get("/plans", getAllPlansController);
router.get("/plans/popular", getMostPopularPlansController);

export default router;