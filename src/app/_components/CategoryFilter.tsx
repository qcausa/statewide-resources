"use client";

type CategoryFilterProps = {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
};

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  className = "",
}: CategoryFilterProps) {
  return (
    <div className={`mb-6 flex flex-wrap gap-2 ${className}`}>
      <button
        onClick={() => onCategoryChange("")}
        className={`rounded-full px-4 py-2 text-sm transition-colors ${
          selectedCategory === ""
            ? "bg-blue-500 text-white"
            : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`rounded-full px-4 py-2 text-sm transition-colors ${
            selectedCategory === category
              ? "bg-blue-500 text-white"
              : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
