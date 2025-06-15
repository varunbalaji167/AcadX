import React, { useState } from "react";
import { FaStar, FaTimesCircle, FaCheckCircle, FaCommentDots } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const RatingModal = ({ isOpen, onClose, onSubmit, request }) => {
  const [stars, setStars] = useState(5);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!review.trim()) {
      if (!toast.isActive("review_required")) {
        toast.error("Please enter a review.", { id: "review_required" });
      }
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        toUserId: request.item.user._id,
        itemId: request.item._id,
        rating: stars,
        review,
      });

      if (!toast.isActive("review_success")) {
        toast.success("Review submitted successfully!", { id: "review_success" });
      }
      onClose();
    } catch (err) {
      console.error(err);
      if (!toast.isActive("review_error")) {
        toast.error("Something went wrong.", { id: "review_error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative border border-[#E0E0E0]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#E53935] hover:text-[#b71c1c] transition-colors"
        >
          <FaTimesCircle size={22} />
        </button>

        <h3 className="text-2xl font-bold text-[#212121] mb-4 flex items-center gap-2">
          <FaCommentDots className="text-[#3F51B5]" />
          Leave a Review
        </h3>

        {/* Rating Selector */}
        <div className="mb-4">
          <label className="block text-[#757575] font-medium mb-2">Your Rating</label>
          <select
            value={stars}
            onChange={(e) => setStars(Number(e.target.value))}
            className="w-full p-2 rounded-md border focus:ring-2 focus:ring-[#3F51B5]"
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} Star{n > 1 && "s"}
              </option>
            ))}
          </select>
        </div>

        {/* Review Text */}
        <div className="mb-4">
          <label className="block text-[#757575] font-medium mb-2">Your Feedback</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={4}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#3F51B5]"
            placeholder="Write something helpful..."
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-200 text-[#212121] px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#FF7043] text-white px-5 py-2 rounded-md flex items-center gap-2 hover:bg-[#e85f36] transition-colors disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <FaCheckCircle />
            )}
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;