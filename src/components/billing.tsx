'use client';

import { UserProfile } from '@clerk/nextjs';

export function Billing() {
  return (
    <div className="flex w-full justify-center">
      <UserProfile path="/billing" routing="path" />
    </div>
  );
}
