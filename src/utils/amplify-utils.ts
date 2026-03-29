import { getCurrentUser, updatePassword } from 'aws-amplify/auth';

export async function handleChangePassword(oldPwd: string, newPwd: string) {
  try {
    await updatePassword({ oldPassword: oldPwd, newPassword: newPwd });
    return { success: true, message: 'Password changed successfully' };
  } catch (err: any) {
    console.error(err.message || 'Password change failed');
    return { success: false, message: err.message || 'Password change failed' };
  }
}

export async function isUserSignedIn(): Promise<boolean> {
  try {
    const user = await getCurrentUser();
    if (user) {
      return true;
    }
    return false;
  } catch {
    console.error('⛔ Not authenticated');
    return false;
  }
}
