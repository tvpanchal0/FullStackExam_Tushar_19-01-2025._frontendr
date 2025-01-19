// pages/checkout.tsx
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState('');
  const [cartItems, setCartItems] = useState<any[]>([]); // You should fetch cart items from an API or localStorage
  const router = useRouter();

  const handlePlaceOrder = () => {
    axios.post('/api/orders', {
      cartItems,
      shippingAddress,
      totalPrice: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    })
    .then(() => {
     
      toast.success('Order placed successfully');
      router.push('/order-confirmation'); // Redirect to a confirmation page
    })
    .catch(err => console.log(err));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>
      
      <div className="mb-4">
        <label className="block text-gray-700">Shipping Address</label>
        <input
          type="text"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-medium">Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item.productId} className="flex justify-between items-center border-b py-4">
            <p>{item.name} (x{item.quantity})</p>
            <p>${item.price * item.quantity}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-semibold">Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
        <button
          onClick={handlePlaceOrder}
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
