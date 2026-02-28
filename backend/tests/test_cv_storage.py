"""Tests for CV storage service."""
import pytest
from app.services.cv_storage_service import cv_storage_service
from app.core.models import CVStorageRequest


def test_store_and_get_cv():
    """Test storing and retrieving a CV."""
    # Clear any existing data
    cv_storage_service.clear_all()
    
    # Create a CV request with proper model objects
    from app.core.models import Skill, Experience, Education
    
    request = CVStorageRequest(
        raw_text="Sample CV text",
        skills=[
            Skill(name="Python", category="Programming"),
            Skill(name="FastAPI", category="Framework")
        ],
        experiences=[
            Experience(
                title="Software Engineer",
                company="Company",
                description="Worked on backend systems"
            )
        ],
        education=[
            Education(
                degree="BS",
                institution="University",
                field_of_study="Computer Science"
            )
        ]
    )
    
    # Store CV
    response = cv_storage_service.store_cv(request)
    assert response.cv_id is not None
    assert response.success is True
    
    # Retrieve CV
    cv_data = cv_storage_service.get_cv(response.cv_id)
    assert cv_data is not None
    assert cv_data["raw_text"] == "Sample CV text"
    # Skills are stored as dicts in the service
    skill_names = [skill["name"] for skill in cv_data["skills"]]
    assert "Python" in skill_names
    assert "FastAPI" in skill_names


def test_get_current_cv():
    """Test getting the current (most recent) CV."""
    cv_storage_service.clear_all()
    
    # Store first CV
    request1 = CVStorageRequest(raw_text="First CV")
    response1 = cv_storage_service.store_cv(request1)
    
    # Store second CV
    request2 = CVStorageRequest(raw_text="Second CV")
    response2 = cv_storage_service.store_cv(request2)
    
    # Current CV should be the second one
    current_cv = cv_storage_service.get_current_cv()
    assert current_cv["raw_text"] == "Second CV"
    assert current_cv["id"] == response2.cv_id


def test_has_cv():
    """Test checking if CV exists."""
    cv_storage_service.clear_all()
    
    # Initially no CV
    assert cv_storage_service.has_cv() is False
    
    # Store a CV
    request = CVStorageRequest(raw_text="Test CV")
    cv_storage_service.store_cv(request)
    
    # Now should have CV
    assert cv_storage_service.has_cv() is True


def test_delete_cv():
    """Test deleting a CV."""
    cv_storage_service.clear_all()
    
    # Store a CV
    request = CVStorageRequest(raw_text="CV to delete")
    response = cv_storage_service.store_cv(request)
    cv_id = response.cv_id
    
    # Verify it exists
    assert cv_storage_service.get_cv(cv_id) is not None
    
    # Delete it
    deleted = cv_storage_service.delete_cv(cv_id)
    assert deleted is True
    
    # Verify it's gone
    assert cv_storage_service.get_cv(cv_id) is None


def test_clear_all():
    """Test clearing all CVs."""
    # Store multiple CVs
    for i in range(3):
        request = CVStorageRequest(raw_text=f"CV {i}")
        cv_storage_service.store_cv(request)
    
    # Verify we have CVs
    assert cv_storage_service.has_cv() is True
    
    # Clear all
    count = cv_storage_service.clear_all()
    assert count == 3
    
    # Verify no CVs remain
    assert cv_storage_service.has_cv() is False