'use client';

import {
  ChevronLeft,
  ChevronRight,
  HomeIcon,
  Settings,
  UserCircle2,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Logo } from '@/templates/Logo';
import { cn } from '@/utils/Helpers';

export function Sidebar() {
  const t = useTranslations('DashboardLayout');
  const locale = useLocale();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const routes = [
    {
      href: `/${locale}/dashboard`,
      label: t('home'),
      icon: HomeIcon,
    },
    {
      href: `/${locale}/dashboard/organization-profile/organization-members`,
      label: t('members'),
      icon: UserCircle2,
    },
    {
      href: `/${locale}/dashboard/organization-profile`,
      label: t('settings'),
      icon: Settings,
    },
  ];

  return (
    <aside className={cn(
      'flex h-screen flex-col bg-background transition-all duration-300 border-r',
      collapsed ? 'w-[70px]' : 'w-[240px]',
    )}
    >
      <div className="flex h-16 items-center px-4">
        <Link href={`/${locale}/dashboard`} className="flex items-center gap-2">
          <Logo isTextHidden={collapsed} />
          {!collapsed && <span className="font-semibold">SaaS Template</span>}
        </Link>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="flex flex-col gap-1 px-2">
          {routes.map((route) => {
            const isActive = pathname === route.href;
            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                <route.icon className="size-5" />
                {!collapsed && <span>{route.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto flex flex-col gap-2 p-4">
        <Separator />
        <div className="flex items-center justify-between">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? '展開側邊欄' : '收合側邊欄'}
          >
            {collapsed
              ? (
                  <ChevronRight className="size-5" />
                )
              : (
                  <ChevronLeft className="size-5" />
                )}
          </Button>
        </div>
      </div>
    </aside>
  );
}
