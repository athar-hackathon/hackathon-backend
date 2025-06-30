import { EmailService, GuestVolunteerForm } from "@/src/infrastructure/services/EmailService";
import { IPlanRepository } from "@/src/domain/repositories/IPlanRepository";

export const submitGuestVolunteerForm = (planRepo: IPlanRepository) => async (formData: GuestVolunteerForm): Promise<{ success: boolean; error?: string }> => {
  try {
    const plan = await planRepo.findById(formData.planId);
    if (!plan) {
      return { success: false, error: "Plan not found" };
    }

    // Update form data with actual plan name
    const updatedFormData: GuestVolunteerForm = {
      ...formData,
      planName: plan.name
    };

    const emailService = new EmailService();
    const emailSent = await emailService.sendGuestVolunteerForm(updatedFormData);

    if (!emailSent) {
      return { success: false, error: "Failed to send email notification" };
    }

    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: `Failed to submit guest volunteer form: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}; 