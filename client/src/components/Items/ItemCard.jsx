// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaTag, FaCheckCircle, FaBoxOpen } from 'react-icons/fa';
// import { LoaderCircle } from 'lucide-react';

// const ItemCard = ({ item, loading }) => {
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-60 bg-gray-100 rounded-lg shadow animate-pulse">
//         <LoaderCircle className="h-10 w-10 animate-spin text-blue-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="group border border-gray-200 rounded-2xl shadow hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-white">
//       {item.images?.[0]?.url ? (
//         <img
//           src={item.images[0].url}
//           alt={item.title}
//           className="h-48 w-full object-cover transition-transform group-hover:scale-105 duration-300"
//         />
//       ) : (
//         <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-500">
//           <FaBoxOpen size={40} />
//         </div>
//       )}

//       <div className="p-4 space-y-2">
//         <h2 className="font-bold text-xl text-gray-800 flex items-center gap-2">
//           <FaTag className="text-blue-500" /> {item.title}
//         </h2>

//         <p className="text-sm text-gray-600 flex items-center gap-1">
//           <FaCheckCircle className="text-green-500" />
//           {item.category} • {item.condition}
//         </p>

//         <Link
//           to={`/items/${item._id}`}
//           className="inline-block mt-2 text-blue-600 hover:text-blue-800 font-medium underline"
//         >
//           View Details →
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ItemCard;

import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaTag,
  FaCheckCircle,
  FaBoxOpen,
  FaArrowRight
} from 'react-icons/fa';
import { LoaderCircle } from 'lucide-react';

const ItemCard = ({ item, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-[#FAFAFA] rounded-2xl shadow animate-pulse">
        <LoaderCircle className="h-10 w-10 animate-spin text-[#3F51B5]" />
      </div>
    );
  }

  return (
    <div className="group border border-gray-200 rounded-2xl shadow hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-white">
      {item.images?.[0]?.url ? (
        <img
          src={item.images[0].url}
          alt={item.title}
          className="h-48 w-full object-cover transition-transform group-hover:scale-105 duration-300"
        />
      ) : (
        <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-500">
          <FaBoxOpen size={40} />
        </div>
      )}

      <div className="p-4 space-y-2">
        <h2 className="font-bold text-xl text-[#212121] flex items-center gap-2">
          <FaTag className="text-[#3F51B5]" /> {item.title}
        </h2>

        <p className="text-sm text-[#757575] flex items-center gap-2">
          <FaCheckCircle className="text-[#43A047]" />
          {item.category} • {item.condition}
        </p>

        <Link
          to={`/items/${item._id}`}
          className="inline-flex items-center gap-1 text-[#FF7043] hover:text-[#e0552e] font-medium text-sm underline"
        >
          View Details <FaArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;