export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  address?: string;
  phone?: string;
  lang?: string;
  organization:{
    id: string;
    name: string
  }
  role: {
    id: string;
    name: string;
    description?: string;
  };
  is_active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
