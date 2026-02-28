"""SQLAlchemy database models for CV analysis backend."""
from sqlalchemy import Column, Integer, String, Float, Text, DateTime, JSON, Boolean
from sqlalchemy.sql import func
from app.services.database_service import Base


class JDAnalysis(Base):
    """Job Description analysis result storage."""
    __tablename__ = "jd_analysis"
    
    id = Column(Integer, primary_key=True, index=True)
    # Job description content
    job_description_text = Column(Text, nullable=False)
    job_description_file_path = Column(String(500), nullable=True)
    # Reference to CV used (if any) - currently CV storage is in-memory, store as string
    cv_id = Column(String(36), nullable=True)
    # Analysis results
    match_score = Column(Float, nullable=False)
    strengths = Column(JSON, nullable=False)  # List of strings
    gaps = Column(JSON, nullable=False)  # List of strings
    summary = Column(Text, nullable=False)
    skills_match = Column(JSON, nullable=False)  # Dict of skill: score
    recommendations = Column(JSON, nullable=False)  # List of strings
    processing_time_ms = Column(Float, nullable=True)
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    analysis_metadata = Column(JSON, nullable=True)  # Additional metadata as dict
    
    def to_dict(self):
        """Convert model to dictionary for API response."""
        return {
            "id": self.id,
            "job_description_text": self.job_description_text,
            "job_description_file_path": self.job_description_file_path,
            "cv_id": self.cv_id,
            "match_score": self.match_score,
            "strengths": self.strengths,
            "gaps": self.gaps,
            "summary": self.summary,
            "skills_match": self.skills_match,
            "recommendations": self.recommendations,
            "processing_time_ms": self.processing_time_ms,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "analysis_metadata": self.analysis_metadata
        }


# Add more models here as needed (e.g., CV storage table later)