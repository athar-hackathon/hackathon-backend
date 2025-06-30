import { Request, Response } from 'express';
import { submitGuestVolunteerForm } from '../../application/use-cases/SubmitGuestVolunteerForm';
import { PlanRepository } from '../../infrastructure/repositories/PlanRepository';

export const submitGuestVolunteerFormController = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await submitGuestVolunteerForm(PlanRepository)(req.body);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: result.error
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Guest volunteer form submitted successfully. We will contact you soon!'
    });
  } catch (error) {
    console.error('Error submitting guest volunteer form:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Internal server error'
    });
  }
}; 