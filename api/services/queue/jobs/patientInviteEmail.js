import moment from 'moment';
import db from '../../../models';
import emailService from '../../email';

export const patientInviteEmail = {
  queue: 'patientInviteEmail',
  concurrency: 5,
  job: async ({ data }) => {
    const { clinicianId, patientName, deliveryAddress, conditions } = data;
    if (!clinicianId) {
      throw new Error('Missing clinicianId.');
    }

    if (!patientName) {
      throw new Error('Missing patientName.');
    }

    if (!deliveryAddress) {
      throw new Error('Missing deliveryAddress.');
    }

    const clinician = await db.Clinician.findByPk(clinicianId, {
      include: [db.Profile],
    });

    if (!clinician) {
      throw new Error('Clinician not found.');
    }

    const careTeamCode = await db.CareTeamCode.create({
      clinicianId: clinician.id,
      patientName,
      method: 'email',
      deliveryAddress,
      expiry: moment(new Date()).add(1, 'day').toDate(),
    });

    if (conditions) {
      for (const c of conditions) {
        const condition = await db.Condition.findByPk(c.id);

        if (condition) {
          // Have to do it like this to set primary
          await db.PatientCondition.create({
            targetType: 'careTeamCode',
            targetId: careTeamCode.id,
            conditionId: condition.id,
            isPrimary: !!c.isPrimary,
          });
        }
      }
    }

    const clinicianName = clinician?.Profile?.name || 'Your doctor';

    const emailOptions = {
      from: 'dev+lotic@take2.co',
      to: deliveryAddress,
      subject: `${patientName}, ${clinicianName} has invited you to Lotic.ai`,
      template: 'patientInvite.mjml',
      context: {
        patientName,
        clinicianName,
        code: careTeamCode.code,
        expiry: moment(careTeamCode.expiry).format(
          'dddd, MMM Do YYYY [at] h:mma'
        ),
      },
    };

    try {
      await emailService.sendMJML(emailOptions);
    } catch (e) {
      throw new Error('Failed to send email');
    }
  },
};
