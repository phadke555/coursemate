"use client";
import { useState } from "react";
import { searchClasses, chatWithGPT } from "../utils/api";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [mode, setMode] = useState("search");
  const [loading, setLoading] = useState(false);
 
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);

  // This function calls the searchClasses API and chatWithGPT API
  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (mode === "search") {
        const data = await searchClasses(query);
        setResults(data);
        // Clear out chat if you’d like, or leave it:
        // setChatHistory([]);
      } else {
        // 2) IF "CHAT" MODE => CALL GPT & UPDATE CHAT HISTORY
        const response = await chatWithGPT(query);
  
        // Append the user’s message and the AI’s response to chatHistory
        setChatHistory((prev) => [
          { role: "user", content: query },
          { role: "assistant", content: response },
          ...prev, // older messages go after the newest
        ]);
  
        // Clear out the search results if you want them separate
        setResults([]);
  
        // 3) CLEAR THE USER’S INPUT
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
      {/* <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start"> */}
      <div className="flex items-center gap-4">
      <header className="
          fixed               
          top-0              
          left-1/2           /* CHANGED: Position the element's left edge at 50% of the viewport */
          transform -translate-x-1/2 /* CHANGED: Shift it back by 50% of its own width to center it */
          flex flex-col items-center gap-4
          p-4
          shadow-md
          z-10" >
            <div className="flex gap-2">
              <button
                onClick={() => setMode("search")}
                className={`px-4 py-2 ${mode === "search" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
                >
                Search
                </button>
                <button
                onClick={() => setMode("chat")}
                className={`px-4 py-2 ${mode === "chat" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
                >
                Chat
              </button>
            </div>
            <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder={mode === "search" ? "Search for something" : "Chat with someone"}
              className="w-100 border border-gray-300 px-4 py-2 rounded"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
            </div>
                      {/* Loading spinner */}
          {loading && (
            <div className="flex justify-center items-center mt-4">
              <svg className="animate-spin h-8 w-8 text-blue-500" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
            </div>
          )}
          </header>
        </div>
        <main className="pt-32 p-4">
        {mode === "search" && results.length > 0 && (
          <ol className="p-5 list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            {results.map((item) => (
              <li
                key={item.id}
                className="
                  border border-gray-300 rounded-md p-4 shadow-sm
                "
              >
                {item.text} (Score: {item.score})
              </li>
            ))}
          </ol>
        )}
        {mode === "chat" && chatHistory.length > 0 && (
          <div className="flex flex-col gap-4">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className="p-4 border border-gray-300 rounded shadow-sm font-[family-name:var(--font-geist-mono)]"
              >
                <strong>{message.role === "user" ? "You: " : "Assistant: "}</strong>
                {message.content}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
