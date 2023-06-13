import axios from 'axios';
import { ApiService } from './api.service';
import { ENDPOINT } from './../../../config/endpoint';

export class SignaturesService {
  http = new ApiService();  

  // eslint-disable-next-line
  constructor () {}

  getSignatures(data: any) {
    return this.http.get([ENDPOINT.signatures.index], data);
  };

  uploadImage(data: any, file: any) {
    return axios.put(data.signedRequest, file, {
      headers: {
        'Content-Type': file.type
      }
    });
  }
};
