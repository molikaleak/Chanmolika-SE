"""FastAPI application entry point."""
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.services.pdf_service import pdf_service
from app.services.cv_storage_service import cv_storage_service
from app.services.database_service import DatabaseService, create_tables
from app.core.models import CVStorageRequest
from app.core.db_models import JDAnalysis  # Import model to register with Base
from app.core.config import settings

from app.core.config import settings
from app.api.endpoints import router as api_router

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Backend service for CV analysis using Gemini API",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router
app.include_router(api_router, prefix=settings.API_V1_PREFIX)

@app.on_event("startup")
async def startup_event():
    """Initialize services on startup."""
    # Initialize database
    logger.info("🔧 Initializing database...")
    await DatabaseService.connect()
    create_tables()
    logger.info("✅ Database initialized")
    
    # Load default CV
    await load_default_cv()

async def load_default_cv():
    cv_path = settings.DEFAULT_CV_PATH

    if not cv_path.exists():
        logger.error(f"❌ Default CV not found: {cv_path}")
        return

    logger.info(f"📄 Loading default CV from {cv_path}")

    with open(cv_path, "rb") as f:
        raw_text = pdf_service.extract_text_from_bytes(f.read())

    request = CVStorageRequest(
        raw_text=raw_text,
        skills=[],        # optional: enrich later
        experiences=[],
        education=[]
    )

    response = cv_storage_service.store_cv(request)

    logger.info(f"✅ Default CV loaded and stored. CV ID: {response.cv_id}")

@app.get("/")
async def root():
    """Root endpoint with service information."""
    return {
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "docs": "/docs",
        "health_check": "/api/health"
    }


@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Global exception handler."""
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "detail": "Internal server error",
            "error_code": "INTERNAL_SERVER_ERROR"
        }
    )


if __name__ == "__main__":
    import uvicorn
    
    logger.info(f"Starting {settings.PROJECT_NAME} v{settings.VERSION}")
    logger.info(f"Docs available at http://localhost:8000/docs")
    
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )