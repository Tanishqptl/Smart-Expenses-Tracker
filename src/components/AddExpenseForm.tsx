import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { addExpense } from '../lib/api';
import { formatCurrency } from '../utils/format';
import { motion, AnimatePresence } from 'framer-motion';

interface AddExpenseFormProps {
  onAdd: () => void;
}

const categories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Healthcare', 'Other'];

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      staggerChildren: 0.1
    }
  }
};

const fieldVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

export default function AddExpenseForm({ onAdd }: AddExpenseFormProps) {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await addExpense({
        amount: parseFloat(formData.amount),
        category: formData.category,
        date: formData.date,
        description: formData.description
      });
      setSuccess(true);
      setFormData({
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        description: ''
      });
      onAdd();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="max-w-2xl mx-auto overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 origin-left"
        />
        <CardHeader>
          <motion.div variants={fieldVariants}>
            <CardTitle className="text-slate-900">Add New Expense</CardTitle>
            <CardDescription>Record your expense details</CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent>
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-4"
            variants={formVariants}
          >
            <motion.div className="grid grid-cols-2 gap-4" variants={fieldVariants}>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (€)</Label>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                  />
                </motion.div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </motion.div>
              </div>
            </motion.div>

            <motion.div className="space-y-2" variants={fieldVariants}>
              <Label htmlFor="category">Category</Label>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat, index) => (
                      <motion.div
                        key={cat}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <SelectItem value={cat}>{cat}</SelectItem>
                      </motion.div>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
            </motion.div>

            <motion.div className="space-y-2" variants={fieldVariants}>
              <Label htmlFor="description">Description (optional)</Label>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Textarea
                  id="description"
                  placeholder="Add notes about this expense..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </motion.div>
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  className="text-red-600 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div 
                  className="text-green-600 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  Expense added successfully!
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={fieldVariants}>
              <Button 
                type="submit" 
                disabled={loading} 
                className="w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  animate={loading ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 1, repeat: loading ? Infinity : 0, ease: "linear" }}
                  className="inline-block mr-2"
                >
                  {loading ? '⚙️' : '💰'}
                </motion.span>
                {loading ? 'Adding...' : 'Add Expense'}
              </Button>
            </motion.div>
          </motion.form>
        </CardContent>
      </Card>
    </motion.div>
  );
}