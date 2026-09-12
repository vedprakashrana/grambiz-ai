"""
Financial Calculator for Model 4
Simulates loan repayment, amortization, and business profitability.
"""
from typing import Dict, Any, List
import math

OPERATING_COST_TABLE = {
    "Agri-input & Farm Supply": 31000.0,
    "Dairy & Livestock": 36500.0,
    "Digital / CSC / Online Services": 9200.0,
    "Fisheries / Aquaculture": 13500.0,
    "Food Processing": 26000.0,
    "Handicrafts / Artisan Products": 6800.0,
    "Poultry & Egg Production": 37000.0,
    "Repair & Maintenance": 11500.0,
    "Retail / Kirana": 58000.0,
    "Tailoring & Garment Services": 10800.0,
}

def estimate_operating_cost(business_category: str) -> float:
    return OPERATING_COST_TABLE.get(business_category, 20000.0)

def simulate_loan_repayment(
    monthly_revenue: float,
    business_category: str,
    loan_amount: float,
    annual_interest_rate: float,
    tenure_months: int,
    moratorium_months: int = 0,
    repayment_strategy_pct: float = 50.0,
    cash_reserve: float = 0.0,
) -> Dict[str, Any]:
    operating_cost = estimate_operating_cost(business_category)
    potential_profit = round(monthly_revenue - operating_cost, 2)
    
    safe_capacity = round(max(0.0, potential_profit * (repayment_strategy_pct / 100.0)), 2)
    
    if loan_amount <= 0:
        return {
            "expected_monthly_revenue": round(monthly_revenue, 2),
            "expected_operating_cost": round(operating_cost, 2),
            "potential_monthly_profit": potential_profit,
            "safe_repayment_capacity": safe_capacity,
            "emi": 0.0,
            "can_afford_emi": True,
            "surplus_after_emi": potential_profit,
            "estimated_payoff_months": 0,
            "total_interest_paid": 0.0,
            "repayment_schedule": []
        }

    monthly_rate = (annual_interest_rate / 100.0) / 12.0
    repay_months = max(1, tenure_months - moratorium_months)
    
    if monthly_rate == 0:
        emi = round(loan_amount / repay_months, 2)
    else:
        emi = round(
            loan_amount * monthly_rate * math.pow(1 + monthly_rate, repay_months) /
            (math.pow(1 + monthly_rate, repay_months) - 1),
            2
        )

    can_afford = potential_profit >= emi
    surplus = round(potential_profit - emi, 2)
    
    # Amortization schedule
    schedule = []
    balance = loan_amount
    total_interest = 0.0
    
    # Moratorium months
    for m in range(1, moratorium_months + 1):
        m_interest = round(balance * monthly_rate, 2)
        total_interest += m_interest
        schedule.append({
            "month": m,
            "is_moratorium": True,
            "opening_balance": round(balance, 2),
            "emi": 0.0,
            "principal": 0.0,
            "interest": m_interest,
            "closing_balance": round(balance, 2)
        })

    # Repayment months
    for m in range(moratorium_months + 1, tenure_months + 1):
        interest_paid = round(balance * monthly_rate, 2)
        principal_paid = round(emi - interest_paid, 2)
        if principal_paid > balance or m == tenure_months:
            principal_paid = round(balance, 2)
            emi_actual = round(principal_paid + interest_paid, 2)
            closing = 0.0
        else:
            emi_actual = emi
            closing = round(balance - principal_paid, 2)
        
        total_interest += interest_paid
        schedule.append({
            "month": m,
            "is_moratorium": False,
            "opening_balance": round(balance, 2),
            "emi": emi_actual,
            "principal": principal_paid,
            "interest": interest_paid,
            "closing_balance": closing
        })
        balance = closing
        if balance <= 0:
            break

    payoff_months = len([s for s in schedule if not s["is_moratorium"]]) + moratorium_months

    return {
        "expected_monthly_revenue": round(monthly_revenue, 2),
        "expected_operating_cost": round(operating_cost, 2),
        "potential_monthly_profit": potential_profit,
        "safe_repayment_capacity": safe_capacity,
        "emi": emi,
        "can_afford_emi": can_afford,
        "surplus_after_emi": surplus,
        "estimated_payoff_months": payoff_months,
        "total_interest_paid": round(total_interest, 2),
        "repayment_schedule": schedule
    }
