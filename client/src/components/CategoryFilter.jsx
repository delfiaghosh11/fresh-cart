export default function CategoryFilter({ categories, active, onSelect }) {
  return (
    <div className="category-filter">
      <button
        id="category-all"
        className={`category-chip ${!active ? "active" : ""}`}
        onClick={() => onSelect(null)}
      >
        <span className="chip-icon">📦</span>
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          id={`category-${cat.id}`}
          className={`category-chip ${active === cat.name ? "active" : ""}`}
          onClick={() => onSelect(cat.name)}
        >
          <span className="chip-icon">{cat.icon}</span>
          {cat.name}
        </button>
      ))}
    </div>
  );
}
