'use client';

import {
  Briefcase,
  CalendarClock,
  CheckCircle,
  ClipboardList,
  CreditCard,
  DollarSign,
  FileText,
  Folder,
  HomeIcon,
  LineChart,
  Settings,
  User2,
  UserCircle,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

import { Separator } from '@/components/ui/separator';
import { Logo } from '@/templates/Logo';
import { cn } from '@/utils/Helpers';

type SidebarItemProps = {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
  collapsed?: boolean;
};

const SidebarItem = ({ href, icon: Icon, children, collapsed = false }: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
      )}
    >
      <Icon className="size-5" />
      {!collapsed && <span>{children}</span>}
    </Link>
  );
};

export function Sidebar({ collapsed = false }: { collapsed?: boolean }) {
  const locale = useLocale();

  return (
    <aside className={cn(
      'flex flex-col bg-background transition-all duration-300 border-r',
      collapsed ? 'w-[70px]' : 'w-[240px]',
    )}
    >
      <div className="flex h-16 items-center px-4 py-3">
        <Link href={`/${locale}/dashboard`} className="flex items-center space-x-2">
          <Logo isTextHidden={collapsed} />
        </Link>
      </div>

      <div className="py-4">
        <nav className="flex flex-col gap-2 px-2">
          {!collapsed && (
            <>
              <p className="mb-1 mt-4 px-4 text-xs font-semibold text-muted-foreground">Menu</p>
              <Separator className="my-1" />
            </>
          )}

          <SidebarItem href={`/${locale}/dashboard`} icon={HomeIcon} collapsed={collapsed}>
            儀表板
          </SidebarItem>

          {!collapsed && (
            <>
              <p className="mb-1 mt-4 px-4 text-xs font-semibold text-muted-foreground">工作模組</p>
              <Separator className="my-1" />
            </>
          )}

          <SidebarItem href={`/${locale}/projects`} icon={Folder} collapsed={collapsed}>
            專案
          </SidebarItem>
          <SidebarItem href={`/${locale}/tasks`} icon={CheckCircle} collapsed={collapsed}>
            任務
          </SidebarItem>
          <SidebarItem href={`/${locale}/todo`} icon={ClipboardList} collapsed={collapsed}>
            待辦
          </SidebarItem>

          {!collapsed && (
            <>
              <p className="mb-1 mt-4 px-4 text-xs font-semibold text-muted-foreground">客戶管理</p>
              <Separator className="my-1" />
            </>
          )}

          <SidebarItem href={`/${locale}/clients`} icon={User2} collapsed={collapsed}>
            客戶
          </SidebarItem>
          <SidebarItem href={`/${locale}/meetings`} icon={CalendarClock} collapsed={collapsed}>
            會議
          </SidebarItem>

          {!collapsed && (
            <>
              <p className="mb-1 mt-4 px-4 text-xs font-semibold text-muted-foreground">財務管理</p>
              <Separator className="my-1" />
            </>
          )}

          <SidebarItem href={`/${locale}/incomes`} icon={DollarSign} collapsed={collapsed}>
            收入
          </SidebarItem>
          <SidebarItem href={`/${locale}/expenses`} icon={DollarSign} collapsed={collapsed}>
            支出
          </SidebarItem>
          <SidebarItem href={`/${locale}/invoices`} icon={Folder} collapsed={collapsed}>
            發票
          </SidebarItem>
          <SidebarItem href={`/${locale}/proposals`} icon={FileText} collapsed={collapsed}>
            提案
          </SidebarItem>

          {!collapsed && (
            <>
              <p className="mb-1 mt-4 px-4 text-xs font-semibold text-muted-foreground">報表分析</p>
              <Separator className="my-1" />
            </>
          )}

          <SidebarItem href={`/${locale}/reports/actual-month`} icon={LineChart} collapsed={collapsed}>
            本月概覽
          </SidebarItem>
          <SidebarItem href={`/${locale}/reports/monthly`} icon={LineChart} collapsed={collapsed}>
            月度報告
          </SidebarItem>
          <SidebarItem href={`/${locale}/reports/yearly`} icon={LineChart} collapsed={collapsed}>
            年度報告
          </SidebarItem>

          {!collapsed && (
            <>
              <p className="mb-1 mt-4 px-4 text-xs font-semibold text-muted-foreground">個人資料</p>
              <Separator className="my-1" />
            </>
          )}

          <SidebarItem href={`/${locale}/profile`} icon={UserCircle} collapsed={collapsed}>
            個人頁
          </SidebarItem>
          <SidebarItem href={`/${locale}/resume`} icon={Briefcase} collapsed={collapsed}>
            履歷
          </SidebarItem>

          {!collapsed && (
            <>
              <p className="mb-1 mt-4 px-4 text-xs font-semibold text-muted-foreground">Organization</p>
              <Separator className="my-1" />
            </>
          )}

          <SidebarItem href={`/${locale}/billing`} icon={CreditCard} collapsed={collapsed}>
            Billing
          </SidebarItem>
          <SidebarItem href={`/${locale}/members`} icon={Users} collapsed={collapsed}>
            成員
          </SidebarItem>
          <SidebarItem href={`/${locale}/settings`} icon={Settings} collapsed={collapsed}>
            設定
          </SidebarItem>
        </nav>
      </div>
    </aside>
  );
}
