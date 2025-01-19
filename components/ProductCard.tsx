import React, { useState } from 'react';
import { addToCart } from '../utils/api';
import { toast } from 'react-toastify';
interface ProductCardProps {
    product: {
      _id: string;
      name: string;
      description: string;
      price: number;
      image: string;
      quantity: number;
    };
  }
  
  const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [quantity, setQuantity] = useState(1);  // Initialize with 1 as default quantity
    const token = localStorage.getItem('token');
  
    const handleAddToCart = async () => {
      if (token) {
        try {
          // Add product with the selected quantity
          await addToCart(product._id, quantity, product.name, product.price, token);
        
          toast.success('Product added to cart');
        } catch (error) {
         
          toast.error('Error adding product to cart');
        }
      } else {
        
        toast.error('Please login to add products to cart');
      }
    };
  
    // Function to update the quantity
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(1, parseInt(e.target.value));  // Ensure quantity is at least 1
      setQuantity(value);
    };
  
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-md" />
        <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold">${product.price}</span>
          
          {/* Quantity selector */}
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-16 p-2 border rounded-md"
          />
          
          {/* Add to Cart button */}
          <button
            onClick={handleAddToCart}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  };
  
  export default ProductCard;