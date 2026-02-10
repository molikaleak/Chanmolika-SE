"""DeepSeek API service for Job Match Analysis."""
import json
import logging
import time
from typing import Dict, Any, Optional
import openai

from app.core.config import settings

logger = logging.getLogger(__name__)


class DeepSeekService:
    """Service for interacting with DeepSeek API for job match analysis."""
    
    def __init__(self):
        self.api_key = settings.DEEPSEEK_API_KEY
        self.model_name = settings.DEEPSEEK_MODEL
        self.base_url = settings.DEEPSEEK_BASE_URL
        self.client = None
        self._initialize()
    
    def _initialize(self):
        """Initialize DeepSeek API client."""
        if not self.api_key:
            logger.warning("DEEPSEEK_API_KEY not set. DeepSeek service will not be available.")
            return
        
        try:
            self.client = openai.OpenAI(
                api_key=self.api_key,
                base_url=self.base_url
            )
            logger.info(f"DeepSeek API initialized with model: {self.model_name}")
        except Exception as e:
            logger.error(f"Failed to initialize DeepSeek API: {e}")
            raise
    
    def is_available(self) -> bool:
        """Check if DeepSeek API is available."""
        return self.client is not None and self.api_key is not None
    
    def analyze_job_match(self, cv_data: Dict[str, Any], job_description: str) -> Dict[str, Any]:
        """
        Analyze job match between CV data and job description using DeepSeek API.
        
        Returns structured match analysis including score, strengths, gaps, etc.
        """
        if not self.is_available():
            raise RuntimeError("DeepSeek API is not available. Please set DEEPSEEK_API_KEY.")
        
        start_time = time.time()
        
        try:
            # Build prompt for job match analysis
            prompt = self._build_job_match_prompt(cv_data, job_description)
            
            # Generate response
            response = self.client.chat.completions.create(
                model=self.model_name,
                messages=[
                    {"role": "system", "content": "You are a professional job match analyst. Analyze the job description and return valid JSON with match analysis."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.1,
                response_format={"type": "json_object"}
            )
            
            # Parse response
            response_text = response.choices[0].message.content
            match_result = self._parse_job_match_response(response_text)
            
            # Calculate processing time
            processing_time_ms = (time.time() - start_time) * 1000
            
            # Add processing time to result
            match_result["processing_time_ms"] = processing_time_ms
            
            return match_result
            
        except Exception as e:
            logger.error(f"Error analyzing job match with DeepSeek: {e}")
            raise RuntimeError(f"Job match analysis failed: {str(e)}")
    
    def _build_job_match_prompt(self, cv_data: Dict[str, Any], job_description: str) -> str:
        """Build prompt for job match analysis."""
        skills = [s["name"] for s in cv_data.get("skills", [])]

        return f"""
You are a professional recruitment analyst.

STRICT RULES:
- The candidate CV below is the ONLY source of truth.
- You MUST compare the job description against this CV.
- Do NOT assume, infer, or hallucinate skills.
- If a skill is not present in the CV, mark it as missing.
- If CV information is limited, say so explicitly.

CANDIDATE CV (AUTHORITATIVE):
Skills:
{", ".join(skills) if skills else "No explicit skills listed in CV text"}

Experience Count: {len(cv_data.get("experiences", []))}
Education Count: {len(cv_data.get("education", []))}

JOB DESCRIPTION:
{job_description[:6000]}

Return ONLY valid JSON:
{{
  "match_score": number,
  "strong_matches": string[],
  "missing_skills": string[],
  "analysis": string
}}
"""

    def _parse_job_match_response(self, response_text: str) -> Dict[str, Any]:
        """Parse DeepSeek response for job match analysis."""
        try:
            # Extract JSON from response
            text = response_text.strip()
            
            # Remove markdown code blocks if present
            if "```json" in text:
                text = text.split("```json")[1].split("```")[0].strip()
            elif "```" in text:
                text = text.split("```")[1].split("```")[0].strip()
            
            # Parse JSON
            data = json.loads(text)
            
            # Validate and normalize structure
            result = {
                "match_score": float(data.get("match_score", 0.0)),
                "strengths": data.get("strengths", []),
                "gaps": data.get("gaps", []),
                "summary": data.get("summary", "No analysis provided."),
                "skills_match": data.get("skills_match", {}),
                "recommendations": data.get("recommendations", [])
            }
            
            # Ensure match_score is within bounds
            result["match_score"] = max(0.0, min(100.0, result["match_score"]))
            
            return result
            
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse DeepSeek response as JSON: {e}")
            logger.error(f"Response text: {response_text[:500]}")
            raise RuntimeError(f"Invalid JSON response from DeepSeek: {str(e)}")
        except Exception as e:
            logger.error(f"Error parsing DeepSeek response: {e}")
            raise RuntimeError(f"Failed to parse DeepSeek response: {str(e)}")


# Global instance
deepseek_service = DeepSeekService()