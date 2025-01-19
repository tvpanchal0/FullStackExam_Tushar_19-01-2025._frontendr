import React from 'react';

interface CartItemProps {
  item: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  };
  removeFromCart: (productId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, removeFromCart }) => {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <span>{item.name}</span>
      <span>{item.quantity} x ${item.price}</span>
      {/* <button
        onClick={() => removeFromCart(item.productId)}
        className="text-red-500 hover:text-red-700"
      >
        Remove
      </button> */}
    </div>
  );
};

export default CartItem;
