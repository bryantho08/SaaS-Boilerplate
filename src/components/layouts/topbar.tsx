'use client';

import { UserButton } from '@clerk/nextjs';
import { Globe, Menu } from 'lucide-react';
import { useLocale } from 'next-intl';

import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

export function Topbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  const locale = useLocale();

  return (
    <div className="flex w-full items-center justify-between">
      <Button variant="ghost" size="icon" onClick={toggleSidebar} title="收合側邊欄">
        <Menu className="size-5" />
      </Button>

      <div className="flex items-center gap-2">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Globe className="size-5" />
              <span className="sr-only">切換語言</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <LocaleSwitcher />
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="h-6" />

        <UserButton
          userProfileMode="navigation"
          userProfileUrl={`/${locale}/dashboard/user-profile`}
          appearance={{
            elements: {
              rootBox: 'px-2 py-1.5',
            },
          }}
        />
      </div>
    </div>
  );
}
