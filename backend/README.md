# JD Analysis Backend Service

A FastAPI-based backend service for analyzing JDs/resumes using Google's Deepseek AI. Extracts text from PDF JDs, analyzes content with DeepSeek API, and returns structured insights including skills, experience, education, and overall assessment.

## Features

- **PDF Text Extraction**: Extract text from PDF CVs using pdfplumber
- **AI-Powered Analysis**: Analyze CV content using Google's Gemini API
- **Structured Output**: Returns skills, experience, education, and assessment in JSON format
- **RESTful API**: FastAPI endpoints with OpenAPI documentation
- **CORS Support**: Configured for frontend integration
- **Error Handling**: Comprehensive error handling and validation
- **Health Checks**: Monitoring endpoint for service health

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check endpoint |
| POST | `/api/analyze-cv` | Analyze CV PDF file |
| POST | `/api/analyze-text` | Analyze raw CV text |
| POST | `/api/upload` | Validate PDF file upload |

### Request/Response Examples

**Analyze CV PDF:**
```bash
curl -X POST "http://localhost:8000/api/analyze-cv" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@resume.pdf"
```

**Response:**
```json
{
  "extracted_text": "...",
  "skills": [
    {
      "name": "Python",
      "category": "Programming",
      "confidence": 0.9,
      "experience_years": 3.5
    }
  ],
  "experiences": [
    {
      "title": "Software Engineer",
      "company": "Tech Corp",
      "duration": "2020-2023",
      "description": "Developed web applications"
    }
  ],
  "education": [
    {
      "degree": "Bachelor of Science",
      "institution": "University of Tech",
      "field_of_study": "Computer Science",
      "graduation_year": 2020
    }
  ],
  "overall_assessment": "Candidate has strong technical skills...",
  "metadata": {...},
  "processing_time_ms": 1250.5
}
```

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI application
│   ├── api/
│   │   ├── __init__.py
│   │   └── endpoints.py        # API endpoints
│   ├── services/
│   │   ├── __init__.py
│   │   ├── pdf_service.py      # PDF text extraction
│   │   └── gemini_service.py   # Gemini API integration
│   └── core/
│       ├── __init__.py
│       ├── config.py           # Configuration settings
│       └── models.py           # Pydantic models
├── requirements.txt            # Python dependencies
├── .env.example               # Environment variables template
├── .gitignore
└── README.md
```

## Installation

### Prerequisites

- Python 3.9+
- Google Gemini API key (get from [Google AI Studio](https://makersuite.google.com/app/apikey))

### Setup

1. **Clone and navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env and add your Gemini API key
   ```

5. **Run the server:**
   ```bash
   python -m app.main
   ```
   Or using uvicorn directly:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

6. **Access the API:**
   - API: http://localhost:8000
   - Documentation: http://localhost:8000/docs
   - Health check: http://localhost:8000/api/health

## Configuration

Environment variables in `.env`:

| Variable | Description | Default |
|----------|-------------|---------|
| `GEMINI_API_KEY` | Google Gemini API key | Required |
| `GEMINI_MODEL` | Gemini model to use | `gemini-1.5-pro` |
| `API_V1_PREFIX` | API prefix | `/api` |
| `MAX_UPLOAD_SIZE_MB` | Max PDF file size | `10` |
| `CORS_ORIGINS` | Allowed origins (comma-separated) | `http://localhost:3000,http://localhost:5173` |

## Development

### Running Tests
```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests
pytest
```

### Code Style
- Use Black for formatting: `black app/`
- Use isort for imports: `isort app/`
- Type hints are encouraged

### Adding New Features
1. Add new models in `app/core/models.py`
2. Implement services in `app/services/`
3. Add endpoints in `app/api/endpoints.py`
4. Update configuration in `app/core/config.py`

## Deployment

### Production Considerations
1. Set proper CORS origins
2. Use environment variables for secrets
3. Implement rate limiting
4. Add authentication/authorization
5. Use production-grade ASGI server (e.g., gunicorn with uvicorn workers)

### Docker Deployment
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Error Handling

The service includes comprehensive error handling:

- **400 Bad Request**: Invalid file format, empty text, validation errors
- **413 Payload Too Large**: File exceeds size limit
- **503 Service Unavailable**: Gemini API not configured or unavailable
- **500 Internal Server Error**: Unexpected server errors

All errors return structured JSON responses with error details.

## Limitations

- PDF text extraction works best with text-based PDFs (not scanned images)
- Gemini API has rate limits and usage costs
- Analysis quality depends on CV formatting and language
- Maximum file size: 10MB by default

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes with tests
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
1. Check the API documentation at `/docs`
2. Review error messages in logs
3. Ensure Gemini API key is valid
4. Verify PDF file is text-based (not scanned)