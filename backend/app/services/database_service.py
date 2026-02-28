"""Database service for CV analysis backend."""
import logging
from typing import Optional
from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from databases import Database
from app.core.config import settings

logger = logging.getLogger(__name__)

# SQLAlchemy setup
engine = create_engine(
    settings.DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in settings.DATABASE_URL else {}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Async database for FastAPI
database = Database(settings.DATABASE_URL)

class DatabaseService:
    """Service for database operations."""
    
    @staticmethod
    async def connect():
        """Connect to the database."""
        try:
            await database.connect()
            logger.info("Database connected successfully")
            return True
        except Exception as e:
            logger.error(f"Database connection failed: {e}")
            return False
    
    @staticmethod
    async def disconnect():
        """Disconnect from the database."""
        try:
            await database.disconnect()
            logger.info("Database disconnected successfully")
        except Exception as e:
            logger.error(f"Database disconnection failed: {e}")
    
    @staticmethod
    async def health_check() -> bool:
        """Check database health by executing a simple query."""
        try:
            # For SQLite, we can execute a simple query
            if "sqlite" in settings.DATABASE_URL:
                async with database.connection() as connection:
                    await connection.execute(text("SELECT 1"))
            else:
                # For other databases
                async with database.connection() as connection:
                    await connection.execute(text("SELECT 1"))
            return True
        except Exception as e:
            logger.error(f"Database health check failed: {e}")
            return False
    
    @staticmethod
    def get_db():
        """Get database session for dependency injection."""
        db = SessionLocal()
        try:
            yield db
        finally:
            db.close()

# Create tables on startup
def create_tables():
    """Create database tables."""
    Base.metadata.create_all(bind=engine)
    logger.info("Database tables created (if not exist)")