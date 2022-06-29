// import sgMail from '@sendgrid/mail';
// import emailService from '../../services/email';

// const mock = sinon.mock('@sendgrid/mail', () => {
//   return {
//     setApiKey: jest.fn(),
//     send: jest.fn(),
//   };
// });

// describe('Services - Email Service', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//     jest.restoreAllMocks();
//   });

//   it('should send a plain text email', async () => {
//     const success = 'send success';
//     sgMail.send.mockResolvedValueOnce(success);

//     await emailService.sendPlainText({
//       to: 'text@example.com',
//       from: 'no-reply@example.com',
//       subject: 'Plain Text Email',
//       text: 'This is a body test only.',
//     });

//     expect(sgMail.send).toBeCalledWith({
//       to: 'text@example.com',
//       from: 'no-reply@example.com',
//       subject: 'Plain Text Email',
//       text: 'This is a body test only.',
//       mail_settings: {
//         sandbox_mode: {
//           enable: true,
//         },
//       },
//     });
//   });

//   it('should send an HTML email', async () => {
//     const success = 'send success';
//     sgMail.send.mockResolvedValueOnce(success);

//     await emailService.sendHTML({
//       to: 'text@example.com',
//       from: 'no-reply@example.com',
//       subject: 'HTML Email',
//       template: 'template.html',
//       context: { name: 'Nancy' },
//     });

//     expect(sgMail.send).toBeCalledWith({
//       to: 'text@example.com',
//       from: 'no-reply@example.com',
//       subject: 'HTML Email',
//       text: 'Hello Nancy.',
//       html: `<p>Hello Nancy.</p>
// `, // husky adds a new line
//       mail_settings: {
//         sandbox_mode: {
//           enable: true,
//         },
//       },
//     });
//   });

//   it('should send an MJML email', async () => {
//     const success = 'send success';
//     sgMail.send.mockResolvedValueOnce(success);

//     await emailService.sendMJML({
//       to: 'text@example.com',
//       from: 'no-reply@example.com',
//       subject: 'MJML Email',
//       template: 'template.mjml',
//       context: { name: 'Jeff' },
//     });

//     const call = sgMail.send.mock.calls[0][0];
//     expect(call.to).to.equal('text@example.com');
//     expect(call.from).to.equal('no-reply@example.com');
//     expect(call.subject).to.equal('MJML Email');
//     expect(call.text).to.equal('Hello Jeff.');
//     expect(call.html).to.equal('Jeff');
//     expect(call.mail_settings.sandbox_mode.enable).to.equal(true);
//   });

//   it('should throw if template is not found', async () => {
//     const success = 'send success';
//     sgMail.send.mockResolvedValueOnce(success);

//     expect(
//       emailService.sendHTML({
//         to: 'text@example.com',
//         from: 'no-reply@example.com',
//         subject: 'HTML Email',
//         template: 'i-am-not-a-template.html',
//         context: { name: 'Jeff' },
//       })
//     ).rejects.toThrow();
//   });
// });
