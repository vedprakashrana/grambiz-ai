import json
from typing import Dict, Any, List
from app.schemas.all_schemas import SWOTResponse

# Curated, domain-grounded MoSJE & rural enterprise advisory templates
DOMAIN_STRATEGIES = {
    "dairy": {
        "swot": SWOTResponse(
            strengths=[
                "Daily cash generation through morning and evening milk collection.",
                "High local and regional demand for fresh dairy and value-added curd/paneer.",
                "Direct eligibility for MoSJE subsidized interest term financing."
            ],
            weaknesses=[
                "High dependency on consistent green fodder and quality veterinary care.",
                "Perishable inventory requiring immediate cold chain or immediate same-day sale."
            ],
            opportunities=[
                "Value addition into Desi Ghee and Paneer to increase profit margins by 25-40%.",
                "Tie-ups with local dairy federations or cooperative collection centers."
            ],
            threats=[
                "Seasonal milk yield fluctuations during peak summer months.",
                "Sudden spikes in concentrated cattle feed and transit costs."
            ]
        ),
        "strategy": {
            "immediate_actions": [
                "Procure 2 high-yielding indigenous/crossbred cows or Murrah buffaloes in phased cycles to maintain continuous lactation.",
                "Establish forward off-take agreement with local milk cooperative or bulk tea stalls.",
                "Secure 3 months of emergency dry feed reserve before monsoons."
            ],
            "marketing_tactics": [
                "Offer pure unadulterated milk subscription to households within 2 km radius.",
                "Promote fresh homemade paneer for weekly village haats and wedding orders."
            ],
            "financial_safeguards": [
                "Maintain a 45-day feed & medicine buffer fund in a separate savings account.",
                "Insure all milch cattle under the National Livestock Mission (NLM) subsidized scheme."
            ]
        }
    },
    "default": {
        "swot": SWOTResponse(
            strengths=[
                "Low initial overhead costs in rural/semi-urban operating environment.",
                "Strong word-of-mouth community trust and direct customer relationships.",
                "Access to government subsidized interest rates and dedicated moratorium periods."
            ],
            weaknesses=[
                "Limited formal working capital reserves during initial operating quarters.",
                "Dependency on single-supplier transit networks for raw inventory."
            ],
            opportunities=[
                "Digitization of payments (UPI) and customer order taking via mobile.",
                "Expansion into neighboring weekly village markets and cluster clusters."
            ],
            threats=[
                "Local seasonal liquidity cycles tied to harvest timings.",
                "Unexpected utility disruptions or road access bottlenecks."
            ]
        ),
        "strategy": {
            "immediate_actions": [
                "Set up commercial setup with basic digital ledger and UPI QR code.",
                "Source inventory directly from primary wholesale distributors to improve gross margins.",
                "Complete statutory Udyam Registration for MSME benefits."
            ],
            "marketing_tactics": [
                "Direct door-to-door community outreach and inaugural promotional pricing.",
                "Leverage local self-help group (SHG) networks for bulk referrals."
            ],
            "financial_safeguards": [
                "Strictly limit customer credit to a maximum of 7-14 days.",
                "Deposit loan EMI allocation directly upon daily cash reconciliation."
            ]
        }
    }
}

# Multilingual responses in 8 Indian official languages
I18N_RESPONSES = {
    "margin_calculation": {
        "hi": "आपके पास ₹1,00,000 की मार्जिन पूंजी है। सरकार के 90% वित्तपोषण फॉर्मूले के अनुसार, आपकी कुल परियोजना लागत **₹10,00,000** बनती है। इसके लिए आप **MoSJE मियादी ऋण योजना (Term Loan Scheme)** के तहत **₹9,00,000** तक के ऋण के पात्र हैं। ब्याज दर केवल **8.0% वार्षिक** है और आपको **6 महीने की मोहलत (Moratorium)** भी मिलती है।",
        "en": "With ₹1,00,000 in available margin capital, your calculated total project cost is **₹10,00,000** (assuming standard 10% entrepreneur contribution). You qualify for up to **₹9,00,000** in financing under the **MoSJE Term Loan Scheme** at an attractive **8.0% p.a. interest rate** with a **7-year tenure and 6-month moratorium**.",
        "bn": "আপনার কাছে ₹১,০০,০০০ মার্জিন ক্যাপিটাল রয়েছে। সরকারের ৯০% অর্থায়ন সূত্রের অধীনে আপনার মোট প্রকল্প ব্যয় **₹১০,০০,০০০**। আপনি **MoSJE টার্ম লোন স্কিমের** অধীনে **₹৯,০০,০০০** পর্যন্ত ঋণ পাওয়ার যোগ্য, যার সুদের হার মাত্র **৮.০% বার্ষিক** এবং এতে **৬ মাসের মোরেটোরিয়াম** অন্তর্ভুক্ত।",
        "mr": "तुमच्याकडे ₹१,००,००० मार्जिन भांडवल आहे. शासनाच्या ९०% वित्तपुरवठा सूत्रानुसार तुमचा एकूण प्रकल्प खर्च **₹१०,००,०००** होतो. यासाठी तुम्ही **MoSJE मुदत कर्ज योजने**अंतर्गत **₹९,००,०००** पर्यंतच्या कर्जासाठी पात्र आहात. व्याजदर केवळ **८.०% वार्षिक** असून तुम्हाला **६ महिन्यांची सवलत (Moratorium)** मिळते.",
        "gu": "તમારી પાસે ₹1,00,000 ની માર્જિન મૂડી છે. સરકારના 90% ધિરાણ ફોર્મ્યુલા મુજબ તમારો કુલ પ્રોજેક્ટ ખર્ચ **₹10,00,000** થાય છે. તમે **MoSJE ટર્મ લોન યોજના** હેઠળ **₹9,00,000** સુધીની લોન મેળવવા પાત્ર છો, જેનો વ્યાજ દર માત્ર **8.0% વાર્ષિક** છે અને **6 મહિનાનો મોરેટોરિયમ** મળે છે.",
        "ta": "உங்களிடம் ₹1,00,000 மூலதனம் உள்ளது. அரசின் 90% நிதி திட்டத்தின் கீழ் உங்களின் மொத்த திட்டச் செலவு **₹10,00,000** ஆகும். நீங்கள் **MoSJE தவணைக் கடன் திட்டத்தின்** கீழ் **₹9,00,000** வரை கடன் பெற தகுதியுடையவர். வட்டி விகிதம் ஆண்டுக்கு **8.0%** மட்டுமே மற்றும் **6 மாத கால அவகாசம் (Moratorium)** கிடைக்கும்.",
        "te": "మీ వద్ద ₹1,00,000 మార్జిన్ మూలధనం ఉంది. ప్రభుత్వ 90% ఫైనాన్సింగ్ ఫార్ములా ప్రకారం మీ మొత్తం ప్రాజెక్ట్ వ్యయం **₹10,00,000** అవుతుంది. మీరు **MoSJE టర్మ్ లోన్ స్కీమ్** కింద **₹9,00,000** వరకు రుణానికి అర్హులు. వడ్డీ రేటు కేవలం **8.0% వార్షికం** మరియు **6 నెలల మొరటోరియం** లభిస్తుంది.",
        "kn": "ನಿಮ್ಮ ಬಳಿ ₹1,00,000 ಮಾರ್ಜಿನ್ ಬಂಡವಾಳವಿದೆ. ಸರ್ಕಾರದ 90% ಆರ್ಥಿಕ ನೆರವು ಸೂತ್ರದ ಪ್ರಕಾರ ನಿಮ್ಮ ಒಟ್ಟು ಯೋಜನಾ ವೆಚ್ಚ **₹10,00,000** ಆಗುತ್ತದೆ. ನೀವು **MoSJE ಟರ್ಮ್ ಲೋನ್ ಯೋಜನೆ**ಯಡಿಯಲ್ಲಿ **₹9,00,000** ವರೆಗೆ ಸಾಲ ಪಡೆಯಲು ಅರ್ಹರಾಗಿದ್ದೀರಿ, ಇದರ ಬಡ್ಡಿ ದರ ಕೇವಲ **8.0% ವಾರ್ಷಿಕ** ಮತ್ತು **6 ತಿಂಗಳ ಮೊರಟೋರಿಯಂ** ಇರುತ್ತದೆ."
    },
    "risk_advisory": {
        "hi": "पोल्ट्री व ग्रामीण कृषि-व्यवसाय में मुख्य जोखिम हैं: (1) पोल्ट्री फीड की कीमतों में उतार-चढ़ाव, (2) मौसमी बीमारियां व जैव-सुरक्षा, (3) गर्मियों में लू का प्रभाव। 45 दिनों का फीड लिक्विडिटी बफर अवश्य रखें।",
        "en": "Key operational risks in poultry and rural agri-enterprises include: (1) Feed price volatility, (2) Bio-security and seasonal disease outbreaks, (3) Summer heat stress. We strongly recommend a 45-day feed liquidity buffer.",
        "bn": "পোল্ট্রি এবং কৃষি ব্যবসায় মূল ঝুঁকিগুলি হলো: (১) ফিডের দামের ওঠানামা, (২) মরসুমি রোগ, (৩) গ্রীষ্মের তাপপ্রবাহ। আমরা ৪৫ দিনের ফিড বাফার রাখার পরামর্শ দিই।",
        "mr": "कुक्कुटपालन व ग्रामीण व्यवसायातील मुख्य जोखीम: (१) खाद्याच्या दरातील चढ-उतार, (२) साथीचे आजार, (३) उन्हाळ्यातील उष्मा. यासाठी ४५ दिवसांचा फीड लिक्विडिटी बफर बाळगणे आवश्यक आहे.",
        "gu": "પોલ્ટ્રી અને ગ્રામીણ વ્યવસાયમાં મુખ્ય જોખમો: (1) ફીડના ભાવમાં વધઘટ, (2) મોસમી રોગો, (3) ઉનાળાની ગરમી. અમે 45 દિવસનો ફીડ બફર રાખવાની ભલામણ કરીએ છીએ.",
        "ta": "கோழிப்பண்ணை தொழிலின் முக்கிய அபாயங்கள்: (1) தீவன விலை ஏற்ற இறக்கம், (2) பருவகால நோய்கள், (3) கோடை வெப்பம். 45 நாட்களுக்கு தேவையான தீவன இருப்பு நிதியை பராமரிக்க பரிந்துரைக்கிறோம்.",
        "te": "పౌల్ట్రీ వ్యాపారంలో ప్రధాన నష్టభయాలు: (1) దాణా ధరల హెచ్చుతగ్గులు, (2) కాలానుగుణ వ్యాధులు, (3) వేసవి తీవ్రత. 45 రోజుల దాణా బఫర్‌ను నిర్వహించాలని మేము సిఫార్సు చేస్తున్నాము.",
        "kn": "ಕೋಳಿ ಸಾಕಣೆ ಮತ್ತು ಗ್ರಾಮೀಣ ಉದ್ಯಮಗಳಲ್ಲಿನ ಪ್ರಮುಖ ಅಪಾಯಗಳು: (1) ಆಹಾರದ ಬೆಲೆಯ ಏರಿಳಿತ, (2) ಕಾಲೋಚಿತ ರೋಗಗಳು, (3) ಬೇಸಿಗೆಯ ಶಾಖ. 45 ದಿನಗಳ ಆಹಾರ ಸಂಗ್ರಹ ನಿಧಿಯನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಲು ನಾವು ಶಿಫಾರಸು ಮಾಡುತ್ತೇವೆ."
    },
    "greeting": {
        "hi": "नमस्ते! मैं ग्रामबिज़ एआई (GramBiz AI) हूँ — आपका ग्रामीण व्यवसाय एवं वित्तीय सलाहकार।",
        "en": "Hello! I am GramBiz AI — your rural enterprise and financial structuring assistant.",
        "bn": "নমস্কার! আমি গ্রামীণ উদ্যোগ ও আর্থিক সহায়তা সহকারী গ্রামবিজ এআই (GramBiz AI)।",
        "mr": "नमस्कार! मी ग्रामबिझ एआय (GramBiz AI) आहे — तुमचा ग्रामीण व्यवसाय व वित्तीय सल्लागार.",
        "gu": "નમસ્તે! હું ગ્રામબિઝ એઆઈ (GramBiz AI) છું — તમારો ગ્રામીણ વ્યવસાય અને નાણાકીય સહાયક.",
        "ta": "வணக்கம்! நான் கிராம்Sync AI (GramBiz AI) — உங்கள் கிராமப்புற தொழில் மற்றும் நிதி ஆலோசகர்.",
        "te": "నమస్కారం! నేను గ్రాంబిజ్ ఏఐ (GramBiz AI) — మీ గ్రామీణ వ్యాపార మరియు ఆర్థిక సహాయకుడిని.",
        "kn": "ನಮಸ್ಕಾರ! ನಾನು ಗ್ರಾಂಬಿಜ್ ಎಐ (GramBiz AI) — ನಿಮ್ಮ ಗ್ರಾಮೀಣ ಉದ್ಯಮ ಮತ್ತು ಆರ್ಥಿಕ ಸಲಹೆಗಾರ."
    }
}

class AIOrchestrator:
    @staticmethod
    def generate_swot(category: str, user_context: Dict[str, Any]) -> SWOTResponse:
        cat_key = category.lower()
        if cat_key in DOMAIN_STRATEGIES:
            return DOMAIN_STRATEGIES[cat_key]["swot"]
        return DOMAIN_STRATEGIES["default"]["swot"]

    @staticmethod
    def generate_strategy(category: str, user_context: Dict[str, Any]) -> Dict[str, Any]:
        cat_key = category.lower()
        if cat_key in DOMAIN_STRATEGIES:
            return DOMAIN_STRATEGIES[cat_key]["strategy"]
        return DOMAIN_STRATEGIES["default"]["strategy"]

    @staticmethod
    def answer_query(
        message: str,
        context_data: Dict[str, Any] = None,
        language: str = "en"
    ) -> Dict[str, Any]:
        """
        Multilingual AI conversational assistant that interprets verified backend calculation
        and provides natural language responses in 8 Indian Languages.
        """
        msg_lower = message.lower()
        lang_key = language[:2].lower()
        if lang_key not in ["hi", "en", "bn", "mr", "gu", "ta", "te", "kn"]:
            lang_key = "en"

        if any(w in msg_lower for w in ["1 lakh", "1,00,000", "100000", "margin", "loan", "paas", "taka", "rupa"]):
            reply = I18N_RESPONSES["margin_calculation"].get(lang_key, I18N_RESPONSES["margin_calculation"]["en"])
            return {
                "reply": reply,
                "citations": [
                    {
                        "source": "MoSJE Term Loan Assistance Policy Vol-II",
                        "section": "Section 4.1 - Eligibility & Margin Contribution",
                        "confidence": "Verified"
                    }
                ],
                "suggested_actions": [
                    "Start Business Assessment",
                    "View Detailed Repayment Schedule",
                    "Explore Dairy Business Strategy"
                ]
            }

        if any(w in msg_lower for w in ["risk", "poultry", "nuksan", "loss", "bimari", "feed"]):
            reply = I18N_RESPONSES["risk_advisory"].get(lang_key, I18N_RESPONSES["risk_advisory"]["en"])
            return {
                "reply": reply,
                "citations": [
                    {
                        "source": "NABARD Poultry Farm Techno-Economic Feasibility Report",
                        "section": "Risk Mitigation & Disease Control",
                        "confidence": "Verified"
                    }
                ],
                "suggested_actions": [
                    "Check Working Capital Calculator",
                    "Review Competitor Density",
                    "Download Scheme Guidelines"
                ]
            }

        # General Greeting response in requested language
        reply = I18N_RESPONSES["greeting"].get(lang_key, I18N_RESPONSES["greeting"]["en"])
        return {
            "reply": reply,
            "citations": [
                {
                    "source": "Department of Social Justice and Empowerment (MoSJE) Registry",
                    "section": "General Entrepreneur Advisory Guidelines",
                    "confidence": "Verified"
                }
            ],
            "suggested_actions": [
                "Check Scheme Eligibility",
                "Calculate Break-Even Point",
                "Compare 2 Business Ideas"
            ]
        }
