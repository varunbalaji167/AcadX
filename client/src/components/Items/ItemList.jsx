// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ItemCard from './ItemCard';
// import ItemFilters from './ItemFilters';
// import Navbar from '../Navbar';
// import { Loader2 } from 'lucide-react';
// import { FaBoxOpen, FaExclamationTriangle } from 'react-icons/fa';

// const ItemList = () => {
//   const [items, setItems] = useState([]);
//   const [filters, setFilters] = useState({});
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_API_BASE_URL}items`,
//           { params: filters }
//         );

//         if (res.data.success && Array.isArray(res.data.data)) {
//           setItems(res.data.data);
//           setError(null);
//         } else {
//           console.error("Unexpected API response:", res);
//           setItems([]);
//           setError("Unexpected response format.");
//         }
//       } catch (err) {
//         console.error("Failed to fetch items:", err);
//         setItems([]);
//         setError("Failed to load items. Please try again later.");
//       }
//       setLoading(false);
//     };
//     fetchData();
//   }, [filters]);

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
//         <ItemFilters onFilterChange={setFilters} />

//         {loading && (
//           <div className="flex justify-center items-center text-blue-600">
//             <Loader2 className="h-8 w-8 animate-spin" />
//             <span className="ml-2 text-lg">Loading items...</span>
//           </div>
//         )}

//         {!loading && error && (
//           <div className="flex items-center gap-2 text-red-600 font-semibold">
//             <FaExclamationTriangle className="text-xl" />
//             {error}
//           </div>
//         )}

//         {!loading && !error && items.length === 0 && (
//           <div className="flex flex-col items-center text-gray-500 col-span-full mt-8">
//             <FaBoxOpen className="text-4xl mb-2" />
//             <p className="text-lg">No items found. Try adjusting your filters.</p>
//           </div>
//         )}

//         {!loading && !error && items.length > 0 && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {items.map((item) => (
//               <ItemCard key={item._id} item={item} />
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default ItemList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from "./ItemCard";
import ItemFilters from "./ItemFilters";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Loader2 } from "lucide-react";
import { FaBoxOpen, FaExclamationTriangle } from "react-icons/fa";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}items`,
          { params: filters }
        );

        if (res.data.success && Array.isArray(res.data.data)) {
          setItems(res.data.data);
          setError(null);
        } else {
          console.error("Unexpected API response:", res);
          setItems([]);
          setError("Unexpected response format.");
        }
      } catch (err) {
        console.error("Failed to fetch items:", err);
        setItems([]);
        setError("Failed to load items. Please try again later.");
      }
      setLoading(false);
    };
    fetchData();
  }, [filters]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <ItemFilters onFilterChange={setFilters} />
        </div>

        {loading && (
          <div className="flex justify-center items-center text-[#3F51B5] py-10">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-3 text-lg font-medium text-[#212121]">
              Loading items...
            </span>
          </div>
        )}

        {!loading && error && (
          <div className="flex items-center justify-center gap-3 text-[#E53935] font-semibold py-10">
            <FaExclamationTriangle className="text-2xl" />
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="flex flex-col items-center justify-center text-[#757575] py-12">
            <FaBoxOpen className="text-5xl mb-4" />
            <p className="text-lg font-medium">
              No items found. Try adjusting your filters.
            </p>
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ItemList;