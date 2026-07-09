export interface User {
  id: string;
  name: string;
  email: string;
}

export interface NavItem {
  href: string;
  label: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}
