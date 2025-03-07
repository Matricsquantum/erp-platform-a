import React, { useEffect, useState } from 'react';
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
import './App.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  const [status, setStatus] = useState('');
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    fetch('https://erp-backend.onrender.com/')
      .then(response => response.json())
      .then(data => setStatus(data.message))
      .catch(error => setStatus('Error: ' + error.message));

    setInventory([{ id: 1, name: 'Item 1', quantity: 10 }, { id: 2, name: 'Item 2', quantity: 5 }]);
    setOrders([{ id: 1, item: 'Item 1', quantity: 5, status: 'Pending' }]);
    setAnalytics({ trend: 'Up 10%', forecast: 'Stable' });
  }, []);

  const addItem = (item, qty) => {
    setInventory([...inventory, { id: inventory.length + 1, name: item, quantity: qty }]);
  };

  const submitOrder = (item, qty) => {
    setOrders([...orders, { id: orders.length + 1, item, quantity: qty, status: 'Pending' }]);
  };

  const chartData = {
    labels: ['Jun 15', 'Jun 20', 'Jun 25', 'Jun 30'],
    datasets: [
      {
        label: 'Sales',
        data: [12000, 13000, 14500, 15000],
        backgroundColor: 'rgba(25, 128, 230, 0.5)',
        borderColor: 'rgba(25, 128, 230, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ERP Dashboard</h1>
        <p>{status || 'Loading...'}</p>
        <div className="container">
          <aside className="sidebar">
            <div className="sidebar-content">
              <div className="nav-item" onClick={() => setActiveTab('dashboard')}>Dashboard</div>
              <div className="nav-item" onClick={() => setActiveTab('transactions')}>Transactions</div>
              <div className="nav-item" onClick={() => setActiveTab('reports')}>Reports</div>
              <div className="nav-item" onClick={() => setActiveTab('settings')}>Settings</div>
            </div>
            <button className="new-transaction">New Transaction</button>
            <h3>Your Business</h3>
            <div className="business-item">Matrics Corporation</div>
            <div className="business-item">All Locations</div>
            <div className="business-item">Retail, Wholesale, Manufacturing</div>
            <h3>Balance</h3>
            <div className="balance-item">$1,500.00 (This Month)</div>
            <div className="balance-item">$2,000.00 (Last Month)</div>
            <div className="balance-item">$15,000.00 (This Year)</div>
            <h3>Recent Transactions</h3>
            <div className="transaction-item">Retail - Jun 15, 2023</div>
            <div className="transaction-item">Retail - Jun 15, 2023</div>
            <div className="transaction-item">Retail - Jun 15, 2023</div>
          </aside>
          <main className="main-content">
            <h2>Welcome back, Matrics Corporation</h2>
            <div className="card-grid">
              <div className="card">Transactions</div>
              <div className="card">Shipments</div>
              <div className="card">Orders</div>
              <div className="card">Inventory</div>
              <div className="card">Payments</div>
              <div className="card">Payouts</div>
              <div className="card">Reports</div>
              <div className="card">Inbox</div>
              <div className="card">Archives</div>
            </div>
            {activeTab === 'dashboard' && (
              <>
                <div className="chart-container">
                  <h3>Sales over time</h3>
                  <p>$15,000 <span style={{ color: 'green' }}>+2%</span></p>
                  <Bar data={chartData} />
                </div>
                <h3>Quick Actions</h3>
                <div className="card-grid">
                  <div className="card">New Order</div>
                  <div className="card">New Shipment</div>
                  <div className="card">New Return</div>
                  <div className="card">New Payment</div>
                  <div className="card">New Payout</div>
                  <div className="card">New Report</div>
                  <div className="card">New Inventory</div>
                  <div className="card">New Setting</div>
                </div>
                <h3>Reports</h3>
                <div className="card-grid">
                  <div className="card">Sales Report: $15,000</div>
                  <div className="card">Inventory Report: 100 units</div>
                  <div className="card">Customer Report: 300 customers</div>
                  <div className="card">Product Report: 200 products</div>
                </div>
                <div className="panel-grid">
                  <div className="panel inventory">
                    <h2>Inventory</h2>
                    <ul>
                      {inventory.map(item => (
                        <li key={item.id}>{item.name} - Quantity: {item.quantity}</li>
                      ))}
                    </ul>
                    <form onSubmit={(e) => { e.preventDefault(); addItem(e.target.item.value, e.target.qty.value); e.target.reset(); }}>
                      <input name="item" placeholder="Item Name" required />
                      <input name="qty" type="number" placeholder="Quantity" required />
                      <button type="submit">Add Item</button>
                    </form>
                  </div>
                  <div className="panel orders">
                    <h2>Orders</h2>
                    <ul>
                      {orders.map(order => (
                        <li key={order.id}>{order.item} - Qty: {order.quantity} - Status: {order.status}</li>
                      ))}
                    </ul>
                    <form onSubmit={(e) => { e.preventDefault(); submitOrder(e.target.item.value, e.target.qty.value); e.target.reset(); }}>
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
      </header>
    </div>
  );
}

export default App;