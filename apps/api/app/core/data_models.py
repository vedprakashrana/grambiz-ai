import enum
from datetime import datetime, timezone
from typing import Optional, List
from sqlalchemy import (
    Column, String, Integer, Float, Boolean, DateTime, Text, Enum as SQLEnum,
    ForeignKey, Numeric, JSON, Index, UniqueConstraint
)
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class DataConfidenceEnum(str, enum.Enum):
    VERIFIED = "Verified"
    DERIVED = "Derived"
    ESTIMATED = "Estimated"
    DEMO = "Demo"
    UNAVAILABLE = "Unavailable"

class GeographicLevelEnum(str, enum.Enum):
    COUNTRY = "Country"
    STATE = "State"
    DISTRICT = "District"
    SUB_DISTRICT = "Sub-District"
    BLOCK = "Block"
    VILLAGE = "Village"
    POINT = "Point"

class QualityStatusEnum(str, enum.Enum):
    PASSED = "PASSED"
    WARNING = "WARNING"
    FAILED = "FAILED"

# 1. Data Source Registry
class DataSource(Base):
    __tablename__ = "data_sources"

    id = Column(String(50), primary_key=True) # e.g., 'census_india', 'osm', 'agmarknet', 'rbi', 'imd', 'mosje_configured'
    name = Column(String(150), nullable=False)
    organization = Column(String(200), nullable=False)
    source_url = Column(String(500), nullable=False)
    api_url = Column(String(500), nullable=True)
    description = Column(Text, nullable=True)
    license = Column(String(100), nullable=True)
    active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    versions = relationship("DataSourceVersion", back_populates="data_source")
    observations = relationship("DataObservation", back_populates="data_source")
    ingestion_runs = relationship("DataIngestionRun", back_populates="data_source")

class DataSourceVersion(Base):
    __tablename__ = "data_source_versions"

    id = Column(String(80), primary_key=True)
    source_id = Column(String(50), ForeignKey("data_sources.id"), nullable=False)
    version_tag = Column(String(50), nullable=False) # e.g. '2011_v1', '2024_q1'
    data_year = Column(Integer, nullable=False)
    published_at = Column(String(50), nullable=True)
    retrieved_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    notes = Column(Text, nullable=True)

    data_source = relationship("DataSource", back_populates="versions")

# 2. Location Master & Hierarchy
class Location(Base):
    __tablename__ = "locations"

    id = Column(String(80), primary_key=True) # e.g., 'IN-UP-MEE-HAS-001'
    name = Column(String(150), nullable=False)
    level = Column(SQLEnum(GeographicLevelEnum), nullable=False)
    parent_id = Column(String(80), ForeignKey("locations.id"), nullable=True)
    state = Column(String(100), nullable=True)
    district = Column(String(100), nullable=True)
    block = Column(String(100), nullable=True)
    village = Column(String(100), nullable=True)
    pincode = Column(String(10), nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    census_code_2011 = Column(String(50), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    parent = relationship("Location", remote_side=[id], backref="children")
    observations = relationship("DataObservation", back_populates="location")
    businesses = relationship("Business", back_populates="location")

    __table_args__ = (
        Index("idx_location_hierarchy", "state", "district", "block", "village"),
        Index("idx_location_lat_long", "latitude", "longitude"),
    )

# 3. Canonical Normalized Data Observations (Preserving Historical & Multi-source)
class DataObservation(Base):
    __tablename__ = "data_observations"

    id = Column(String(100), primary_key=True)
    location_id = Column(String(80), ForeignKey("locations.id"), nullable=False)
    domain = Column(String(50), nullable=False) # 'demographic', 'infrastructure', 'economic', 'agriculture', 'livestock', 'fisheries', 'weather'
    metric = Column(String(100), nullable=False) # e.g., 'total_population', 'male_population', 'literacy_rate', 'daily_milk_yield'
    value = Column(Numeric(18, 4), nullable=False)
    unit = Column(String(50), nullable=True)
    data_year = Column(Integer, nullable=False)
    source_id = Column(String(50), ForeignKey("data_sources.id"), nullable=False)
    source_record_id = Column(String(100), nullable=True)
    confidence = Column(SQLEnum(DataConfidenceEnum), default=DataConfidenceEnum.VERIFIED)
    methodology = Column(Text, nullable=True)
    geographic_level = Column(SQLEnum(GeographicLevelEnum), nullable=False)
    retrieved_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    location = relationship("Location", back_populates="observations")
    data_source = relationship("DataSource", back_populates="observations")

    __table_args__ = (
        Index("idx_obs_lookup", "location_id", "domain", "metric", "data_year"),
        UniqueConstraint("location_id", "domain", "metric", "data_year", "source_id", name="uq_obs_record"),
    )

# 4. Market Prices (AGMARKNET & Mandi Observations)
class MarketPriceObservation(Base):
    __tablename__ = "market_prices"

    id = Column(String(100), primary_key=True)
    commodity = Column(String(100), nullable=False)
    variety = Column(String(100), nullable=True)
    category = Column(String(50), nullable=False) # 'Dairy', 'Poultry', 'Food Processing', etc.
    market_name = Column(String(150), nullable=False)
    state = Column(String(100), nullable=False)
    district = Column(String(100), nullable=False)
    price_type = Column(String(20), default="Wholesale") # 'Wholesale', 'Retail', 'Farmgate'
    min_price = Column(Numeric(12, 2), nullable=False)
    max_price = Column(Numeric(12, 2), nullable=False)
    modal_price = Column(Numeric(12, 2), nullable=False)
    unit = Column(String(30), nullable=False) # 'Rs/Quintal', 'Rs/Litre', 'Rs/Kg'
    arrival_quantity = Column(String(50), nullable=True)
    price_date = Column(String(30), nullable=False)
    source_id = Column(String(50), ForeignKey("data_sources.id"), nullable=False)
    confidence = Column(SQLEnum(DataConfidenceEnum), default=DataConfidenceEnum.VERIFIED)
    retrieved_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    __table_args__ = (
        Index("idx_market_price_lookup", "commodity", "district", "price_date"),
    )

# 5. OpenStreetMap & Verified Business Directory
class Business(Base):
    __tablename__ = "businesses"

    id = Column(String(100), primary_key=True)
    osm_element_id = Column(String(50), nullable=True)
    name = Column(String(200), nullable=False)
    category = Column(String(100), nullable=False)
    subcategory = Column(String(100), nullable=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    address = Column(Text, nullable=True)
    location_id = Column(String(80), ForeignKey("locations.id"), nullable=True)
    source_id = Column(String(50), ForeignKey("data_sources.id"), nullable=False)
    confidence = Column(SQLEnum(DataConfidenceEnum), default=DataConfidenceEnum.VERIFIED)
    retrieved_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    location = relationship("Location", back_populates="businesses")

    __table_args__ = (
        Index("idx_business_geo", "latitude", "longitude", "category"),
    )

# 6. Scheme Registry & Versioning
class SchemeVersion(Base):
    __tablename__ = "scheme_versions"

    id = Column(String(80), primary_key=True)
    scheme_code = Column(String(50), nullable=False)
    scheme_name = Column(String(200), nullable=False)
    department = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    min_project_cost = Column(Numeric(14, 2), nullable=False)
    max_project_cost = Column(Numeric(14, 2), nullable=False)
    funding_percentage = Column(Numeric(5, 2), nullable=False)
    max_loan = Column(Numeric(14, 2), nullable=False)
    interest_rate = Column(Numeric(5, 2), nullable=False)
    tenure_months = Column(Integer, nullable=False)
    moratorium_months = Column(Integer, nullable=False)
    beneficiary_contribution_pct = Column(Numeric(5, 2), default=10.0)
    source_document = Column(String(300), nullable=False)
    source_url = Column(String(500), nullable=True)
    effective_date = Column(String(50), nullable=True)
    last_verified_date = Column(String(50), nullable=True)
    is_problem_statement_config = Column(Boolean, default=False)
    confidence = Column(SQLEnum(DataConfidenceEnum), default=DataConfidenceEnum.VERIFIED)

# 7. Curated Business Domain Knowledge
class BusinessKnowledge(Base):
    __tablename__ = "business_knowledge"

    id = Column(String(80), primary_key=True)
    category = Column(String(100), nullable=False, unique=True)
    knowledge_type = Column(String(50), default="general_business_knowledge")
    typical_startup_capex = Column(JSON, nullable=True)
    typical_opex_breakdown = Column(JSON, nullable=True)
    equipment_required = Column(JSON, nullable=True)
    raw_materials = Column(JSON, nullable=True)
    labour_requirements = Column(JSON, nullable=True)
    common_risks = Column(JSON, nullable=True)
    seasonality_profile = Column(JSON, nullable=True)
    customer_segments = Column(JSON, nullable=True)
    distribution_channels = Column(JSON, nullable=True)
    working_capital_buffer_days = Column(Integer, default=45)
    source = Column(String(200), default="NABARD & KVIC Techno-Economic Profiles")
    confidence = Column(SQLEnum(DataConfidenceEnum), default=DataConfidenceEnum.DERIVED)

# 8. Ingestion Runs & Data Quality Audits
class DataIngestionRun(Base):
    __tablename__ = "data_ingestion_runs"

    id = Column(String(100), primary_key=True)
    source_id = Column(String(50), ForeignKey("data_sources.id"), nullable=False)
    run_timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    status = Column(String(30), nullable=False) # 'SUCCESS', 'FAILED', 'PARTIAL'
    records_imported = Column(Integer, default=0)
    records_rejected = Column(Integer, default=0)
    quality_score = Column(Float, default=100.0) # 0 to 100
    log_summary = Column(Text, nullable=True)

    data_source = relationship("DataSource", back_populates="ingestion_runs")
    quality_checks = relationship("DataQualityCheck", back_populates="ingestion_run")

class DataQualityCheck(Base):
    __tablename__ = "data_quality_checks"

    id = Column(String(100), primary_key=True)
    run_id = Column(String(100), ForeignKey("data_ingestion_runs.id"), nullable=False)
    check_name = Column(String(100), nullable=False) # 'missing_value_check', 'coordinate_boundary_check', etc.
    status = Column(SQLEnum(QualityStatusEnum), nullable=False)
    records_checked = Column(Integer, default=0)
    anomalies_found = Column(Integer, default=0)
    details = Column(Text, nullable=True)

    ingestion_run = relationship("DataIngestionRun", back_populates="quality_checks")
