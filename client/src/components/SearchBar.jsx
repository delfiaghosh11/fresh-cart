export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-wrapper">
      <span className="search-icon">🔍</span>
      <input
        id="search-input"
        type="text"
        className="search-input"
        placeholder="Search for groceries..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
