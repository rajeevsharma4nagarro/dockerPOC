export interface iUser {
  id: string;
  userId: string;
  password: string;
  userType: 'SuperUser' | 'Admin' | 'User';
  isActive: boolean;
}

export interface User extends iUser {
  _id: string;
}