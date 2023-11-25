import React, { useState, useEffect } from 'react'

const SearchControl = ({onSearch}) => {
  const [searchTerm, setSearchTerm] = useState(() => localStorage.getItem('searchTerm') || "");
  const [typingTimeout, setTypingTimeout] = useState(0);

  const handleChangeSearchTerm = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    };

    if (newSearchTerm.length >= 1) {
      setTypingTimeout(setTimeout(() => {
        onSearch(newSearchTerm);
      }, 500));
    } else if (newSearchTerm.length === 0) {
      onSearch('');
    };
  };

  useEffect(() => {
    return () => {
      clearTimeout(typingTimeout);
    };
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <div className="row col-6" style={{minWidth: '300px'}}>
        <div className="col-12">
        <label htmlFor="search-input">Search:</label>
        <input
          id="search-input"
          type="text"
          className="form-control"
          placeholder="Enter term"
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
        </div>
      </div>
    </div>
  )
}

export default SearchControl;