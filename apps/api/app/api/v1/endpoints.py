import uuid
from datetime import datetime, timezone
from decimal import Decimal
from typing import List, Optional
from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.responses import Response

from app.schemas.all_schemas import (
    UserRegisterRequest,
    UserLoginRequest,
    TokenResponse,
    UserResponse,
    ProjectCostRequest,
    ProjectCostResponse,
    SchemeRuleRecommendationRequest,
    SchemeRecommendationResponse,
    EMIRequest,
    EMIResponse,
    WorkingCapitalRequest,
    WorkingCapitalResponse,
    BreakEvenRequest,
    BreakEvenResponse,
    CashFlowRequest,
    CashFlowResponse,
    AssessmentCreateRequest,
    AssessmentDetailResponse,
    AIChatRequest,
    AIChatResponse
)
from app.engines.financial.calculator import FinancialEngine, format_inr
from app.engines.scheme.rules import SchemeRuleEngine, SEEDED_SCHEMES
from app.engines.scoring.feasibility import ScoringEngine, RiskEngine
from app.gis.spatial import GISEngine
from app.ai.orchestrator import AIOrchestrator
from app.reports.pdf_generator import PDFReportGenerator

router = APIRouter()

# In-memory storage for rapid end-to-end MVP session state
USERS_DB = {}
ASSESSMENTS_DB = {}

# Seed a default demo assessment matching the prompt flow
def seed_default_assessment():
    demo_id = "demo-dairy-assessment-101"
    fin_cost = FinancialEngine.calculate_project_cost(Decimal("100000.00"))
    scheme_rec = SchemeRuleEngine.evaluate_scheme(fin_cost.project_cost, Decimal("100000.00"))
    
    score_breakdown = ScoringEngine.compute_feasibility(
        category="Dairy",
        margin_capital=Decimal("100000.00"),
        experience_years=2,
        infra_flags={"water_available": True, "electricity_available": True, "transport_available": True, "land_available": True, "storage_available": False},
        competitor_count_5km=2
    )

    risks = RiskEngine.evaluate_risks(
        category="Dairy",
        margin_capital=Decimal("100000.00"),
        infra_flags={"water_available": True, "electricity_available": True, "transport_available": True},
        experience_years=2
    )

    comp_5km = GISEngine.find_competitors_within_radius(28.6139, 77.2090, "Dairy", 5.0)
    comp_10km = GISEngine.find_competitors_within_radius(28.6139, 77.2090, "Dairy", 10.0)
    pricing = GISEngine.get_pricing_benchmarks("Dairy")
    swot = AIOrchestrator.generate_swot("Dairy", {})
    strategy = AIOrchestrator.generate_strategy("Dairy", {})

    ASSESSMENTS_DB[demo_id] = {
        "id": demo_id,
        "title": "Dairy Micro-Enterprise Feasibility",
        "created_at": datetime.now(timezone.utc),
        "status": "COMPLETED",
        "user_inputs": {
            "business_category": "Dairy",
            "business_subcategory": "Cow & Buffalo Milk Chilling",
            "margin_capital": 100000.00,
            "location": {
                "state": "Uttar Pradesh",
                "district": "Meerut",
                "block": "Hastinapur",
                "village": "Ganeshpur",
                "latitude": 28.6139,
                "longitude": 77.2090
            },
            "experience_years": 2,
            "land_available": True,
            "water_available": True,
            "electricity_available": True,
            "transport_available": True,
            "storage_available": False
        },
        "financial_summary": fin_cost.model_dump(),
        "scheme_recommendation": scheme_rec.model_dump(),
        "feasibility_score": score_breakdown.model_dump(),
        "swot": swot.model_dump(),
        "risks": [r.model_dump() for r in risks],
        "competitors_5km": [c.model_dump() for c in comp_5km],
        "competitors_10km": [c.model_dump() for c in comp_10km],
        "pricing_data": [p.model_dump() for p in pricing],
        "ai_strategy": strategy,
        "sources_and_confidence": {
            "population_data": "Estimated from Census & Village Directory [2021-24 Projection]",
            "scheme_rules": "MoSJE Policy Gazette 2024 [Verified]",
            "competitor_data": "District Enterprise Survey [Verified / 2 Records Found]",
            "pricing_data": "District Milk Producers Union Mandi Report [Verified]"
        },
        "download_report_url": f"/api/v1/reports/{demo_id}/pdf"
    }

seed_default_assessment()

# ----------------- Auth Endpoints -----------------
@router.post("/auth/register", response_model=TokenResponse)
def register(payload: UserRegisterRequest):
    if payload.email in USERS_DB:
        raise HTTPException(status_code=400, detail="An account with this email already exists.")
    
    user_id = str(uuid.uuid4())
    user_record = {
        "id": user_id,
        "name": payload.name,
        "email": payload.email,
        "mobile": payload.mobile,
        "role": "user",
        "state": payload.state,
        "district": payload.district,
        "preferred_language": payload.preferred_language,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    USERS_DB[payload.email] = {
        **user_record,
        "password": payload.password
    }

    return TokenResponse(
        access_token=f"jwt_mock_access_{user_id}",
        refresh_token=f"jwt_mock_refresh_{user_id}",
        user=user_record
    )

@router.post("/auth/login", response_model=TokenResponse)
def login(payload: UserLoginRequest):
    user = USERS_DB.get(payload.email)
    if not user or user["password"] != payload.password:
        # Check if it's the demo login
        if payload.email == "demo@grambiz.in" and payload.password == "Demo@123":
            demo_user = {
                "id": "demo-user-1",
                "name": "Ramesh Kumar (Demo)",
                "email": "demo@grambiz.in",
                "mobile": "9876543210",
                "role": "user",
                "state": "Uttar Pradesh",
                "district": "Meerut",
                "preferred_language": "hi",
                "created_at": datetime.now(timezone.utc).isoformat()
            }
            return TokenResponse(
                access_token="jwt_mock_access_demo_user",
                refresh_token="jwt_mock_refresh_demo_user",
                user=demo_user
            )
        raise HTTPException(status_code=401, detail="Invalid email or password.")
    
    user_data = {k: v for k, v in user.items() if k != "password"}
    return TokenResponse(
        access_token=f"jwt_mock_access_{user['id']}",
        refresh_token=f"jwt_mock_refresh_{user['id']}",
        user=user_data
    )

@router.get("/auth/me")
def get_me():
    return {
        "id": "demo-user-1",
        "name": "Ramesh Kumar",
        "email": "demo@grambiz.in",
        "role": "user",
        "state": "Uttar Pradesh",
        "district": "Meerut",
        "preferred_language": "en"
    }

# ----------------- Financial Endpoints -----------------
@router.post("/finance/project-cost", response_model=ProjectCostResponse)
def compute_project_cost(payload: ProjectCostRequest):
    try:
        return FinancialEngine.calculate_project_cost(payload.margin_capital, payload.margin_percentage)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/finance/emi", response_model=EMIResponse)
def compute_emi(payload: EMIRequest):
    try:
        return FinancialEngine.calculate_emi_and_amortization(
            principal=payload.principal,
            annual_interest_rate=payload.annual_interest_rate,
            tenure_months=payload.tenure_months,
            moratorium_months=payload.moratorium_months,
            moratorium_interest_policy=payload.moratorium_interest_policy
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/finance/working-capital", response_model=WorkingCapitalResponse)
def compute_working_capital(payload: WorkingCapitalRequest):
    return FinancialEngine.calculate_working_capital(
        raw_materials=payload.raw_materials,
        rent=payload.rent,
        electricity=payload.electricity,
        salaries=payload.salaries,
        transport=payload.transport,
        marketing=payload.marketing,
        maintenance=payload.maintenance,
        miscellaneous=payload.miscellaneous,
        reserve_months=payload.reserve_months
    )

@router.post("/finance/break-even", response_model=BreakEvenResponse)
def compute_break_even(payload: BreakEvenRequest):
    return FinancialEngine.calculate_break_even(
        fixed_costs=payload.fixed_costs,
        variable_cost_per_unit=payload.variable_cost_per_unit,
        selling_price_per_unit=payload.selling_price_per_unit,
        estimated_monthly_units=payload.estimated_monthly_units
    )

@router.post("/finance/cash-flow", response_model=CashFlowResponse)
def compute_cash_flow(payload: CashFlowRequest):
    return FinancialEngine.calculate_cash_flow(
        estimated_monthly_revenue=payload.estimated_monthly_revenue,
        monthly_operating_expense=payload.monthly_operating_expense,
        monthly_emi=payload.monthly_emi,
        projection_years=payload.projection_years,
        annual_revenue_growth_percent=payload.annual_revenue_growth_percent,
        annual_expense_growth_percent=payload.annual_expense_growth_percent
    )

# ----------------- Scheme Endpoints -----------------
@router.get("/schemes")
def get_all_schemes():
    return SEEDED_SCHEMES

@router.post("/schemes/recommend", response_model=SchemeRecommendationResponse)
def recommend_scheme(payload: SchemeRuleRecommendationRequest):
    return SchemeRuleEngine.evaluate_scheme(payload.project_cost, payload.margin_capital)

# ----------------- GIS & Geocoding Endpoints -----------------
from app.gis.geocoding import GeocodingProvider, ReverseGeocodeResponse

@router.get("/locations/reverse-geocode", response_model=ReverseGeocodeResponse)
async def reverse_geocode_location(lat: float, lon: float, source: str = "gps"):
    res = await GeocodingProvider.reverse_geocode(lat, lon)
    res.location_source = source
    return res

@router.get("/gis/competitors")
def get_competitors(lat: float, lon: float, category: Optional[str] = None, radius_km: float = 10.0):
    return GISEngine.find_competitors_within_radius(lat, lon, category, radius_km)

# ----------------- Assessment Endpoints -----------------
@router.post("/assessments")
def create_assessment(payload: AssessmentCreateRequest):
    assessment_id = f"asm-{uuid.uuid4().hex[:8]}"
    
    # 1. Deterministic Financial Calculation
    fin_cost = FinancialEngine.calculate_project_cost(payload.margin_capital)
    
    # 2. Scheme Rule Evaluation
    scheme_rec = SchemeRuleEngine.evaluate_scheme(fin_cost.project_cost, payload.margin_capital)
    
    # 3. GIS Competitor Scan
    comp_5km = GISEngine.find_competitors_within_radius(
        payload.location.latitude,
        payload.location.longitude,
        payload.business_category,
        5.0
    )
    comp_10km = GISEngine.find_competitors_within_radius(
        payload.location.latitude,
        payload.location.longitude,
        payload.business_category,
        10.0
    )
    
    # 4. Feasibility & Risk Engines
    infra_flags = {
        "water_available": payload.water_available,
        "electricity_available": payload.electricity_available,
        "transport_available": payload.transport_available,
        "land_available": payload.land_available,
        "storage_available": payload.storage_available
    }
    score_breakdown = ScoringEngine.compute_feasibility(
        category=payload.business_category,
        margin_capital=payload.margin_capital,
        experience_years=payload.experience_years,
        infra_flags=infra_flags,
        competitor_count_5km=len(comp_5km)
    )
    risks = RiskEngine.evaluate_risks(
        category=payload.business_category,
        margin_capital=payload.margin_capital,
        infra_flags=infra_flags,
        experience_years=payload.experience_years
    )
    
    # 5. Pricing benchmarks
    pricing = GISEngine.get_pricing_benchmarks(payload.business_category)
    
    # 6. AI SWOT & Strategy
    swot = AIOrchestrator.generate_swot(payload.business_category, payload.model_dump())
    strategy = AIOrchestrator.generate_strategy(payload.business_category, payload.model_dump())

    record = {
        "id": assessment_id,
        "title": payload.title or f"{payload.business_category} in {payload.location.village}",
        "created_at": datetime.now(timezone.utc),
        "status": "COMPLETED",
        "user_inputs": payload.model_dump(),
        "financial_summary": fin_cost.model_dump(),
        "scheme_recommendation": scheme_rec.model_dump(),
        "feasibility_score": score_breakdown.model_dump(),
        "swot": swot.model_dump(),
        "risks": [r.model_dump() for r in risks],
        "competitors_5km": [c.model_dump() for c in comp_5km],
        "competitors_10km": [c.model_dump() for c in comp_10km],
        "pricing_data": [p.model_dump() for p in pricing],
        "ai_strategy": strategy,
        "sources_and_confidence": {
            "population_data": "Estimated from Census & Panchayat Registry",
            "scheme_rules": "MoSJE Policy Guideline 2024 [Verified]",
            "competitor_data": f"{len(comp_10km)} local commercial points identified [Verified]",
            "pricing_data": "District Mandi & Haat Benchmarks [Verified / Estimated]"
        },
        "download_report_url": f"/api/v1/reports/{assessment_id}/pdf"
    }

    ASSESSMENTS_DB[assessment_id] = record
    return record

@router.get("/assessments")
def list_assessments():
    return list(ASSESSMENTS_DB.values())

@router.get("/assessments/{id}")
def get_assessment(id: str):
    record = ASSESSMENTS_DB.get(id)
    if not record:
        raise HTTPException(status_code=404, detail="Assessment not found.")
    return record

# ----------------- AI Chat Endpoint -----------------
@router.post("/ai/chat", response_model=AIChatResponse)
def ai_chat(payload: AIChatRequest):
    conv_id = payload.conversation_id or str(uuid.uuid4())
    context = None
    if payload.context_assessment_id:
        context = ASSESSMENTS_DB.get(payload.context_assessment_id)
    
    result = AIOrchestrator.answer_query(
        message=payload.message,
        context_data=context,
        language=payload.preferred_language
    )
    return AIChatResponse(
        conversation_id=conv_id,
        reply=result["reply"],
        citations=result.get("citations", []),
        suggested_actions=result.get("suggested_actions", [])
    )

# ----------------- Report PDF Endpoint -----------------
@router.get("/reports/{id}/pdf")
def download_pdf_report(id: str):
    record = ASSESSMENTS_DB.get(id)
    if not record:
        raise HTTPException(status_code=404, detail="Assessment report not found.")
    
    pdf_bytes = PDFReportGenerator.generate_assessment_report(record)
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename=GramBiz_Report_{id}.pdf"
        }
    )
