import React, { useState } from 'react';
import Dropdown from '../inputs/dropdown/Dropdown';
import Card from '../card/card';
import './styles.scss';

const Filter = ({ items, gridColumns }) => {
  /*  */
  // Assuming you have a list of unique titles and years
  const uniqueTitles = Array.from(new Set(items.map((e) => e.title)));
  const uniqueYears = Array.from(new Set(items.map((e) => new Date(e.date).getFullYear())));

  const [filters, setFilters] = useState(() => Array.from(new Set(items.flatMap((e) => e.title))));
  const [filteredItems, setFilteredItems] = useState(items);

  // State for selected filters
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Filter function
  const filterItems = (title, year) => {
    let filtered = items;

    if (title) {
      filtered = filtered.filter((item) => item.title === title);
    }

    if (year) {
      filtered = filtered.filter((item) => new Date(item.date).getFullYear().toString() === year);
    }

    setFilteredItems(filtered);
  };

  const handleOnFilterPosts = (currentTag) => {
    setSelectedTitle(currentTag);
    filterItems(currentTag, selectedYear);
  };

  const handleOnFilterPostsByYear = (currentYear) => {
    setSelectedYear(currentYear);
    filterItems(selectedTitle, currentYear);
  };

  return (
    <>
      <div className="filters mb-4">
        <div className="row">
          <div className="col">
            <h3>Find by topics</h3>
            <Dropdown options={filters.map((f) => ({ value: f, label: f }))} onSelect={handleOnFilterPosts} />
          </div>
          <div className="col">
            <h3>Find by date</h3>
            <Dropdown
              options={[
                // Add code here to generate years until last with descending order starting from ten years ago
                ...Array.from({ length: new Date().getFullYear() - 10 }, (_, i) => ({
                  value: (new Date().getFullYear() - i).toString(),
                  label: (new Date().getFullYear() - i).toString(),
                })).slice(0, 10), // Limit the array to 10 elements
              ]}
              onSelect={handleOnFilterPostsByYear}
            />
          </div>
        </div>
      </div>

      <div className="content-tool">
        <div className="row gy-4">
          {filteredItems.length > 0 && filteredItems.map((item) => (
            <div className={`col-lg-${12 / gridColumns}`} key={item.id}>
              <Card card={item} />
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="col">
              <p>No results found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Filter;
