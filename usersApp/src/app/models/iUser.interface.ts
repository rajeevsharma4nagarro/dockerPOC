//User interface for CREATE, EDIT actions
export interface iUser {
  id: string;
  userId: string;
  password: string;
  userType: 'SuperUser' | 'Admin' | 'User';
  isActive: boolean;
}

//User interface to handle API response as mongo db have auto-generated _id
export interface User extends iUser {
  _id: string;
}