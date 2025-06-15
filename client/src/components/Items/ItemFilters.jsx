// import React from 'react';
// import {
//   FaSearch,
//   FaUniversity,
//   FaBook,
//   FaTags,
// } from 'react-icons/fa';
// import { LoaderCircle } from 'lucide-react';

// const ItemFilters = ({ onFilterChange, loading }) => {
//   const handleChange = (e) => {
//     onFilterChange((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   return (
//     <div className="bg-white rounded-xl shadow p-4 flex flex-wrap gap-4 justify-between items-center max-w-4xl mx-auto">
//       {/* Search */}
//       <div className="relative w-full md:w-[calc(25%-1rem)]">
//         <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//         <input
//           name="search"
//           placeholder="Search title..."
//           onChange={handleChange}
//           className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {/* Course Code */}
//       <div className="relative w-full md:w-[calc(25%-1rem)]">
//         <FaBook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//         <input
//           name="courseCode"
//           placeholder="Course Code"
//           onChange={handleChange}
//           className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {/* Department */}
//       <div className="relative w-full md:w-[calc(25%-1rem)]">
//         <FaUniversity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//         <input
//           name="department"
//           placeholder="Department"
//           onChange={handleChange}
//           className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {/* Category */}
//       <div className="relative w-full md:w-[calc(25%-1rem)]">
//         <FaTags className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//         <select
//           name="category"
//           onChange={handleChange}
//           className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="">All Categories</option>
//           <option value="Textbooks">Textbooks</option>
//           <option value="Labkits">Lab Kits</option>
//           <option value="Stationery">Stationery</option>
//         </select>
//       </div>

//       {/* Optional Loading Spinner */}
//       {loading && (
//         <div className="w-full flex justify-center mt-2">
//           <LoaderCircle className="h-6 w-6 text-blue-500 animate-spin" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ItemFilters;

import {
  FaSearch,
  FaUniversity,
  FaBook,
  FaTags,
} from 'react-icons/fa';
import { LoaderCircle } from 'lucide-react';

const ItemFilters = ({ onFilterChange, loading }) => {
  const handleChange = (e) => {
    onFilterChange((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg px-6 py-8 max-w-6xl mx-auto mt-8 mb-6">
      <h2 className="text-xl font-semibold text-[#212121] mb-6">
        🎯 Filter Items
      </h2>

      <div className="flex flex-wrap gap-6">
        {/* Search */}
        <div className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-0.75rem)]">
          <label className="block text-sm font-medium text-[#212121] mb-1">Search Title</label>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#757575]" />
            <input
              name="search"
              placeholder="Enter keywords..."
              onChange={handleChange}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg text-[#212121] placeholder-[#757575] focus:outline-none focus:ring-2 focus:ring-[#3F51B5]"
            />
          </div>
        </div>

        {/* Course Code */}
        <div className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-0.75rem)]">
          <label className="block text-sm font-medium text-[#212121] mb-1">Course Code</label>
          <div className="relative">
            <FaBook className="absolute left-3 top-1/2 -translate-y-1/2 text-[#757575]" />
            <input
              name="courseCode"
              placeholder="e.g., CS101"
              onChange={handleChange}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg text-[#212121] placeholder-[#757575] focus:outline-none focus:ring-2 focus:ring-[#3F51B5]"
            />
          </div>
        </div>

        {/* Department */}
        <div className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-0.75rem)]">
          <label className="block text-sm font-medium text-[#212121] mb-1">Department</label>
          <div className="relative">
            <FaUniversity className="absolute left-3 top-1/2 -translate-y-1/2 text-[#757575]" />
            <input
              name="department"
              placeholder="e.g., CSE"
              onChange={handleChange}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg text-[#212121] placeholder-[#757575] focus:outline-none focus:ring-2 focus:ring-[#3F51B5]"
            />
          </div>
        </div>

        {/* Category */}
        <div className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-0.75rem)]">
          <label className="block text-sm font-medium text-[#212121] mb-1">Category</label>
          <div className="relative">
            <FaTags className="absolute left-3 top-1/2 -translate-y-1/2 text-[#757575]" />
            <select
              name="category"
              onChange={handleChange}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg text-[#212121] bg-white focus:outline-none focus:ring-2 focus:ring-[#3F51B5]"
            >
              <option value="">All Categories</option>
              <option value="Textbooks">Textbooks</option>
              <option value="Labkits">Lab Kits</option>
              <option value="Stationery">Stationery</option>
            </select>
          </div>
        </div>
      </div>

      {/* Optional Loading Spinner */}
      {loading && (
        <div className="w-full flex justify-center mt-6">
          <LoaderCircle className="h-6 w-6 text-[#3F51B5] animate-spin" />
        </div>
      )}
    </div>
  );
};

export default ItemFilters;