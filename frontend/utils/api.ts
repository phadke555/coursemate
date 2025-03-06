import axios from "axios";

// Backend API URL (Uses environment variable or local fallback)
const API_BASE_URL = "http://127.0.0.1:8000";

/**
 * Searches UNC courses using the FastAPI backend.
 * @param query - User's search query
 * @returns List of relevant courses
 */
export const searchClasses = async (query: string) => {
  const response = await axios.get(`${API_BASE_URL}/api/search`, {
    params: { query },
  });
  return response.data.results; // Return only the results array
};
