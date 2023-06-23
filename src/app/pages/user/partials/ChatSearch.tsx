import React from "react";
import { useState } from "react";

const ChatSearch = () => {
  const [searchText, setSearchText] = useState<string>('');
  const handleChange = (e: any) => {
    console.log()
    setSearchText(e.target.value);
  }
  return (
    <div className="chat-search">
      <div className="chat-search-form">
        <div className="chat-search-icon">
          <i className="fas fa-search"></i>
        </div>
        <input value={searchText} onChange={handleChange} type="text" className="chat-search-input" placeholder="Search on messages" />
      </div>
    </div>
  );
};

export default ChatSearch;
