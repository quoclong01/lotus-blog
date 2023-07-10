import { ApiService } from './api.service';
import { ENDPOINT } from '../../../config/endpoint';

export class PostService {
  http = new ApiService();

  // eslint-disable-next-line
  constructor() {}

  getPublicPosts(data: any) {
    return this.http.get([
      `${ENDPOINT.posts.public}?${
        data.tags ? `tags=${data.tags}` : ''
      }${data.title ? `query=${data.title}`: ''}&page=${data.page}&size=${data.size}`,
    ]);
  }

  getPosts(data: any) {
    return this.http.get([
      `${ENDPOINT.posts.index}?${data.tags ? `tags=${data.tags}` : ''}${data.title ? `query=${data.title}`: ''}&page=${
        data.page
      }&size=${data.size}`,
    ]);
  }

  getPostsRecommend(data: any) {
    return this.http.get([
      `${ENDPOINT.posts.recommend}?page=${data.page}&size=${data.size}`,
    ]);
  }

  getPostsReycleBin(page: number | string, size: number | string) {
    return this.http.get([`${ENDPOINT.posts.recyclebin}?page=${page}&size=${size}`]);
  }

  getPostsDraft(page: number | string, size: number | string) {
    return this.http.get([`${ENDPOINT.posts.draft}?page=${page}&size=${size}`]);
  }

  getPostsById(data: any) {
    return this.http.get([`${ENDPOINT.posts.index}/${data.id}`]);
  }

  likePostsDetail(id: number) {
    return this.http.put([`${ENDPOINT.posts.index}/${id}/likes`]);
  }

  getCommentPostsDetail(id: string) {
    return this.http.get([`${ENDPOINT.posts.index}/${id}/comments`]);
  }

  postCommentPostsDetail(id: string, data: any) {
    return this.http.post([`${ENDPOINT.posts.index}/${id}/comments`], data);
  }

  createPost(data: any) {
    return this.http.post([ENDPOINT.posts.index], data);
  }

  updatePost(id: string, data: any) {
    return this.http.put([`${ENDPOINT.posts.index}/${id}`], data);
  }

  deletePostService(id: string) {
    return this.http.delete([`${ENDPOINT.posts.index}/${id}`]);
  }

  restorePost(id: string | number) {
    return this.http.put([`${ENDPOINT.posts.index}/${id}/restore`]);
  }
  getTags(data: any) {
    return this.http.get([
      `${ENDPOINT.posts.tags}?${data.size ? `size=${data.size}` : null}`
    ]);
  }
  saveDraftPost(data: any) {
    return this.http.post([ENDPOINT.posts.draft], data);
  }
  deleteComment(id: string | number) {
    return this.http.delete([`${ENDPOINT.posts.comments}/${id}`]);
  }
}
