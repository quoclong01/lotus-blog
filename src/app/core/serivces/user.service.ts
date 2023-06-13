import { ENDPOINT } from '../../../config';
import { ApiService } from './api.service';

export class UserService {
  http = new ApiService();

  // eslint-disable-next-line
  constructor() {}

  getUserInfo(id: string | number) {
    return this.http.get([`${ENDPOINT.users.index}/${id}`]);
  }

  getUserPosts(id: string | number) {
    return this.http.get([`${ENDPOINT.users.index}/${id}/posts`]);
  }

  handleUserFollow(data: any) {
    return this.http.post([ENDPOINT.friends.follow], data);
  }

  getListFollow(data: any) {
    return this.http.get([`${ENDPOINT.friends.index}/${data.id}/${data.type}`]);
  }

  handleChangePassword(data: any) {
    return this.http.put([`${ENDPOINT.users.index}/change-password`], data);
  }

  updateProfileUser(data: any) {
    return this.http.put([`${ENDPOINT.users.index}/me`], data);
  }
}
