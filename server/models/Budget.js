import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Food', 'Travel', 'Bills', 'Shopping', 'Entertainment', 'Other'],
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
}, { timestamps: true });

// Ensure a user can only have one budget per category
BudgetSchema.index({ user: 1, category: 1 }, { unique: true });

export default mongoose.model('Budget', BudgetSchema);
