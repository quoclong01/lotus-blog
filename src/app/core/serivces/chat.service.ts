import { ApiService } from './api.service';
import { ENDPOINT } from './../../../config/endpoint';

export class ChatService {
  http = new ApiService();

  // eslint-disable-next-line
  constructor() {}

  createChat(data: any) {
    return this.http.post([ENDPOINT.chat.index], data);
  }

  getChats(id: string) {
    return this.http.get([`${ENDPOINT.chat.index}/${id}`]);
  }

  findChat(firstID: string, secondId: string) {
    return this.http.get([`${ENDPOINT.chat.find}/${firstID}/${secondId}`]);
  }

  getMessages(id: string) {
    return this.http.get([`${ENDPOINT.message.index}/${id}`]);
  }

  addMessage(data: any) {
    return this.http.post([ENDPOINT.message.index], data);
  }
}
