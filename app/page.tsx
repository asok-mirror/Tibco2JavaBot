'use client';
import React, { useRef, useEffect, useState } from 'react';
import { useChat } from 'ai/react';
import MessageItem from './components/MessageItem';
import IconClear from './components/icons/Clear';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isClient, setIsClient] = useState(false);

  const clear = () => {
    setMessages([]);
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.style.height = 'auto';
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
    <main className="flex flex-col w-full max-w-prose py-15 mx-auto stretch flex-grow">
    <Header />
      {messages.map(m => (
        <div key={m.id} className="whitespace-pre-wrap">
          <MessageItem role={m.role} message={m.content} />
        </div>
      ))}

      <form onSubmit={handleSubmit} className="flex items-center sticky bottom-0 w-full max-w-prose p-2 mb-8  border-gray-300 rounded shadow-xl bg-white">
        <input
          ref={inputRef}
          className="flex-grow p-2 border border-gray-300 rounded"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
        <button title="Clear" onClick={clear} className="ml-2 p-2 bg-red-500 text-white rounded">
          <IconClear />
        </button>
      </form>
    </main> 
    <Footer />
    </div>
  );
}