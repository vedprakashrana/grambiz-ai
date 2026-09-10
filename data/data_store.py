# Data Layer - Unified Master Data Store (Census 2011, LGD & Demographics)
import math
from typing import Dict, Any, List, Optional

LOCATION_STORE: Dict[str, Dict[str, Any]] = {
    "IN-UP-MEE-HAS-GANESHPUR": {
        "id": "IN-UP-MEE-HAS-GANESHPUR",
        "name": "Ganeshpur",
        "level": "Village",
        "state": "Uttar Pradesh",
        "district": "Meerut",
        "block": "Hastinapur",
        "village": "Ganeshpur",
        "pincode": "250404",
        "latitude": 29.1712,
        "longitude": 77.9984,
        "census_code_2011": "119842",
        "lgd_code": "246810",
        "demographics_2011": {
            "source": "Census India 2011 (Village Directory)",
            "data_year": 2011,
            "confidence": "Verified",
            "total_population": 3840,
            "households": 620,
            "literacy_rate_pct": 68.4
        }
    }
}

class UnifiedDataPlatform:
    @staticmethod
    def get_location_by_id(location_id: str) -> Optional[Dict[str, Any]]:
        return LOCATION_STORE.get(location_id)

    @staticmethod
    def search_location(query: str) -> List[Dict[str, Any]]:
        q = query.lower().strip()
        return [loc for loc in LOCATION_STORE.values() if q in loc["name"].lower() or q in loc["district"].lower()]

    @staticmethod
    def get_demographics(location_id: str) -> Optional[Dict[str, Any]]:
        loc = LOCATION_STORE.get(location_id)
        return loc.get("demographics_2011") if loc else None
