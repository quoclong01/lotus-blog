import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { environment } from '../../../config';
import { getData } from '../helpers/localstorage';

export class ApiService {
  axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: environment.apiBaseUrl,
      // Common header
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this._setInterceptors();
  }
  private _setInterceptors() {
    this.axiosInstance.interceptors.request.use((request: any) => {
      const token = getData('token', '');
      if (token) {
        request.headers['Authorization'] = `Bearer ${token}`;
      }
      return request;
    });
  }
  createURL(uri: (string | object)[]) {
    let paramsUrl: any;
    if (typeof uri[uri.length - 1] !== "string") {
      paramsUrl = uri.pop();
      let url = uri.join("/");
      Object.keys(paramsUrl).forEach((x) => {
        url = url.replace(`:${x}`, paramsUrl[x]);
      });
      return url;
    } else {
      return uri.join("/");
    }
  }
  get(uri: (string | object)[], params = {}, moreConfigs = {}) {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.get(this.createURL(uri), {
        params,
        ...moreConfigs,
      });
      this._handleRespond(request, resolve, reject);
    });
  }

  post(uri: (string | object)[], data = {}, moreConfigs = {}) {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.post(
        this.createURL(uri),
        data,
        moreConfigs
      );
      this._handleRespond(request, resolve, reject);
    });
  }

  put(uri: (string | object)[], data = {}, moreConfigs = {}) {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.put(
        this.createURL(uri),
        data,
        moreConfigs
      );
      this._handleRespond(request, resolve, reject);
    });
  }

  delete(uri: (string | object)[], moreConfigs = {}) {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.delete(
        this.createURL(uri),
        moreConfigs
      );
      this._handleRespond(request, resolve, reject);
    });
  }
  private _handleRespond(request: any, resolve: any, reject: any) {
    return request
      .then((resp: AxiosResponse) => {
        resolve(resp.data);
      })
      .catch((err: any) => {
        reject(err);
      });
  }
}
