import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Bill } from '../types/bill';

function findOptimalBills(bills: Bill[], budget: number): Bill[] {
  // Convert amounts to numbers and sort by amount
  const sortedBills = [...bills]
    .map(bill => ({ ...bill, amount: parseFloat(bill.amount) }))
    .sort((a, b) => a.amount - b.amount);

  let currentSum = 0;
  const optimalBills: Bill[] = [];

  for (const bill of sortedBills) {
    if (currentSum + bill.amount <= budget) {
      currentSum += bill.amount;
      optimalBills.push(bill);
    } else {
      break;
    }
  }

  return optimalBills;
}

export default function OptimalBills() {
  const { bills, monthlyBudget } = useSelector((state: RootState) => state.bills);
  const optimalBills = findOptimalBills(bills, monthlyBudget);
  const optimalBillIds = new Set(optimalBills.map(bill => bill.id));

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Optimal Bills to Pay</h2>
      <p className="mb-4 text-gray-600">
        Based on your monthly budget of ₹{monthlyBudget}, here are the recommended bills to pay:
      </p>
      <div className="space-y-2">
        {bills.map(bill => (
          <div
            key={bill.id}
            className={`p-3 rounded-lg ${
              optimalBillIds.has(bill.id)
                ? 'bg-green-100 border border-green-200'
                : 'bg-gray-50 border border-gray-200'
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium">{bill.description}</span>
                <span className="text-sm text-gray-500 ml-2">({bill.category})</span>
              </div>
              <span className="font-semibold">₹{bill.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}