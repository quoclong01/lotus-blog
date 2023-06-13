import { ApiService } from './api.service';
import { ENDPOINT } from './../../../config/endpoint';

export class BookmarkService {
  http = new ApiService();

  // eslint-disable-next-line
  constructor() {}

  addBookmark(postId: string | number) {
    return this.http.post([ENDPOINT.bookmarks.index], { postId: `${postId}` });
  }

  getBookmark() {
    return this.http.get([ENDPOINT.bookmarks.index]);
  }
}
