export interface IUser {
  id: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  gender: string,
  dob: string,
  phone?: string,
  displayName: string,
  picture?: string,
  followers: number,
  followings: number,
  Posts?: any
};
