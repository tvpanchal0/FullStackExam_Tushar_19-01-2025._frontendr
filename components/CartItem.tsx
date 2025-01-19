import React from 'react';

interface CartItemProps {
  item: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item}) => {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <span>{item.name}</span>
      <span>{item.quantity} x ${item.price}</span>
      
    </div>
  );
};

export default CartItem;
