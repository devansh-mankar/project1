import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setSelectedCategory } from '../store/billSlice';
import { Filter } from 'lucide-react';

export default function CategoryFilter() {
  const dispatch = useDispatch();
  const { bills, selectedCategory } = useSelector((state: RootState) => state.bills);

  const categories = Array.from(new Set(bills.map((bill) => bill.category)));

  return (
    <div className="flex items-center space-x-2 mb-4">
      <Filter size={20} className="text-gray-500" />
      <select
        value={selectedCategory || ''}
        onChange={(e) =>
          dispatch(setSelectedCategory(e.target.value || null))
        }
        className="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}