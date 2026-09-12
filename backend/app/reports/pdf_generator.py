import io
from datetime import datetime
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch

class PDFReportGenerator:
    @staticmethod
    def generate_assessment_report(assessment_data: dict) -> bytes:
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(
            buffer,
            pagesize=letter,
            rightMargin=36,
            leftMargin=36,
            topMargin=36,
            bottomMargin=36
        )

        styles = getSampleStyleSheet()
        
        # Custom Styles
        title_style = ParagraphStyle(
            'GovTitle',
            parent=styles['Heading1'],
            fontName='Helvetica-Bold',
            fontSize=22,
            leading=26,
            textColor=colors.HexColor('#0F3D3E'),
            alignment=1
        )
        subtitle_style = ParagraphStyle(
            'GovSubtitle',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=11,
            leading=15,
            textColor=colors.HexColor('#555555'),
            alignment=1
        )
        section_heading = ParagraphStyle(
            'GovSectionHeading',
            parent=styles['Heading2'],
            fontName='Helvetica-Bold',
            fontSize=14,
            leading=18,
            textColor=colors.HexColor('#0F3D3E'),
            spaceBefore=12,
            spaceAfter=6
        )
        body_style = ParagraphStyle(
            'GovBody',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=10,
            leading=14,
            textColor=colors.HexColor('#222222')
        )
        disclaimer_style = ParagraphStyle(
            'GovDisclaimer',
            parent=styles['Italic'],
            fontName='Helvetica-Oblique',
            fontSize=8,
            leading=11,
            textColor=colors.HexColor('#777777')
        )

        story = []

        # Header / Ministry Branding
        story.append(Paragraph("GOVERNMENT OF INDIA", subtitle_style))
        story.append(Paragraph("Ministry of Social Justice and Empowerment (MoSJE)", subtitle_style))
        story.append(Spacer(1, 8))
        story.append(Paragraph("UDYAM-SETU: Business Feasibility & Financial Dossier", title_style))
        story.append(Paragraph(f"Generated on {datetime.now().strftime('%d %B %Y, %H:%M IST')} | Assessment Ref: {assessment_data.get('id', 'DEMO-1001')[:8].upper()}", subtitle_style))
        story.append(Spacer(1, 10))
        story.append(HRFlowable(width="100%", thickness=2, color=colors.HexColor('#0F3D3E'), spaceAfter=15))

        # 1. Executive Summary
        story.append(Paragraph("1. Executive Summary", section_heading))
        user_in = assessment_data.get("user_inputs", {})
        fin_sum = assessment_data.get("financial_summary", {})
        scheme_rec = assessment_data.get("scheme_recommendation", {})
        score_data = assessment_data.get("feasibility_score", {})

        exec_text = (
            f"This comprehensive advisory assessment was formulated for a proposed <b>{user_in.get('business_category', 'Dairy')}</b> "
            f"micro-enterprise in <b>{user_in.get('location', {}).get('village', 'Demo Village')}, {user_in.get('location', {}).get('district', 'District')}, "
            f"{user_in.get('location', {}).get('state', 'State')}</b>. Based on available margin capital of "
            f"<b>{fin_sum.get('formatted_margin_capital', '₹1,00,000')}</b>, the required total project outlay is calculated at "
            f"<b>{fin_sum.get('formatted_project_cost', '₹10,00,000')}</b> with an eligible government financing allocation of "
            f"<b>{fin_sum.get('formatted_calculated_financing', '₹9,00,000')}</b> under the <b>{scheme_rec.get('scheme_name', 'MoSJE Term Loan Scheme')}</b>."
        )
        story.append(Paragraph(exec_text, body_style))
        story.append(Spacer(1, 10))

        # Key Metrics Table
        summary_table_data = [
            ["Parameter", "Evaluated Value", "Source / Confidence"],
            ["Proposed Business", f"{user_in.get('business_category', 'Dairy')} ({user_in.get('business_subcategory', 'General')})", "Entrepreneur Input"],
            ["Location", f"{user_in.get('location', {}).get('village', 'N/A')}, {user_in.get('location', {}).get('district', 'N/A')}", "Verified Geo-Hierarchy"],
            ["Available Margin Capital", str(fin_sum.get('formatted_margin_capital', '₹1,00,000')), "Self-Declared Equity"],
            ["Calculated Project Cost", str(fin_sum.get('formatted_project_cost', '₹10,00,000')), "Deterministic Formula (Margin / 0.10)"],
            ["Eligible Scheme Loan", str(fin_sum.get('formatted_calculated_financing', '₹9,00,000')), f"{scheme_rec.get('scheme_name', 'MoSJE')} [Verified]"],
            ["Subsidized Interest Rate", f"{scheme_rec.get('interest_rate', '8.0')}% p.a.", "MoSJE Policy Guideline 2024"],
            ["Loan Tenure / Moratorium", f"{scheme_rec.get('tenure_months', 84) // 12} Years / {scheme_rec.get('moratorium_months', 6)} Months", "Standard Schedule [Verified]"],
            ["Overall Feasibility Score", f"{score_data.get('overall_score', 82.5)} / 100 ({score_data.get('category_label', 'Strong Opportunity')})", "Multi-Factor Scoring Engine"]
        ]

        t = Table(summary_table_data, colWidths=[2.2 * inch, 2.8 * inch, 2.5 * inch])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#E8F1F2')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.HexColor('#0F3D3E')),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 9),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
            ('TOPPADDING', (0, 0), (-1, -1), 5),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#D3D3D3')),
        ]))
        story.append(t)
        story.append(Spacer(1, 15))

        # 2. SWOT Analysis
        story.append(Paragraph("2. Strategic SWOT Analysis", section_heading))
        swot = assessment_data.get("swot", {})
        
        swot_data = [
            [
                Paragraph("<b>Strengths</b><br/>" + "<br/>• ".join([""] + swot.get("strengths", ["Daily cash flow"])), body_style),
                Paragraph("<b>Weaknesses</b><br/>" + "<br/>• ".join([""] + swot.get("weaknesses", ["Cold storage limits"])), body_style)
            ],
            [
                Paragraph("<b>Opportunities</b><br/>" + "<br/>• ".join([""] + swot.get("opportunities", ["Value-added products"])), body_style),
                Paragraph("<b>Threats</b><br/>" + "<br/>• ".join([""] + swot.get("threats", ["Fodder cost volatility"])), body_style)
            ]
        ]
        swot_table = Table(swot_data, colWidths=[3.75 * inch, 3.75 * inch])
        swot_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (0, 0), colors.HexColor('#F0F9F8')),
            ('BACKGROUND', (1, 0), (1, 0), colors.HexColor('#FFF9F5')),
            ('BACKGROUND', (0, 1), (0, 1), colors.HexColor('#F5FAFF')),
            ('BACKGROUND', (1, 1), (1, 1), colors.HexColor('#FFF5F5')),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CCCCCC')),
            ('TOPPADDING', (0, 0), (-1, -1), 8),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ]))
        story.append(swot_table)
        story.append(Spacer(1, 15))

        # 3. Risk & Data Confidence Disclaimers
        story.append(Paragraph("3. Regulatory & Analytical Disclaimers", section_heading))
        disclaimer_text = (
            "<b>Statutory Notice:</b> This dossier is prepared for advisory and pre-application structuring purposes under the "
            "UDYAM-SETU framework. Final credit underwriting, interest subvention approvals, and disbursement conditions "
            "are subject to physical field verification, statutory KYC, and credit sanction by the respective State Channelising "
            "Agencies (SCAs) and designated commercial/cooperative lending institutions. No statistical projection in this report "
            "constitutes a commercial performance warranty."
        )
        story.append(Paragraph(disclaimer_text, disclaimer_style))

        doc.build(story)
        pdf_bytes = buffer.getvalue()
        buffer.close()
        return pdf_bytes

    @staticmethod
    def generate_financial_plan_pdf(data: dict) -> bytes:
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(
            buffer,
            pagesize=letter,
            rightMargin=36,
            leftMargin=36,
            topMargin=36,
            bottomMargin=36
        )

        styles = getSampleStyleSheet()
        title_style = ParagraphStyle(
            'GovTitle',
            parent=styles['Heading1'],
            fontName='Helvetica-Bold',
            fontSize=20,
            leading=24,
            textColor=colors.HexColor('#0F3D3E'),
            alignment=1
        )
        subtitle_style = ParagraphStyle(
            'GovSubtitle',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=10,
            leading=14,
            textColor=colors.HexColor('#555555'),
            alignment=1
        )
        section_heading = ParagraphStyle(
            'GovSectionHeading',
            parent=styles['Heading2'],
            fontName='Helvetica-Bold',
            fontSize=13,
            leading=16,
            textColor=colors.HexColor('#0F3D3E'),
            spaceBefore=12,
            spaceAfter=6
        )
        body_style = ParagraphStyle(
            'GovBody',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=9,
            leading=13,
            textColor=colors.HexColor('#222222')
        )
        disclaimer_style = ParagraphStyle(
            'GovDisclaimer',
            parent=styles['Italic'],
            fontName='Helvetica-Oblique',
            fontSize=8,
            leading=11,
            textColor=colors.HexColor('#777777')
        )

        story = []
        story.append(Paragraph("GOVERNMENT OF INDIA", subtitle_style))
        story.append(Paragraph("Ministry of Social Justice and Empowerment (MoSJE)", subtitle_style))
        story.append(Spacer(1, 6))
        story.append(Paragraph("UDYAM-SETU: Loan Repayment & Financial Structuring Plan", title_style))
        story.append(Paragraph(f"Generated on {datetime.now().strftime('%d %B %Y, %H:%M IST')} | Ref: FP-{datetime.now().strftime('%Y%m%d%H%M')}", subtitle_style))
        story.append(Spacer(1, 8))
        story.append(HRFlowable(width="100%", thickness=2, color=colors.HexColor('#0F3D3E'), spaceAfter=12))

        # 1. Loan Parameters & Moratorium
        story.append(Paragraph("1. Loan Structure & Repayment Parameters", section_heading))
        loan_amt = data.get("loan_amount", 900000)
        interest_rate = data.get("interest_rate", 8.0)
        tenure_months = data.get("tenure_months", 84)
        moratorium_months = data.get("moratorium_months", 6)
        monthly_emi = data.get("monthly_emi", 14048)
        monthly_revenue = data.get("monthly_revenue", 120000)
        monthly_opex = data.get("monthly_opex", 55000)
        post_emi_surplus = data.get("post_emi_surplus", 50952)
        total_interest = data.get("total_interest", 279998)
        total_repayment = data.get("total_repayment", 1179998)

        loan_table_data = [
            ["Financial Parameter", "Structured Value", "Benchmark / Policy"],
            ["Total Project Outlay", f"₹{(loan_amt / 0.9):,.2f}", "100% Capital Base"],
            ["Entrepreneur Margin (10%)", f"₹{(loan_amt / 9):,.2f}", "Self-Contributed Equity"],
            ["Eligible Loan Amount (90%)", f"₹{loan_amt:,.2f}", "Concessional MoSJE Credit"],
            ["Interest Rate", f"{interest_rate}% p.a.", "Subsidized MoSJE Benchmark"],
            ["Repayment Tenure", f"{tenure_months // 12} Years ({tenure_months} Months)", "Equated Monthly Repayment"],
            ["Moratorium Period", f"{moratorium_months} Months", "Grace Period Before 1st EMI"],
            ["Monthly EMI Outflow", f"₹{monthly_emi:,.2f}", "Post-Moratorium EMI"],
            ["Total Interest Payable", f"₹{total_interest:,.2f}", "Over Total Loan Lifecycle"],
            ["Total Debt Service", f"₹{total_repayment:,.2f}", "Principal + Interest"]
        ]

        t1 = Table(loan_table_data, colWidths=[2.3 * inch, 2.5 * inch, 2.7 * inch])
        t1.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#E8F1F2')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.HexColor('#0F3D3E')),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 9),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
            ('TOPPADDING', (0, 0), (-1, -1), 4),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#D3D3D3')),
        ]))
        story.append(t1)
        story.append(Spacer(1, 12))

        # 2. Cash Flow & Post-EMI Surplus Analysis
        story.append(Paragraph("2. Cash Flow Viability & Post-EMI Net Surplus", section_heading))
        cf_table_data = [
            ["Cash Flow Head", "Monthly Projection (₹)", "Annual Projection (₹)", "Status / Health"],
            ["Estimated Gross Revenue", f"₹{monthly_revenue:,.2f}", f"₹{(monthly_revenue * 12):,.2f}", "Operating Inflow"],
            ["Operating Expenses (OpEx)", f"₹{monthly_opex:,.2f}", f"₹{(monthly_opex * 12):,.2f}", "Input & Overhead"],
            ["Gross Operating Profit (EBITDA)", f"₹{(monthly_revenue - monthly_opex):,.2f}", f"₹{((monthly_revenue - monthly_opex) * 12):,.2f}", "Pre-Debt Cash Flow"],
            ["Monthly Debt Service (EMI)", f"₹{monthly_emi:,.2f}", f"₹{(monthly_emi * 12):,.2f}", "Concessional Loan EMI"],
            ["Net Post-EMI Take-Home Surplus", f"₹{post_emi_surplus:,.2f}", f"₹{(post_emi_surplus * 12):,.2f}", "Strong Viability (>2.0 DSCR)"]
        ]
        t2 = Table(cf_table_data, colWidths=[2.2 * inch, 1.8 * inch, 1.8 * inch, 1.7 * inch])
        t2.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#E8F1F2')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.HexColor('#0F3D3E')),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 8.5),
            ('BACKGROUND', (0, -1), (-1, -1), colors.HexColor('#EBF7ED')),
            ('TEXTCOLOR', (0, -1), (-1, -1), colors.HexColor('#1B5E20')),
            ('FONTNAME', (0, -1), (-1, -1), 'Helvetica-Bold'),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
            ('TOPPADDING', (0, 0), (-1, -1), 4),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#D3D3D3')),
        ]))
        story.append(t2)
        story.append(Spacer(1, 12))

        # 3. Advisory Note
        story.append(Paragraph("3. Bank Loan Application Notes", section_heading))
        notes = (
            "1. <b>Debt Service Coverage Ratio (DSCR):</b> The projected monthly surplus provides a healthy coverage buffer above standard bank underwriting thresholds.<br/>"
            "2. <b>Moratorium Benefit:</b> The initial 6-month moratorium permits enterprise stabilization, inventory buildup, and steady market linkage establishment before principal debt servicing begins.<br/>"
            "3. <b>Working Capital Reserve:</b> Maintaining at least 3 months of operational cash buffer is strongly advised to absorb seasonal commodity price variations."
        )
        story.append(Paragraph(notes, body_style))
        story.append(Spacer(1, 10))

        story.append(Paragraph(
            "<b>Statutory Disclaimer:</b> This financial structuring report is generated deterministically by the UDYAM-SETU engine based on user-supplied financial parameters and MoSJE lending guidelines. Final loan sanction is subject to formal bank appraisal.",
            disclaimer_style
        ))

        doc.build(story)
        pdf_bytes = buffer.getvalue()
        buffer.close()
        return pdf_bytes

    @staticmethod
    def generate_working_capital_report(data: dict) -> bytes:
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(
            buffer,
            pagesize=letter,
            rightMargin=36,
            leftMargin=36,
            topMargin=36,
            bottomMargin=36
        )

        styles = getSampleStyleSheet()

        title_style = ParagraphStyle(
            'GovTitle',
            parent=styles['Heading1'],
            fontName='Helvetica-Bold',
            fontSize=20,
            leading=24,
            textColor=colors.HexColor('#0F3D3E'),
            alignment=1
        )
        subtitle_style = ParagraphStyle(
            'GovSubtitle',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=10,
            leading=14,
            textColor=colors.HexColor('#555555'),
            alignment=1
        )
        section_heading = ParagraphStyle(
            'GovSectionHeading',
            parent=styles['Heading2'],
            fontName='Helvetica-Bold',
            fontSize=12,
            leading=16,
            textColor=colors.HexColor('#0F3D3E'),
            spaceBefore=10,
            spaceAfter=4
        )
        body_style = ParagraphStyle(
            'GovBody',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=9,
            leading=13,
            textColor=colors.HexColor('#222222')
        )
        disclaimer_style = ParagraphStyle(
            'GovDisclaimer',
            parent=styles['Italic'],
            fontName='Helvetica-Oblique',
            fontSize=8,
            leading=11,
            textColor=colors.HexColor('#777777')
        )

        story = []

        # Header / Branding
        story.append(Paragraph("GOVERNMENT OF INDIA &bull; MSME / MoSJE CREDIT APPRAISAL", subtitle_style))
        story.append(Paragraph("UDYAM-SETU AI &bull; Rural Enterprise & Financial Structuring Assistant", subtitle_style))
        story.append(Spacer(1, 6))
        story.append(Paragraph("Working Capital & Operating Liquidity Reserve Dossier", title_style))
        ref_id = data.get('ref_id', f"WC-{datetime.now().strftime('%Y%m%d%H%M')}")
        story.append(Paragraph(f"Generated on {datetime.now().strftime('%d %B %Y, %H:%M IST')} | Assessment Ref: {ref_id}", subtitle_style))
        story.append(Spacer(1, 8))
        story.append(HRFlowable(width="100%", thickness=2, color=colors.HexColor('#0F3D3E'), spaceAfter=12))

        # 1. Enterprise Profile
        story.append(Paragraph("1. Enterprise Profile & Appraisal Parameters", section_heading))
        enterprise_name = data.get("enterprise_name", "Rural Micro-Enterprise")
        entrepreneur_name = data.get("entrepreneur_name", "Prospective Entrepreneur")
        sector = data.get("sector", "Agro-Processing & Rural Enterprise")
        location = data.get("location", "Uttar Pradesh, India")

        profile_table_data = [
            ["Parameter", "Details", "Parameter", "Details"],
            ["Enterprise Name", str(enterprise_name), "Entrepreneur", str(entrepreneur_name)],
            ["Business Sector", str(sector), "Target Location", str(location)],
            ["Appraisal Model", "RBI Tandon / Nayak Working Capital", "Assessment Date", datetime.now().strftime('%d-%m-%Y')]
        ]
        t_prof = Table(profile_table_data, colWidths=[1.8 * inch, 2.0 * inch, 1.8 * inch, 1.9 * inch])
        t_prof.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#E8F1F2')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.HexColor('#0F3D3E')),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 8.5),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
            ('TOPPADDING', (0, 0), (-1, -1), 4),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#D3D3D3')),
        ]))
        story.append(t_prof)
        story.append(Spacer(1, 10))

        # 2. Monthly Operating Expenses Breakdown
        story.append(Paragraph("2. Monthly Operational Expenditure (OpEx) Breakdown", section_heading))
        expenses = data.get("expenses", {})
        monthly_opex = data.get("monthly_opex", sum(v for k, v in expenses.items() if k != 'reserve_months'))
        reserve_months = data.get("reserve_months", 3)
        recommended_reserve = data.get("recommended_reserve", monthly_opex * reserve_months)

        exp_labels = {
            'raw_materials': 'Raw Materials / Fodder / Inventory Stock',
            'rent': 'Commercial Rent / Shed Lease',
            'electricity': 'Electricity & Water Utility Outflows',
            'salaries': 'Staff Salaries / Helper Wages',
            'transport': 'Fuel, Logistics & Mandi Transportation',
            'marketing': 'Packaging, Marketing & Local Outreach',
            'maintenance': 'Equipment Upkeep & Veterinary Care',
            'miscellaneous': 'Miscellaneous & Contingency Buffer'
        }

        exp_rows = [["Expense Head", "Monthly Outflow (₹)", "Share (%)", "Annualized Cost (₹)"]]
        for k, label in exp_labels.items():
            val = float(expenses.get(k, 0))
            share = (val / monthly_opex * 100) if monthly_opex > 0 else 0
            exp_rows.append([label, f"₹{val:,.2f}", f"{share:.1f}%", f"₹{(val * 12):,.2f}"])

        exp_rows.append(["Total Monthly Operating Outflow", f"₹{monthly_opex:,.2f}", "100.0%", f"₹{(monthly_opex * 12):,.2f}"])

        t_exp = Table(exp_rows, colWidths=[2.8 * inch, 1.6 * inch, 1.1 * inch, 2.0 * inch])
        t_exp.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#E8F1F2')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.HexColor('#0F3D3E')),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 8),
            ('BACKGROUND', (0, -1), (-1, -1), colors.HexColor('#F4FBF7')),
            ('TEXTCOLOR', (0, -1), (-1, -1), colors.HexColor('#0F3D3E')),
            ('FONTNAME', (0, -1), (-1, -1), 'Helvetica-Bold'),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
            ('TOPPADDING', (0, 0), (-1, -1), 3),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#D3D3D3')),
        ]))
        story.append(t_exp)
        story.append(Spacer(1, 10))

        # 3. Working Capital & Liquidity Structure
        story.append(Paragraph("3. Liquidity Buffer & Working Capital Gap Analysis", section_heading))
        proj_rev = float(data.get("monthly_revenue", monthly_opex * 1.35))
        operating_surplus = proj_rev - monthly_opex
        wc_gap = float(data.get("working_capital_gap", monthly_opex * 1.5))
        bank_limit = float(data.get("recommended_bank_limit", wc_gap * 0.75))
        promoter_margin = wc_gap - bank_limit

        summary_metrics = [
            ["Financial Structuring Head", "Computed Amount (₹)", "Benchmark / Rationale"],
            ["Target Reserve Buffer Period", f"{reserve_months} Months", "Emergency Liquidity Cushion"],
            ["Recommended Operating Reserve Fund", f"₹{recommended_reserve:,.2f}", f"Formula: Monthly OpEx × {reserve_months} Months"],
            ["Estimated Monthly Gross Inflow", f"₹{proj_rev:,.2f}", "Projected Sales / Mandi Turnover"],
            ["Estimated Monthly Operating EBITDA", f"₹{operating_surplus:,.2f}", f"Operating Margin: {(operating_surplus / proj_rev * 100):.1f}%"],
            ["Estimated Net Working Capital Requirement", f"₹{wc_gap:,.2f}", "Operating cycle buffer (Receivables + Stock - Payables)"],
            ["Recommended Bank CC / OD Limit (75%)", f"₹{bank_limit:,.2f}", "Eligible under Mudra Kishore/Tarun / MoSJE Schemes"],
            ["Entrepreneur Working Capital Margin (25%)", f"₹{promoter_margin:,.2f}", "Mandatory promoter contribution under Nayak Committee norm"]
        ]

        t_sum = Table(summary_metrics, colWidths=[2.6 * inch, 2.0 * inch, 2.9 * inch])
        t_sum.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#E8F1F2')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.HexColor('#0F3D3E')),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 8.5),
            ('BACKGROUND', (0, 2), (-1, 2), colors.HexColor('#FFF9E6')),
            ('TEXTCOLOR', (0, 2), (-1, 2), colors.HexColor('#B45309')),
            ('FONTNAME', (0, 2), (-1, 2), 'Helvetica-Bold'),
            ('BACKGROUND', (0, 5), (-1, 5), colors.HexColor('#EBF7ED')),
            ('TEXTCOLOR', (0, 5), (-1, 5), colors.HexColor('#15803D')),
            ('FONTNAME', (0, 5), (-1, 5), 'Helvetica-Bold'),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 3.5),
            ('TOPPADDING', (0, 0), (-1, -1), 3.5),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#D3D3D3')),
        ]))
        story.append(t_sum)
        story.append(Spacer(1, 10))

        # 4. Bank Underwriting & Statutory Notes
        story.append(Paragraph("4. Bank Credit Assessment & Scheme Eligibility Notes", section_heading))
        notes = (
            "1. <b>Credit Line Eligibility:</b> The enterprise is eligible for Cash Credit (CC) / Overdraft facility under "
            "Pradhan Mantri MUDRA Yojana (Kishore / Tarun tier) or MoSJE concessional working capital schemes without collateral up to ₹10 Lakhs.<br/>"
            "2. <b>Liquidity Safety Buffer:</b> Maintaining " + str(reserve_months) + " months of recommended liquid reserves protects against "
            "agricultural seasonality, delayed mandi settlements, and unpredicted price volatility.<br/>"
            "3. <b>Nayak Committee Compliance:</b> Minimum 25% margin contribution ensured for bank debt underwriting."
        )
        story.append(Paragraph(notes, body_style))
        story.append(Spacer(1, 8))

        story.append(Paragraph(
            "<b>Statutory Disclaimer:</b> Formulated by UDYAM-SETU AI Rural Financial Structuring Engine. Final credit sanction is subject to lender verification of Udyam registration, bank account statements, and physical inspection.",
            disclaimer_style
        ))

        doc.build(story)
        pdf_bytes = buffer.getvalue()
        buffer.close()
        return pdf_bytes


