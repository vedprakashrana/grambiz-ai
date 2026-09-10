'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode = 'hi' | 'en' | 'bn' | 'mr' | 'gu' | 'ta' | 'te' | 'kn';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  speechCode: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', speechCode: 'hi-IN' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', speechCode: 'en-IN' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', speechCode: 'bn-IN' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', speechCode: 'mr-IN' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', speechCode: 'gu-IN' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', speechCode: 'ta-IN' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', speechCode: 'te-IN' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', speechCode: 'kn-IN' }
];

export const UI_TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  hi: {
    home: 'होम',
    advisor: 'बिजनेस एडवाइजर',
    ocr: 'दस्तावेज़ स्कैनर',
    forecast: 'एमएल भविष्यवाणी',
    mandi: 'लाइव मंडी भाव',
    compare: 'बिजनेस तुलना',
    voiceAi: 'वॉइस एआई',
    admin: 'एडमिन पोर्टल',
    newAssessment: 'नया असेसमेंट',
    startAssessment: 'बिजनेस असेसमेंट शुरू करें',
    tagline: 'सामाजिक न्याय एवं अधिकारिता मंत्रालय (MoSJE)',
    heroTitle: 'ग्रामीण उद्यम और वित्तीय संरचना सहायक'
  },
  en: {
    home: 'Home',
    advisor: 'Advisor Wizard',
    ocr: 'OCR Scanner',
    forecast: 'ML Forecast',
    mandi: 'Live Mandi',
    compare: 'Compare',
    voiceAi: 'Voice AI',
    admin: 'Admin',
    newAssessment: 'New Assessment',
    startAssessment: 'Start Business Assessment',
    tagline: 'Dept of Social Justice & Empowerment (MoSJE)',
    heroTitle: 'Rural Enterprise & Financial Structuring Assistant'
  },
  bn: {
    home: 'হোম',
    advisor: 'উপদেষ্টা উইজার্ড',
    ocr: 'নথি স্ক্যানার',
    forecast: 'এমএল পূর্বাভাস',
    mandi: 'লাইভ মান্ডি দর',
    compare: 'উদ্যোগ তুলনা',
    voiceAi: 'ভয়েস এআই',
    admin: 'অ্যাডমিন',
    newAssessment: 'নতুন মূল্যায়ন',
    startAssessment: 'মূল্যায়ন শুরু করুন',
    tagline: 'সামাজিক ন্যায় ও ক্ষমতায়ন মন্ত্রণালয় (MoSJE)',
    heroTitle: 'গ্রামীণ উদ্যোগ এবং আর্থিক সহায়তা সহকারী'
  },
  mr: {
    home: 'मुख्यपृष्ठ',
    advisor: 'व्यवसाय सल्लागार',
    ocr: 'कागदपत्र स्कॅनर',
    forecast: 'एमएल अंदाज',
    mandi: 'थेट बाजारभाव',
    compare: 'व्यवसाय तुलना',
    voiceAi: 'व्हॉइस एआय',
    admin: 'प्रशासक',
    newAssessment: 'नवीन मूल्यांकन',
    startAssessment: 'व्यवसाय मूल्यांकन सुरू करा',
    tagline: 'सामाजिक न्याय आणि सक्षमीकरण मंत्रालय (MoSJE)',
    heroTitle: 'ग्रामीण व्यवसाय आणि वित्तीय सहाय्यक'
  },
  gu: {
    home: 'હોમ',
    advisor: 'બિઝનેસ સલાહકાર',
    ocr: 'દસ્તાવેજ સ્કેનર',
    forecast: 'એમએલ આગાહી',
    mandi: 'લાઈવ માર્કેટ યાર્ડ',
    compare: 'સરખામણી',
    voiceAi: 'વોઈસ એઆઈ',
    admin: 'એડમિન',
    newAssessment: 'નવું મૂલ્યાંકન',
    startAssessment: 'મૂલ્યાંકન શરૂ કરો',
    tagline: 'સામાજિક ન્યાય અને અધિકારીતા મંત્રાલય (MoSJE)',
    heroTitle: 'ગ્રામીણ વ્યવસાય અને નાણાકીય સહાયક'
  },
  ta: {
    home: 'முகப்பு',
    advisor: 'தொழில் ஆலோசகர்',
    ocr: 'ஆவண ஸ்கேனர்',
    forecast: 'முன்னறிவிப்பு',
    mandi: 'நேரடி சந்தை விலை',
    compare: 'தொழில் ஒப்பீடு',
    voiceAi: 'வாய்ஸ் ஏஐ',
    admin: 'நிர்வாகம்',
    newAssessment: 'புதிய மதிப்பீடு',
    startAssessment: 'மதிப்பீட்டைத் தொடங்குங்கள்',
    tagline: 'சமூக நீதி மற்றும் அதிகாரமளித்தல் அமைச்சகம் (MoSJE)',
    heroTitle: 'கிராமப்புற தொழில் மற்றும் நிதி ஆலோசகர்'
  },
  te: {
    home: 'హోమ్',
    advisor: 'వ్యాపార సలహాదారు',
    ocr: 'డాక్యుమెంట్ స్కానర్',
    forecast: 'ధరల అంచనా',
    mandi: 'లైవ్ మార్కెట్ ధరలు',
    compare: 'వ్యాపార పోలిక',
    voiceAi: 'వాయిస్ ఏఐ',
    admin: 'అడ్మిన్',
    newAssessment: 'కొత్త అంచనా',
    startAssessment: 'వ్యాపార అంచనా ప్రారంభించండి',
    tagline: 'సామాజిక న్యాయం మరియు సాధికారత మంత్రిత్వ శాఖ (MoSJE)',
    heroTitle: 'గ్రామీణ వ్యాపార మరియు ఆర్థిక సహాయకుడు'
  },
  kn: {
    home: 'ಮುಖಪುಟ',
    advisor: 'ಉದ್ಯಮ ಸಲಹೆಗಾರ',
    ocr: 'ದಾಖಲೆ ಸ್ಕ್ಯಾನರ್',
    forecast: 'ಮುನ್ಸೂಚನೆ',
    mandi: 'ಲೈವ್ ಮಾರುಕಟ್ಟೆ ದರ',
    compare: 'ಉದ್ಯಮ ಹೋಲಿಕೆ',
    voiceAi: 'ಧ್ವನಿ ಎಐ',
    admin: 'ನಿರ್ವಾಹಕ',
    newAssessment: 'ಹೊಸ ಮೌಲ್ಯಮಾಪನ',
    startAssessment: 'ಮೌಲ್ಯಮಾಪನ ಪ್ರಾರಂಭಿಸಿ',
    tagline: 'ಸಾಮಾಜಿಕ ನ್ಯಾಯ ಮತ್ತು ಸಬಲೀಕರಣ ಸಚಿವಾಲಯ (MoSJE)',
    heroTitle: 'ಗ್ರಾಮೀಣ ಉದ್ಯಮ ಮತ್ತು ಆರ್ಥಿಕ ಸಲಹೆಗಾರ'
  }
};

interface LanguageContextType {
  currentLang: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  currentOption: LanguageOption;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLang] = useState<LanguageCode>('hi');

  const currentOption = SUPPORTED_LANGUAGES.find(l => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  const t = (key: string): string => {
    return UI_TRANSLATIONS[currentLang]?.[key] || UI_TRANSLATIONS['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setLanguage: setCurrentLang, currentOption, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
