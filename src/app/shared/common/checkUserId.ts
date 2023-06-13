import { getData } from '../../core/helpers/localstorage';
import { parseJwt } from '../../core/helpers/parseJwt';

export const checkUserId = (id: string | number) => {
  const token = getData('token', '');
  let userId;
  if (token) {
    userId = parseJwt(token).userId;
  }
  if(userId && userId === id) {
    return true;
  }
  return false;
};
