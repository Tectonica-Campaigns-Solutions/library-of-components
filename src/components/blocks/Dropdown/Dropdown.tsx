import React, { useEffect, useRef, useState } from 'react';
import './dropdown-styles.scss';

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  title?: string;
  options: Option[];
  onSelect?: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ title, options, onSelect }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleOptionClick = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);

    onSelect && onSelect(value);
  };

  return (
    <div ref={dropdownRef} className={`custom-dropdown ${isOpen ? 'open' : ''}`}>
      <button className="dropdown-toggle" onClick={handleToggle}>
        {options.find((o) => o.value === selectedOption)?.label || title || 'Select an option'}
      </button>

      <ul className="dropdown-menu">
        {options.map((option) => (
          <li key={option.value} onClick={() => handleOptionClick(option.value)}>
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
