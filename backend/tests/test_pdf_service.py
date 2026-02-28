"""Tests for PDF service."""
import pytest
from unittest.mock import Mock, patch, MagicMock
from fastapi import UploadFile
import io

from app.services.pdf_service import pdf_service


def test_extract_text_from_bytes():
    """Test text extraction from bytes."""
    # Mock pdfplumber
    mock_pdf = Mock()
    mock_pdf.pages = [Mock(extract_text=lambda: "Page 1 text")]
    
    with patch("app.services.pdf_service.pdfplumber.open") as mock_open:
        mock_open.return_value.__enter__.return_value = mock_pdf
        
        result = pdf_service.extract_text_from_bytes(b"fake pdf bytes")
        assert result == "Page 1 text"


def test_extract_text():
    """Test text extraction from UploadFile."""
    # Create a mock UploadFile
    mock_file = Mock(spec=UploadFile)
    mock_file.file = io.BytesIO(b"fake pdf content")
    
    # Mock pdfplumber
    mock_pdf = Mock()
    mock_pdf.pages = [Mock(extract_text=lambda: "Extracted text")]
    
    with patch("app.services.pdf_service.pdfplumber.open") as mock_open:
        mock_open.return_value.__enter__.return_value = mock_pdf
        
        result = pdf_service.extract_text(mock_file)
        assert result == "Extracted text"


def test_validate_file_valid():
    """Test file validation with valid PDF."""
    mock_file = Mock(spec=UploadFile)
    mock_file.filename = "test.pdf"
    mock_file.content_type = "application/pdf"
    mock_file.size = 1024  # 1KB
    # Add file attribute with seek method
    mock_file.file = Mock()
    mock_file.file.seek = Mock()
    mock_file.file.tell = Mock(return_value=1024)
    
    is_valid, message = pdf_service.validate_file(mock_file)
    assert is_valid is True
    assert "valid" in message.lower()


def test_validate_file_invalid_type():
    """Test file validation with invalid file type."""
    mock_file = Mock(spec=UploadFile)
    mock_file.filename = "test.txt"
    mock_file.content_type = "text/plain"
    
    is_valid, message = pdf_service.validate_file(mock_file)
    assert is_valid is False
    assert "pdf" in message.lower()


def test_validate_file_too_large():
    """Test file validation with file too large."""
    mock_file = Mock(spec=UploadFile)
    mock_file.filename = "test.pdf"
    mock_file.content_type = "application/pdf"
    mock_file.size = 11 * 1024 * 1024  # 11MB
    # Add file attribute with seek method
    mock_file.file = Mock()
    mock_file.file.seek = Mock()
    mock_file.file.tell = Mock(return_value=11 * 1024 * 1024)
    
    is_valid, message = pdf_service.validate_file(mock_file)
    assert is_valid is False
    assert "size" in message.lower() or "large" in message.lower()