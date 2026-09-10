import sys
import os
from decimal import Decimal

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.engines.financial.calculator import FinancialEngine, format_inr
from app.engines.scheme.rules import SchemeRuleEngine

def run_all_tests():
    print("========================================")
    print("RUNNING GRAMBIZ AI FINANCIAL ENGINE TESTS")
    print("========================================")

    # 1. Project Cost Calculation
    res = FinancialEngine.calculate_project_cost(Decimal("100000.00"), Decimal("10.0"))
    assert res.project_cost == Decimal("1000000.00"), f"Expected 1000000, got {res.project_cost}"
    assert res.calculated_financing == Decimal("900000.00"), f"Expected 900000, got {res.calculated_financing}"
    assert res.formatted_project_cost == "₹10,00,000.00"
    assert res.formatted_calculated_financing == "₹9,00,000.00"
    print("[PASS] test_project_cost_calculation")

    # 2. Scheme Rule Micro Finance
    res_mf = SchemeRuleEngine.evaluate_scheme(Decimal("100000.00"), Decimal("10000.00"))
    assert res_mf.eligible is True
    assert res_mf.scheme_code == "MOSJE_MICRO_FINANCE"
    assert res_mf.calculated_financing == Decimal("90000.00")
    assert res_mf.interest_rate == Decimal("6.50")
    assert res_mf.tenure_months == 36
    assert res_mf.moratorium_months == 3
    print("[PASS] test_scheme_rule_micro_finance")

    # 3. Scheme Rule Term Loan Standard
    res_tl = SchemeRuleEngine.evaluate_scheme(Decimal("1000000.00"), Decimal("100000.00"))
    assert res_tl.eligible is True
    assert res_tl.scheme_code == "MOSJE_TERM_LOAN"
    assert res_tl.calculated_financing == Decimal("900000.00")
    assert res_tl.interest_rate == Decimal("8.00")
    assert res_tl.tenure_months == 84
    assert res_tl.moratorium_months == 6
    print("[PASS] test_scheme_rule_term_loan_standard")

    # 4. Boundary Tests (₹1.40L threshold)
    res_140k = SchemeRuleEngine.evaluate_scheme(Decimal("140000.00"), Decimal("14000.00"))
    assert res_140k.scheme_code == "MOSJE_MICRO_FINANCE"

    res_above_140k = SchemeRuleEngine.evaluate_scheme(Decimal("140000.01"), Decimal("14000.00"))
    assert res_above_140k.scheme_code == "MOSJE_TERM_LOAN"
    print("[PASS] test_scheme_rule_exact_boundary")

    # 5. Over 50 Lakhs Boundary
    res_over = SchemeRuleEngine.evaluate_scheme(Decimal("6000000.00"), Decimal("600000.00"))
    assert res_over.eligible is False
    assert res_over.scheme_code == "EXCEEDS_SCHEME_LIMIT"
    print("[PASS] test_scheme_rule_above_50_lakhs")

    # 6. EMI and Moratorium
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
    print("[PASS] test_emi_calculation_with_moratorium")

    # 7. Break-Even Calculation
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
    print("[PASS] test_break_even_calculation")

    print("========================================")
    print("ALL 7 CRITICAL FINANCIAL TESTS PASSED WITH 100% PRECISION!")
    print("========================================")

if __name__ == "__main__":
    run_all_tests()
