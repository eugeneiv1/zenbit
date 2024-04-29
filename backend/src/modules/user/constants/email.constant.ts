import { EEmailAction } from '../enums/email-action.enum';

export const emailTemplates = {
  [EEmailAction.FORGOT_PASSWORD]: {
    templateName: 'forgot-npassword',
    subject: 'Restore password',
  },
};
