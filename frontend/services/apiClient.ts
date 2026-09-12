// API Client Configuration for UDYAM-SETU Frontend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const ApiClient = {
  // Multilingual Translation (Bhashini / IndicTrans2)
  async translate(text: string, targetLang: string, sourceLang: string = 'en') {
    try {
      const res = await fetch(`${API_BASE_URL}/translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, target_lang: targetLang, source_lang: sourceLang })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Translate API call failed, using source text:', e);
    }
    return { translated_text: text };
  },

  // Financial Calculations
  async calculateProjectCost(marginCapital: number, marginPercentage: number = 10) {
    const res = await fetch(`${API_BASE_URL}/finance/project-cost`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ margin_capital: marginCapital, margin_percentage: marginPercentage })
    });
    return await res.json();
  },

  async calculateEMI(principal: number, interestRate: number, tenureMonths: number, moratoriumMonths: number = 0) {
    const res = await fetch(`${API_BASE_URL}/finance/emi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        principal,
        annual_interest_rate: interestRate,
        tenure_months: tenureMonths,
        moratorium_months: moratoriumMonths
      })
    });
    return await res.json();
  },

  // AI Conversational Chat
  async sendChatMessage(message: string, conversationId?: string, preferredLang: string = 'hi') {
    const res = await fetch(`${API_BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        conversation_id: conversationId,
        preferred_language: preferredLang
      })
    });
    return await res.json();
  },

  // Live APMC Mandi Data
  async getLiveMandiPrices(category?: string, district?: string) {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (district) params.append('district', district);
    const res = await fetch(`${API_BASE_URL}/pro/mandi/live?${params.toString()}`);
    return await res.json();
  },

  // Pro ML Forecasting
  async getMLForecast(category: string, unitPrice: number, volume: number, months: number = 6) {
    const res = await fetch(`${API_BASE_URL}/pro/ml/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category,
        current_unit_price: unitPrice,
        monthly_base_volume: volume,
        months_ahead: months
      })
    });
    return await res.json();
  },

  // Pro Document OCR Scanner
  async scanDocument(documentName: string, sampleText?: string) {
    const res = await fetch(`${API_BASE_URL}/pro/ocr/scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        document_name: documentName,
        sample_text: sampleText
      })
    });
    return await res.json();
  }
};
