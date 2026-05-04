"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Ship, 
  Calendar, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/ships', label: 'Ships', icon: Ship },
  { href: '/admin/bookings', label: 'Bookings', icon: Calendar },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, user, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock admin check - in real app, check user role from backend
  const isAdmin = user?.email === 'admin@ferrygo.com';

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      router.push('/login');
    }
  }, [isAuthenticated, isAdmin, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-white"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <div className="flex items-center gap-2">
            <Ship className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-gray-800">FerryGo Admin</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="pt-4 mt-4 border-t">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Back to Site</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}