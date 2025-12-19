import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Expense } from '../hooks/useExpenses';
import { formatCurrency } from '../utils/format';
import { BarChart3, TrendingUp, Euro, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExpenseSummaryProps {
  expenses: Expense[];
  loading: boolean;
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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

const barVariants = {
  hidden: { width: 0 },
  visible: (width: number) => ({
    width: `${width}%`,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      delay: 0.2
    }
  })
};

export default function ExpenseSummary({ expenses, loading }: ExpenseSummaryProps) {
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
          Loading summary...
        </motion.div>
      </motion.div>
    );
  }

  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const average = expenses.length > 0 ? total / expenses.length : 0;

  const sortedCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const maxCategoryAmount = Math.max(...Object.values(categoryTotals), 1);

  const statsCards = [
    { title: 'Total', value: formatCurrency(total), icon: Euro },
    { title: 'Transactions', value: expenses.length.toString(), icon: Calendar },
    { title: 'Average', value: formatCurrency(average), icon: TrendingUp },
    { title: 'Categories', value: Object.keys(categoryTotals).length.toString(), icon: BarChart3 }
  ];

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              variants={cardVariants}
              custom={index}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="h-4 w-4 text-slate-600" />
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <motion.div 
                    className="text-2xl font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 100, 
                      damping: 12,
                      delay: index * 0.1 
                    }}
                  >
                    {stat.value}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div variants={cardVariants}>
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-slate-900">Expenses by Category</CardTitle>
            <CardDescription>Top spending categories</CardDescription>
          </CardHeader>
          <CardContent>
            {sortedCategories.length === 0 ? (
              <motion.p 
                className="text-slate-600 text-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No expenses to display
              </motion.p>
            ) : (
              <div className="space-y-4">
                {sortedCategories.map(([category, amount], index) => {
                  const percentage = (amount / maxCategoryAmount) * 100;
                  return (
                    <motion.div 
                      key={category} 
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <motion.div 
                        className="flex justify-between items-center"
                        whileHover={{ scale: 1.02 }}
                      >
                        <span className="text-sm font-medium text-slate-700">{category}</span>
                        <motion.span 
                          className="text-sm font-bold text-slate-900"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.2 }}
                        >
                          {formatCurrency(amount)}
                        </motion.span>
                      </motion.div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                          variants={barVariants}
                          initial="hidden"
                          animate="visible"
                          custom={percentage}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}