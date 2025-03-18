from fastapi import APIRouter, HTTPException
from backend.services.pinecone_service import search_index
from backend.services.gpt_service import call_gpt_api

router = APIRouter()

@router.get("/chat")
def chat(query: str):
    results = search_index(query, k=10)
    if not results:
        raise HTTPException(status_code=404, detail="No results found.")

    # 2) Pass search results to GPT as the prompt
    # For example, if you just feed the entire "results" as text:
    gpt_response = call_gpt_api(query, results)

    # 3) Return combined result
    return {
        "gpt_response": gpt_response
    }