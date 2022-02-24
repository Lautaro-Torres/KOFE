import React, { useState } from "react";
import axios from "axios";
import { CustomHook } from "../hooks/CustomHook";
import { useLocation } from "react-router-dom";
import StarRating from "./StarRating/StarRating";
function AddComment() {
  const comment = CustomHook("");
  const productId = useLocation().pathname.slice(10);
  const [rating, setRating] = useState(0);

  const handleChange = (value) => {
    setRating(value);
  };

  const postReview = () => {
    axios.post(`/comment/${productId}`, { content: comment.value });
    axios.put(`/product/${productId}/ratings`, { rating: rating });
  };

  return (
    <div>
      <div className="flex mx-auto items-center justify-center shadow-lg mt-5 mx-8 mb-4 max-w-lg">
        <form
          className="w-full max-w-xl bg-white rounded-lg px-4 pt-2"
          onSubmit={postReview}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
              Comentario y valoración
            </h2>
            <StarRating
              style={{ cursor: "pointer" }}
              count={5}
              size={20}
              value={rating}
              activeColor={"brown"}
              inactiveColor={"#ddd"}
              onChange={handleChange}
            />
            <div className="w-full md:w-full px-3 mb-2 mt-2">
              <textarea
                className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                name="body"
                placeholder="Escribi tu comentario..."
                {...comment}
                required
              ></textarea>
            </div>
            <div className="w-full md:w-full flex items-start md:w-full px-3">
              <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
                <svg
                  fill="none"
                  className="w-5 h-5 text-gray-600 mr-1"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="-mr-1">
                <input
                  type="submit"
                  className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                  value="Enviar"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddComment;
