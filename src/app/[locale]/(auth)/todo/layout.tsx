import AppLayout from '@/components/layouts/app-layout';

export default function TodoLayout({ children }: { children: React.ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
