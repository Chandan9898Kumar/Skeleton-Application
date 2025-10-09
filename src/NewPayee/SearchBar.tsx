import { Search } from 'lucide-react';
import './styles/SearchBar.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search payee name and mobile no."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Search className="search-icon" size={20} />
    </div>
  );
};

export default SearchBar;
