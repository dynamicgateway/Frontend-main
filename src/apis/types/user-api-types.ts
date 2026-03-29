export interface GetUserResponse {
  id: string | null;
  name: string | null;
  role: 'Admin' | 'User' | null;
  avatarURL: string | null;
}
