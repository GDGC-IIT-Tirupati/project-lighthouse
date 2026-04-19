from fastapi import FastAPI
from app.router import router as api_router
from db.db import engine
from db.model import Base
from fastapi.middleware.cors import CORSMiddleware
import dotenv
import os
from app.user import initialize as firebase_init
dotenv.load_dotenv()
firebase_init()
app = FastAPI()
app.include_router(api_router)
origins = [os.getenv("FRONTEND_URL", "")]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
@app.get("/")
def read_root():
    return {"message": "Backend alive"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
