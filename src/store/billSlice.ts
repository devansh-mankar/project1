import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Bill, BillState } from '../types/bill';
import { initialBills } from '../data/initialBills';

const initialState: BillState = {
  bills: initialBills,
  selectedCategory: null,
  monthlyBudget: 50000,
};

const billSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    addBill: (state, action: PayloadAction<Bill>) => {
      state.bills.push(action.payload);
    },
    editBill: (state, action: PayloadAction<Bill>) => {
      const index = state.bills.findIndex((bill) => bill.id === action.payload.id);
      if (index !== -1) {
        state.bills[index] = action.payload;
      }
    },
    removeBill: (state, action: PayloadAction<number>) => {
      state.bills = state.bills.filter((bill) => bill.id !== action.payload);
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    setMonthlyBudget: (state, action: PayloadAction<number>) => {
      state.monthlyBudget = action.payload;
    },
  },
});

export const { addBill, editBill, removeBill, setSelectedCategory, setMonthlyBudget } = billSlice.actions;
export default billSlice.reducer;