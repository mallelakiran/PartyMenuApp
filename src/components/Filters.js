import React from "react";

function Filters({ 
  activeCategory, 
  onCategoryChange, 
  searchTerm, 
  onSearchChange, 
  vegOnly, 
  nonVegOnly,
  onVegOnlyChange,
  onNonVegOnlyChange,
  categoryCounts 
}) {
  const categories = ["STARTER", "MAIN COURSE", "DESSERT", "SIDES"];

  return (
    <div className="filters-container">
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search dishes..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Veg/Non-Veg Filters */}
      <div className="diet-filters">
        <label className="filter-checkbox">
          <input
            type="checkbox"
            checked={vegOnly}
            onChange={(e) => onVegOnlyChange(e.target.checked)}
          />
          <div className="toggle-switch veg">
            <div className="toggle-circle"></div>
          </div>
          <span className="filter-label">Veg</span>
        </label>
        <label className="filter-checkbox">
          <input
            type="checkbox"
            checked={nonVegOnly}
            onChange={(e) => onNonVegOnlyChange(e.target.checked)}
          />
          <div className="toggle-switch non-veg">
            <div className="toggle-circle"></div>
          </div>
          <span className="filter-label">Non-Veg</span>
        </label>
      </div>

      {/* Category Tabs */}
      <div className="category-tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-tab ${activeCategory === category ? 'active' : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
            {categoryCounts[category] > 0 && (
              <span className="category-count">({categoryCounts[category]})</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Filters;
