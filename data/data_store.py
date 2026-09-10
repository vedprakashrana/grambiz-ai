# Data Layer - Unified Master Data Store (Census 2011, LGD & Demographics)
import math
import os
import csv
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
    },
    "IN-JH-DHN-GOV-PRATAPPUR": {
        "id": "IN-JH-DHN-GOV-PRATAPPUR",
        "name": "Pratappur",
        "level": "Village",
        "state": "Jharkhand",
        "district": "Dhanbad",
        "block": "Govindpur",
        "village": "Pratappur",
        "pincode": "828109",
        "latitude": 23.8340,
        "longitude": 86.5210,
        "census_code_2011": "372101",
        "lgd_code": "153201",
        "demographics_2011": {
            "source": "Census India 2011",
            "data_year": 2011,
            "confidence": "Verified",
            "total_population": 5357,
            "households": 1222,
            "avg_monthly_exp": 4648,
            "literacy_rate_pct": 71.2
        }
    },
    "IN-JH-DHN-BAL-GOPINATHPUR": {
        "id": "IN-JH-DHN-BAL-GOPINATHPUR",
        "name": "Gopinathpur",
        "level": "Village",
        "state": "Jharkhand",
        "district": "Dhanbad",
        "block": "Baliapur",
        "village": "Gopinathpur",
        "pincode": "828201",
        "latitude": 23.7210,
        "longitude": 86.5820,
        "census_code_2011": "372145",
        "lgd_code": "153245",
        "demographics_2011": {
            "source": "Census India 2011",
            "data_year": 2011,
            "confidence": "Verified",
            "total_population": 2219,
            "households": 486,
            "avg_monthly_exp": 3427,
            "literacy_rate_pct": 64.5
        }
    },
    "IN-JH-DHN-GOV-BAHIYAR": {
        "id": "IN-JH-DHN-GOV-BAHIYAR",
        "name": "Bahiyar",
        "level": "Village",
        "state": "Jharkhand",
        "district": "Dhanbad",
        "block": "Govindpur",
        "village": "Bahiyar",
        "pincode": "828109",
        "latitude": 23.8510,
        "longitude": 86.5410,
        "census_code_2011": "372188",
        "lgd_code": "153288",
        "demographics_2011": {
            "source": "Census India 2011",
            "data_year": 2011,
            "confidence": "Verified",
            "total_population": 6005,
            "households": 1472,
            "avg_monthly_exp": 14456,
            "literacy_rate_pct": 74.8
        }
    },
    "IN-JH-DHN-GOV-CHAKRADHARPUR": {
        "id": "IN-JH-DHN-GOV-CHAKRADHARPUR",
        "name": "Chakradharpur",
        "level": "Village",
        "state": "Jharkhand",
        "district": "Dhanbad",
        "block": "Govindpur",
        "village": "Chakradharpur",
        "pincode": "828109",
        "latitude": 23.8110,
        "longitude": 86.4920,
        "census_code_2011": "372199",
        "lgd_code": "153299",
        "demographics_2011": {
            "source": "Census India 2011",
            "data_year": 2011,
            "confidence": "Verified",
            "total_population": 3247,
            "households": 708,
            "avg_monthly_exp": 16770,
            "literacy_rate_pct": 69.1
        }
    },
    "IN-JH-RAN-KAN-SUKURHUTU": {
        "id": "IN-JH-RAN-KAN-SUKURHUTU",
        "name": "Sukurhutu",
        "level": "Village",
        "state": "Jharkhand",
        "district": "Ranchi",
        "block": "Kanke",
        "village": "Sukurhutu",
        "pincode": "834006",
        "latitude": 23.4410,
        "longitude": 85.3210,
        "census_code_2011": "374201",
        "lgd_code": "154201",
        "demographics_2011": {
            "source": "Census India 2011",
            "data_year": 2011,
            "confidence": "Verified",
            "total_population": 4765,
            "households": 971,
            "avg_monthly_exp": 7824,
            "literacy_rate_pct": 76.2
        }
    },
    "IN-JH-RAN-KAN-GUNDHURIA": {
        "id": "IN-JH-RAN-KAN-GUNDHURIA",
        "name": "Gundhuria",
        "level": "Village",
        "state": "Jharkhand",
        "district": "Ranchi",
        "block": "Kanke",
        "village": "Gundhuria",
        "pincode": "834006",
        "latitude": 23.4620,
        "longitude": 85.3450,
        "census_code_2011": "374245",
        "lgd_code": "154245",
        "demographics_2011": {
            "source": "Census India 2011",
            "data_year": 2011,
            "confidence": "Verified",
            "total_population": 5818,
            "households": 1194,
            "avg_monthly_exp": 17171,
            "literacy_rate_pct": 73.5
        }
    },
    "IN-JH-RAN-ITK-GETALSUD": {
        "id": "IN-JH-RAN-ITK-GETALSUD",
        "name": "Getalsud",
        "level": "Village",
        "state": "Jharkhand",
        "district": "Ranchi",
        "block": "Itki",
        "village": "Getalsud",
        "pincode": "835103",
        "latitude": 23.4110,
        "longitude": 85.5520,
        "census_code_2011": "374288",
        "lgd_code": "154288",
        "demographics_2011": {
            "source": "Census India 2011",
            "data_year": 2011,
            "confidence": "Verified",
            "total_population": 6915,
            "households": 1473,
            "avg_monthly_exp": 14925,
            "literacy_rate_pct": 72.8
        }
    },
    "IN-BR-PAT-PHU-ALAMPUR": {
        "id": "IN-BR-PAT-PHU-ALAMPUR",
        "name": "Alampur",
        "level": "Village",
        "state": "Bihar",
        "district": "Patna",
        "block": "Phulwari",
        "village": "Alampur",
        "pincode": "801505",
        "latitude": 25.5610,
        "longitude": 85.0810,
        "census_code_2011": "234101",
        "lgd_code": "112101",
        "demographics_2011": {
            "source": "Census India 2011",
            "data_year": 2011,
            "confidence": "Verified",
            "total_population": 7704,
            "households": 1763,
            "avg_monthly_exp": 8734,
            "literacy_rate_pct": 69.4
        }
    },
    "IN-BR-PAT-PHU-AKORHA": {
        "id": "IN-BR-PAT-PHU-AKORHA",
        "name": "Akorha",
        "level": "Village",
        "state": "Bihar",
        "district": "Patna",
        "block": "Phulwari",
        "village": "Akorha",
        "pincode": "801505",
        "latitude": 25.5780,
        "longitude": 85.0620,
        "census_code_2011": "234122",
        "lgd_code": "112122",
        "demographics_2011": {
            "source": "Census India 2011",
            "data_year": 2011,
            "confidence": "Verified",
            "total_population": 3105,
            "households": 823,
            "avg_monthly_exp": 3535,
            "literacy_rate_pct": 65.8
        }
    },
    "IN-BR-PAT-PHU-AKBARPUR": {
        "id": "IN-BR-PAT-PHU-AKBARPUR",
        "name": "Akbarpur",
        "level": "Village",
        "state": "Bihar",
        "district": "Patna",
        "block": "Phulwari",
        "village": "Akbarpur",
        "pincode": "801505",
        "latitude": 25.5410,
        "longitude": 85.0430,
        "census_code_2011": "234144",
        "lgd_code": "112144",
        "demographics_2011": {
            "source": "Census India 2011",
            "data_year": 2011,
            "confidence": "Verified",
            "total_population": 2504,
            "households": 506,
            "avg_monthly_exp": 5124,
            "literacy_rate_pct": 67.1
        }
    },
    "IN-BR-PAT-MAS-DAHIA": {
        "id": "IN-BR-PAT-MAS-DAHIA",
        "name": "Dahia",
        "level": "Village",
        "state": "Bihar",
        "district": "Patna",
        "block": "Masaurhi",
        "village": "Dahia",
        "pincode": "804452",
        "latitude": 25.3510,
        "longitude": 85.0310,
        "census_code_2011": "234201",
        "lgd_code": "112201",
        "demographics_2011": {
            "source": "Census India 2011",
            "data_year": 2011,
            "confidence": "Verified",
            "total_population": 7807,
            "households": 1560,
            "avg_monthly_exp": 18054,
            "literacy_rate_pct": 71.0
        }
    },
    "IN-BR-PAT-MAS-LAKHANPURA": {
        "id": "IN-BR-PAT-MAS-LAKHANPURA",
        "name": "Lakhanpura",
        "level": "Village",
        "state": "Bihar",
        "district": "Patna",
        "block": "Masaurhi",
        "village": "Lakhanpura",
        "pincode": "804452",
        "latitude": 25.3720,
        "longitude": 85.0120,
        "census_code_2011": "234255",
        "lgd_code": "112255",
        "demographics_2011": {
            "source": "Census India 2011",
            "data_year": 2011,
            "confidence": "Verified",
            "total_population": 6825,
            "households": 1373,
            "avg_monthly_exp": 12130,
            "literacy_rate_pct": 68.3
        }
    },
    "IN-BR-BEG-BAR-AMANPUR": {
        "id": "IN-BR-BEG-BAR-AMANPUR",
        "name": "Amanpur",
        "level": "Village",
        "state": "Bihar",
        "district": "Begusarai",
        "block": "Barauni",
        "village": "Amanpur",
        "pincode": "851112",
        "latitude": 25.4810,
        "longitude": 85.9810,
        "census_code_2011": "238101",
        "lgd_code": "114101",
        "demographics_2011": {
            "source": "Census India 2011",
            "data_year": 2011,
            "confidence": "Verified",
            "total_population": 7337,
            "households": 1714,
            "avg_monthly_exp": 8130,
            "literacy_rate_pct": 70.5
        }
    },
    "IN-BR-BEG-BAR-BIRAUNI": {
        "id": "IN-BR-BEG-BAR-BIRAUNI",
        "name": "Birauni",
        "level": "Village",
        "state": "Bihar",
        "district": "Begusarai",
        "block": "Barauni",
        "village": "Birauni",
        "pincode": "851112",
        "latitude": 25.4620,
        "longitude": 85.9650,
        "census_code_2011": "238145",
        "lgd_code": "114145",
        "demographics_2011": {
            "source": "Census India 2011",
            "data_year": 2011,
            "confidence": "Verified",
            "total_population": 4335,
            "households": 1060,
            "avg_monthly_exp": 4492,
            "literacy_rate_pct": 66.4
        }
    },
    "IN-BR-BEG-MAT-BALAKPUR": {
        "id": "IN-BR-BEG-MAT-BALAKPUR",
        "name": "Balakpur",
        "level": "Village",
        "state": "Bihar",
        "district": "Begusarai",
        "block": "Matihani",
        "village": "Balakpur",
        "pincode": "851129",
        "latitude": 25.3810,
        "longitude": 86.0810,
        "census_code_2011": "238201",
        "lgd_code": "114201",
        "demographics_2011": {
            "source": "Census India 2011",
            "data_year": 2011,
            "confidence": "Verified",
            "total_population": 5873,
            "households": 1203,
            "avg_monthly_exp": 5311,
            "literacy_rate_pct": 67.9
        }
    },
    "IN-BR-BEG-MAT-MATIHANI": {
        "id": "IN-BR-BEG-MAT-MATIHANI",
        "name": "Matihani",
        "level": "Village",
        "state": "Bihar",
        "district": "Begusarai",
        "block": "Matihani",
        "village": "Matihani",
        "pincode": "851129",
        "latitude": 25.3950,
        "longitude": 86.1020,
        "census_code_2011": "238255",
        "lgd_code": "114255",
        "demographics_2011": {
            "source": "Census India 2011",
            "data_year": 2011,
            "confidence": "Verified",
            "total_population": 4174,
            "households": 797,
            "avg_monthly_exp": 8029,
            "literacy_rate_pct": 69.2
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
        return [
            loc for loc in LOCATION_STORE.values() 
            if q in loc["name"].lower() or q in loc["district"].lower() or q in loc["state"].lower()
        ]

    @staticmethod
    def get_demographics(location_id: str) -> Optional[Dict[str, Any]]:
        loc = LOCATION_STORE.get(location_id)
        return loc.get("demographics_2011") if loc else None
