"""Basic API tests for the backend service."""
import pytest
from fastapi.testclient import TestClient
from unittest.mock import Mock, patch

from app.main import app


@pytest.fixture
def client():
    """Test client fixture."""
    return TestClient(app)


def test_health_check(client):
    """Test health check endpoint."""
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "version" in data
    assert "service" in data


def test_root_endpoint(client):
    """Test root endpoint."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "service" in data
    assert "version" in data
    assert "docs" in data
    assert "health_check" in data


def test_has_cv_no_cv(client):
    """Test has_cv endpoint when no CV is stored."""
    response = client.get("/api/has-cv")
    assert response.status_code == 200
    data = response.json()
    assert "has_cv" in data
    # Initially should be False
    assert data["has_cv"] is False


@patch("app.api.endpoints.cv_storage_service")
def test_store_cv(mock_cv_service, client):
    """Test storing a CV."""
    from datetime import datetime
    from app.core.models import CVStorageResponse
    
    # Mock the service response with proper CVStorageResponse object
    mock_response = CVStorageResponse(
        cv_id="test-cv-123",
        stored_at=datetime.now(),
        message="CV stored successfully",
        has_analysis=False,
        summary={}
    )
    mock_cv_service.store_cv.return_value = mock_response
    
    cv_data = {
        "raw_text": "Sample CV text",
        "skills": [],
        "experiences": [],
        "education": []
    }
    
    response = client.post("/api/store-cv", json=cv_data)
    assert response.status_code == 200
    data = response.json()
    assert "cv_id" in data
    assert data["cv_id"] is not None


@patch("app.api.endpoints.deepseek_service")
@patch("app.api.endpoints.cv_storage_service")
def test_analyze_job_description_no_cv(mock_cv_service, mock_deepseek_service, client):
    """Test job description analysis without CV."""
    # Mock services
    mock_cv_service.get_current_cv.return_value = None
    mock_deepseek_service.is_available.return_value = True
    mock_deepseek_service.analyze_job_match.return_value = {
        "match_score": 75.5,
        "strengths": ["Good communication skills"],
        "gaps": ["Missing cloud experience"],
        "summary": "Good match overall",
        "skills_match": {"Python": 90, "FastAPI": 85},
        "recommendations": ["Learn AWS"]
    }
    
    job_data = {"job_description": "Looking for a Python developer with FastAPI experience."}
    
    response = client.post("/api/analyze-job", json=job_data)
    assert response.status_code == 200
    data = response.json()
    assert "match_score" in data
    assert data["cv_used"] is False
    assert data["cv_id"] is None


def test_invalid_endpoint(client):
    """Test invalid endpoint returns 404."""
    response = client.get("/api/nonexistent")
    assert response.status_code == 404