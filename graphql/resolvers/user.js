import { generateResolvers } from '../resolver';

export default generateResolvers('User', [
  'permissions',
  'profile',
  'emails',
  'bags',
  'discs',
]);
