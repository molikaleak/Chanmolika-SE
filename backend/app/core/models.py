"""Pydantic models for Job Match Analysis API."""
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from datetime import datetime


class HealthResponse(BaseModel):
    """Health check response."""
    status: str = "healthy"
    version: str
    service: str


class JobDescriptionRequest(BaseModel):
    """Request for job description analysis."""
    job_description: str = Field(..., description="Job description text")


class JobMatchAnalysisResponse(BaseModel):
    """Response for job match analysis."""
    match_score: float = Field(..., ge=0.0, le=100.0, description="Overall match score (0-100)")
    skills_match: Dict[str, float] = Field(..., description="Match scores for individual skills")
    missing_skills: List[str] = Field(..., description="Skills required but not found")
    strong_matches: List[str] = Field(..., description="Skills that are strong matches")
    experience_gap: Optional[float] = Field(None, description="Years of experience gap")
    recommendations: List[str] = Field(..., description="Recommendations for improving match")
    analysis: str = Field(..., description="Detailed analysis text")
    cv_used: Optional[bool] = Field(None, description="Whether CV data was used in analysis")
    cv_id: Optional[str] = Field(None, description="ID of CV used for analysis")
    processing_time_ms: Optional[float] = None


class ErrorResponse(BaseModel):
    """Error response model."""
    detail: str
    error_code: Optional[str] = None


# CV Storage Models
class ContactInfo(BaseModel):
    """Contact information model."""
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    portfolio: Optional[str] = None


class Skill(BaseModel):
    """Skill model."""
    name: str
    category: Optional[str] = None
    level: Optional[str] = None
    years_experience: Optional[float] = None


class Experience(BaseModel):
    """Work experience model."""
    title: str
    company: str
    location: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    current: bool = False
    description: Optional[str] = None
    skills: List[str] = []


class Education(BaseModel):
    """Education model."""
    degree: str
    institution: str
    field_of_study: Optional[str] = None
    graduation_year: Optional[int] = None
    gpa: Optional[float] = None


class LanguageProficiency(BaseModel):
    """Language proficiency model."""
    language: str
    proficiency: str  # e.g., "Native", "Fluent", "Intermediate", "Basic"


class CVAnalysisResponse(BaseModel):
    """CV analysis response model."""
    raw_text: str
    contact_info: Optional[ContactInfo] = None
    skills: List[Skill] = []
    experiences: List[Experience] = []
    education: List[Education] = []
    languages: List[LanguageProficiency] = []
    tech_stack: List[str] = []
    analysis_result: Optional[Dict[str, Any]] = None
    metadata: Optional[Dict[str, Any]] = None


class CVStorageRequest(BaseModel):
    """Request for storing CV data."""
    raw_text: str
    contact_info: Optional[ContactInfo] = None
    skills: List[Skill] = []
    experiences: List[Experience] = []
    education: List[Education] = []
    languages: List[LanguageProficiency] = []
    tech_stack: List[str] = []
    analysis_result: Optional[CVAnalysisResponse] = None
    metadata: Optional[Dict[str, Any]] = None


class CVStorageResponse(BaseModel):
    """Response for CV storage operation."""
    cv_id: str
    stored_at: datetime
    message: str
    has_analysis: bool = False
    summary: Dict[str, Any]