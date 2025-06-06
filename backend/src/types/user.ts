// types/user.ts
export interface UserAttributes {
  id: string;
  username: string;
  email: string;
  phone_number?: string;
  password_hash: string;
  role_id: number;
  is_active: boolean;
  is_locked: boolean;
  last_login?: Date;
  login_attempts: number;
  last_password_change?: Date;
  two_factor_enabled: boolean;
  language_preference: string;
  timezone: string;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
}
