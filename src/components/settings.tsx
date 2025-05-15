'use client';

import { UserProfile } from '@clerk/nextjs';

export function Settings() {
  return (
    <div className="flex w-full justify-center">
      <UserProfile path="/settings" routing="path" />
    </div>
  );
}
