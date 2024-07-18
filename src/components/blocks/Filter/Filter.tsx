import React, { useState } from 'react';
import Dropdown from '../inputs/Dropdown/Dropdown';
import Card, { CardProps } from '../Card/Card';
import './filter-styles.scss';

interface Item {
  id: string;
  title: string;
  introduction: string;
  image: any;
  cta: any;
  backgroundColor: string;
  tags: Array<{ id: number; name: string }>;
  date: string;
  typeOfCard: string;
  displayCta: boolean;
}

interface FilterProps {
  items: Item[];
  gridColumns: number;
}

const Filter: React.FC<FilterProps> = ({ items, gridColumns }) => {
  const uniqueTitles = Array.from(new Set(items.map((e) => e.title)));
  const uniqueYears = Array.from(new Set(items.map((e) => new Date(e.date).getFullYear())));

  const [filters, setFilters] = useState<string[]>(() => Array.from(new Set(items.flatMap((e) => e.title))));
  const [filteredItems, setFilteredItems] = useState<Item[]>(items);
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');

  const filterItems = (title: string, year: string) => {
    let filtered = items;

    if (title) {
      filtered = filtered.filter((item) => item.title === title);
    }

    if (year) {
      filtered = filtered.filter((item) => new Date(item.date).getFullYear().toString() === year);
    }

    setFilteredItems(filtered);
  };

  const handleOnFilterPosts = (currentTag: string) => {
    setSelectedTitle(currentTag);
    filterItems(currentTag, selectedYear);
  };

  const handleOnFilterPostsByYear = (currentYear: string) => {
    setSelectedYear(currentYear);
    filterItems(selectedTitle, currentYear);
  };

  return (
    <>
      <div className="filters mb-4">
        <div className="row">
          <div className="col">
            <h3>Find by topics</h3>
            <Dropdown title="Select an option" options={filters.map((f) => ({ value: f, label: f }))} onSelect={handleOnFilterPosts} />
          </div>
          <div className="col">
            <h3>Find by date</h3>
            <Dropdown
              title="Select a year"
              options={[
                ...Array.from({ length: new Date().getFullYear() - 10 }, (_, i) => ({
                  value: (new Date().getFullYear() - i).toString(),
                  label: (new Date().getFullYear() - i).toString(),
                })).slice(0, 10),
              ]}
              onSelect={handleOnFilterPostsByYear}
            />
          </div>
        </div>
      </div>

      <div className="content-tool">
        <div className="row gy-4">
          {filteredItems.length > 0 &&
            filteredItems.map((item) => (
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
