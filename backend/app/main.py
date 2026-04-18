from .router import router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()
app.include_router(router)

frontend_url = os.getenv("FRONTEND_URL")
if frontend_url:
    origins = [frontend_url] 
else:
    raise RuntimeError("FRONTEND_URL is not set. Add it to backend/.env or environment variables.")

app.add_middleware(
	CORSMiddleware,
	allow_origins=origins,
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)