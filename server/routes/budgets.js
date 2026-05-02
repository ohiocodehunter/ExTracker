import express from 'express';
import Budget from '../models/Budget.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // Protect all budget routes

// Get all budgets for the logged-in user
router.get('/', async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user._id });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Set or Update a budget for a category
router.post('/', async (req, res) => {
  const { category, amount } = req.body;

  try {
    // Find existing budget or create new one (upsert)
    const budget = await Budget.findOneAndUpdate(
      { user: req.user._id, category },
      { amount },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(budget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
