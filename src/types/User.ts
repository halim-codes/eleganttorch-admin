export interface User {
  _id: string;
  name: string;
  role: string;
  email: string;
  password: string;
  phone?: string;
  lang?: string;
  createdAt?: string;
  updatedAt?: string;
}
