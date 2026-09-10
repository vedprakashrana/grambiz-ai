import pytest
from decimal import Decimal
from app.engines.financial.calculator import FinancialEngine, format_inr
from app.engines.scheme.rules import SchemeRuleEngine

def test_project_cost_calculation():
    # Prompt Scenario: Margin = ₹1,00,000 -> Project Cost = ₹10,00,000 -> 90% Financing = ₹9,00,000
    res = FinancialEngine.calculate_project_cost(Decimal("100000.00"), Decimal("10.0"))
    assert res.project_cost == Decimal("1000000.00")
    assert res.calculated_financing == Decimal("900000.00")
    assert res.formatted_project_cost == "₹10,00,000.00"
    assert res.formatted_calculated_financing == "₹9,00,000.00"

def test_scheme_rule_micro_finance():
    # Case <= 1.40 Lakh: ₹1.00 Lakh project cost -> Micro Finance Scheme (6.5%, max 1.25L)
    res = SchemeRuleEngine.evaluate_scheme(Decimal("100000.00"), Decimal("10000.00"))
    assert res.eligible is True
    assert res.scheme_code == "MOSJE_MICRO_FINANCE"
    assert res.calculated_financing == Decimal("90000.00")
    assert res.actual_eligible_financing == Decimal("90000.00")
    assert res.interest_rate == Decimal("6.50")
    assert res.tenure_months == 36
    assert res.moratorium_months == 3

def test_scheme_rule_term_loan_standard():
    # Case > 1.40 Lakh and <= 50 Lakh: ₹10 Lakh project cost -> Term Loan Scheme (8.0%)
    res = SchemeRuleEngine.evaluate_scheme(Decimal("1000000.00"), Decimal("100000.00"))
    assert res.eligible is True
    assert res.scheme_code == "MOSJE_TERM_LOAN"
    assert res.calculated_financing == Decimal("900000.00")
    assert res.actual_eligible_financing == Decimal("900000.00")
    assert res.interest_rate == Decimal("8.00")
    assert res.tenure_months == 84
    assert res.moratorium_months == 6

def test_scheme_rule_exact_boundary():
    # Exactly ₹1.40 Lakh
    res_140k = SchemeRuleEngine.evaluate_scheme(Decimal("140000.00"), Decimal("14000.00"))
    assert res_140k.scheme_code == "MOSJE_MICRO_FINANCE"

    # ₹1.40 Lakh + 1 Paisa -> Term Loan Scheme
    res_above_140k = SchemeRuleEngine.evaluate_scheme(Decimal("140000.01"), Decimal("14000.00"))
    assert res_above_140k.scheme_code == "MOSJE_TERM_LOAN"

def test_scheme_rule_above_50_lakhs():
    # Exceeds ₹50 Lakhs -> Must flag outside limit
    res_over = SchemeRuleEngine.evaluate_scheme(Decimal("6000000.00"), Decimal("600000.00"))
    assert res_over.eligible is False
    assert res_over.scheme_code == "EXCEEDS_SCHEME_LIMIT"
    assert "outside the project-cost limit" in res_over.notes[0]

def test_emi_calculation_with_moratorium():
    # Test ₹9,00,000 principal at 8% p.a. for 84 months with 6-month moratorium
    emi_res = FinancialEngine.calculate_emi_and_amortization(
        principal=Decimal("900000.00"),
        annual_interest_rate=Decimal("8.00"),
        tenure_months=84,
        moratorium_months=6,
        moratorium_interest_policy="accrued"
    )
    assert emi_res.monthly_emi > Decimal("0.00")
    assert len(emi_res.schedule) == 84
    assert emi_res.schedule[0].is_moratorium is True
    assert emi_res.schedule[5].is_moratorium is True
    assert emi_res.schedule[6].is_moratorium is False
    assert emi_res.schedule[-1].closing_balance == Decimal("0.00")

def test_break_even_calculation():
    # Fixed Cost: ₹20,000, Selling Price: ₹60, Variable Cost: ₹40 -> Contribution = ₹20, BE Units = 1,000
    be_res = FinancialEngine.calculate_break_even(
        fixed_costs=Decimal("20000.00"),
        variable_cost_per_unit=Decimal("40.00"),
        selling_price_per_unit=Decimal("60.00"),
        estimated_monthly_units=1500
    )
    assert be_res.is_viable is True
    assert be_res.contribution_margin_per_unit == Decimal("20.00")
    assert be_res.break_even_units == Decimal("1000.00")
    assert be_res.break_even_revenue == Decimal("60000.00")
