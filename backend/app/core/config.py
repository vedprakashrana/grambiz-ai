from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    PROJECT_NAME: str = "GramBiz AI API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"

    # Database
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/grambiz_db"
    DATABASE_URL_SYNC: str = "postgresql://postgres:postgres@localhost:5432/grambiz_db"
    MONGODB_URL: str = "mongodb://localhost:27017"
    MONGODB_DB_NAME: str = "grambiz_ai"
    
    # Multilingual / Bhashini / IndicTrans2
    BHASHINI_API_URL: str = "https://dhruva-api.bhashini.gov.in/services/inference/pipeline"
    BHASHINI_API_KEY: str = ""
    BHASHINI_USER_ID: str = ""
    BHASHINI_PIPELINE_ID: str = ""

    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"

    # JWT
    JWT_SECRET: str = "super-secret-grambiz-jwt-key-change-in-prod-1234567890"
    JWT_REFRESH_SECRET: str = "super-secret-grambiz-jwt-refresh-key-change-in-prod-1234567890"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:8000"]

    # AI Providers
    LLM_PROVIDER: str = "mock"
    LLM_API_KEY: str = ""
    LLM_MODEL: str = "gpt-4o-mini"
    EMBEDDING_PROVIDER: str = "mock"
    EMBEDDING_API_KEY: str = ""

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()
