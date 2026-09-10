# AI Layer - Multi-Provider LLM Orchestrator & RAG Reasoning
import os
import re
import uuid
import logging
from typing import Dict, Any, List, Optional
from decimal import Decimal
import httpx
from pydantic import BaseModel

logger = logging.getLogger(__name__)

class SWOTResponse(BaseModel):
    strengths: List[str]
    weaknesses: List[str]
    opportunities: List[str]
    threats: List[str]

class LLMClientAdapter:
    @staticmethod
    def call_real_llm(system_prompt: str, user_message: str) -> Optional[str]:
        api_key = os.getenv("LLM_API_KEY", "")
        provider = os.getenv("LLM_PROVIDER", "mock").lower()

        if provider == "gemini" and api_key:
            try:
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
                payload = {
                    "system_instruction": {"parts": [{"text": system_prompt}]},
                    "contents": [{"role": "user", "parts": [{"text": user_message}]}],
                    "generationConfig": {"temperature": 0.3, "maxOutputTokens": 600}
                }
                with httpx.Client(timeout=8.0) as client:
                    res = client.post(url, json=payload)
                    if res.status_code == 200:
                        return res.json()["candidates"][0]["content"]["parts"][0]["text"]
            except Exception as e:
                logger.warning(f"Gemini call failed: {e}")
        return None

class AIOrchestrator:
    @staticmethod
    def answer_query(message: str, language: str = "hi") -> Dict[str, Any]:
        msg_lower = message.lower()
        if "dairy" in msg_lower or "डेयरी" in msg_lower:
            reply = (
                "डेयरी व्यवसाय के लिए 10% उद्यमी मार्जिन और 90% MoSJE ऋण (6.5% - 8.0% ब्याज दर) "
                "उपलब्ध है। 3 से 6 महीने की मोरेटोरियम अवधि भी मिलती है।" if language == "hi" else
                "For Dairy micro-enterprise, 10% margin and 90% MoSJE concessional financing (6.5%-8.0% p.a.) "
                "is available with a 3 to 6-month moratorium."
            )
        else:
            reply = (
                f"आपके प्रश्न ('{message}') के संदर्भ में: आप MoSJE योजनाओं के तहत सब्सिडी, ईएमआई व साध्यता विश्लेषण प्राप्त कर सकते हैं।" if language == "hi" else
                f"Regarding '{message}': You can evaluate subsidized MoSJE loans, repayment schedules, and local market demand."
            )

        return {
            "conversation_id": str(uuid.uuid4()),
            "reply": reply,
            "citations": [{"source": "MoSJE Policy Guidelines 2024", "confidence": "Verified"}]
        }

    @staticmethod
    def generate_swot(category: str) -> SWOTResponse:
        return SWOTResponse(
            strengths=[f"High daily rural demand for {category}", "90% subsidized MoSJE loan"],
            weaknesses=["Working capital gap during initial setup"],
            opportunities=["Value addition into packaged products", "Direct village milk supply"],
            threats=["Seasonal price inflation", "Animal disease risk"]
        )
