import httpx
from typing import Optional, Dict, Any
from pydantic import BaseModel

class ReverseGeocodeResponse(BaseModel):
    state: Optional[str] = None
    district: Optional[str] = None
    block: Optional[str] = None
    village: Optional[str] = None
    city: Optional[str] = None
    latitude: float
    longitude: float
    location_source: str = "gps"
    confidence: str = "Verified"
    raw_display_name: Optional[str] = None

class GeocodingProvider:
    @staticmethod
    async def reverse_geocode(lat: float, lon: float) -> ReverseGeocodeResponse:
        """
        Reverse geocodes real GPS coordinates using OpenStreetMap Nominatim API.
        Extracts state, district/county, sub-district (tehsil/block), and village/suburb.
        """
        url = f"https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat={lat}&lon={lon}&addressdetails=1"
        headers = {
            "User-Agent": "GramBizAI-RuralAdvisor/1.0 (MoSJE-Project2609)"
        }

        try:
            async with httpx.AsyncClient(timeout=8.0) as client:
                res = await client.get(url, headers=headers)
                if res.status_code == 200:
                    data = res.json()
                    address: Dict[str, Any] = data.get("address", {})

                    # Extract State
                    state = address.get("state")

                    # Extract District (district, state_district, or county)
                    district = address.get("state_district") or address.get("district") or address.get("county")
                    # Clean up common Indian administrative suffixes if any
                    if district and district.endswith(" District"):
                        district = district.replace(" District", "")

                    # Extract Tehsil / Sub-district / Block
                    block = (
                        address.get("subdistrict") or 
                        address.get("tehsil") or 
                        address.get("taluk") or 
                        address.get("mandal") or 
                        address.get("county") or 
                        address.get("municipality")
                    )

                    # Extract Village / Town / Suburb / Locality
                    village = (
                        address.get("village") or 
                        address.get("hamlet") or 
                        address.get("town") or 
                        address.get("suburb") or 
                        address.get("neighbourhood") or 
                        address.get("city_district") or 
                        address.get("city")
                    )

                    return ReverseGeocodeResponse(
                        state=state,
                        district=district,
                        block=block,
                        village=village,
                        city=address.get("city"),
                        latitude=lat,
                        longitude=lon,
                        location_source="gps",
                        confidence="Verified",
                        raw_display_name=data.get("display_name")
                    )
        except Exception as e:
            # If network or Nominatim is unreachable, return raw coordinates for manual confirmation
            pass

        return ReverseGeocodeResponse(
            state=None,
            district=None,
            block=None,
            village=None,
            latitude=lat,
            longitude=lon,
            location_source="gps",
            confidence="Estimated"
        )
