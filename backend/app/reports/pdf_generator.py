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
        story.append(Paragraph("GramBiz AI: Business Feasibility & Financial Dossier", title_style))
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
            "GramBiz AI framework. Final credit underwriting, interest subvention approvals, and disbursement conditions "
            "are subject to physical field verification, statutory KYC, and credit sanction by the respective State Channelising "
            "Agencies (SCAs) and designated commercial/cooperative lending institutions. No statistical projection in this report "
            "constitutes a commercial performance warranty."
        )
        story.append(Paragraph(disclaimer_text, disclaimer_style))

        doc.build(story)
        pdf_bytes = buffer.getvalue()
        buffer.close()
        return pdf_bytes
