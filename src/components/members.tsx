'use client';

import { OrganizationProfile } from '@clerk/nextjs';

export function Members() {
  return (
    <div className="flex w-full justify-center">
      <OrganizationProfile path="/members" routing="path" />
    </div>
  );
}
