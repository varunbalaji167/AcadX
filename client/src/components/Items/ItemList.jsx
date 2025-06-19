// import { useEffect, useState } from "react";
// import axios from "axios";
// import ItemCard from "./ItemCard";
// import ItemFilters from "./ItemFilters";
// import Navbar from "../Navbar";
// import Footer from "../Footer";
// import { Loader2 } from "lucide-react";
// import { FaBoxOpen, FaExclamationTriangle } from "react-icons/fa";

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
//     <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
//       <Navbar />
//       <main className="flex-grow max-w-7xl mx-auto px-4 py-8">
//         <div className="bg-white p-4 rounded-xl shadow mb-6">
//           <ItemFilters onFilterChange={setFilters} />
//         </div>

//         {loading && (
//           <div className="flex justify-center items-center text-[#3F51B5] py-10">
//             <Loader2 className="h-8 w-8 animate-spin" />
//             <span className="ml-3 text-lg font-medium text-[#212121]">
//               Loading items...
//             </span>
//           </div>
//         )}

//         {!loading && error && (
//           <div className="flex items-center justify-center gap-3 text-[#E53935] font-semibold py-10">
//             <FaExclamationTriangle className="text-2xl" />
//             <span>{error}</span>
//           </div>
//         )}

//         {!loading && !error && items.length === 0 && (
//           <div className="flex flex-col items-center justify-center text-[#757575] py-12">
//             <FaBoxOpen className="text-5xl mb-4" />
//             <p className="text-lg font-medium">
//               No items found. Try adjusting your filters.
//             </p>
//           </div>
//         )}

//         {!loading && !error && items.length > 0 && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {items.map((item) => (
//               <ItemCard key={item._id} item={item} />
//             ))}
//           </div>
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default ItemList;

import { useEffect, useState } from "react";
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
  const [buttonLoading, setButtonLoading] = useState(null); // 'next' | 'prev' | null
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (source = null) => {
    if (!source) setLoading(true); 
    setButtonLoading(source); 

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}items`, {
        params: {
          ...filters,
          page,
          limit: 6,
          random: true, 
        },
      });

      if (res.data.success && Array.isArray(res.data.data)) {
        setItems(res.data.data);
        setError(null);
        setTotalPages(res.data.totalPages || 1);
      } else {
        setItems([]);
        setError("Unexpected response format.");
      }
    } catch (err) {
      console.error("Failed to fetch items:", err);
      setItems([]);
      setError("Failed to load items. Please try again later.");
    }

    setLoading(false);
    setButtonLoading(null);
  };

  useEffect(() => {
    fetchData();
  }, [filters, page]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <ItemFilters onFilterChange={handleFilterChange} />
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
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <ItemCard key={item._id} item={item} />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-8 gap-4">
              <button
                disabled={page === 1 || buttonLoading === "prev"}
                onClick={() => {
                  setPage((prev) => prev - 1);
                  fetchData("prev");
                }}
                className="px-4 py-2 bg-[#3F51B5] text-white rounded disabled:opacity-50 flex items-center justify-center"
              >
                {buttonLoading === "prev" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Previous"
                )}
              </button>

              <span className="text-[#212121] font-medium self-center">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages || buttonLoading === "next"}
                onClick={() => {
                  setPage((prev) => prev + 1);
                  fetchData("next");
                }}
                className="px-4 py-2 bg-[#3F51B5] text-white rounded disabled:opacity-50 flex items-center justify-center"
              >
                {buttonLoading === "next" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Next"
                )}
              </button>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ItemList;
