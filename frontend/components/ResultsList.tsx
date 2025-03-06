type SearchResult = {
  id: string;
  score: number;
  text: string;
  category: string;
};

type ResultsListProps = {
  results: SearchResult[];
};

const ResultsList = ({ results }: ResultsListProps) => {
  return (
    <div className="mt-8 w-full max-w-3xl mx-auto">
      {results.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">No results found.</p>
      ) : (
        <ol className="space-y-6">
          {results.map((result, index) => (
            <li
              key={result.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transform hover:scale-[1.02] transition duration-300"
            >
              <h3 className="font-bold text-xl text-blue-700 dark:text-blue-400">
                {index + 1}. {result.id} - {result.text}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                Category: <span className="text-gray-900 dark:text-gray-200">{result.category}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Relevance Score: {result.score.toFixed(4)}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default ResultsList;