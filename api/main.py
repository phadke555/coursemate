from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.text import router as text_router

# Initialize FastAPI app
app = FastAPI(title="UNC Course Search API", version="1.0")

# CORS Middleware (Allows Frontend to Call Backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific frontend URL for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routes
app.include_router(text_router, prefix="/api")

# Root Route for Testing
@app.get("/")
def home():
    return {"message": "Welcome to the UNC Course Search API!"}
