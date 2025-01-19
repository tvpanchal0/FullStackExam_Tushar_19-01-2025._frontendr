import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getOrders } from '../../utils/api';

const OrderPage: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      getOrders(token)
        .then((data) => {
          setOrders(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      router.push('/login');
    }
  }, [token, router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Your Orders</h1>
      {orders.length > 0 ? (
        <div>
          {orders.map((order: any) => (
            <div key={order._id} className="border-b py-4">
              <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
              <ul>
                {order.items.map((item: any) => (
                  <li key={item.productId}>
                    {item.name} - {item.quantity} x ${item.price}
                  </li>
                ))}
              </ul>
              <div>Total: ${order.total}</div>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default OrderPage;
