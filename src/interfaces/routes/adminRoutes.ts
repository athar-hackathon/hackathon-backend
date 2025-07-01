import { Router } from 'express';
import { verifyTokenMiddleware, isAdminMiddleware } from '../middlewares/authMiddleware';
import { 
  getPendingAssociationsController, 
  approveAssociationController, 
  rejectAssociationController,
  deletePlanController
} from '../controllers/adminController';
import { getAdminStatsController } from '../controllers/adminController';
import { validate } from '../middlewares/validate';
import { deletePlanSchema } from '../validators/commonSchemas';

const router = Router();

// Apply admin middleware to all routes
router.use(verifyTokenMiddleware);

// Get admin statistics
router.get('/stats', isAdminMiddleware, getAdminStatsController);

// Get pending associations for approval
router.get('/associations/pending', getPendingAssociationsController);

// Approve association
router.put('/associations/approve/:userId', approveAssociationController);

// Reject association
router.put('/associations/reject/:userId', rejectAssociationController);

// Delete a plan
router.delete('/plans/:id', validate(deletePlanSchema), deletePlanController);

export default router;