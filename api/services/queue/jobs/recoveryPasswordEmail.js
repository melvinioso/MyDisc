import emailService from '../../email';
import { capitalize } from 'lodash';

export const recoveryPasswordEmail = {
  queue: 'recoveryPasswordEmail',
  concurrency: 5,
  job: async ({ data }) => {
    const { email, code, userInfo } = data;
    if (!email) {
      throw new Error('Missing Email.');
    }

    const name = userInfo?.Profile?.name || capitalize(userInfo?.provider);

    const emailOptions = {
      from: 'dev+lotic@take2.co',
      to: email,
      subject: `Reset password code from Lotic.ai`,
      template: 'forgotPassword.mjml',
      context: {
        name,
        code,
      },
    };
    try {
      await emailService.sendMJML(emailOptions);
      console.log(`Reset password code sent to ${email} successfully !`);
    } catch (e) {
      console.log('EMAIL ERROR');
      try {
        console.log(JSON.stringify(e));
      } catch (_e) {
        console.log(e);
      }
      throw new Error('Failed to send email');
    }
  },
};
