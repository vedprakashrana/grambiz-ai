import os
import sys
from pathlib import Path

# Ensure apps/api is on sys.path
sys.path.insert(0, str(Path(__file__).parent.parent))

from app.core.data_sources import DataSourceRegistry
from app.core.data_store import UnifiedDataPlatform
from app.core.data_quality import DataQualityAuditor

def test_data_sources_registry():
    sources = DataSourceRegistry.list_all_sources()
    assert len(sources) >= 9
    census = DataSourceRegistry.get_source("census_india")
    assert census["data_year"] == 2011
    assert "censusindia.gov.in" in census["source_url"]

def test_census_baseline_integrity():
    loc = UnifiedDataPlatform.get_location_by_id("IN-UP-MEE-HAS-GANESHPUR")
    assert loc is not None
    assert loc["demographics_2011"]["data_year"] == 2011
    assert loc["demographics_2011"]["confidence"] == "Verified"
    assert loc["demographics_2011"]["total_population"] == 3840

def test_spatial_radius_query():
    analysis = UnifiedDataPlatform.compute_radius_analysis(29.1712, 77.9984, 5.0, "Dairy")
    assert analysis["mapped_businesses_found"] >= 1
    assert "OpenStreetMap" in analysis["data_source"]
    assert "unmapped" in analysis["coverage_statement"].lower()

def test_consumer_reach_estimation_methodology():
    est = UnifiedDataPlatform.estimate_potential_consumer_reach("IN-UP-MEE-HAS-GANESHPUR", "Dairy", 5.0)
    assert est["status"] == "estimated"
    assert est["confidence"] == "Estimated"
    assert "methodology" in est
    assert "disclaimer" in est

def test_data_quality_audit_suite():
    audit = DataQualityAuditor.run_system_audit()
    assert audit["overall_quality_score"] >= 90.0
    assert audit["quality_status"] == "EXCELLENT"
