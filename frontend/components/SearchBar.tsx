import { useState } from "react";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
      <input
        type="text"
        className="border border-gray-300 p-4 w-full sm:w-[1200px] text-lg rounded-full shadow-md bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300"
        placeholder="Search for a UNC course..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-md"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;