import type { UserProfile as DatabaseUserProfile, UserRole } from './database'

// Database ile tam uyumlu kullanıcı profili arayüzü
export interface UserProfile extends DatabaseUserProfile {
  // Database'deki tüm alanlar dahil
}

// Kullanıcı kayıt formu için tip
export interface UserRegistrationData {
  email: string;
  password: string;
  full_name: string;
  role: UserRole;
  grade?: number;
}

// Kullanıcı giriş formu için tip
export interface UserLoginData {
  email: string;
  password: string;
}

// Kullanıcı profil güncelleme için tip
export interface UserProfileUpdate {
  full_name?: string;
  grade?: number;
  avatar?: string;
  display_name?: string;
  bio?: string;
}

// Eski arayüzler için geriye dönük uyumluluk (deprecated)
/** @deprecated Use UserProfile instead */
export interface StudentProfile extends UserProfile {
  role: 'student';
  grade: number;
}

/** @deprecated Use UserProfile instead */
export interface ParentProfile extends UserProfile {
  role: 'parent';
}

/** @deprecated Use UserProfile instead */
export interface TeacherProfile extends UserProfile {
  role: 'teacher';
}

/** @deprecated Use UserProfile instead */
export interface AdminProfile extends UserProfile {
  role: 'admin';
}

/** @deprecated Use UserProfile instead */
export interface SuperAdminProfile extends UserProfile {
  role: 'superadmin';
}
