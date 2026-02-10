"""CV storage service for in-memory CV storage."""
import logging
import uuid
from typing import Dict, Optional, List
from datetime import datetime

from app.core.models import (
    CVStorageRequest,
    CVStorageResponse,
    CVAnalysisResponse,
    ContactInfo,
    Skill,
    Experience,
    Education,
    LanguageProficiency
)

logger = logging.getLogger(__name__)


class CVStorageService:
    """Service for storing and retrieving CV data in memory."""
    
    def __init__(self):
        self._storage: Dict[str, dict] = {}
        self._current_cv_id: Optional[str] = None
    
    def store_cv(self, request: CVStorageRequest) -> CVStorageResponse:
        """Store CV data in memory and return storage response."""
        cv_id = str(uuid.uuid4())
        
        # Store the CV data
        cv_data = {
            "id": cv_id,
            "stored_at": datetime.now(),
            "raw_text": request.raw_text,
            "contact_info": request.contact_info.dict() if request.contact_info else None,
            "skills": [skill.dict() for skill in request.skills] if request.skills else [],
            "experiences": [exp.dict() for exp in request.experiences] if request.experiences else [],
            "education": [edu.dict() for edu in request.education] if request.education else [],
            "languages": [lang.dict() for lang in request.languages] if request.languages else [],
            "tech_stack": request.tech_stack or [],
            "analysis_result": request.analysis_result.dict() if request.analysis_result else None,
            "metadata": request.metadata
        }
        
        self._storage[cv_id] = cv_data
        self._current_cv_id = cv_id
        
        logger.info(f"Stored CV with ID: {cv_id}")
        
        # Create summary
        summary = {
            "text_length": len(request.raw_text),
            "skills_count": len(request.skills) if request.skills else 0,
            "experiences_count": len(request.experiences) if request.experiences else 0,
            "education_count": len(request.education) if request.education else 0,
            "has_contact_info": request.contact_info is not None,
            "has_analysis": request.analysis_result is not None
        }
        
        return CVStorageResponse(
            cv_id=cv_id,
            stored_at=cv_data["stored_at"],
            message="CV stored successfully",
            has_analysis=request.analysis_result is not None,
            summary=summary
        )
    
    def get_cv(self, cv_id: Optional[str] = None) -> Optional[dict]:
        """Retrieve CV data by ID, or the current CV if no ID provided."""
        target_id = cv_id or self._current_cv_id
        if not target_id:
            return None
        
        return self._storage.get(target_id)
    
    def get_current_cv(self) -> Optional[dict]:
        """Get the current (most recently stored) CV."""
        if not self._current_cv_id:
            return None
        
        return self._storage.get(self._current_cv_id)
    
    def get_all_cvs(self) -> List[dict]:
        """Get all stored CVs."""
        return list(self._storage.values())
    
    def delete_cv(self, cv_id: str) -> bool:
        """Delete a CV by ID."""
        if cv_id in self._storage:
            del self._storage[cv_id]
            if self._current_cv_id == cv_id:
                self._current_cv_id = None
            logger.info(f"Deleted CV with ID: {cv_id}")
            return True
        return False
    
    def clear_all(self) -> int:
        """Clear all stored CVs and return count of deleted items."""
        count = len(self._storage)
        self._storage.clear()
        self._current_cv_id = None
        logger.info(f"Cleared all CVs ({count} items)")
        return count
    
    def has_cv(self) -> bool:
        """Check if any CV is stored."""
        return self._current_cv_id is not None and self._current_cv_id in self._storage
    
    def get_cv_summary(self, cv_id: Optional[str] = None) -> Optional[dict]:
        """Get a summary of CV data."""
        cv_data = self.get_cv(cv_id)
        if not cv_data:
            return None
        
        return {
            "id": cv_data["id"],
            "stored_at": cv_data["stored_at"],
            "text_length": len(cv_data["raw_text"]),
            "skills_count": len(cv_data["skills"]),
            "experiences_count": len(cv_data["experiences"]),
            "education_count": len(cv_data["education"]),
            "languages_count": len(cv_data["languages"]),
            "tech_stack_count": len(cv_data["tech_stack"]),
            "has_analysis": cv_data["analysis_result"] is not None
        }


# Singleton instance
cv_storage_service = CVStorageService()