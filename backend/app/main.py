from app.router import router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
app=FastAPI()
app.include_router(router)
origins = [os.getenv("FRONTEND_URL", "")]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])