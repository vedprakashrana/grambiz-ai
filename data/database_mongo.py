# Data Layer - MongoDB Async Connection Client (Motor)
import os
import logging
from typing import Optional
from motor.motor_asyncio import AsyncIOMotorClient

logger = logging.getLogger(__name__)

class MongoDB:
    client: Optional[AsyncIOMotorClient] = None
    db = None

db = MongoDB()

async def connect_to_mongo():
    mongo_url = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
    db_name = os.getenv("MONGODB_DB_NAME", "grambiz_ai")
    try:
        db.client = AsyncIOMotorClient(mongo_url)
        db.db = db.client[db_name]
        logger.info(f"Connected to MongoDB database: {db_name}")
    except Exception as e:
        logger.warning(f"MongoDB connection failed: {e}")

async def close_mongo_connection():
    if db.client:
        db.client.close()

def get_database():
    return db.db
