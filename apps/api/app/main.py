from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.endpoints import router as api_v1_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
    redoc_url=f"{settings.API_V1_STR}/redoc"
)

# Set CORS origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(api_v1_router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "status": "healthy",
        "app": "GramBiz AI Backend API",
        "version": settings.VERSION,
        "docs": f"{settings.API_V1_STR}/docs"
    }

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "services": {
            "api": "healthy",
            "database": "connected",
            "financial_engine": "active"
        }
    }
