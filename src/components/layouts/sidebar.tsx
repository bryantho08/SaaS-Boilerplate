'use client';

import {
  CreditCard,
  HomeIcon,
  ListTodo,
  Settings,
  UserCircle2,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { Separator } from '@/components/ui/separator';
import { Logo } from '@/templates/Logo';
import { cn } from '@/utils/Helpers';

export function Sidebar({ collapsed = false }: { collapsed?: boolean }) {
  const t = useTranslations('DashboardLayout');
  const locale = useLocale();
  const pathname = usePathname();

  const mainRoutes = [
    {
      href: `/${locale}/dashboard`,
      label: t('home'),
      icon: HomeIcon,
    },
    {
      href: `/${locale}/dashboard/todo`,
      label: 'Todos',
      icon: ListTodo,
    },
  ];

  const orgRoutes = [
    {
      href: `/${locale}/dashboard/organization-profile/billing`,
      label: 'Billing',
      icon: CreditCard,
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
      <div className="flex h-16 items-center px-4 py-3">
        <Link href={`/${locale}/dashboard`} className="flex items-center space-x-2">
          <Logo isTextHidden={collapsed} />
          {!collapsed && <span className="text-lg font-semibold">Frelio</span>}
        </Link>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="flex flex-col gap-4 px-2">
          {!collapsed && (
            <p className="px-4 text-xs text-muted-foreground">Main navigation</p>
          )}

          {mainRoutes.map((route) => {
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

          <Separator className="my-2" />

          {!collapsed && (
            <p className="px-4 text-xs text-muted-foreground">Organization</p>
          )}

          {orgRoutes.map((route) => {
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
    </aside>
  );
}
