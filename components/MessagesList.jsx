// MessagesList.jsx
'use client';
import { Fragment } from 'react';
import MessageCard from "@/components/MessageCard";

export default function MessagesList({ messages }) {
  // Add multiple safeguards
  if (!messages) {
    return <div>No messages</div>;
  }
  
  if (!Array.isArray(messages)) {
    console.error("Messages is not an array:", messages);
    return <div>Invalid messages data</div>;
  }
  
  return (
    <Fragment>
      {messages.map((message) => (
        message && message._id ? 
          <MessageCard key={message._id} message={message} /> : 
          <div key={Math.random()}>Invalid message item</div>
      ))}
    </Fragment>
  );
}