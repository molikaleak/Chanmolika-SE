"""Configuration settings for the CV analysis service."""
import os
from typing import Optional, List, Union
from pydantic_settings import BaseSettings
from pydantic import field_validator
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent.parent


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # API
    API_V1_PREFIX: str = "/api"
    PROJECT_NAME: str = "CV Analysis Backend"
    VERSION: str = "1.0.0"
    
    # Gemini API (kept for backward compatibility)
    GEMINI_API_KEY: Optional[str] = None
    GEMINI_MODEL: str = "gemini-1.5-flash"
    
    # DeepSeek API
    DEEPSEEK_API_KEY: Optional[str] = None
    DEEPSEEK_MODEL: str = "deepseek-chat"
    DEEPSEEK_BASE_URL: str = "https://api.deepseek.com"
    
    # File upload
    MAX_UPLOAD_SIZE_MB: int = 30
    ALLOWED_EXTENSIONS: set = {".pdf"}
    
    # Default CV path
    DEFAULT_CV_PATH: Path = BASE_DIR / "cv.pdf"
    
    # CORS - can be comma-separated string or list
    CORS_ORIGINS: Union[str, List[str]] = "http://localhost:3000,http://localhost:5173"
    
    # Database
    DATABASE_URL: str = "sqlite:///./cv_analysis.db"
    
    @field_validator('CORS_ORIGINS', mode='after')
    @classmethod
    def parse_cors_origins(cls, v):
        if isinstance(v, str):
            # Split by comma and strip whitespace
            return [origin.strip() for origin in v.split(',') if origin.strip()]
        return v
    
    class Config:
        env_file = ".env"
        case_sensitive = True


def get_settings() -> Settings:
    """Get application settings."""
    return Settings()


settings = get_settings()