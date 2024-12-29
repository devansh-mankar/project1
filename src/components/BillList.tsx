import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { removeBill } from '../store/billSlice';
import { Bill } from '../types/bill';
import BillForm from './BillForm';
import { Edit, Trash2 } from 'lucide-react';

export default function BillList() {
  const dispatch = useDispatch();
  const { bills, selectedCategory } = useSelector((state: RootState) => state.bills);
  const [editingBill, setEditingBill] = useState<Bill | null>(null);

  const filteredBills = selectedCategory
    ? bills.filter((bill) => bill.category === selectedCategory)
    : bills;

  const totalAmount = filteredBills.reduce(
    (sum, bill) => sum + parseFloat(bill.amount),
    0
  );

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Total Monthly Amount</h2>
        <p className="text-3xl font-bold text-blue-600">₹{totalAmount.toFixed(2)}</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBills.map((bill) => (
              <tr key={bill.id}>
                <td className="px-6 py-4 whitespace-nowrap">{bill.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">{bill.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">₹{bill.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{bill.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingBill(bill)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => dispatch(removeBill(bill.id))}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingBill && (
        <BillForm
          initialBill={editingBill}
          onClose={() => setEditingBill(null)}
        />
      )}
    </div>
  );
}