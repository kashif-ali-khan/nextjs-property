"use client";
import { useCallback, useState } from "react";
import markMessageAsRead from "@/app/actions/MarkMessageAsRead";
import DeleteMessage from "@/app/actions/MessageDelete";
import { toast } from "react-toastify";
import { useGlobalContext } from "@/context/GlobalContext";

const MessageCard = ({ message }) => {
  const { setCount } = useGlobalContext();
  if (!message) return null; // Prevent crashes if message is undefined
  const [isRead, setIsread] = useState(message.read);
  const readMessage = useCallback(async () => {
    try {
      const isRead = await markMessageAsRead(message._id);
      const msg = isRead
        ? "Message marked as read "
        : "Message marked as un-read";

      toast.success(msg);
      setCount((prevCount) => (isRead ? prevCount - 1 : prevCount + 1));

      setIsread(isRead);
    } catch (error) {
      console.error("Failed to mark message as read:", error);
    }
  }, [message._id, isRead]);

  const deleteMessage = async () => {
    console.log("DELETE");
    const status = await DeleteMessage(message._id);
    if (status) {
      setCount((prevCount) => prevCount - 1);

      toast.success("Message Deleted successfully");
    }
  };

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">
          Property Inquiry: {message.property?.name || "Unknown Property"}
        </span>
      </h2>
      <p className="text-gray-500">{message.body}</p>
      <ul className="mt-4">
        <li>
          <strong>Reply Email: </strong>
          <a className="text-blue-500" href={`mailto:${message.email}`}>
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone: </strong>
          <a className="text-blue-500" href={`tel:${message.phone}`}>
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received: </strong>
          {message.createdAt
            ? new Date(message.createdAt).toLocaleString()
            : "Unknown Date"}
        </li>
      </ul>
      <button
        onClick={readMessage}
        className={`mt-4 mr-3 ${
          isRead ? "bg-gray-300" : "bg-blue-500 text-white"
        } py-1 px-3 rounded-md`}
      >
        {isRead ? "Mark As New" : "Mark As Read"}
      </button>
      <button
        onClick={deleteMessage}
        className="ml-2 mt-4 py-1 text-white rounded-md px-4 bg-red-500"
      >
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
