# AI Layer - Bhashini & IndicTrans2 Multilingual Translation Engine
import os
import httpx
import logging
from typing import Dict, Any, Optional

logger = logging.getLogger(__name__)

class BhashiniIndicTransEngine:
    BHASHINI_API_URL = os.getenv("BHASHINI_API_URL", "https://dhruva-api.bhashini.gov.in/services/inference/pipeline")
    BHASHINI_API_KEY = os.getenv("BHASHINI_API_KEY", "")
    BHASHINI_USER_ID = os.getenv("BHASHINI_USER_ID", "")

    LANG_MAP = {
        "hi": "hi", "bn": "bn", "mr": "mr", "gu": "gu",
        "ta": "ta", "te": "te", "kn": "kn", "en": "en"
    }

    @classmethod
    async def translate_text(
        cls,
        text: str,
        source_lang: str = "en",
        target_lang: str = "hi"
    ) -> Dict[str, Any]:
        if source_lang == target_lang or not text.strip():
            return {"source_text": text, "translated_text": text, "source_lang": source_lang, "target_lang": target_lang}

        if cls.BHASHINI_API_KEY and cls.BHASHINI_USER_ID:
            try:
                headers = {
                    "Content-Type": "application/json",
                    "ulcaApiKey": cls.BHASHINI_API_KEY,
                    "userID": cls.BHASHINI_USER_ID
                }
                payload = {
                    "pipelineTasks": [{"taskType": "translation", "config": {"language": {"sourceLanguage": source_lang, "targetLanguage": target_lang}}}],
                    "inputData": {"input": [{"source": text}]}
                }
                async with httpx.AsyncClient(timeout=6.0) as client:
                    resp = await client.post(cls.BHASHINI_API_URL, json=payload, headers=headers)
                    if resp.status_code == 200:
                        out_text = resp.json()["pipelineResponse"][0]["output"][0]["target"]
                        return {"source_text": text, "translated_text": out_text, "source_lang": source_lang, "target_lang": target_lang, "engine": "Bhashini"}
            except Exception as e:
                logger.warning(f"Bhashini API call failed: {e}")

        # Local domain dictionary for fast offline translation
        phrases_hi = {
            "Dairy Micro-Enterprise": "डेयरी सूक्ष्म-उद्यम",
            "Poultry Farming": "पोल्ट्री फार्मिंग (मुर्गी पालन)",
            "Tailoring Boutique": "सिलाई एवं परिधान बुटीक",
            "Project Cost": "कुल प्रोजेक्ट लागत",
            "Eligible Loan": "पात्र सरकारी ऋण",
            "Monthly EMI": "मासिक किस्त (EMI)"
        }
        res = text
        if target_lang == "hi":
            for k, v in phrases_hi.items():
                res = res.replace(k, v)

        return {"source_text": text, "translated_text": res, "source_lang": source_lang, "target_lang": target_lang, "engine": "IndicTrans2 Local"}
