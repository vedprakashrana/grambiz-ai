from decimal import Decimal, ROUND_HALF_UP
from typing import List, Tuple, Optional
import math
from app.schemas.all_schemas import (
    ProjectCostResponse,
    EMIResponse,
    RepaymentScheduleItem,
    WorkingCapitalResponse,
    BreakEvenResponse,
    CashFlowResponse,
    CashFlowYearProjection
)

def format_inr(amount: Decimal) -> str:
    """
    Format decimal number to Indian numbering format with Rupee symbol (e.g. ₹1,00,000.00)
    """
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


class FinancialEngine:
    @staticmethod
    def calculate_project_cost(margin_capital: Decimal, margin_percentage: Decimal = Decimal("10.0")) -> ProjectCostResponse:
        """
        Deterministic project cost formula:
        Project Cost = Available Margin / (margin_percentage / 100)
        Calculated Financing = Project Cost * ((100 - margin_percentage) / 100)
        """
        if margin_capital <= Decimal("0"):
            raise ValueError("Margin capital must be greater than zero.")
        if margin_percentage <= Decimal("0") or margin_percentage >= Decimal("100"):
            raise ValueError("Margin percentage must be strictly between 0 and 100.")

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
        """
        Calculates exact EMI and monthly schedule using standard banking amortization formula.
        Handles moratorium interest policies: 'capitalized', 'serviced', 'accrued', 'waived', 'unknown'.
        """
        if principal <= Decimal("0"):
            raise ValueError("Principal must be greater than zero.")
        if tenure_months <= 0:
            raise ValueError("Tenure months must be positive.")
        if annual_interest_rate < Decimal("0"):
            raise ValueError("Interest rate cannot be negative.")

        monthly_rate = (annual_interest_rate / Decimal("100")) / Decimal("12")
        repayment_months = tenure_months - moratorium_months

        if repayment_months <= 0:
            raise ValueError("Moratorium cannot exceed or equal total loan tenure.")

        schedule: List[RepaymentScheduleItem] = []
        current_balance = principal
        uncertainty_note = None

        if moratorium_interest_policy == "unknown":
            uncertainty_note = "Exact repayment cannot be determined until official scheme moratorium rule is confirmed."

        # Process Moratorium Months
        for m in range(1, moratorium_months + 1):
            interest_for_month = (current_balance * monthly_rate).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
            
            if moratorium_interest_policy == "capitalized":
                # Interest added to principal balance
                current_balance += interest_for_month
                schedule.append(RepaymentScheduleItem(
                    month=m,
                    is_moratorium=True,
                    opening_balance=current_balance - interest_for_month,
                    emi=Decimal("0.00"),
                    principal_paid=Decimal("0.00"),
                    interest_paid=Decimal("0.00"),
                    closing_balance=current_balance
                ))
            elif moratorium_interest_policy == "serviced":
                # Beneficiary pays interest monthly during moratorium
                schedule.append(RepaymentScheduleItem(
                    month=m,
                    is_moratorium=True,
                    opening_balance=current_balance,
                    emi=interest_for_month,
                    principal_paid=Decimal("0.00"),
                    interest_paid=interest_for_month,
                    closing_balance=current_balance
                ))
            elif moratorium_interest_policy == "waived":
                schedule.append(RepaymentScheduleItem(
                    month=m,
                    is_moratorium=True,
                    opening_balance=current_balance,
                    emi=Decimal("0.00"),
                    principal_paid=Decimal("0.00"),
                    interest_paid=Decimal("0.00"),
                    closing_balance=current_balance
                ))
            else:  # accrued / default
                schedule.append(RepaymentScheduleItem(
                    month=m,
                    is_moratorium=True,
                    opening_balance=current_balance,
                    emi=Decimal("0.00"),
                    principal_paid=Decimal("0.00"),
                    interest_paid=Decimal("0.00"),
                    closing_balance=current_balance
                ))

        # Calculate standard EMI for the remaining repayment tenure
        P = current_balance
        n = repayment_months
        r = monthly_rate

        if r == Decimal("0"):
            emi = (P / Decimal(n)).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        else:
            # Formula: P * r * (1+r)^n / ((1+r)^n - 1)
            one_plus_r = Decimal("1") + r
            factor = (one_plus_r ** n)
            emi = (P * r * factor / (factor - Decimal("1"))).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)

        total_interest_paid = Decimal("0.00")
        total_principal_paid = Decimal("0.00")

        # Repayment period
        for m in range(moratorium_months + 1, tenure_months + 1):
            interest_paid = (current_balance * monthly_rate).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
            principal_paid = emi - interest_paid

            # Last month adjustment for exact zero balance
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

        # Add moratorium serviced interest to total if any
        if moratorium_interest_policy == "serviced":
            total_interest_paid += (principal * monthly_rate * Decimal(moratorium_months)).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)

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
            schedule=schedule,
            uncertainty_note=uncertainty_note
        )

    @staticmethod
    def calculate_working_capital(
        raw_materials: Decimal,
        rent: Decimal,
        electricity: Decimal,
        salaries: Decimal,
        transport: Decimal,
        marketing: Decimal,
        maintenance: Decimal,
        miscellaneous: Decimal,
        reserve_months: int = 3
    ) -> WorkingCapitalResponse:
        monthly_opex = raw_materials + rent + electricity + salaries + transport + marketing + maintenance + miscellaneous
        reserve_fund = (monthly_opex * Decimal(reserve_months)).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)

        breakdown = {
            "raw_materials": format_inr(raw_materials),
            "rent": format_inr(rent),
            "electricity": format_inr(electricity),
            "salaries": format_inr(salaries),
            "transport": format_inr(transport),
            "marketing": format_inr(marketing),
            "maintenance": format_inr(maintenance),
            "miscellaneous": format_inr(miscellaneous),
        }

        return WorkingCapitalResponse(
            monthly_operating_cost=monthly_opex.quantize(Decimal("0.01")),
            reserve_months=reserve_months,
            recommended_reserve_fund=reserve_fund,
            formatted_monthly_operating_cost=format_inr(monthly_opex),
            formatted_recommended_reserve_fund=format_inr(reserve_fund),
            expense_breakdown=breakdown
        )

    @staticmethod
    def calculate_break_even(
        fixed_costs: Decimal,
        variable_cost_per_unit: Decimal,
        selling_price_per_unit: Decimal,
        estimated_monthly_units: Optional[int] = None
    ) -> BreakEvenResponse:
        contribution_margin = selling_price_per_unit - variable_cost_per_unit
        if contribution_margin <= Decimal("0"):
            return BreakEvenResponse(
                contribution_margin_per_unit=contribution_margin,
                contribution_margin_ratio=Decimal("0.00"),
                break_even_units=Decimal("0.00"),
                break_even_revenue=Decimal("0.00"),
                is_viable=False,
                formatted_break_even_revenue=format_inr(Decimal("0")),
                notes=["Selling price per unit must be greater than variable cost per unit to achieve positive unit economics."]
            )

        be_units = (fixed_costs / contribution_margin).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        be_revenue = (be_units * selling_price_per_unit).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        margin_ratio = (contribution_margin / selling_price_per_unit).quantize(Decimal("0.0001"), rounding=ROUND_HALF_UP)

        notes = []
        if estimated_monthly_units is not None:
            if Decimal(estimated_monthly_units) >= be_units:
                notes.append(f"Estimated production capacity of {estimated_monthly_units} units exceeds break-even threshold of {math.ceil(be_units)} units.")
            else:
                notes.append(f"Capacity warning: Target production of {estimated_monthly_units} is below break-even point of {math.ceil(be_units)} units.")

        return BreakEvenResponse(
            contribution_margin_per_unit=contribution_margin.quantize(Decimal("0.01")),
            contribution_margin_ratio=(margin_ratio * Decimal("100")).quantize(Decimal("0.01")),
            break_even_units=be_units,
            break_even_revenue=be_revenue,
            is_viable=True,
            formatted_break_even_revenue=format_inr(be_revenue),
            notes=notes
        )

    @staticmethod
    def calculate_cash_flow(
        estimated_monthly_revenue: Decimal,
        monthly_operating_expense: Decimal,
        monthly_emi: Decimal,
        projection_years: int = 3,
        annual_revenue_growth_percent: Decimal = Decimal("5.0"),
        annual_expense_growth_percent: Decimal = Decimal("3.0")
    ) -> CashFlowResponse:
        projections: List[CashFlowYearProjection] = []
        cumulative = Decimal("0.00")

        base_monthly_rev = estimated_monthly_revenue
        base_monthly_opex = monthly_operating_expense

        for yr in range(1, projection_years + 1):
            rev_factor = (Decimal("1") + (annual_revenue_growth_percent / Decimal("100"))) ** (yr - 1)
            exp_factor = (Decimal("1") + (annual_expense_growth_percent / Decimal("100"))) ** (yr - 1)

            annual_rev = (base_monthly_rev * Decimal("12") * rev_factor).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
            annual_opex = (base_monthly_opex * Decimal("12") * exp_factor).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
            annual_debt = (monthly_emi * Decimal("12")).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)

            net_cash = annual_rev - annual_opex - annual_debt
            cumulative += net_cash

            projections.append(CashFlowYearProjection(
                year=yr,
                annual_revenue=annual_rev,
                annual_opex=annual_opex,
                annual_debt_service=annual_debt,
                net_annual_cash_flow=net_cash,
                cumulative_cash_flow=cumulative
            ))

        avg_monthly_net = (projections[0].net_annual_cash_flow / Decimal("12")).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP) if projections else Decimal("0.00")
        
        dscr = None
        if monthly_emi > Decimal("0"):
            annual_net_operating_income = (base_monthly_rev - base_monthly_opex) * Decimal("12")
            annual_debt = monthly_emi * Decimal("12")
            if annual_debt > 0:
                dscr = (annual_net_operating_income / annual_debt).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)

        return CashFlowResponse(
            projections=projections,
            average_monthly_net_cash_flow=avg_monthly_net,
            debt_service_coverage_ratio=dscr
        )
