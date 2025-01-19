import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getOrders } from '../../utils/api';

// Define types for the order and item structures
interface Item {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  items: Item[];
  total: number;
}

const OrderPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);  // To track if the component is mounted on the client
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Set to true when the component is mounted on the client

    const token = localStorage.getItem('token');  // This will run only on the client side

    if (token) {
      getOrders(token)
        .then((data: Order[]) => {
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
  }, [router]);

  if (!isClient) return <div>Loading...</div>; // Show loading until client-side rendering is ready
  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Your Orders</h1>
      {orders.length > 0 ? (
        <div>
          {orders.map((order) => (
            <div key={order._id} className="border-b py-4">
              <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
              <ul>
                {order.items.map((item) => (
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
