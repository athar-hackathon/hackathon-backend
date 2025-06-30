import nodemailer from 'nodemailer';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export interface GuestVolunteerForm {
  name: string;
  email: string;
  phone?: string;
  age: number;
  gender: 'MALE' | 'FEMALE';
  country: string;
  city: string;
  planId: string;
  planName: string;
  id_number : string;
  message?: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configure email transporter (you'll need to set up your email credentials)
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: options.to,
        subject: options.subject,
        html: options.html,
      };

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  }

  async sendApprovalEmail(associationEmail: string, associationName: string): Promise<boolean> {
    const subject = 'Association Registration Approved';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #28a745;">🎉 Congratulations!</h2>
        <p>Dear ${associationName},</p>
        <p>Your association registration has been <strong>approved</strong> by our admin team.</p>
        <p>You can now log in to your account and start creating plans and managing your association.</p>
        <p>If you have any questions, please don't hesitate to contact our support team.</p>
        <br>
        <p>Best regards,</p>
        <p>The OxyJeunes Team</p>
      </div>
    `;

    return this.sendEmail({ to: associationEmail, subject, html });
  }

  async sendRejectionEmail(associationEmail: string, associationName: string, reason?: string): Promise<boolean> {
    const subject = 'Association Registration Update';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc3545;">Registration Status Update</h2>
        <p>Dear ${associationName},</p>
        <p>We regret to inform you that your association registration has been <strong>rejected</strong> by our admin team.</p>
        ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
        <p>If you believe this decision was made in error or if you would like to provide additional information, please contact our support team.</p>
        <p>You may also submit a new registration application with updated information.</p>
        <br>
        <p>Best regards,</p>
        <p>The OxyJeunes Team</p>
      </div>
    `;

    return this.sendEmail({ to: associationEmail, subject, html });
  }

  async sendGuestVolunteerForm(formData: GuestVolunteerForm): Promise<boolean> {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@oxyjeunes.com';
    const subject = 'New Guest Volunteer Application';
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #007bff;">🎯 New Guest Volunteer Application</h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #495057; margin-top: 0;">Volunteer Information</h3>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #495057;">Name:</td>
              <td style="padding: 8px 0;">${formData.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #495057;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${formData.email}">${formData.email}</a></td>
            </tr>
            ${formData.phone ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #495057;">Phone:</td>
              <td style="padding: 8px 0;"><a href="tel:${formData.phone}">${formData.phone}</a></td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #495057;">Age:</td>
              <td style="padding: 8px 0;">${formData.age} years old</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #495057;">Gender:</td>
              <td style="padding: 8px 0;">${formData.gender}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #495057;">Location:</td>
              <td style="padding: 8px 0;">${formData.city}, ${formData.country}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #495057;">Location:</td>
              <td style="padding: 8px 0;">${formData.id_number}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1976d2; margin-top: 0;">Plan Information</h3>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #1976d2;">Plan Name:</td>
              <td style="padding: 8px 0;">${formData.planName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #1976d2;">Plan ID:</td>
              <td style="padding: 8px 0;">${formData.planId}</td>
            </tr>
          </table>
        </div>

        ${formData.message ? `
        <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #856404; margin-top: 0;">Additional Message</h3>
          <p style="margin: 0; line-height: 1.6;">${formData.message}</p>
        </div>
        ` : ''}

        <div style="background-color: #d4edda; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #155724;">
            <strong>Action Required:</strong> Please review this application and contact the volunteer if needed.
          </p>
        </div>

        <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
        
        <p style="color: #6c757d; font-size: 14px; text-align: center;">
          This email was sent from the OxyJeunes platform.<br>
          Application submitted on ${new Date().toLocaleString()}
        </p>
      </div>
    `;

    return this.sendEmail({ to: adminEmail, subject, html });
  }

  async sendPlanDeletionEmail(
    associationEmail: string,
    associationName: string,
    planName: string,
    adminName: string,
    reason?: string
  ): Promise<void> {
    const subject = 'Your Plan Has Been Deleted';
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background-color: #dc3545; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">Plan Deletion Notice</h1>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <p style="color: #495057; font-size: 16px; line-height: 1.6;">
            Dear <strong>${associationName}</strong>,
          </p>
          
          <p style="color: #495057; font-size: 16px; line-height: 1.6;">
            We regret to inform you that your plan <strong>"${planName}"</strong> has been deleted by our administration team.
          </p>
          
          ${reason ? `
            <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #856404; margin: 0 0 10px 0; font-size: 18px;">Reason for Deletion:</h3>
              <p style="color: #856404; margin: 0; font-size: 14px;">${reason}</p>
            </div>
          ` : ''}
          
          <p style="color: #495057; font-size: 16px; line-height: 1.6;">
            If you believe this action was taken in error or if you have any questions, please contact our support team.
          </p>
          
          <div style="background-color: #e9ecef; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="color: #495057; margin: 0; font-size: 14px;">
              <strong>Deleted by:</strong> ${adminName}<br>
              <strong>Date:</strong> ${new Date().toLocaleDateString()}
            </p>
          </div>
          
          <p style="color: #495057; font-size: 16px; line-height: 1.6;">
            Thank you for your understanding.
          </p>
          
          <p style="color: #495057; font-size: 16px; line-height: 1.6;">
            Best regards,<br>
            <strong>The OxyJeunes Team</strong>
          </p>
        </div>
      </div>
    `;

    await this.sendEmail({ to: associationEmail, subject, html: htmlContent });
  }

  async sendApplicationAcceptedEmail(userEmail: string, userName: string, planName: string): Promise<boolean> {
    const subject = 'Your Plan Application Has Been Accepted!';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #28a745;">🎉 Congratulations!</h2>
        <p>Dear ${userName},</p>
        <p>Great news! Your application for the plan <strong>"${planName}"</strong> has been <strong>accepted</strong>.</p>
        <p>You can now participate in this plan. Please check the plan details and prepare accordingly.</p>
        <p>If you have any questions, please don't hesitate to contact the association.</p>
        <br>
        <p>Best regards,</p>
        <p>The OxyJeunes Team</p>
      </div>
    `;

    return this.sendEmail({ to: userEmail, subject, html });
  }

  async sendApplicationRejectedEmail(userEmail: string, userName: string, planName: string, reason?: string): Promise<boolean> {
    const subject = 'Update on Your Plan Application';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc3545;">Application Status Update</h2>
        <p>Dear ${userName},</p>
        <p>We regret to inform you that your application for the plan <strong>"${planName}"</strong> has been <strong>rejected</strong>.</p>
        ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
        <p>Don't be discouraged! There are many other opportunities available. We encourage you to apply for other plans that match your interests.</p>
        <p>If you believe this decision was made in error, please contact the association for clarification.</p>
        <br>
        <p>Best regards,</p>
        <p>The OxyJeunes Team</p>
      </div>
    `;

    return this.sendEmail({ to: userEmail, subject, html });
  }
} 