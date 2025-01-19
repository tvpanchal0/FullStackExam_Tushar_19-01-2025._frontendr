import React, { useEffect, useState } from 'react';
import { getCart, placeOrder } from '../../utils/api';
import CartItem from '../../components/CartItem';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // This check ensures that localStorage is only accessed on the client side
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      getCart(token)
        .then((data) => {
          setCartItems(data.items || []);  // Make sure to get 'items' from the response
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  const removeFromCart = (productId: string) => {
    // Handle remove logic here (call remove API or filter out item)
  };

  const handleCheckout = async () => {
    if (token && cartItems.length > 0) {
      const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const shippingAddress = '123 Main St, Springfield, IL';

      try {
        await placeOrder(cartItems, totalPrice, shippingAddress, token);
        
        toast.success('Order placed successfully');
        router.push('/order');
      } catch (error) {
      
        toast.error('Error placing order');
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item: any) => (
            <CartItem key={item._id} item={item} removeFromCart={removeFromCart} />
          ))}
          <button
            onClick={handleCheckout}
            className="bg-green-500 text-white py-2 px-4 rounded-md mt-6"
          >
            Proceed to Checkout
          </button>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default CartPage;
