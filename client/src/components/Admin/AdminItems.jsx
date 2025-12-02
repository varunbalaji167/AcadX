import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { getAllItems, deleteItemByAdmin } from "../../utils/adminService";
import toast from "react-hot-toast";
import { FaTrashAlt, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";
import Footer from "../Footer";

const AdminItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    fetchItems();
  }, [page]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await getAllItems(page, 20);
      if (data.success) {
        setItems(data.data);
        setPages(data.pages);
      }
    } catch {
      toast.error("Failed to load items for moderation.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (itemId) => {
    if (
      !window.confirm("Are you sure you want to permanently delete this item?")
    )
      return;

    try {
      const response = await deleteItemByAdmin(itemId);
      if (response.success) {
        toast.success(response.message);
        fetchItems();
      }
    } catch {
      toast.error("Failed to delete item.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F3F6FA]">
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-grow max-w-7xl mx-auto w-full p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Item Moderation
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <Loader className="animate-spin text-[#2A6FDB]" size={45} />
          </div>
        ) : (
          <>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Item Name / Poster
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50 transition">
                      <td className="px-5 py-5 text-sm">
                        <p className="text-gray-900 font-bold">
                          {item.title || "Unnamed Item"}
                        </p>
                        <p className="text-gray-600">
                          Posted by:{" "}
                          {item.user?.name || item.user?.email || "Unknown"}
                        </p>
                      </td>

                      <td className="px-5 py-5 text-sm text-gray-700">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-5 py-5 text-sm space-x-2">
                        <Link
                          to={`/items/${item._id}`}
                          target="_blank"
                          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md shadow items-center inline-flex"
                        >
                          <FaEye className="mr-1" /> View
                        </Link>

                        <button
                          onClick={() => handleDelete(item._id)}
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md shadow items-center inline-flex"
                        >
                          <FaTrashAlt className="mr-1" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md font-medium disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Previous
              </button>

              <span className="font-semibold text-gray-700">
                Page {page} of {pages}
              </span>

              <button
                disabled={page === pages}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md font-medium disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminItems;
