from pinecone import Pinecone
from backend.records_list import records
import warnings; warnings.filterwarnings("ignore")


api_key = "API_KEY"
pc = Pinecone(api_key=api_key)

index_name = "courselist-index"
if pc.has_index(index_name):
    pc.delete_index(index_name)
    
if not pc.has_index(index_name):
    pc.create_index_for_model(
        name=index_name,
        cloud="aws",
        region="us-east-1",
        embed={
            "model":"llama-text-embed-v2",
            "field_map":{"text": "chunk_text"}
        }
    )
dense_index = pc.Index(index_name)

dense_index.upsert_records("unc-namespace", records)

def search_index(query, k=6):
    reranked_results = dense_index.search(
    namespace="unc-namespace",
    query={
        "top_k": k,
        "inputs": {
            'text': query
        }
    },
    rerank={
        "model": "bge-reranker-v2-m3",
        "top_n": k,
        "rank_fields": ["chunk_text"]
    }   
    )

    # ✅ Extract relevant fields and avoid KeyError
    hits = reranked_results.get("result", {}).get("hits", [])

    formatted_results = [
        {
            "id": hit.get("_id", ""),
            "score": hit.get("_score", 0),
            "text": hit.get("fields", {}).get("chunk_text", ""),
            "category": hit.get("fields", {}).get("category", "unknown")
        }
        for hit in hits
    ]

    return {"results": formatted_results}