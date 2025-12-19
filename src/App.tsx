import { useState } from 'react';
import Dashboard from './components/Dashboard';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseSummary from './components/ExpenseSummary';
import Navbar from './components/Navbar';
import { useExpenses } from './hooks/useExpenses';
import { AnimatePresence, motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -20 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.3
};

export default function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'add' | 'summary'>('dashboard');
  const { expenses, loading, error, refetch } = useExpenses();

  const views = {
    dashboard: <Dashboard expenses={expenses} loading={loading} error={error} />,
    add: <AddExpenseForm onAdd={refetch} />,
    summary: <ExpenseSummary expenses={expenses} loading={loading} />
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar activeView={activeView} setActiveView={setActiveView} />
      <main className="max-w-6xl mx-auto p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={pageTransition}
          >
            {views[activeView]}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}