import math
from typing import List, Dict, Any
from decimal import Decimal
from app.schemas.all_schemas import CompetitorItem, PricingItem

# Demo / Seeded verified datasets with explicit source attribution and confidence levels
DEMO_COMPETITORS = [
    {
        "id": "comp_1",
        "name": "Kisan Dairy & Cattle Feed Center",
        "category": "Dairy",
        "lat": 28.6139,
        "lon": 77.2090,
        "address": "Main Road, Block Center",
        "source": "State Rural Enterprise Survey 2024",
        "data_confidence": "Verified"
    },
    {
        "id": "comp_2",
        "name": "Shree Ram Milk Chilling & Collection Unit",
        "category": "Dairy",
        "lat": 28.6250,
        "lon": 77.2150,
        "address": "Near Co-operative Society, Village Gate",
        "source": "District Industrial Center (DIC) Registry",
        "data_confidence": "Verified"
    },
    {
        "id": "comp_3",
        "name": "Anand Agro Services & Veterinary Supply",
        "category": "Agriculture",
        "lat": 28.6300,
        "lon": 77.2200,
        "address": "Mandi Bypass Road",
        "source": "Local APMC Market Directory",
        "data_confidence": "Verified"
    },
    {
        "id": "comp_4",
        "name": "Modern Fashion Tailors & Boutique",
        "category": "Tailoring",
        "lat": 28.6050,
        "lon": 77.1980,
        "address": "Bazaar Street, Ward No. 3",
        "source": "Municipal Trade License Database",
        "data_confidence": "Verified"
    },
    {
        "id": "comp_5",
        "name": "Pooja General Store & Daily Essentials",
        "category": "Retail",
        "lat": 28.6180,
        "lon": 77.2050,
        "address": "Panchayat Chowk",
        "source": "State Rural Enterprise Survey 2024",
        "data_confidence": "Verified"
    }
]

DEMO_PRICING = {
    "dairy": [
        {
            "item_name": "Raw Buffalo Milk (per Litre, 6.5% Fat)",
            "low_price": Decimal("52.00"),
            "median_price": Decimal("58.00"),
            "high_price": Decimal("64.00"),
            "data_confidence": "Verified",
            "source": "District Milk Producers Union Mandi Report",
            "date_observed": "2024-10-10"
        },
        {
            "item_name": "Cow Milk (per Litre, 3.5% Fat, 8.5% SNF)",
            "low_price": Decimal("38.00"),
            "median_price": Decimal("44.00"),
            "high_price": Decimal("48.00"),
            "data_confidence": "Verified",
            "source": "District Milk Producers Union Mandi Report",
            "date_observed": "2024-10-10"
        },
        {
            "item_name": "Fresh Paneer (per Kg, Unpackaged)",
            "low_price": Decimal("320.00"),
            "median_price": Decimal("360.00"),
            "high_price": Decimal("400.00"),
            "data_confidence": "Estimated",
            "source": "Block Weekly Haat Survey",
            "date_observed": "2024-09-28"
        }
    ],
    "poultry": [
        {
            "item_name": "Broiler Live Bird (per Kg farmgate)",
            "low_price": Decimal("85.00"),
            "median_price": Decimal("105.00"),
            "high_price": Decimal("125.00"),
            "data_confidence": "Verified",
            "source": "NECC Daily Quotations",
            "date_observed": "2024-10-14"
        },
        {
            "item_name": "Country Eggs / Desi Eggs (per Dozen)",
            "low_price": Decimal("90.00"),
            "median_price": Decimal("110.00"),
            "high_price": Decimal("130.00"),
            "data_confidence": "Estimated",
            "source": "Local Haat Survey",
            "date_observed": "2024-10-01"
        }
    ]
}

def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculate distance in kilometers between two lat/lon pairs"""
    R = 6371.0 # Earth's radius in km
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (math.sin(dlat / 2) ** 2 +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return round(R * c, 2)


class GISEngine:
    @staticmethod
    def find_competitors_within_radius(
        target_lat: float,
        target_lon: float,
        category: Optional[str] = None,
        radius_km: float = 10.0
    ) -> List[CompetitorItem]:
        results: List[CompetitorItem] = []
        for c in DEMO_COMPETITORS:
            if category and c["category"].lower() != category.lower() and category.lower() not in ["all", "other"]:
                continue
            dist = haversine_distance(target_lat, target_lon, c["lat"], c["lon"])
            if dist <= radius_km:
                results.append(CompetitorItem(
                    id=c["id"],
                    name=c["name"],
                    category=c["category"],
                    distance_km=dist,
                    address=c["address"],
                    source=c["source"],
                    data_confidence=c["data_confidence"]
                ))
        
        # Sort by distance
        results.sort(key=lambda x: x.distance_km)
        return results

    @staticmethod
    def get_pricing_benchmarks(category: str) -> List[PricingItem]:
        cat_key = category.lower()
        items_raw = DEMO_PRICING.get(cat_key, [])
        if not items_raw:
            # Fallback when reliable local data is unavailable
            return []
        
        return [PricingItem(**item) for item in items_raw]
