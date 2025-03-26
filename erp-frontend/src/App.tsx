import React, { useEffect, useState } from 'react';
import './App.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Order {
  id: number;
  item: string;
  qty: number;
  status: string;
}

interface Analytics {
  trend: string;
  forecast: string;
}

const App: React.FC = () => {
  const [status, setStatus] = useState<string>('Loading...');
  const [inventory, setInventory] = useState<string[]>(['Item 1', 'Item 2']);
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, item: 'Item 1', qty: 5, status: 'Pending' },
  ]);
  const [analytics] = useState<Analytics>({ trend: 'Up 10%', forecast: 'Stable' });
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  useEffect(() => {
    fetch('https://erp-backend.onrender.com/')
      .then((response) => response.json())
      .then((data) => setStatus(data.message))
      .catch((error) => setStatus('Error: ' + error.message));
  }, []);

  const addItem = (item: string, qty: string) => {
    setInventory([...inventory, `${item} - ${qty}`]);
  };

  const placeOrder = (item: string, qty: string) => {
    setOrders([...orders, { id: orders.length + 1, item, qty: parseInt(qty), status: 'Pending' }]);
  };

  const salesData = {
    labels: ['June 15', 'June 20', 'June 25', 'June 30'],
    datasets: [
      {
        label: 'Sales',
        data: [12000, 13000, 14500, 15000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ERP Dashboard</h1>
      </header>
      <div className="container">
        <aside className="sidebar">
          <div className="business-details">
            <h3>Your Business</h3>
            <p>Matrics Corporation</p>
            <p>All Locations</p>
            <p>Retail/Wholesale/Manufacturing</p>
          </div>
          <div className="balance">
            <h3>Balance</h3>
            <p>$1,500 This Month</p>
            <p>$2,000 Last Month</p>
            <p>$15,000 This Year</p>
          </div>
          <div className="recent-transactions">
            <h3>Recent Transactions</h3>
            <p>Transaction 1 - $500</p>
            <p>Transaction 2 - $300</p>
          </div>
          <div className="nav-item" onClick={() => setActiveTab('dashboard')}>
            Dashboard
          </div>
          <div className="nav-item" onClick={() => setActiveTab('transactions')}>
            Transactions
          </div>
          <div className="nav-item" onClick={() => setActiveTab('reports')}>
            Reports
          </div>
          <div className="nav-item" onClick={() => setActiveTab('settings')}>
            Settings
          </div>
        </aside>
        <main className="main-content">
          <h2>Welcome back, Matrics Corporation</h2>
          <h3>Status: {status}</h3>
          {activeTab === 'dashboard' && (
            <>
              <div className="card-grid">
                <div className="card">Transactions</div>
                <div className="card">Orders</div>
                <div className="card">Inventory</div>
              </div>
              <div className="chart-container">
                <Bar data={salesData} />
              </div>
              <h3>Quick Actions</h3>
              <div className="card-grid">
                <div className="card">New Order</div>
                <div className="card">New Shipment</div>
              </div>
              <h3>Reports</h3>
              <div className="card-grid">
                <div className="card">Sales Report</div>
                <div className="card">Inventory Report</div>
                <div className="card">Customer Report</div>
                <div className="card">Product Report</div>
              </div>
              <div className="panel-grid">
                <div className="panel inventory">
                  <h2>Inventory</h2>
                  <ul>
                    {inventory.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <form
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const itemInput = form.elements.namedItem('item') as HTMLInputElement;
                      const qtyInput = form.elements.namedItem('qty') as HTMLInputElement;
                      addItem(itemInput.value, qtyInput.value);
                      form.reset();
                    }}
                  >
                    <input name="item" placeholder="Item Name" required />
                    <input name="qty" type="number" placeholder="Quantity" required />
                    <button type="submit">Add Item</button>
                  </form>
                </div>
                <div className="panel orders">
                  <h2>Orders</h2>
                  <ul>
                    {orders.map((order) => (
                      <li key={order.id}>
                        {order.item} - Qty: {order.qty} - Status: {order.status}
                      </li>
                    ))}
                  </ul>
                  <form
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const itemInput = form.elements.namedItem('item') as HTMLInputElement;
                      const qtyInput = form.elements.namedItem('qty') as HTMLInputElement;
                      placeOrder(itemInput.value, qtyInput.value);
                      form.reset();
                    }}
                  >
                    <input name="item" placeholder="Item Name" required />
                    <input name="qty" type="number" placeholder="Quantity" required />
                    <button type="submit">Place Order</button>
                  </form>
                </div>
                <div className="panel analytics">
                  <h2>Analytics</h2>
                  <p>Trend: {analytics.trend}</p>
                  <p>Forecast: {analytics.forecast}</p>
                </div>
              </div>
            </>
          )}
          {activeTab === 'transactions' && <div>Transactions Content</div>}
          {activeTab === 'reports' && <div>Reports Content</div>}
          {activeTab === 'settings' && <div>Settings Content</div>}
        </main>
      </div>
    </div>
  );
};

export default App;