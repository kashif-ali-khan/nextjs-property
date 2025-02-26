"use client";
import { FaBookmark } from "react-icons/fa";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import bookmarkStatus from "@/app/actions/bookmarkStatus";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
const BookmarkButton = ({ property }) => {
  const [isBookmarked, setIsbookmarked] = useState(false);
  const [loading, setIsloading] = useState(false);
  const bkP = async () => {
    const status = await bookmarkProperty(property._id);
    setIsbookmarked(status.isBookmarked);
    toast.success(status.message);
  };

  useEffect(() => {
    setIsloading(true);
    bookmarkStatus(property._id).then((status) => {
      setIsbookmarked(status);
      setIsloading(false);
    });
  }, [isBookmarked]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <button
          onClick={() => bkP()}
          className={`${
            isBookmarked
              ? "bg-red-500 hover:bg-red-600 "
              : "bg-blue-500 hover:bg-blue-600 "
          }text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`}
        >
          <FaBookmark className=" mr-2" />{" "}
          {isBookmarked ? "Remove Bookmark " : "Bookmark Property"}
        </button>
      )}
    </>
  );
};

export default BookmarkButton;
