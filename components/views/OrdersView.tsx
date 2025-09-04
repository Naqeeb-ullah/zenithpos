
import React, { useContext } from 'react';
import Card from '../common/Card';
import { AppContext } from '../../contexts/AppContext';

const OrdersView: React.FC = () => {
  const { orders } = useContext(AppContext);

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-neutral-100">
              <th className="p-3 font-semibold">Order ID</th>
              <th className="p-3 font-semibold">Date</th>
              <th className="p-3 font-semibold">Items</th>
              <th className="p-3 font-semibold">Payment</th>
              <th className="p-3 font-semibold text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
                <tr><td colSpan={5} className="text-center p-6 text-neutral-500">No orders have been placed yet.</td></tr>
            )}
            {orders.map(order => (
              <tr key={order.id} className="border-b hover:bg-neutral-50">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.createdAt.toLocaleDateString()} {order.createdAt.toLocaleTimeString()}</td>
                <td className="p-3">{order.items.reduce((sum, item) => sum + item.quantity, 0)}</td>
                <td className="p-3">{order.paymentMethod}</td>
                <td className="p-3 text-right font-medium">${order.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default OrdersView;
