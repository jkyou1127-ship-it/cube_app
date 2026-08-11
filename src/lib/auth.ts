import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import { auth } from './firebase';

export type { User };

export function onAuthChange(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, callback);
}

export async function signUp(email: string, password: string): Promise<void> {
  await createUserWithEmailAndPassword(auth, email, password);
}

export async function signIn(email: string, password: string): Promise<void> {
  await signInWithEmailAndPassword(auth, email, password);
}

export async function signOutUser(): Promise<void> {
  await signOut(auth);
}

export function authErrorMessage(err: unknown): string {
  const code = (err as { code?: string })?.code ?? '';
  switch (code) {
    case 'auth/email-already-in-use':
      return '이미 가입된 이메일이에요.';
    case 'auth/invalid-email':
      return '이메일 형식이 올바르지 않아요.';
    case 'auth/weak-password':
      return '비밀번호는 6자 이상이어야 해요.';
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return '이메일 또는 비밀번호가 올바르지 않아요.';
    case 'auth/too-many-requests':
      return '시도가 너무 많아요. 잠시 후 다시 시도해주세요.';
    default:
      return '문제가 발생했어요. 잠시 후 다시 시도해주세요.';
  }
}
