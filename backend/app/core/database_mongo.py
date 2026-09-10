import os
import logging
from typing import Optional
from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

logger = logging.getLogger(__name__)

class MongoDB:
    client: Optional[AsyncIOMotorClient] = None
    db = None

db = MongoDB()

async def connect_to_mongo():
    """Connect to MongoDB on startup."""
    mongo_url = getattr(settings, "MONGODB_URL", os.getenv("MONGODB_URL", "mongodb://localhost:27017"))
    db_name = getattr(settings, "MONGODB_DB_NAME", os.getenv("MONGODB_DB_NAME", "grambiz_ai"))
    try:
        db.client = AsyncIOMotorClient(mongo_url)
        db.db = db.client[db_name]
        logger.info(f"Connected to MongoDB database: {db_name}")
    except Exception as e:
        logger.warning(f"Failed to connect to MongoDB ({e}). Falling back to memory storage.")

async def close_mongo_connection():
    """Close MongoDB connection on shutdown."""
    if db.client:
        db.client.close()
        logger.info("Closed MongoDB connection.")

def get_database():
    """Helper to get db instance."""
    return db.db
