import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Expense } from '../hooks/useExpenses';
import { formatCurrency, formatDate } from '../utils/format';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardProps {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

const tableRowVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.05,
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  })
};

export default function Dashboard({ expenses, loading, error }: DashboardProps) {
  if (loading) {
    return (
      <motion.div 
        className="flex items-center justify-center h-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="text-slate-600"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          Loading expenses...
        </motion.div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="flex items-center justify-center h-64"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 12 }}
      >
        <div className="text-red-600">Error: {error}</div>
      </motion.div>
    );
  }

  const recentExpenses = expenses.slice(0, 10);
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-slate-900">Overview</CardTitle>
            <CardDescription>Your expense summary</CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div 
              className="text-3xl font-bold text-slate-900"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.2 }}
            >
              {formatCurrency(total)}
            </motion.div>
            <motion.p 
              className="text-sm text-slate-600 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Total expenses ({expenses.length} transactions)
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-slate-900">Recent Expenses</CardTitle>
            <CardDescription>Your latest 10 transactions</CardDescription>
          </CardHeader>
          <CardContent>
            {recentExpenses.length === 0 ? (
              <motion.p 
                className="text-slate-600 text-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No expenses yet. Add your first expense!
              </motion.p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {recentExpenses.map((expense, index) => (
                      <motion.tr
                        key={expense.id}
                        variants={tableRowVariants}
                        initial="hidden"
                        animate="visible"
                        custom={index}
                        exit={{ opacity: 0, x: -20 }}
                        whileHover={{ backgroundColor: "rgba(148, 163, 184, 0.1)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <TableCell>{formatDate(expense.date)}</TableCell>
                        <TableCell className="font-medium">{expense.description || '-'}</TableCell>
                        <TableCell>
                          <motion.span 
                            className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 inline-block"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {expense.category}
                          </motion.span>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(expense.amount)}
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}