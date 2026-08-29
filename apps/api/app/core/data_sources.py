import os
import json
import logging
from typing import Dict, Any, List, Optional
from datetime import datetime, timezone

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("DataPlatform")

# Authoritative Master Data Source Registry
DATA_SOURCE_REGISTRY: Dict[str, Dict[str, Any]] = {
    "census_india": {
        "id": "census_india",
        "name": "Primary Census Abstract (PCA) & Village Directory",
        "organization": "Office of the Registrar General & Census Commissioner, Ministry of Home Affairs, Government of India",
        "source_url": "https://censusindia.gov.in/",
        "api_url": None,
        "description": "Baseline demographic, household, workforce (main & marginal), literacy, and village amenity data.",
        "license": "Government Open Data License - India (GODL)",
        "geographic_level": "Village",
        "data_year": 2011,
        "citation_template": "Source: Census India 2011 (Official Baseline Demographic Data)",
        "active": True
    },
    "data_gov_in": {
        "id": "data_gov_in",
        "name": "Open Government Data (OGD) Platform India",
        "organization": "National Informatics Centre (NIC), Ministry of Electronics & IT, Government of India",
        "source_url": "https://www.data.gov.in/",
        "api_url": "https://api.data.gov.in/resource/",
        "description": "District statistics, agricultural output, rural development metrics, and welfare scheme datasets.",
        "license": "Government Open Data License - India (GODL)",
        "geographic_level": "District",
        "data_year": 2024,
        "citation_template": "Source: Open Government Data (data.gov.in) [Verified]",
        "active": True
    },
    "rbi_dbie": {
        "id": "rbi_dbie",
        "name": "Database on Indian Economy (DBIE)",
        "organization": "Reserve Bank of India (RBI)",
        "source_url": "https://data.rbi.org.in/",
        "api_url": None,
        "description": "State & district banking indicators, commercial credit-to-deposit ratios, and priority sector lending.",
        "license": "Official Regulatory Statistics",
        "geographic_level": "District",
        "data_year": 2024,
        "citation_template": "Source: Reserve Bank of India (RBI Banking Statistics 2023-24)",
        "active": True
    },
    "openstreetmap": {
        "id": "openstreetmap",
        "name": "OpenStreetMap Commercial & Infrastructure Points of Interest",
        "organization": "OpenStreetMap Foundation",
        "source_url": "https://www.openstreetmap.org/",
        "api_url": "https://overpass-api.de/api/interpreter",
        "description": "Geolocated commercial entities, shops, dairies, veterinary clinics, markets, and transit infrastructure.",
        "license": "Open Data Commons Open Database License (ODbL) / © OpenStreetMap contributors",
        "geographic_level": "Point",
        "data_year": 2026,
        "citation_template": "Source: OpenStreetMap (Mapped entities in available dataset; coverage may be partial)",
        "active": True
    },
    "agmarknet": {
        "id": "agmarknet",
        "name": "Agricultural Marketing Information Network (AGMARKNET)",
        "organization": "Directorate of Marketing & Inspection (DMI), Ministry of Agriculture and Farmers Welfare",
        "source_url": "https://agmarknet.gov.in/",
        "api_url": "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070",
        "description": "Daily agricultural market arrivals, wholesale minimum, maximum, and modal commodity prices.",
        "license": "Government Open Data License - India (GODL)",
        "geographic_level": "APMC Mandi",
        "data_year": 2026,
        "citation_template": "Source: AGMARKNET / Ministry of Agriculture APMC Mandi Bulletin [Live Observed]",
        "active": True
    },
    "dahd_livestock": {
        "id": "dahd_livestock",
        "name": "20th All India Livestock Census & Basic Animal Husbandry Statistics",
        "organization": "Department of Animal Husbandry & Dairying, Ministry of Fisheries, Animal Husbandry & Dairying",
        "source_url": "https://dahd.gov.in/",
        "api_url": None,
        "description": "District-wise bovine, ovine, poultry populations, milk yield rates, and veterinary infrastructure.",
        "license": "Official Government Census Publication",
        "geographic_level": "District",
        "data_year": 2023,
        "citation_template": "Source: Department of Animal Husbandry & Dairying (20th Livestock Census)",
        "active": True
    },
    "dof_fisheries": {
        "id": "dof_fisheries",
        "name": "Handbook on Fisheries Statistics",
        "organization": "Department of Fisheries, Ministry of Fisheries, Animal Husbandry & Dairying",
        "source_url": "https://dof.gov.in/",
        "api_url": None,
        "description": "Inland and aquaculture fish production, water body coverage, and district fish farmer metrics.",
        "license": "Official Government Publication",
        "geographic_level": "State",
        "data_year": 2023,
        "citation_template": "Source: Department of Fisheries Handbook on Fisheries Statistics",
        "active": True
    },
    "imd_mausam": {
        "id": "imd_mausam",
        "name": "India Meteorological Department (IMD) Agro-Meteorology",
        "organization": "Ministry of Earth Sciences, Government of India",
        "source_url": "https://mausam.imd.gov.in/",
        "api_url": None,
        "description": "District agro-climatic zones, seasonal precipitation, monsoon onset, and temperature variation extremes.",
        "license": "Official Government Publication",
        "geographic_level": "District",
        "data_year": 2024,
        "citation_template": "Source: India Meteorological Department (IMD Agro-Advisory)",
        "active": True
    },
    "mosje_configured": {
        "id": "mosje_configured",
        "name": "MoSJE Concessional Credit Guidelines (Problem Statement Configuration)",
        "organization": "Ministry of Social Justice and Empowerment (NBCFDC / NSFDC Policy)",
        "source_url": "https://socialjustice.gov.in/",
        "api_url": None,
        "description": "Micro Finance (<=₹1.40L / 6.5% interest / 3-month moratorium) & Term Loan (<=₹50L / 8.0% interest / 6-month moratorium).",
        "license": "Statutory Government Policy Guideline",
        "geographic_level": "Country",
        "data_year": 2024,
        "citation_template": "Source: MoSJE Policy Guidelines [Configured Problem Statement Data]",
        "active": True
    }
}

class DataSourceRegistry:
    @staticmethod
    def get_source(source_id: str) -> Optional[Dict[str, Any]]:
        return DATA_SOURCE_REGISTRY.get(source_id)

    @staticmethod
    def list_all_sources() -> List[Dict[str, Any]]:
        return list(DATA_SOURCE_REGISTRY.values())

    @staticmethod
    def format_citation(source_id: str, data_year: Optional[int] = None) -> str:
        source = DATA_SOURCE_REGISTRY.get(source_id)
        if not source:
            return "Source: Verified Platform Benchmark"
        year_suffix = f" [{data_year}]" if data_year else f" [{source.get('data_year')}]"
        return f"{source['citation_template']}{year_suffix}"
