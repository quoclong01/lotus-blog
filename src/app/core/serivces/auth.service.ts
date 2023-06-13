import { ApiService } from './api.service';
import { ENDPOINT } from './../../../config/endpoint';

export class AuthService {
  http = new ApiService();  

  // eslint-disable-next-line
  constructor () {}

  signUp(data: any) {
    return this.http.post([ENDPOINT.users.register], data);
  }

  signIn(data: any) {
    return this.http.post([ENDPOINT.users.login], data);
  }

  signOut() {
    return this.http.post([ENDPOINT.users.logout], {});
  }
};
