export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends UserCredentials {
  confirmPassword: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface RegisterResponse {
  access_token: string;
  user: User;
}
