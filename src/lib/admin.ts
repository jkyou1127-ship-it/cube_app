// A single account gets developer/admin perks: every mascot character unlocked,
// plus an admin-only character. Deliberately a hardcoded UID allowlist (not an
// email, not a Firestore flag) so the grant can't be changed by editing account
// data - only by editing and redeploying this file.
const ADMIN_UID = '7oMjPfloQZVjEmMw1OT0N6Qb47h2';

export function isAdminUser(uid: string | null | undefined): boolean {
  return uid === ADMIN_UID;
}
