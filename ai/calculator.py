# AI Layer - Mathematical Rules & Calculator Engine
from decimal import Decimal, ROUND_HALF_UP
from typing import List, Tuple, Optional
import math
from pydantic import BaseModel

def format_inr(amount: Decimal) -> str:
    sign = "-" if amount < 0 else ""
    amount = abs(amount)
    amount_str = f"{amount:.2f}"
    parts = amount_str.split(".")
    integer_part = parts[0]
    decimal_part = parts[1]

    if len(integer_part) <= 3:
        formatted = integer_part
    else:
        last_three = integer_part[-3:]
        remaining = integer_part[:-3]
        groups = []
        while len(remaining) > 2:
            groups.insert(0, remaining[-2:])
            remaining = remaining[:-2]
        if remaining:
            groups.insert(0, remaining)
        formatted = ",".join(groups) + "," + last_three

    return f"{sign}₹{formatted}.{decimal_part}"

class ProjectCostResponse(BaseModel):
    margin_capital: Decimal
    project_cost: Decimal
    calculated_financing: Decimal
    financing_percentage: Decimal
    margin_percentage: Decimal
    formatted_project_cost: str
    formatted_calculated_financing: str
    formatted_margin_capital: str

class RepaymentScheduleItem(BaseModel):
    month: int
    is_moratorium: bool
    opening_balance: Decimal
    emi: Decimal
    principal_paid: Decimal
    interest_paid: Decimal
    closing_balance: Decimal

class EMIResponse(BaseModel):
    monthly_emi: Decimal
    total_principal: Decimal
    total_interest: Decimal
    total_payment: Decimal
    moratorium_months: int
    moratorium_policy_used: str
    formatted_monthly_emi: str
    formatted_total_payment: str
    formatted_total_interest: str
    schedule: List[RepaymentScheduleItem] = []
    uncertainty_note: Optional[str] = None

class FinancialEngine:
    @staticmethod
    def calculate_project_cost(margin_capital: Decimal, margin_percentage: Decimal = Decimal("10.0")) -> ProjectCostResponse:
        if margin_capital <= Decimal("0"):
            raise ValueError("Margin capital must be greater than zero.")
        margin_ratio = margin_percentage / Decimal("100")
        financing_percentage = Decimal("100") - margin_percentage
        financing_ratio = financing_percentage / Decimal("100")

        project_cost = (margin_capital / margin_ratio).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        calculated_financing = (project_cost * financing_ratio).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)

        return ProjectCostResponse(
            margin_capital=margin_capital.quantize(Decimal("0.01")),
            project_cost=project_cost,
            calculated_financing=calculated_financing,
            financing_percentage=financing_percentage,
            margin_percentage=margin_percentage,
            formatted_project_cost=format_inr(project_cost),
            formatted_calculated_financing=format_inr(calculated_financing),
            formatted_margin_capital=format_inr(margin_capital)
        )

    @staticmethod
    def calculate_emi_and_amortization(
        principal: Decimal,
        annual_interest_rate: Decimal,
        tenure_months: int,
        moratorium_months: int = 0,
        moratorium_interest_policy: str = "accrued"
    ) -> EMIResponse:
        monthly_rate = (annual_interest_rate / Decimal("100")) / Decimal("12")
        repayment_months = tenure_months - moratorium_months
        schedule: List[RepaymentScheduleItem] = []
        current_balance = principal

        for m in range(1, moratorium_months + 1):
            interest_for_month = (current_balance * monthly_rate).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
            schedule.append(RepaymentScheduleItem(
                month=m,
                is_moratorium=True,
                opening_balance=current_balance,
                emi=Decimal("0.00"),
                principal_paid=Decimal("0.00"),
                interest_paid=Decimal("0.00"),
                closing_balance=current_balance
            ))

        P = current_balance
        n = repayment_months
        r = monthly_rate

        if r == Decimal("0"):
            emi = (P / Decimal(n)).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        else:
            factor = ((Decimal("1") + r) ** n)
            emi = (P * r * factor / (factor - Decimal("1"))).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)

        total_interest_paid = Decimal("0.00")
        total_principal_paid = Decimal("0.00")

        for m in range(moratorium_months + 1, tenure_months + 1):
            interest_paid = (current_balance * monthly_rate).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
            principal_paid = emi - interest_paid

            if m == tenure_months or principal_paid > current_balance:
                principal_paid = current_balance
                emi = principal_paid + interest_paid
                closing = Decimal("0.00")
            else:
                closing = (current_balance - principal_paid).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)

            schedule.append(RepaymentScheduleItem(
                month=m,
                is_moratorium=False,
                opening_balance=current_balance,
                emi=emi,
                principal_paid=principal_paid,
                interest_paid=interest_paid,
                closing_balance=closing
            ))

            total_interest_paid += interest_paid
            total_principal_paid += principal_paid
            current_balance = closing

        total_payment = total_principal_paid + total_interest_paid

        return EMIResponse(
            monthly_emi=emi,
            total_principal=total_principal_paid.quantize(Decimal("0.01")),
            total_interest=total_interest_paid.quantize(Decimal("0.01")),
            total_payment=total_payment.quantize(Decimal("0.01")),
            moratorium_months=moratorium_months,
            moratorium_policy_used=moratorium_interest_policy,
            formatted_monthly_emi=format_inr(emi),
            formatted_total_payment=format_inr(total_payment),
            formatted_total_interest=format_inr(total_interest_paid),
            schedule=schedule
        )
