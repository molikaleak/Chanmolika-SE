"""PDF text extraction service."""
import io
import logging
from typing import Optional, Tuple
import pdfplumber
from fastapi import UploadFile

from app.core.config import settings

logger = logging.getLogger(__name__)


class PDFService:
    """Service for extracting text from PDF files."""
    
    def __init__(self):
        self.allowed_extensions = settings.ALLOWED_EXTENSIONS
        self.max_size_mb = settings.MAX_UPLOAD_SIZE_MB
    
    def validate_file(self, file: UploadFile) -> Tuple[bool, Optional[str]]:
        """Validate uploaded file."""
        # Check file extension
        filename = file.filename
        if not filename:
            return False, "No filename provided"
        
        if not any(filename.lower().endswith(ext) for ext in self.allowed_extensions):
            return False, f"File type not allowed. Allowed: {', '.join(self.allowed_extensions)}"
        
        # Check file size (read first few bytes to get size)
        file.file.seek(0, 2)  # Seek to end
        size = file.file.tell()
        file.file.seek(0)  # Reset pointer
        
        max_size_bytes = self.max_size_mb * 1024 * 1024
        if size > max_size_bytes:
            return False, f"File too large. Max size: {self.max_size_mb}MB"
        
        return True, None
    
    def extract_text(self, file: UploadFile) -> str:
        """Extract text from PDF file."""
        try:
            # Read file content
            content = file.file.read()
            
            # Use pdfplumber to extract text
            with pdfplumber.open(io.BytesIO(content)) as pdf:
                text_parts = []
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text_parts.append(page_text)
                
                full_text = "\n".join(text_parts)
                
                if not full_text.strip():
                    logger.warning("No text extracted from PDF")
                    return "No text could be extracted from the PDF. The file may be scanned or image-based."
                
                return full_text
                
        except pdfplumber.PDFSyntaxError as e:
            logger.error(f"Invalid PDF file: {e}")
            raise ValueError(f"Invalid PDF file: {str(e)}")
        except Exception as e:
            logger.error(f"Error extracting text from PDF: {e}")
            raise RuntimeError(f"Failed to extract text: {str(e)}")
    
    def extract_text_from_bytes(self, pdf_bytes: bytes) -> str:
        """Extract text from PDF bytes."""
        try:
            with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
                text_parts = []
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text_parts.append(page_text)
                
                return "\n".join(text_parts)
        except Exception as e:
            logger.error(f"Error extracting text from bytes: {e}")
            raise


# Singleton instance
pdf_service = PDFService()