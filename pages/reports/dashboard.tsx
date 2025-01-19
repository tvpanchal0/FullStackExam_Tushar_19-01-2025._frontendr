import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getDailyRevenue, getSalesByCategory } from '../../utils/api';

// Define the structure for dailyRevenue and salesByCategory
interface DailyRevenueItem {
  date: string;
  revenue: number;
}

interface SalesByCategoryItem {
  _id: string;
  totalSales: number;
}

const Dashboard: React.FC = () => {
  // Specify types for the state variables
  const [dailyRevenue, setDailyRevenue] = useState<DailyRevenueItem[]>([]);
  const [salesByCategory, setSalesByCategory] = useState<SalesByCategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    // Fetch reports data using the direct API calls
    const fetchReports = async () => {
      try {
        const revenueData = await getDailyRevenue(); // Call the API for daily revenue
        setDailyRevenue(revenueData);

        const salesData = await getSalesByCategory(); // Call the API for sales by category
        setSalesByCategory(salesData);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchReports();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      {/* Daily Revenue */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Daily Revenue</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dailyRevenue.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <p className="text-gray-500 text-sm mb-2">Date</p>
              <h3 className="text-xl font-semibold text-gray-800">{item.date}</h3>
              <p className="mt-4 text-gray-500 text-sm">Revenue</p>
              <p className="text-2xl font-bold text-green-500">${item.revenue}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sales by Category */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Sales by Category</h2>
        <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md">
          <table className="w-full text-left bg-white">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="px-6 py-3 text-gray-600 text-sm font-semibold">Category</th>
                <th className="px-6 py-3 text-gray-600 text-sm font-semibold">Total Sales</th>
              </tr>
            </thead>
            <tbody>
              {salesByCategory.map((item, index) => (
                <tr
                  key={index}
                  className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}
                >
                  <td className="px-6 py-4 text-gray-800">{item._id}</td>
                  <td className="px-6 py-4 text-gray-800 font-semibold">{item.totalSales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
