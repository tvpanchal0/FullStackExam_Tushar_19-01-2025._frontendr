import { useEffect, useState } from 'react';
import { getProducts } from '../utils/api'; // Adjust according to your project structure
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
interface  product{
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
};
const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0); // For pagination or other info
  const [totalPages, setTotalPages] = useState(0); // For pagination
console.log(totalProducts,totalPages)
  useEffect(() => {
    getProducts()
      .then((response) => {
        setProducts(response.products); // Access the `products` array from response
        setTotalProducts(response.totalProducts);
        setTotalPages(response.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>    <Navbar />
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Product List</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products available.</p>
      )}
    </div>
    </>

  );
};

export default ProductPage;
