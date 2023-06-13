export interface IPost{
  id: string,
  title: string,
  description: string,
  content: string,
  status: string,
  tags: String[],
  userId: string,
  likes: string,
  comments: string,
  cover: string,
  recommend: boolean,
  deletedAt: any,
  createdAt: any,
  updatedAt: any,
  user: any
};
