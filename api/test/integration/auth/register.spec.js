import { request, factory, db } from '../../utils';
import app from '../../../server/index';
import UserService from '../../../services/user';


describe('Register', () => {
  let mockUpsertStub, constructorSpy;
  
  before(() => {
    mockUpsertStub = sinon.stub(UserService.prototype, 'upsertUser')
      .callsFake(() => Promise.resolve({ success: true, token: () => 'sampletoken' }));
    // constructorSpy = sinon.spy(() => sinon.createStubInstance(UserService.prototype, 'constructor'));
  });
  after(() => {
    mockUpsertStub.restore();
  });
  
  describe('ROUTE - /auth/user/register', () => {
    it('should register a user', async () => {
      const { providerId, providerKey } = await factory.attrs('User');
      
      const res = await request(app)
      .post('/auth/user/register')
      .send({
        providerId,
        providerKey
      });

      expect(res.body.success).to.equal(true);
      expect(res.body.token).to.equal('sampletoken');
      // Check that the UserService runs a call
      expect(mockUpsertStub.callCount).to.equal(1);
      // Check that UserService is contructed with the right options
      // expect(constructorSpy).to.have.been.calledWith({ providerId, providerKey });
    });

    it('should handle missing providerId', async () => {
      const { providerId, providerKey } = await factory.attrs('User');

      const res = await request(app)
        .post('/auth/user/register')
        .send({
          providerKey,
        });

      expect(res.body.jwt).to.be.undefined;
      expect(res.body.message).to.equal('Missing parameters');
      const record = await db.User.findOne({ where: { providerId } });
      expect(record).to.be.null;
    });

    it('should handle missing providerKey', async () => {
      const { providerId } = await factory.attrs('User');

      const res = await request(app)
        .post('/auth/user/register')
        .send({
          providerId,
        });

      expect(res.body.jwt).to.be.undefined;
      expect(res.body.message).to.equal('Missing parameters');
      const record = await db.User.findOne({ where: { providerId } });
      expect(record).to.be.null;
    });
  });
});
