"""API endpoints for Job Match Analysis - FIXED VERSION."""
import logging
import time
from typing import Optional

from fastapi import APIRouter, UploadFile, File, HTTPException, status, Form
from fastapi.responses import JSONResponse

from app.core.config import settings
from app.core.models import (
    HealthResponse,
    ErrorResponse,
    JobDescriptionRequest,
    JobMatchAnalysisResponse,
    CVStorageRequest,
    CVStorageResponse,
    CVAnalysisResponse
)
from app.services.pdf_service import pdf_service
from app.services.deepseek_service import deepseek_service
from app.services.cv_storage_service import cv_storage_service
from app.services.database_service import DatabaseService

logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    # Check database connectivity
    db_healthy = await DatabaseService.health_check()
    db_status = "connected" if db_healthy else "disconnected"
    
    return HealthResponse(
        status="healthy",
        version=settings.VERSION,
        service=settings.PROJECT_NAME,
        database=db_status
    )


@router.post(
    "/analyze-job",
    response_model=JobMatchAnalysisResponse,
    responses={
        400: {"model": ErrorResponse},
        500: {"model": ErrorResponse}
    }
)
async def analyze_job_description(request: JobDescriptionRequest):
    """
    Analyze a job description.
    
    - **job_description**: Job description text (required)
    
    Returns job match analysis including match score, skills match, etc.
    """
    start_time = time.time()
    
    try:
        # Use DeepSeek for job match analysis
        if not deepseek_service.is_available():
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="DeepSeek API service is not available. Please check DEEPSEEK_API_KEY configuration."
            )
        
        logger.info(f"Analyzing job description with DeepSeek (JD length: {len(request.job_description)} chars)")
        
        # Get current CV if available
        cv_data = cv_storage_service.get_current_cv()
        if cv_data:
            logger.info(f"Using stored CV for analysis (CV ID: {cv_data['id']})")
            match_result = deepseek_service.analyze_job_match(cv_data, request.job_description)
            cv_used = True
            cv_id = cv_data['id']
        else:
            logger.info("No CV available, analyzing job description only")
            match_result = deepseek_service.analyze_job_match({}, request.job_description)
            cv_used = False
            cv_id = None
        
        # Convert to response model - FIXED FIELD MAPPING
        processing_time = (time.time() - start_time) * 1000
        
        return JobMatchAnalysisResponse(
            match_score=match_result["match_score"],
            strengths=match_result.get("strengths", []),  # FIXED: was strong_matches
            gaps=match_result.get("gaps", []),  # FIXED: was missing_skills
            summary=match_result.get("summary", "No analysis available."),  # FIXED: was analysis
            skills_match=match_result.get("skills_match", {}),
            recommendations=match_result.get("recommendations", []),
            cv_used=cv_used,
            cv_id=cv_id,
            processing_time_ms=processing_time
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error analyzing job description: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to analyze job description: {str(e)}"
        )


# CV Storage Endpoints
@router.post(
    "/store-cv",
    response_model=CVStorageResponse,
    responses={
        400: {"model": ErrorResponse},
        500: {"model": ErrorResponse}
    }
)
async def store_cv(request: CVStorageRequest):
    """
    Store CV data in memory storage.
    
    - **raw_text**: Raw CV text (required)
    - **contact_info**: Contact information (optional)
    - **skills**: List of skills (optional)
    - **experiences**: List of work experiences (optional)
    - **education**: List of education (optional)
    - **languages**: List of language proficiencies (optional)
    - **tech_stack**: List of technologies (optional)
    - **analysis_result**: CV analysis result (optional)
    - **metadata**: Additional metadata (optional)
    
    Returns storage confirmation with CV ID.
    """
    try:
        logger.info(f"Storing CV data (text length: {len(request.raw_text)} chars)")
        
        # Store CV using the service
        response = cv_storage_service.store_cv(request)
        
        logger.info(f"CV stored successfully with ID: {response.cv_id}")
        return response
        
    except Exception as e:
        logger.error(f"Error storing CV: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to store CV: {str(e)}"
        )


@router.get(
    "/get-cv/{cv_id}",
    responses={
        404: {"model": ErrorResponse},
        500: {"model": ErrorResponse}
    }
)
async def get_cv(cv_id: str):
    """
    Retrieve stored CV data by ID.
    
    - **cv_id**: CV storage ID (required)
    
    Returns the stored CV data.
    """
    try:
        cv_data = cv_storage_service.get_cv(cv_id)
        
        if not cv_data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"CV with ID '{cv_id}' not found"
            )
        
        return cv_data
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving CV: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve CV: {str(e)}"
        )


@router.get(
    "/get-current-cv",
    responses={
        404: {"model": ErrorResponse},
        500: {"model": ErrorResponse}
    }
)
async def get_current_cv():
    """
    Get the current (most recently stored) CV.
    
    Returns the current CV data or 404 if no CV is stored.
    """
    try:
        cv_data = cv_storage_service.get_current_cv()
        
        if not cv_data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No CV data stored yet"
            )
        
        return cv_data
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving current CV: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve current CV: {str(e)}"
        )


@router.get(
    "/has-cv",
    responses={
        500: {"model": ErrorResponse}
    }
)
async def has_cv():
    """
    Check if any CV is stored.
    
    Returns boolean indicating if CV data is available.
    """
    try:
        has_cv = cv_storage_service.has_cv()
        return {"has_cv": has_cv}
        
    except Exception as e:
        logger.error(f"Error checking CV status: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to check CV status: {str(e)}"
        )


@router.delete(
    "/delete-cv/{cv_id}",
    responses={
        404: {"model": ErrorResponse},
        500: {"model": ErrorResponse}
    }
)
async def delete_cv(cv_id: str):
    """
    Delete a stored CV by ID.
    
    - **cv_id**: CV storage ID (required)
    
    Returns success status.
    """
    try:
        deleted = cv_storage_service.delete_cv(cv_id)
        
        if not deleted:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"CV with ID '{cv_id}' not found"
            )
        
        return {"success": True, "message": f"CV '{cv_id}' deleted successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting CV: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete CV: {str(e)}"
        )


@router.post(
    "/clear-all-cvs",
    responses={
        500: {"model": ErrorResponse}
    }
)
async def clear_all_cvs():
    """
    Clear all stored CVs.
    
    Returns count of deleted items.
    """
    try:
        count = cv_storage_service.clear_all()
        return {"success": True, "message": f"Cleared all CVs ({count} items)"}
        
    except Exception as e:
        logger.error(f"Error clearing CVs: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to clear CVs: {str(e)}"
        )


@router.post(
    "/match-job-pdf",
    response_model=JobMatchAnalysisResponse,
    responses={
        400: {"model": ErrorResponse},
        500: {"model": ErrorResponse}
    }
)
async def match_job_pdf(
    file: Optional[UploadFile] = File(None, description="PDF job description file (optional)"),
    job_description: Optional[str] = Form(None, description="Job description text (optional)")
):
    """
    Analyze a job description from either a PDF file or direct text.
    
    - **file**: PDF file containing job description (optional)
    - **job_description**: Job description text (optional)
    
    At least one of file or job_description must be provided.
    
    Returns job match analysis including match score, skills match, etc.
    """
    start_time = time.time()
    
    try:
        # Determine input source
        if file is None and (job_description is None or job_description.strip() == ""):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Either a PDF file or job description text must be provided."
            )
        
        text_to_analyze = ""
        source_info = ""
        
        if file is not None:
            # Validate file
            is_valid, error_msg = pdf_service.validate_file(file)
            if not is_valid:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=error_msg
                )
            
            # Extract text from PDF
            logger.info(f"Extracting text from job description PDF: {file.filename}")
            extracted_text = pdf_service.extract_text(file)
            
            if not extracted_text or extracted_text.strip() == "":
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="No text could be extracted from the PDF. The file may be scanned or image-based."
                )
            
            text_to_analyze = extracted_text
            source_info = f"PDF: {file.filename}"
        else:
            # Use provided job description text
            text_to_analyze = job_description.strip()
            source_info = "text input"
        
        # Use DeepSeek for job match analysis
        if not deepseek_service.is_available():
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="DeepSeek API service is not available. Please check DEEPSEEK_API_KEY configuration."
            )
        
        logger.info(f"Analyzing job match with DeepSeek (source: {source_info}, text length: {len(text_to_analyze)} chars)")
        
        # Get current CV if available
        cv_data = cv_storage_service.get_current_cv()
        if cv_data:
            logger.info(f"Using stored CV for analysis (CV ID: {cv_data['id']})")
            match_result = deepseek_service.analyze_job_match(cv_data, text_to_analyze)
            cv_used = True
            cv_id = cv_data['id']
        else:
            logger.info("No CV available, analyzing job description only")
            match_result = deepseek_service.analyze_job_match({}, text_to_analyze)
            cv_used = False
            cv_id = None
        
        # Convert to response model - FIXED FIELD MAPPING
        processing_time = (time.time() - start_time) * 1000
        
        return JobMatchAnalysisResponse(
            match_score=match_result["match_score"],
            strengths=match_result.get("strengths", []),  # FIXED: was strong_matches
            gaps=match_result.get("gaps", []),  # FIXED: was missing_skills
            summary=match_result.get("summary", "No analysis available."),  # FIXED: was analysis
            skills_match=match_result.get("skills_match", {}),
            recommendations=match_result.get("recommendations", []),
            cv_used=cv_used,
            cv_id=cv_id,
            processing_time_ms=processing_time
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error analyzing job description: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to analyze job description: {str(e)}"
        )