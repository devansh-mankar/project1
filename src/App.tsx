import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import BillList from './components/BillList';
import CategoryFilter from './components/CategoryFilter';
import BillForm from './components/BillForm';
import BillChart from './components/BillChart';
import OptimalBills from './components/OptimalBills';
import { PlusCircle } from 'lucide-react';

function App() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Bill Manager</h1>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              <PlusCircle size={20} className="mr-2" />
              Add Bill
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <CategoryFilter />
              <BillList />
              <BillChart />
            </div>
            <div className="lg:col-span-1">
              <OptimalBills />
            </div>
          </div>

          {showAddForm && <BillForm onClose={() => setShowAddForm(false)} />}
        </div>
      </div>
    </Provider>
  );
}

export default App;