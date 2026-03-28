import os
import uvicorn
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from auth_gateway.config import settings
from auth_gateway.routers import user, token

app = FastAPI()

@app.on_event("shutdown")
async def shutdown_event():
    await app.state.database_pool.close()

@app.get("/", response_class=JSONResponse)
async def read_root():
    return {"message": "Auth Gateway API"}

@app.get("/ping")
async def ping():
    return {"status": "ok"}

if __name__ == "__main__":
    if os.environ.get("RUN_MODE") == "dev":
        uvicorn.run("auth_gateway.main:app", host=settings.HOST, port=settings.PORT, reload=True)
    else:
        uvicorn.run("auth_gateway.main:app", host=settings.HOST, port=settings.PORT)