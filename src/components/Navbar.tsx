import { Button } from './ui/button';
import { Home, Plus, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  activeView: 'dashboard' | 'add' | 'summary';
  setActiveView: (view: 'dashboard' | 'add' | 'summary') => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'add', label: 'Add Expense', icon: Plus },
  { id: 'summary', label: 'Summary', icon: BarChart3 }
];

export default function Navbar({ activeView, setActiveView }: NavbarProps) {
  return (
    <motion.nav 
      className="bg-white border-b border-slate-200 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 12 }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.h1 
            className="text-2xl font-bold text-slate-900"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            💰 Expense Tracker
          </motion.h1>
          <div className="flex gap-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    onClick={() => setActiveView(item.id as any)}
                    className={`flex items-center gap-2 transition-all duration-200 ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      animate={isActive ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="h-4 w-4" />
                    </motion.div>
                    {item.label}
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}