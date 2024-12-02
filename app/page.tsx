'use client';
import React, { useRef } from 'react';
import { useChat } from 'ai/react';
import MessageItem from './components/MessageItem';
import IconClear from './components/icons/Clear';
import Header from './components/Header';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const clear = () => {
    setMessages([]);
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.style.height = 'auto';
    }
  };

  // const handleSendClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   if (inputRef.current) {
  //     handleSubmit(e);
  //     inputRef.current.value = '';
  //     inputRef.current.style.height = 'auto';
  //   }
  // };


  return (
    
    
    <div className="flex flex-col w-full max-w-prose py-15 mx-auto stretch">
    <Header />
      {messages.map(m => (
        <div key={m.id} className="whitespace-pre-wrap">
          <MessageItem role={m.role} message={m.content} />
        </div>
      ))}

      {/* <div className="gen-text-wrapper relative">
        <textarea
          ref={inputRef}
          onChange={handleInputChange}
          placeholder="Enter something..."
          autoComplete="off"
          autoFocus
          value={input}
          onInput={() => {
            if (inputRef.current) {
              inputRef.current.style.height = 'auto';
              inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
            }
          }}
          rows={1}
          className="gen-textarea"
        />
        <button className="my-4 fc gap-2 transition-opacity" onClick={handleSendClick}>
          Send
        </button>
        <button title="Clear" onClick={clear} className="my-4 fc gap-2 transition-opacity">
          <IconClear />
        </button>
      </div> */}
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

    </div> 
  );
}