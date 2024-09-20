// create a react functional component with Searchwidget function
import React, { useState } from "react";

const SearchWidget = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="search-widget">
      <input
        type="text"
        placeholder="Search Widgets"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {category.widgets
        .filter((widget) =>
          widget.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((filteredWidget) => (
          <div key={filteredWidget.id} className="widget">
            <span>
              {filteredWidget.name}: {filteredWidget.description}
            </span>
            <button
              onClick={() =>
                handleRemoveWidget(category.name, filteredWidget.id)
              }
            >
              Remove
            </button>
          </div>
        ))}
    </div>
  );
};

export default SearchWidget;
