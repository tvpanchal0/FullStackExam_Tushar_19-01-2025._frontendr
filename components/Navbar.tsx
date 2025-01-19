import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';  // Import useRouter for navigation

const Navbar: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Get token from localStorage on component mount (client-side)
    const storedToken = localStorage.getItem('token');
    console.log('storedToken', storedToken);
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    // Update the token state to reflect the logged-out state
    setToken(null);
    // Redirect the user to the login page
    router.push('/auth/login');
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold">
          E-Commerce App
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:text-green-400">
            Home
          </Link>
          {token ? (
            <>
              <Link href="/cart" className="hover:text-green-400">
                Cart
              </Link>
              <Link href="/order" className="hover:text-green-400">
                Orders
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-green-400 bg-transparent border-none cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="hover:text-green-400">
                Login
              </Link>
              <Link href="/auth/register" className="hover:text-green-400">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
