from fastapi import APIRouter
from backend.services.pinecone_service import search_index

router = APIRouter()

@router.get("/search")
def search(query: str):
    results = search_index(query)
    return results
