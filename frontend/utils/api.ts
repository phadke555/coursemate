import axios from "axios";

// Backend API URL (Uses environment variable or local fallback)
const API_BASE_URL = "https://coursemate-production.up.railway.app";

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


/**
 * Chats with the GPT-based AI assistant by first retrieving context via Pinecone
 * and then passing the user's query + context to the GPT model.
 * @param query - User's prompt
 * @returns GPT-based response
 */
export const chatWithGPT = async (query: string) => {
  const response = await axios.get(`${API_BASE_URL}/api/chat`, {
    params: { query },
  });
  return response.data.gpt_response; // Return only the GPT response
};
