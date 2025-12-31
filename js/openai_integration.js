// ============================================
// OpenAI Integration with Market-Aware Analysis
// Smart recommendations based on supply gaps & market demand
// ============================================

// API Key Configuration
let OPENAI_API_KEY = 'sk-abcd1234abcd1234abcd1234abcd1234abcd1234';

function setOpenAIKey(key) {
    OPENAI_API_KEY = key;
    localStorage.setItem('openai_api_key', key);
}

function getOpenAIKey() {
    const storedKey = localStorage.getItem('openai_api_key');
    if (storedKey) {
        OPENAI_API_KEY = storedKey;
    }
    return OPENAI_API_KEY;
}

function hasOpenAIKey() {
    return getOpenAIKey().length > 10;
}

// Market intelligence data - crops with high demand but low supply
const MARKET_INTELLIGENCE = {
    high_demand_low_supply: [
        { crop: 'Dragon Fruit', demand_growth: '45%', import_dependency: '80%', avg_price: '150-300/kg', reason: 'Growing health consciousness, most supply imported from Vietnam' },
        { crop: 'Avocado', demand_growth: '35%', import_dependency: '95%', avg_price: '200-400/kg', reason: 'Urban demand surging, almost entirely imported' },
        { crop: 'Quinoa', demand_growth: '60%', import_dependency: '90%', avg_price: '400-600/kg', reason: 'Superfood trend, minimal domestic production' },
        { crop: 'Chia Seeds', demand_growth: '55%', import_dependency: '85%', avg_price: '800-1200/kg', reason: 'Health food demand, mostly imported' },
        { crop: 'Kiwi', demand_growth: '30%', import_dependency: '70%', avg_price: '150-250/kg', reason: 'Limited cultivation in India, high urban demand' },
        { crop: 'Blueberry', demand_growth: '50%', import_dependency: '95%', avg_price: '600-1000/kg', reason: 'Premium pricing, almost no domestic production' },
        { crop: 'Asparagus', demand_growth: '40%', import_dependency: '90%', avg_price: '300-500/kg', reason: 'Hotel/restaurant demand, minimal local supply' },
        { crop: 'Broccoli', demand_growth: '25%', import_dependency: '30%', avg_price: '80-120/kg', reason: 'Health vegetable with growing demand' },
        { crop: 'Cherry Tomato', demand_growth: '35%', import_dependency: '20%', avg_price: '100-200/kg', reason: 'Gourmet restaurants, urban retail chains' },
        { crop: 'Baby Corn', demand_growth: '30%', import_dependency: '40%', avg_price: '80-150/kg', reason: 'Chinese cuisine popularity, export potential' },
        { crop: 'Sweet Corn', demand_growth: '28%', import_dependency: '25%', avg_price: '40-70/kg', reason: 'Street food, processing industry demand' },
        { crop: 'Lettuce (Iceberg)', demand_growth: '40%', import_dependency: '15%', avg_price: '80-150/kg', reason: 'Fast food chains, salad culture growing' },
        { crop: 'Zucchini', demand_growth: '35%', import_dependency: '60%', avg_price: '60-100/kg', reason: 'Continental cuisine, health food trend' },
        { crop: 'Bell Pepper (Colored)', demand_growth: '32%', import_dependency: '35%', avg_price: '100-200/kg', reason: 'Premium pricing over green capsicum' },
        { crop: 'Strawberry', demand_growth: '38%', import_dependency: '50%', avg_price: '200-400/kg', reason: 'Dessert industry, limited growing regions' },
        { crop: 'Mushroom (Oyster/Shiitake)', demand_growth: '45%', import_dependency: '40%', avg_price: '200-400/kg', reason: 'Gourmet market, medicinal properties' },
        { crop: 'Saffron', demand_growth: '20%', import_dependency: '85%', avg_price: '150000-300000/kg', reason: 'Worlds most expensive spice, limited to Kashmir' },
        { crop: 'Black Rice', demand_growth: '50%', import_dependency: '70%', avg_price: '150-250/kg', reason: 'Superfood status, very limited cultivation' },
        { crop: 'Moringa', demand_growth: '55%', import_dependency: '10%', avg_price: '200-400/kg (powder)', reason: 'Export demand booming, nutritional supplements' },
        { crop: 'Stevia', demand_growth: '65%', import_dependency: '80%', avg_price: '300-500/kg', reason: 'Sugar substitute, diabetic-friendly products' }
    ],
    emerging_export_crops: [
        { crop: 'Gherkins', export_value: '$300M+', growth: '15%', markets: 'USA, Europe, Russia' },
        { crop: 'Pomegranate', export_value: '$100M+', growth: '20%', markets: 'UAE, UK, Netherlands' },
        { crop: 'Fresh Grapes', export_value: '$350M+', growth: '12%', markets: 'EU, UK, Russia' },
        { crop: 'Mango (Alphonso/Kesar)', export_value: '$50M+', growth: '18%', markets: 'UAE, USA, UK' },
        { crop: 'Banana (Cavendish)', export_value: '$200M+', growth: '25%', markets: 'Middle East, Iran, Iraq' },
        { crop: 'Green Chilli', export_value: '$100M+', growth: '10%', markets: 'Bangladesh, Sri Lanka, Malaysia' }
    ],
    processing_industry_demand: [
        { crop: 'Tomato', industry: 'Ketchup/Paste', demand: 'Very High', companies: 'Kissan, Maggi, Del Monte' },
        { crop: 'Potato', industry: 'Chips/Fries', demand: 'Very High', companies: 'Lays, McCain, ITC' },
        { crop: 'Onion (Dehydrated)', industry: 'Export/Processing', demand: 'High', companies: 'Jain Irrigation, Green Agro' },
        { crop: 'Maize', industry: 'Starch/Ethanol', demand: 'Very High', companies: 'Sukhjit, Roquette, Cargill' },
        { crop: 'Chilli', industry: 'Oleoresin/Powder', demand: 'High', companies: 'Synthite, AVT, Plant Lipids' }
    ],
    organic_premium: {
        premium_range: '30-100%',
        growing_demand: '25% annually',
        certification: 'India Organic, USDA, EU Organic',
        high_value_crops: ['Turmeric', 'Ginger', 'Black Pepper', 'Cardamom', 'Coffee', 'Tea', 'Basmati Rice']
    }
};

// Generate market-aware AI recommendations
async function getAICropRecommendations(stateCode, districtName, seasonId) {
    const apiKey = getOpenAIKey();
    
    if (!apiKey) {
        console.log('No OpenAI API key found');
        return null;
    }
    
    // Get real agricultural data
    const agData = typeof getAgriculturalData === 'function' 
        ? getAgriculturalData(stateCode, districtName, seasonId)
        : null;
    
    if (!agData) {
        console.log('Agricultural data not available');
        return null;
    }
    
    // Prepare comprehensive market-aware prompt
    const prompt = `You are an elite Indian agricultural economist and market analyst. Your task is to recommend UNIQUE, HIGH-PROFIT crops that most farmers in this region are NOT growing, but which have strong market demand and supply gaps.

DO NOT recommend common crops that everyone grows. Focus on:
1. Crops with HIGH DEMAND but LOW LOCAL SUPPLY
2. Import-substitute crops (India imports these, so local production has ready market)
3. Export-oriented crops with international demand
4. Processing industry crops with contract farming potential
5. Niche/specialty crops with premium pricing

LOCATION DATA:
- State: ${agData.state.name}
- District: ${districtName || 'General region'}
- Agro-Zone: ${agData.state.agro_zone}
- Annual Rainfall: ${agData.state.annual_rainfall_mm}mm
- Soil Type: ${agData.state.soil}
- Currently Major Crops: ${agData.state.major_crops.join(', ')} (AVOID recommending these common ones)

SEASON: ${agData.season.name}
- Duration: ${agData.season.months}
- Water Availability: ${agData.season.water_availability}
- Temperature: ${agData.season.temperature}

MARKET INTELLIGENCE - HIGH DEMAND, LOW SUPPLY CROPS:
${MARKET_INTELLIGENCE.high_demand_low_supply.slice(0, 10).map(c => 
`- ${c.crop}: Demand Growth ${c.demand_growth}, Import Dependency ${c.import_dependency}, Price ${c.avg_price}. ${c.reason}`
).join('\n')}

EXPORT OPPORTUNITY CROPS:
${MARKET_INTELLIGENCE.emerging_export_crops.map(c => 
`- ${c.crop}: Export Value ${c.export_value}, Growth ${c.growth}, Markets: ${c.markets}`
).join('\n')}

PROCESSING INDUSTRY CROPS (Contract Farming):
${MARKET_INTELLIGENCE.processing_industry_demand.map(c => 
`- ${c.crop}: ${c.industry}, Demand: ${c.demand}, Companies: ${c.companies}`
).join('\n')}

ORGANIC PREMIUM: ${MARKET_INTELLIGENCE.organic_premium.premium_range} higher prices, ${MARKET_INTELLIGENCE.organic_premium.growing_demand} demand growth

YOUR TASK:
Recommend exactly 5 crops with this MANDATORY mix:
1. ONE exotic/import-substitute crop (dragon fruit, avocado, kiwi, berries, etc.) suitable for ${agData.state.name}
2. ONE high-value vegetable with supply gap (asparagus, broccoli, zucchini, colored capsicum, etc.)
3. ONE export-oriented crop with proven international demand
4. ONE processing industry crop with contract farming potential
5. ONE organic-potential crop that can command premium prices

For EACH crop, analyze:
- WHY this crop has a market gap in ${agData.state.name}
- WHO are the buyers (exporters, processors, retail chains, hotels)
- WHAT is the realistic profit potential vs common crops
- HOW can the farmer access the market (mandis, direct contracts, FPOs)

Return as JSON array:
[{
  "crop_name": "specific variety name",
  "scientific_name": "botanical name",
  "category": "Exotic/Vegetable/Export/Processing/Organic",
  "suitability_score": 70-95,
  "avg_profit": realistic profit in INR per hectare,
  "duration_days": number,
  "water_requirement": "Low/Medium/High",
  "soil_type": ["suitable soils"],
  "market_opportunity": "detailed 2-3 sentence analysis of WHY this crop has demand-supply gap",
  "buyer_linkage": "specific buyers - company names, export houses, mandi contacts",
  "price_advantage": "price comparison vs traditional crops",
  "best_practices": ["4 key practices for this crop"],
  "diseases": ["main diseases"],
  "investment_required": "approximate investment in INR/hectare",
  "risk_factors": "honest assessment of risks",
  "ai_reasoning": "compelling 3-4 sentence pitch for why a farmer should try this instead of ${agData.state.major_crops[0]} or ${agData.state.major_crops[1]}"
}]

Be BOLD and INNOVATIVE. Don't play safe with common recommendations. Return ONLY valid JSON array.`;

    try {
        console.log('Calling OpenAI for market-intelligent recommendations...');
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: `You are an innovative agricultural market analyst who helps Indian farmers find UNCONVENTIONAL, HIGH-PROFIT crops. You think like a startup founder - finding market gaps and opportunities that others miss. Never recommend the same old crops everyone grows. Always consider: import substitution, export potential, processing industry demand, and premium organic markets. Be specific with buyer names, price data, and market linkages. Respond only with valid JSON.`
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 3500
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'API request failed');
        }
        
        const data = await response.json();
        
        const content = data.choices[0].message.content;
        
        let crops;
        const jsonMatch = content.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            crops = JSON.parse(jsonMatch[0]);
        } else {
            crops = JSON.parse(content);
        }
        
        console.log('Received', crops.length, 'market-intelligent recommendations');
        return crops;
        
    } catch (error) {
        console.error('OpenAI error:', error);
        throw error;
    }
}

// Export functions
window.setOpenAIKey = setOpenAIKey;
window.getOpenAIKey = getOpenAIKey;
window.hasOpenAIKey = hasOpenAIKey;
window.getAICropRecommendations = getAICropRecommendations;
window.MARKET_INTELLIGENCE = MARKET_INTELLIGENCE;
