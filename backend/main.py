from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import dotenv
import os

from app.router import router as api_router
from app.user import initialize as firebase_init

dotenv.load_dotenv()

app = FastAPI(
    title="Project Lighthouse API",
    description="Backend services for GDGC project lighthouse.",
    version="1.0.0"
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = exc.errors()
    if errors:
        first_error = errors[0]
        loc = first_error.get("loc", [])
        field = ".".join(str(x) for x in loc[1:]) if len(loc) > 1 else ".".join(str(x) for x in loc)
        msg = first_error.get("msg", "Invalid value")
        detail = f"Validation failed for field '{field}': {msg}"
    else:
        detail = "Request validation failed"
    return JSONResponse(
        status_code=400,
        content={"detail": detail}
    )

firebase_init(os.getenv("FIREBASE_CREDENTIALS_PATH"))
origins = [
    os.getenv("FRONTEND_URL", "http://localhost:3000"),
    "http://localhost:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

@app.get("/", tags=["Health"])
def read_root():
    return {"message": "Backend alive"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
    
