import Joi from 'joi';
import sgMail from '@sendgrid/mail';
import config from '../../../config/config';

sgMail.setApiKey(config.email.sendGrid.apiKey);

const schema = Joi.object({
  to: Joi.string().email().required(),
  from: Joi.string().email().required(),
  subject: Joi.string().required(),
  text: Joi.string().required(),
  html: Joi.string(),
});

class SendGridAdapter {
  options;

  constructor(options) {
    this.options = options;
  }

  async sendEmail(options) {
    let mailOptions = {
      ...options,
    };

    schema.validate(mailOptions);

    if (
      !config.email.sendGrid.apiKey ||
      String(config.environment).toLocaleLowerCase() == 'test'
    ) {
      mailOptions.mail_settings = {
        sandbox_mode: {
          enable: true,
        },
      };
    }

    return sgMail.send(mailOptions);
  }
}

export default SendGridAdapter;
