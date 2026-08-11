import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { PRIVACY_POLICY_VERSION } from './privacyPolicy';

export async function recordPrivacyConsent(uid: string): Promise<void> {
  await setDoc(
    doc(db, 'users', uid),
    { privacyPolicyVersion: PRIVACY_POLICY_VERSION, privacyPolicyAgreedAt: Date.now() },
    { merge: true }
  );
}
