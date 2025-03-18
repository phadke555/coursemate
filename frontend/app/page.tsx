"use client";
import { useState } from "react";
import { searchClasses, chatWithGPT } from "../utils/api";
import ReactMarkdown from "react-markdown";

interface SearchResult {
  id: string;
  text: string;
  score: number;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [mode, setMode] = useState("search");
  const [loading, setLoading] = useState(false);

  // Initialize chat history with an initial assistant message
  const initialAssistantMessage = `I can help you with planning and evaluating your course schedule at UNC based on the provided course descriptions and information. If you have any specific questions about the courses offered or need assistance in selecting courses that align with your academic goals and interests, feel free to ask!`;
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: initialAssistantMessage },
  ]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (mode === "search") {
        const data = await searchClasses(query);
        setResults(data);
      } else {
        // Chat mode
        const response = await chatWithGPT(query);
        setChatHistory((prev) => [
          ...prev,
          { role: "user", content: query },
          { role: "assistant", content: response },
        ]);
        setResults([]);
        setQuery("");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
        {/* TOP HEADER */}
        <header className="bg-white dark:bg-gray-800 shadow-sm py-4">
        <div className="flex items-center justify-center gap-2">
          {/* Example mortarboard/academic cap icon (Heroicons) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.7 2.7c.2-.2.6-.2.8 0l9 4.5c.3.1.5.4.5.7 0 .3-.2.6-.5.7L18 10.4v3.6c0 
              .3-.2.5-.4.7l-4 2.7c-.2.1-.3.1-.5.1s-.3 0-.5-.1l-4-2.7c-.3-.2-.4-.4-.4-.7v-3.6l-3.5-1.7c-.3-.1-.5-.4-.5-.7 
              0-.3.2-.6.5-.7l9-4.5z"
            />
          </svg>
          <h1 className="text-xl font-bold">Course Mate: Course Planning AI Tool</h1>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="pt-8 pb-32 p-4">
        {/* SEARCH MODE RESULTS */}
        {mode === "search" && results.length > 0 && (
          <ol className="p-5 list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            {results.map((item) => (
              <li
                key={item.id}
                className="border border-gray-300 rounded-md p-4 shadow-sm"
              >
                {item.text} (Score: {item.score})
              </li>
            ))}
          </ol>
        )}

        {/* CHAT MODE MESSAGES */}
        {mode === "chat" && chatHistory.length > 0 && (
          <div className="flex flex-col gap-4">
            {chatHistory.map((message, index) => {
              const isUser = message.role === "user";
              return (
                <div
                  key={index}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`rounded-lg p-4 max-w-3xl 
                      ${isUser
                        ? "bg-blue-500 text-white" 
                        : "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
                      }`}
                  >
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* FIXED BOTTOM BAR */}
      <footer className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 p-4 shadow-md z-10">
        {/* Toggle between Search and Chat */}
        <div className="flex justify-center gap-2 mb-3">
          <button
            onClick={() => setMode("search")}
            className={`px-4 py-2 rounded-full ${
              mode === "search" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
            }`}
          >
            Search
          </button>
          <button
            onClick={() => setMode("chat")}
            className={`px-4 py-2 rounded-full ${
              mode === "chat" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
            }`}
          >
            Chat
          </button>
        </div>

        {/* Input and Submit Button */}
        <div className="flex items-center justify-center gap-2 max-w-3xl mx-auto">
          <input
            type="text"
            placeholder={
              mode === "search"
                ? "Search for classes at UNC"
                : "Type your message here..."
            }
            className="flex-grow border border-gray-300 px-4 py-2 rounded"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            {/* You can replace this with an icon (like a paper plane icon) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M14.752 11.168l-9.193-5.31c-.674-.39-1.372.402-.986 1.078l2.974 5.196m6.205 3.526l2.975 5.196c.386.676 1.084 1.467.986 1.078l-9.193-5.31m9.193-5.31a48.108 48.108 0 01-9.193 5.31m9.193-5.31l-9.193 5.31"
              />
            </svg>
          </button>

          {/* Loading spinner next to the submit button */}
          {loading && (
            <div className="ml-2 flex justify-center items-center">
              <svg
                className="animate-spin h-6 w-6 text-blue-500"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
