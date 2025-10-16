export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Employee' | 'Manager' | 'Admin';
  active: boolean;
}