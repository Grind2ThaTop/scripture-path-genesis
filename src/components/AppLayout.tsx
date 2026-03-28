import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import {
  BookOpen, GraduationCap, Languages, BarChart3,
  ChevronLeft, ChevronRight, Menu, X, Home, Compass, Book, Highlighter,
  Search, StickyNote, Flame, LogIn, LogOut, User
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: Home },
  { path: '/bible', label: 'Bible (KJV)', icon: Book },
  { path: '/search', label: 'Search', icon: Search },
  { path: '/highlights', label: 'Highlights', icon: Highlighter },
  { path: '/notes', label: 'Notes & Bookmarks', icon: StickyNote },
  { path: '/reading-plans', label: 'Reading Plans', icon: Flame },
  { path: '/study-guide', label: 'Study Guide', icon: BookOpen },
  { path: '/hebrew', label: 'Hebrew', icon: Languages },
  { path: '/greek', label: 'Greek', icon: GraduationCap },
  { path: '/life-situations', label: 'Life Situations', icon: Compass },
  { path: '/progress', label: 'Progress', icon: BarChart3 },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 h-screen
          bg-card border-r border-border flex flex-col
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-16' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className={`p-4 border-b border-border flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2">
              <span className="text-gold text-xl font-display font-bold">דרך</span>
              <span className="font-display text-foreground text-lg font-semibold">Derekh</span>
            </Link>
          )}
          {collapsed && <span className="text-gold text-xl font-display font-bold">ד</span>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex text-muted-foreground hover:text-foreground transition-colors"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-muted-foreground hover:text-foreground"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path ||
              (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium
                  transition-all duration-200
                  ${active
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent'
                  }
                  ${collapsed ? 'justify-center' : ''}
                `}
              >
                <item.icon size={18} className={active ? 'text-primary' : ''} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="p-4 border-t border-border">
            <p className="text-xs text-muted-foreground font-mono">v2.0 · Training System</p>
          </div>
        )}
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-30 bg-card/95 backdrop-blur-sm border-b border-border px-4 h-14 flex items-center justify-between">
          <button onClick={() => setMobileOpen(true)} className="text-muted-foreground hover:text-foreground">
            <Menu size={22} />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <span className="text-gold text-lg font-display font-bold">דרך</span>
            <span className="font-display text-foreground font-semibold">Derekh</span>
          </Link>
          <div className="w-6" />
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-6xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
