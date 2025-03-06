"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "../components/SearchBar";
import ResultsList from "../components/ResultsList";
import { searchClasses } from "../utils/api";

export default function Home() {
  const [query, setQuery] = useState("");

  const { data: results = [], isLoading, isError } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchClasses(query),
    enabled: query.length > 0,
  });

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900 p-6">
      <h1 className="text-5xl font-bold text-blue-900 dark:text-white mt-12 text-center">🔎 UNC Course Search</h1>
      <SearchBar onSearch={setQuery} />

      {isLoading && <p className="text-gray-500 text-center mt-8 text-lg">Loading...</p>}
      {isError && <p className="text-red-500 text-center mt-8 text-lg">Error fetching results.</p>}

      <ResultsList results={results} />
    </main>
  );
}
