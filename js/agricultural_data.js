// ============================================
// Real-time Agricultural Data Fetcher
// Fetches data from Open Government APIs
// ============================================

const AGRICULTURAL_APIS = {
    // Open Government Data APIs
    commodityPrices: 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070',
    
    // OpenWeatherMap for weather data (free tier)
    weather: 'https://api.openweathermap.org/data/2.5/weather',
    
    // Backup: Agmarknet commodity prices
    agmarknet: 'https://agmarknet.gov.in/SearchCmmMkt.aspx'
};

// Indian Agricultural Data - Comprehensive Dataset
const INDIA_AGRICULTURAL_DATA = {
    states: {
        1: { name: 'Jammu and Kashmir', agro_zone: 'Temperate', annual_rainfall_mm: 1100, major_crops: ['Rice', 'Maize', 'Apple', 'Saffron', 'Walnut'], soil: 'Mountain Alluvial' },
        2: { name: 'Himachal Pradesh', agro_zone: 'Temperate Hill', annual_rainfall_mm: 1500, major_crops: ['Apple', 'Wheat', 'Maize', 'Potato', 'Ginger'], soil: 'Mountain Forest' },
        3: { name: 'Punjab', agro_zone: 'Trans-Gangetic Plains', annual_rainfall_mm: 650, major_crops: ['Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Maize'], soil: 'Alluvial Fertile' },
        6: { name: 'Haryana', agro_zone: 'Trans-Gangetic Plains', annual_rainfall_mm: 550, major_crops: ['Wheat', 'Rice', 'Sugarcane', 'Cotton', 'Mustard'], soil: 'Alluvial Sandy Loam' },
        7: { name: 'Delhi', agro_zone: 'Trans-Gangetic Plains', annual_rainfall_mm: 790, major_crops: ['Vegetables', 'Wheat', 'Bajra'], soil: 'Alluvial' },
        8: { name: 'Rajasthan', agro_zone: 'Western Dry', annual_rainfall_mm: 350, major_crops: ['Bajra', 'Wheat', 'Mustard', 'Groundnut', 'Pulses'], soil: 'Sandy Desert' },
        9: { name: 'Uttar Pradesh', agro_zone: 'Upper Gangetic Plains', annual_rainfall_mm: 990, major_crops: ['Wheat', 'Rice', 'Sugarcane', 'Potato', 'Pulses'], soil: 'Gangetic Alluvial' },
        10: { name: 'Bihar', agro_zone: 'Middle Gangetic Plains', annual_rainfall_mm: 1200, major_crops: ['Rice', 'Wheat', 'Maize', 'Pulses', 'Vegetables'], soil: 'Alluvial Fertile' },
        18: { name: 'Assam', agro_zone: 'Eastern Himalayan', annual_rainfall_mm: 2800, major_crops: ['Rice', 'Tea', 'Jute', 'Sugarcane', 'Potato'], soil: 'Alluvial Acidic' },
        19: { name: 'West Bengal', agro_zone: 'Lower Gangetic Plains', annual_rainfall_mm: 1750, major_crops: ['Rice', 'Jute', 'Potato', 'Vegetables', 'Tea'], soil: 'Deltaic Alluvial' },
        21: { name: 'Odisha', agro_zone: 'Eastern Coastal', annual_rainfall_mm: 1500, major_crops: ['Rice', 'Pulses', 'Oilseeds', 'Vegetables', 'Sugarcane'], soil: 'Red Laterite' },
        22: { name: 'Chhattisgarh', agro_zone: 'Eastern Plateau', annual_rainfall_mm: 1400, major_crops: ['Rice', 'Maize', 'Pulses', 'Oilseeds'], soil: 'Red Yellow' },
        23: { name: 'Madhya Pradesh', agro_zone: 'Central Plateau', annual_rainfall_mm: 1100, major_crops: ['Soybean', 'Wheat', 'Gram', 'Rice', 'Cotton'], soil: 'Black Alluvial' },
        24: { name: 'Gujarat', agro_zone: 'Gujarat Plains', annual_rainfall_mm: 800, major_crops: ['Cotton', 'Groundnut', 'Wheat', 'Bajra', 'Cumin'], soil: 'Black Alluvial' },
        27: { name: 'Maharashtra', agro_zone: 'Western Plateau', annual_rainfall_mm: 1000, major_crops: ['Cotton', 'Sugarcane', 'Soybean', 'Jowar', 'Rice'], soil: 'Black Regur' },
        28: { name: 'Andhra Pradesh', agro_zone: 'Southern Plateau', annual_rainfall_mm: 900, major_crops: ['Rice', 'Groundnut', 'Cotton', 'Chillies', 'Tobacco'], soil: 'Black Red Alluvial' },
        29: { name: 'Karnataka', agro_zone: 'Southern Plateau', annual_rainfall_mm: 1150, major_crops: ['Rice', 'Ragi', 'Jowar', 'Cotton', 'Sugarcane'], soil: 'Red Laterite Black' },
        32: { name: 'Kerala', agro_zone: 'West Coast', annual_rainfall_mm: 3000, major_crops: ['Coconut', 'Rice', 'Rubber', 'Pepper', 'Cardamom'], soil: 'Laterite Alluvial' },
        33: { name: 'Tamil Nadu', agro_zone: 'East Coast', annual_rainfall_mm: 950, major_crops: ['Rice', 'Sugarcane', 'Cotton', 'Groundnut', 'Banana'], soil: 'Red Alluvial Black' },
        36: { name: 'Telangana', agro_zone: 'Southern Plateau', annual_rainfall_mm: 900, major_crops: ['Rice', 'Cotton', 'Maize', 'Soybean', 'Chillies'], soil: 'Black Red' }
    },
    
    seasons: {
        1: { 
            name: 'Kharif', 
            months: 'June to October', 
            characteristics: 'Monsoon season with high rainfall',
            sowing: 'June-July',
            harvesting: 'September-October',
            water_availability: 'High (monsoon dependent)',
            temperature: '25-35 degrees Celsius'
        },
        2: { 
            name: 'Rabi', 
            months: 'November to April', 
            characteristics: 'Winter season with irrigation dependency',
            sowing: 'October-December',
            harvesting: 'March-April',
            water_availability: 'Irrigation dependent',
            temperature: '10-25 degrees Celsius'
        },
        3: { 
            name: 'Zaid', 
            months: 'March to June', 
            characteristics: 'Summer season between Rabi and Kharif',
            sowing: 'February-March',
            harvesting: 'May-June',
            water_availability: 'Requires irrigation',
            temperature: '30-45 degrees Celsius'
        }
    },
    
    // MSP 2024-25 (Minimum Support Prices in INR per quintal)
    msp_2024_25: {
        'Paddy (Common)': 2300,
        'Paddy (Grade A)': 2320,
        'Wheat': 2275,
        'Maize': 2090,
        'Bajra': 2625,
        'Jowar (Hybrid)': 3180,
        'Jowar (Maldandi)': 3225,
        'Ragi': 4290,
        'Barley': 1850,
        'Cotton (Medium Staple)': 7020,
        'Cotton (Long Staple)': 7521,
        'Groundnut': 6783,
        'Sunflower': 7280,
        'Soybean (Yellow)': 4892,
        'Mustard': 5650,
        'Safflower': 5800,
        'Sesamum': 9267,
        'Niger Seed': 8717,
        'Gram': 5440,
        'Tur (Arhar)': 7550,
        'Moong': 8682,
        'Urad': 7400,
        'Lentil (Masur)': 6425,
        'Jute': 5335,
        'Sugarcane': 340,
        'Copra (Milling)': 11582,
        'Copra (Ball)': 12100
    },
    
    // Comprehensive crop database
    crops: {
        kharif: [
            {
                name: 'Paddy (Rice)',
                scientific_name: 'Oryza sativa',
                duration_days: 120,
                water_requirement: 'High',
                water_mm: 1200,
                optimal_temp: '21-37',
                suitable_soil: ['Clay', 'Loamy', 'Alluvial'],
                suitable_states: [3, 6, 9, 10, 18, 19, 21, 28, 29, 33, 36],
                msp: 2300,
                avg_yield_quintal_per_hectare: 40,
                investment_per_hectare: 45000,
                diseases: ['Blast', 'Bacterial Leaf Blight', 'Brown Spot', 'Sheath Blight'],
                practices: [
                    'Select certified high-yielding varieties suitable for your region',
                    'Prepare nursery beds and transplant 20-25 day old seedlings',
                    'Maintain 5cm standing water during vegetative growth phase',
                    'Apply nitrogen fertilizer in three split doses for optimal uptake',
                    'Monitor regularly for stem borer and leaf folder infestations',
                    'Drain field 15 days before harvest for uniform grain maturity'
                ]
            },
            {
                name: 'Cotton',
                scientific_name: 'Gossypium hirsutum',
                duration_days: 180,
                water_requirement: 'Medium',
                water_mm: 700,
                optimal_temp: '21-35',
                suitable_soil: ['Black', 'Alluvial', 'Loamy'],
                suitable_states: [8, 23, 24, 27, 29, 36],
                msp: 7020,
                avg_yield_quintal_per_hectare: 20,
                investment_per_hectare: 55000,
                diseases: ['Bollworm', 'Whitefly', 'Leaf Curl Virus', 'Bacterial Blight'],
                practices: [
                    'Choose Bt cotton varieties for bollworm resistance',
                    'Maintain plant spacing of 90cm between rows and 60cm between plants',
                    'Install pheromone traps at 5 per hectare for pest monitoring',
                    'Apply recommended doses of NPK based on soil test results',
                    'Begin picking when 50 percent of bolls have opened',
                    'Remove and destroy crop residues after final picking'
                ]
            },
            {
                name: 'Soybean',
                scientific_name: 'Glycine max',
                duration_days: 95,
                water_requirement: 'Medium',
                water_mm: 450,
                optimal_temp: '20-30',
                suitable_soil: ['Loamy', 'Clay Loam', 'Sandy Loam'],
                suitable_states: [23, 27, 8],
                msp: 4892,
                avg_yield_quintal_per_hectare: 20,
                investment_per_hectare: 35000,
                diseases: ['Yellow Mosaic Virus', 'Rust', 'Pod Borer', 'Stem Fly'],
                practices: [
                    'Treat seeds with Rhizobium culture before sowing for nitrogen fixation',
                    'Sow at the onset of monsoon when soil has adequate moisture',
                    'Being a legume, it does not require nitrogen fertilizer application',
                    'Maintain proper drainage as crop is sensitive to waterlogging',
                    'Harvest when seeds contain 14 percent moisture for safe storage',
                    'Practice crop rotation with cereals for soil health improvement'
                ]
            },
            {
                name: 'Maize',
                scientific_name: 'Zea mays',
                duration_days: 100,
                water_requirement: 'Medium',
                water_mm: 500,
                optimal_temp: '18-27',
                suitable_soil: ['Loamy', 'Sandy Loam', 'Alluvial'],
                suitable_states: [9, 10, 29, 8, 23],
                msp: 2090,
                avg_yield_quintal_per_hectare: 50,
                investment_per_hectare: 40000,
                diseases: ['Stem Borer', 'Fall Armyworm', 'Turcicum Leaf Blight'],
                practices: [
                    'Use hybrid seeds which give 40 percent higher yield than local varieties',
                    'Apply zinc sulfate at 25 kg per hectare to prevent zinc deficiency',
                    'Critical irrigation at tasseling and silking stages is essential',
                    'Earthing up at knee-high stage provides better anchorage',
                    'Harvest when grain moisture is between 20-25 percent',
                    'Dry cobs properly before shelling to prevent fungal growth'
                ]
            },
            {
                name: 'Groundnut',
                scientific_name: 'Arachis hypogaea',
                duration_days: 110,
                water_requirement: 'Medium',
                water_mm: 400,
                optimal_temp: '22-30',
                suitable_soil: ['Sandy Loam', 'Red Sandy', 'Light Soils'],
                suitable_states: [24, 8, 27, 29, 28],
                msp: 6783,
                avg_yield_quintal_per_hectare: 18,
                investment_per_hectare: 42000,
                diseases: ['Tikka Disease', 'Collar Rot', 'Aflatoxin Contamination'],
                practices: [
                    'Apply gypsum at 500 kg per hectare at flowering stage for calcium',
                    'Maintain adequate calcium in soil for proper pod development',
                    'Stop irrigation 15 days before harvest for easy lifting',
                    'Cure harvested pods in sun for 3-4 days before storage',
                    'Store at low humidity to prevent aflatoxin development',
                    'Use seed treatment with fungicide to prevent collar rot'
                ]
            }
        ],
        rabi: [
            {
                name: 'Wheat',
                scientific_name: 'Triticum aestivum',
                duration_days: 135,
                water_requirement: 'Medium',
                water_mm: 350,
                optimal_temp: '10-25',
                suitable_soil: ['Loamy', 'Clay Loam', 'Alluvial'],
                suitable_states: [3, 6, 9, 8, 23],
                msp: 2275,
                avg_yield_quintal_per_hectare: 45,
                investment_per_hectare: 42000,
                diseases: ['Yellow Rust', 'Brown Rust', 'Black Rust', 'Karnal Bunt', 'Powdery Mildew'],
                practices: [
                    'Complete sowing by mid-November for optimal yield potential',
                    'Apply 5-6 irrigations at critical growth stages including CRI and flowering',
                    'Use balanced fertilization with 120:60:40 kg NPK per hectare',
                    'Monitor for rust diseases especially in humid conditions',
                    'Harvest at golden-yellow stage when grain moisture is 14 percent',
                    'Avoid late sowing as it reduces yield by 25-30 kg per hectare per day delay'
                ]
            },
            {
                name: 'Mustard',
                scientific_name: 'Brassica juncea',
                duration_days: 120,
                water_requirement: 'Low',
                water_mm: 250,
                optimal_temp: '10-25',
                suitable_soil: ['Loamy', 'Sandy Loam', 'Alluvial'],
                suitable_states: [8, 9, 23, 6, 3],
                msp: 5650,
                avg_yield_quintal_per_hectare: 15,
                investment_per_hectare: 32000,
                diseases: ['Alternaria Blight', 'White Rust', 'Downy Mildew', 'Aphids'],
                practices: [
                    'Sow during October-November for best results',
                    'One irrigation at flowering stage is usually sufficient',
                    'Monitor for aphid infestation during flowering period',
                    'Apply sulfur for improved oil content in seeds',
                    'Harvest when pods turn yellowish-brown to prevent shattering',
                    'Thresh immediately after proper drying to avoid losses'
                ]
            },
            {
                name: 'Chickpea (Gram)',
                scientific_name: 'Cicer arietinum',
                duration_days: 110,
                water_requirement: 'Low',
                water_mm: 200,
                optimal_temp: '10-30',
                suitable_soil: ['Loamy', 'Clay', 'Black'],
                suitable_states: [23, 8, 27, 9, 22],
                msp: 5440,
                avg_yield_quintal_per_hectare: 12,
                investment_per_hectare: 30000,
                diseases: ['Fusarium Wilt', 'Ascochyta Blight', 'Pod Borer', 'Dry Root Rot'],
                practices: [
                    'Treat seeds with Trichoderma for wilt disease prevention',
                    'Avoid irrigation after flowering to prevent excessive vegetative growth',
                    'Use wilt-resistant varieties in wilt-endemic areas',
                    'Maintain adequate plant population of 30-35 plants per square meter',
                    'Harvest when leaves turn reddish-brown and start shedding',
                    'Practice deep summer ploughing to reduce soil-borne diseases'
                ]
            },
            {
                name: 'Potato',
                scientific_name: 'Solanum tuberosum',
                duration_days: 90,
                water_requirement: 'High',
                water_mm: 500,
                optimal_temp: '15-25',
                suitable_soil: ['Sandy Loam', 'Loamy', 'Well-drained'],
                suitable_states: [9, 19, 3, 24, 10],
                msp: 0,
                market_price_range: '15-25 per kg',
                avg_yield_quintal_per_hectare: 250,
                investment_per_hectare: 120000,
                diseases: ['Late Blight', 'Early Blight', 'Bacterial Wilt', 'Common Scab'],
                practices: [
                    'Use certified disease-free seed tubers from reliable sources',
                    'Plant at 60cm row spacing and 20cm plant spacing',
                    'Perform earthing up twice during crop growth period',
                    'Apply preventive fungicide sprays for late blight control',
                    'Dehaulm 10-15 days before harvest for skin setting',
                    'Store at 2-4 degrees Celsius in cold storage for longer shelf life'
                ]
            },
            {
                name: 'Lentil (Masur)',
                scientific_name: 'Lens culinaris',
                duration_days: 100,
                water_requirement: 'Low',
                water_mm: 200,
                optimal_temp: '18-30',
                suitable_soil: ['Loamy', 'Clay Loam', 'Residual Moisture'],
                suitable_states: [9, 23, 10, 19, 22],
                msp: 6425,
                avg_yield_quintal_per_hectare: 10,
                investment_per_hectare: 25000,
                diseases: ['Rust', 'Wilt', 'Root Rot', 'Aphids'],
                practices: [
                    'Best suited for cultivation on conserved soil moisture',
                    'Generally does not require irrigation if sown on time',
                    'Use Rhizobium inoculation for enhanced nitrogen fixation',
                    'Harvest at physiological maturity when pods turn brown',
                    'Avoid waterlogging as crop is highly sensitive',
                    'Practice intercropping with mustard for better returns'
                ]
            }
        ],
        zaid: [
            {
                name: 'Watermelon',
                scientific_name: 'Citrullus lanatus',
                duration_days: 85,
                water_requirement: 'High',
                water_mm: 400,
                optimal_temp: '25-40',
                suitable_soil: ['Sandy Loam', 'Loamy', 'Well-drained'],
                suitable_states: [8, 9, 27, 29, 33],
                msp: 0,
                market_price_range: '15-30 per kg',
                avg_yield_quintal_per_hectare: 300,
                investment_per_hectare: 80000,
                diseases: ['Anthracnose', 'Fusarium Wilt', 'Aphids', 'Fruit Fly'],
                practices: [
                    'Prepare raised beds with drip irrigation for water efficiency',
                    'Place beehives for better pollination and fruit set',
                    'Apply potassium fertilizer for improved fruit sweetness',
                    'Mulch with straw to conserve moisture and prevent fruit rot',
                    'Harvest when tendril near fruit dries up completely',
                    'Handle fruits carefully to prevent bruising during transport'
                ]
            },
            {
                name: 'Muskmelon',
                scientific_name: 'Cucumis melo',
                duration_days: 80,
                water_requirement: 'High',
                water_mm: 350,
                optimal_temp: '24-38',
                suitable_soil: ['Sandy Loam', 'Loamy'],
                suitable_states: [8, 9, 3, 6, 24],
                msp: 0,
                market_price_range: '20-40 per kg',
                avg_yield_quintal_per_hectare: 200,
                investment_per_hectare: 70000,
                diseases: ['Powdery Mildew', 'Downy Mildew', 'Fruit Fly'],
                practices: [
                    'Maintain 2 meter row spacing for vine spreading',
                    'Reduce irrigation before harvest to increase sugar content',
                    'Apply boron for improved fruit setting',
                    'Harvest at half-slip stage when fruit separates easily from vine',
                    'Early morning harvest gives better shelf life',
                    'Grade fruits by size for better market realization'
                ]
            },
            {
                name: 'Moong (Green Gram)',
                scientific_name: 'Vigna radiata',
                duration_days: 65,
                water_requirement: 'Low',
                water_mm: 200,
                optimal_temp: '25-35',
                suitable_soil: ['Loamy', 'Sandy Loam', 'Light Soils'],
                suitable_states: [8, 9, 27, 23, 28],
                msp: 8682,
                avg_yield_quintal_per_hectare: 8,
                investment_per_hectare: 22000,
                diseases: ['Yellow Mosaic Virus', 'Powdery Mildew', 'Cercospora Leaf Spot'],
                practices: [
                    'Shortest duration pulse crop ideal for summer cultivation',
                    'Utilize pre-monsoon showers for timely sowing',
                    'Rhizobium seed treatment improves yield by 20 percent',
                    'Use Yellow Mosaic Virus resistant varieties',
                    'Harvest when 80 percent pods turn brown to prevent shattering',
                    'Excellent crop for green manuring if market prices are low'
                ]
            },
            {
                name: 'Cucumber',
                scientific_name: 'Cucumis sativus',
                duration_days: 55,
                water_requirement: 'High',
                water_mm: 300,
                optimal_temp: '20-35',
                suitable_soil: ['Loamy', 'Sandy Loam', 'Rich in Organic Matter'],
                suitable_states: [9, 19, 27, 29, 33],
                msp: 0,
                market_price_range: '10-25 per kg',
                avg_yield_quintal_per_hectare: 150,
                investment_per_hectare: 55000,
                diseases: ['Downy Mildew', 'Powdery Mildew', 'Mosaic Virus'],
                practices: [
                    'Use trellis or bower system for vertical growth',
                    'Harvest every 2-3 days for continuous production',
                    'Apply organic manure liberally for better fruit quality',
                    'Use shade net in extreme heat conditions',
                    'Maintain consistent irrigation to prevent bitter fruits',
                    'Remove misshapen fruits early to promote healthy fruit development'
                ]
            },
            {
                name: 'Bitter Gourd',
                scientific_name: 'Momordica charantia',
                duration_days: 60,
                water_requirement: 'Medium',
                water_mm: 350,
                optimal_temp: '25-35',
                suitable_soil: ['Loamy', 'Sandy Loam', 'Well-drained'],
                suitable_states: [9, 19, 21, 28, 33],
                msp: 0,
                market_price_range: '25-40 per kg',
                avg_yield_quintal_per_hectare: 100,
                investment_per_hectare: 60000,
                diseases: ['Fruit Fly', 'Powdery Mildew', 'Leaf Spot'],
                practices: [
                    'Provide sturdy support structure for climbing vines',
                    'Harvest fruits when young and tender for best quality',
                    'Multiple harvests possible over 2-3 month period',
                    'Use fruit fly traps with methyl eugenol for pest control',
                    'Popular for health benefits commanding premium pricing',
                    'Morning harvest preferred for better freshness'
                ]
            }
        ]
    },
    
    // STATE-SPECIFIC SPECIALTY CROPS - Unique to each region
    stateSpecificCrops: {
        1: { // Jammu & Kashmir
            crops: [
                { name: 'Saffron (Kesar)', scientific_name: 'Crocus sativus', season: 'rabi', duration_days: 90, water_requirement: 'Low', profit_per_hectare: 500000, reason: 'World-famous Kashmir Saffron with GI tag. Pampore region is hub. Price Rs 1.5-3 lakh/kg.' },
                { name: 'Apple (Delicious)', scientific_name: 'Malus domestica', season: 'kharif', duration_days: 180, water_requirement: 'Medium', profit_per_hectare: 400000, reason: 'Kashmir apples premium in Delhi/Mumbai markets. Sopore is apple town of Asia.' },
                { name: 'Walnut', scientific_name: 'Juglans regia', season: 'kharif', duration_days: 180, water_requirement: 'Low', profit_per_hectare: 350000, reason: 'High export demand. Kashmir walnuts fetch Rs 600-1000/kg.' },
                { name: 'Almond', scientific_name: 'Prunus dulcis', season: 'rabi', duration_days: 200, water_requirement: 'Low', profit_per_hectare: 300000, reason: 'Import substitute crop. Ladakh almonds gaining popularity.' },
                { name: 'Cherry', scientific_name: 'Prunus avium', season: 'zaid', duration_days: 90, water_requirement: 'Medium', profit_per_hectare: 500000, reason: 'Very short season, extremely high prices Rs 200-500/kg in metros.' }
            ]
        },
        2: { // Himachal Pradesh
            crops: [
                { name: 'Apple (Royal Gala)', scientific_name: 'Malus domestica', season: 'kharif', duration_days: 180, water_requirement: 'Medium', profit_per_hectare: 450000, reason: 'Shimla apples world-renowned. Over 90% of state horticulture income.' },
                { name: 'Kiwi', scientific_name: 'Actinidia deliciosa', season: 'kharif', duration_days: 240, water_requirement: 'High', profit_per_hectare: 400000, reason: 'Emerging fruit. Himachal government promoting. Price Rs 150-250/kg.' },
                { name: 'Off-season Vegetables', scientific_name: 'Various', season: 'zaid', duration_days: 90, water_requirement: 'High', profit_per_hectare: 200000, reason: 'Peas, capsicum, tomato in summer fetch 3x Delhi prices.' },
                { name: 'Exotic Mushroom', scientific_name: 'Pleurotus ostreatus', season: 'rabi', duration_days: 45, water_requirement: 'Low', profit_per_hectare: 350000, reason: 'Oyster and button mushrooms. Cool climate ideal. Export quality.' },
                { name: 'Hops', scientific_name: 'Humulus lupulus', season: 'kharif', duration_days: 150, water_requirement: 'High', profit_per_hectare: 300000, reason: 'Craft beer industry booming. Currently 100% imported. First mover advantage.' }
            ]
        },
        3: { // Punjab
            crops: [
                { name: 'Basmati Rice (Pusa 1121)', scientific_name: 'Oryza sativa', season: 'kharif', duration_days: 140, water_requirement: 'High', profit_per_hectare: 120000, reason: 'Export quality basmati. Punjab is largest producer. MSP + premium.' },
                { name: 'Durum Wheat', scientific_name: 'Triticum durum', season: 'rabi', duration_days: 130, water_requirement: 'Medium', profit_per_hectare: 80000, reason: 'For pasta/semolina. Premium over regular wheat. Processing tie-ups.' },
                { name: 'Kinnow Mandarin', scientific_name: 'Citrus reticulata', season: 'rabi', duration_days: 300, water_requirement: 'Medium', profit_per_hectare: 200000, reason: 'Abohar-Fazilka belt. Export to Bangladesh, UAE. Price Rs 30-50/kg.' },
                { name: 'Seed Potato', scientific_name: 'Solanum tuberosum', season: 'rabi', duration_days: 100, water_requirement: 'High', profit_per_hectare: 150000, reason: 'Jalandhar is seed potato hub. Sells at 2x table potato price.' },
                { name: 'Baby Corn', scientific_name: 'Zea mays', season: 'kharif', duration_days: 60, water_requirement: 'Medium', profit_per_hectare: 100000, reason: 'Contract farming with processors. Quick returns. Rs 80-150/kg.' }
            ]
        },
        8: { // Rajasthan
            crops: [
                { name: 'Cumin (Jeera)', scientific_name: 'Cuminum cyminum', season: 'rabi', duration_days: 120, water_requirement: 'Low', profit_per_hectare: 150000, reason: 'Rajasthan produces 80% of India cumin. Jodhpur is hub. Export demand.' },
                { name: 'Coriander', scientific_name: 'Coriandrum sativum', season: 'rabi', duration_days: 110, water_requirement: 'Low', profit_per_hectare: 100000, reason: 'Kota-Bundi belt famous. Dual purpose - seed and leaves.' },
                { name: 'Isabgol (Psyllium)', scientific_name: 'Plantago ovata', season: 'rabi', duration_days: 120, water_requirement: 'Low', profit_per_hectare: 120000, reason: 'India is monopoly exporter. Only grows in arid Rajasthan. Rs 150-200/kg.' },
                { name: 'Guar Gum', scientific_name: 'Cyamopsis tetragonoloba', season: 'kharif', duration_days: 90, water_requirement: 'Very Low', profit_per_hectare: 80000, reason: 'Oil industry demand. Rajasthan has 80% production. Drought resistant.' },
                { name: 'Pomegranate', scientific_name: 'Punica granatum', season: 'kharif', duration_days: 180, water_requirement: 'Low', profit_per_hectare: 200000, reason: 'Jalore emerging hub. Less water than cotton. Export quality Bhagwa variety.' }
            ]
        },
        9: { // Uttar Pradesh
            crops: [
                { name: 'Mango (Dasheri/Langra)', scientific_name: 'Mangifera indica', season: 'zaid', duration_days: 120, water_requirement: 'Medium', profit_per_hectare: 200000, reason: 'Lucknow-Malihabad is mango capital. GI tagged varieties. Premium pricing.' },
                { name: 'Mentha (Peppermint)', scientific_name: 'Mentha piperita', season: 'zaid', duration_days: 120, water_requirement: 'High', profit_per_hectare: 150000, reason: 'Barabanki is India mentha hub. Oil extraction. Pharma demand.' },
                { name: 'Banana (Tissue Culture)', scientific_name: 'Musa acuminata', season: 'kharif', duration_days: 365, water_requirement: 'High', profit_per_hectare: 250000, reason: 'Kaushambi-Fatehpur belt. High density planting. Year-round income.' },
                { name: 'Guava', scientific_name: 'Psidium guajava', season: 'rabi', duration_days: 120, water_requirement: 'Low', profit_per_hectare: 150000, reason: 'Allahabad Safeda variety famous. Pulp processing units nearby.' },
                { name: 'Poplar Wood', scientific_name: 'Populus deltoides', season: 'kharif', duration_days: 2190, water_requirement: 'Medium', profit_per_hectare: 500000, reason: 'Agroforestry. 6-year cycle. Match/plywood industry demand. Rs 5000/tree.' }
            ]
        },
        24: { // Gujarat
            crops: [
                { name: 'Castor', scientific_name: 'Ricinus communis', season: 'kharif', duration_days: 150, water_requirement: 'Low', profit_per_hectare: 100000, reason: 'Gujarat produces 85% of India castor. Export monopoly. Drought hardy.' },
                { name: 'Dates (Khajur)', scientific_name: 'Phoenix dactylifera', season: 'kharif', duration_days: 365, water_requirement: 'Very Low', profit_per_hectare: 200000, reason: 'Kutch region. Import substitute. Barhi variety premium Rs 200+/kg.' },
                { name: 'Fennel (Saunf)', scientific_name: 'Foeniculum vulgare', season: 'rabi', duration_days: 180, water_requirement: 'Low', profit_per_hectare: 120000, reason: 'Unjha is Asia largest spice market. Fennel Rs 100-200/kg.' },
                { name: 'Isabgol', scientific_name: 'Plantago ovata', season: 'rabi', duration_days: 120, water_requirement: 'Low', profit_per_hectare: 150000, reason: 'North Gujarat suitable. Pharma export demand. Rs 150-200/kg.' },
                { name: 'Dragon Fruit', scientific_name: 'Hylocereus undatus', season: 'kharif', duration_days: 365, water_requirement: 'Low', profit_per_hectare: 300000, reason: 'Gujarat govt promoting. Saline soil tolerant. Price Rs 150-300/kg.' }
            ]
        },
        27: { // Maharashtra
            crops: [
                { name: 'Grapes (Thompson Seedless)', scientific_name: 'Vitis vinifera', season: 'rabi', duration_days: 180, water_requirement: 'High', profit_per_hectare: 400000, reason: 'Nashik is grape capital. Export to EU. Table + raisin + wine.' },
                { name: 'Pomegranate (Bhagwa)', scientific_name: 'Punica granatum', season: 'kharif', duration_days: 180, water_requirement: 'Low', profit_per_hectare: 300000, reason: 'Solapur-Sangli hub. Export demand. Arils processing.' },
                { name: 'Orange (Nagpur)', scientific_name: 'Citrus sinensis', season: 'rabi', duration_days: 300, water_requirement: 'Medium', profit_per_hectare: 200000, reason: 'GI tagged Nagpur Orange. Processing for juice. Vidarbha specialty.' },
                { name: 'Onion (Export Quality)', scientific_name: 'Allium cepa', season: 'rabi', duration_days: 120, water_requirement: 'Medium', profit_per_hectare: 150000, reason: 'Nashik is onion hub. Dehydrated onion export. Volatile but high returns.' },
                { name: 'Alphonso Mango', scientific_name: 'Mangifera indica', season: 'zaid', duration_days: 120, water_requirement: 'Low', profit_per_hectare: 350000, reason: 'Ratnagiri-Sindhudurg GI tagged. Premium Rs 500-1500/dozen for export.' }
            ]
        },
        29: { // Karnataka
            crops: [
                { name: 'Coffee (Arabica)', scientific_name: 'Coffea arabica', season: 'kharif', duration_days: 270, water_requirement: 'High', profit_per_hectare: 200000, reason: 'Coorg-Chikmagalur specialty. Indian coffee premium in EU. Shade grown.' },
                { name: 'Arecanut (Betel Nut)', scientific_name: 'Areca catechu', season: 'kharif', duration_days: 365, water_requirement: 'High', profit_per_hectare: 250000, reason: 'Malnad region traditional. Price Rs 400-600/kg. Constant demand.' },
                { name: 'Pepper (Black)', scientific_name: 'Piper nigrum', season: 'kharif', duration_days: 365, water_requirement: 'High', profit_per_hectare: 200000, reason: 'Kodagu specialty. King of spices. Rs 300-500/kg.' },
                { name: 'Silk Cocoon', scientific_name: 'Bombyx mori', season: 'all', duration_days: 28, water_requirement: 'Low', profit_per_hectare: 150000, reason: 'Karnataka is silk capital. Mulberry cultivation. 5 crops/year.' },
                { name: 'Rose (Cut Flower)', scientific_name: 'Rosa indica', season: 'rabi', duration_days: 365, water_requirement: 'High', profit_per_hectare: 400000, reason: 'Bangalore flower auction. Dutch variety. Rs 2-10/stem.' }
            ]
        },
        32: { // Kerala
            crops: [
                { name: 'Rubber', scientific_name: 'Hevea brasiliensis', season: 'kharif', duration_days: 2555, water_requirement: 'High', profit_per_hectare: 150000, reason: 'Kerala is rubber state. 7-year gestation but 30-year income. Tyre industry demand.' },
                { name: 'Cardamom (Elaichi)', scientific_name: 'Elettaria cardamomum', season: 'kharif', duration_days: 365, water_requirement: 'High', profit_per_hectare: 400000, reason: 'Queen of spices. Idukki is hub. Price Rs 2000-4000/kg.' },
                { name: 'Black Pepper', scientific_name: 'Piper nigrum', season: 'kharif', duration_days: 365, water_requirement: 'High', profit_per_hectare: 250000, reason: 'Wayanad pepper famous. Export quality. Rs 300-500/kg.' },
                { name: 'Coconut (Tender)', scientific_name: 'Cocos nucifera', season: 'all', duration_days: 365, water_requirement: 'High', profit_per_hectare: 200000, reason: 'Tender coconut water demand in cities. Rs 30-60/nut.' },
                { name: 'Vanilla', scientific_name: 'Vanilla planifolia', season: 'kharif', duration_days: 365, water_requirement: 'High', profit_per_hectare: 500000, reason: 'Worlds 2nd expensive spice after saffron. Rs 30000-50000/kg.' }
            ]
        },
        33: { // Tamil Nadu
            crops: [
                { name: 'Banana (Grand Naine)', scientific_name: 'Musa acuminata', season: 'kharif', duration_days: 365, water_requirement: 'High', profit_per_hectare: 300000, reason: 'Theni-Dindigul is banana belt. Export to Middle East. Tissue culture.' },
                { name: 'Jasmine (Madurai Malli)', scientific_name: 'Jasminum sambac', season: 'all', duration_days: 365, water_requirement: 'Medium', profit_per_hectare: 250000, reason: 'GI tagged. Daily harvest. Temple + perfume demand. Rs 500-2000/kg.' },
                { name: 'Turmeric', scientific_name: 'Curcuma longa', season: 'kharif', duration_days: 270, water_requirement: 'High', profit_per_hectare: 200000, reason: 'Erode is turmeric city. Curcumin export demand. Rs 70-150/kg.' },
                { name: 'Tapioca (Cassava)', scientific_name: 'Manihot esculenta', season: 'kharif', duration_days: 300, water_requirement: 'Low', profit_per_hectare: 100000, reason: 'Salem district. Starch industry. Sago production. Low input.' },
                { name: 'Coconut Oil', scientific_name: 'Cocos nucifera', season: 'all', duration_days: 365, water_requirement: 'Medium', profit_per_hectare: 180000, reason: 'Coimbatore processing hub. Virgin coconut oil export Rs 300/L.' }
            ]
        },
        36: { // Telangana
            crops: [
                { name: 'Chillies (Guntur)', scientific_name: 'Capsicum annuum', season: 'kharif', duration_days: 150, water_requirement: 'Medium', profit_per_hectare: 200000, reason: 'Khammam-Warangal belt. Oleoresin extraction. Export quality.' },
                { name: 'Turmeric (Nizamabad)', scientific_name: 'Curcuma longa', season: 'kharif', duration_days: 270, water_requirement: 'High', profit_per_hectare: 180000, reason: 'Nizamabad is turmeric hub. Curcumin extraction plants nearby.' },
                { name: 'Mango (Benishan)', scientific_name: 'Mangifera indica', season: 'zaid', duration_days: 120, water_requirement: 'Low', profit_per_hectare: 150000, reason: 'Banginapalli variety from Telangana. Export potential.' },
                { name: 'Palm Oil', scientific_name: 'Elaeis guineensis', season: 'all', duration_days: 1460, water_requirement: 'High', profit_per_hectare: 200000, reason: 'Govt promoting oil palm. Import substitute. 4-year gestation.' },
                { name: 'Maize (Sweet Corn)', scientific_name: 'Zea mays', season: 'kharif', duration_days: 75, water_requirement: 'Medium', profit_per_hectare: 80000, reason: 'Food processing tie-ups. Quick crop. Rs 15-25/cob.' }
            ]
        },
        6: { // Haryana
            crops: [
                { name: 'Basmati Rice', scientific_name: 'Oryza sativa', season: 'kharif', duration_days: 140, water_requirement: 'High', profit_per_hectare: 120000, reason: 'Karnal-Kaithal is basmati hub. Export quality Pusa 1121. Premium over regular rice.' },
                { name: 'Mushroom (Button)', scientific_name: 'Agaricus bisporus', season: 'rabi', duration_days: 45, water_requirement: 'Low', profit_per_hectare: 250000, reason: 'Sonipat is mushroom capital of India. Indoor farming. Delhi market access.' },
                { name: 'Baby Corn', scientific_name: 'Zea mays', season: 'kharif', duration_days: 60, water_requirement: 'Medium', profit_per_hectare: 90000, reason: 'Contract farming with ITC, McCain. Quick returns. Rs 80-150/kg.' },
                { name: 'Guava', scientific_name: 'Psidium guajava', season: 'rabi', duration_days: 120, water_requirement: 'Low', profit_per_hectare: 130000, reason: 'Hisar variety famous. Pulp processing. Low water requirement.' },
                { name: 'Green Peas (Export)', scientific_name: 'Pisum sativum', season: 'rabi', duration_days: 90, water_requirement: 'Medium', profit_per_hectare: 100000, reason: 'Frozen peas for export. McCain, Safal tie-ups. Rs 40-80/kg.' }
            ]
        },
        10: { // Bihar
            crops: [
                { name: 'Litchi', scientific_name: 'Litchi chinensis', season: 'zaid', duration_days: 90, water_requirement: 'High', profit_per_hectare: 300000, reason: 'Muzaffarpur Shahi Litchi has GI tag. Premium Rs 80-150/kg. Export to EU.' },
                { name: 'Makhana (Fox Nut)', scientific_name: 'Euryale ferox', season: 'kharif', duration_days: 150, water_requirement: 'Very High', profit_per_hectare: 250000, reason: 'Bihar produces 90% of world makhana. Rs 800-1200/kg. Superfood demand.' },
                { name: 'Banana (Kela)', scientific_name: 'Musa acuminata', season: 'kharif', duration_days: 365, water_requirement: 'High', profit_per_hectare: 200000, reason: 'Hajipur banana famous. Year-round production. Temple demand.' },
                { name: 'Maize', scientific_name: 'Zea mays', season: 'kharif', duration_days: 100, water_requirement: 'Medium', profit_per_hectare: 70000, reason: 'Bihar is 3rd largest maize producer. Poultry feed demand.' },
                { name: 'Wheat (Sharbati)', scientific_name: 'Triticum aestivum', season: 'rabi', duration_days: 120, water_requirement: 'Medium', profit_per_hectare: 60000, reason: 'Premium wheat variety. Atta brand tie-ups. MSP assured.' }
            ]
        },
        18: { // Assam
            crops: [
                { name: 'Tea (Orthodox)', scientific_name: 'Camellia sinensis', season: 'all', duration_days: 365, water_requirement: 'High', profit_per_hectare: 200000, reason: 'Assam tea world famous. Orthodox variety premium. Rs 300-1000/kg auction.' },
                { name: 'Bhut Jolokia (Ghost Pepper)', scientific_name: 'Capsicum chinense', season: 'kharif', duration_days: 120, water_requirement: 'High', profit_per_hectare: 300000, reason: 'Worlds hottest chilli. GI tag. Export to USA. Rs 10000-15000/kg dried.' },
                { name: 'Pineapple', scientific_name: 'Ananas comosus', season: 'kharif', duration_days: 540, water_requirement: 'High', profit_per_hectare: 150000, reason: 'Tripura-Assam border area. Processing industry. Rs 20-40/fruit.' },
                { name: 'Bamboo Shoot', scientific_name: 'Bambusa', season: 'kharif', duration_days: 365, water_requirement: 'High', profit_per_hectare: 100000, reason: 'Northeast specialty. Processed shoots export. Rs 100-200/kg.' },
                { name: 'Lemon (Assam Lemon)', scientific_name: 'Citrus limon', season: 'all', duration_days: 365, water_requirement: 'Medium', profit_per_hectare: 120000, reason: 'Year-round fruiting. High acidity preferred. Rs 30-60/kg.' }
            ]
        },
        19: { // West Bengal
            crops: [
                { name: 'Darjeeling Tea', scientific_name: 'Camellia sinensis', season: 'all', duration_days: 365, water_requirement: 'High', profit_per_hectare: 300000, reason: 'GI tagged. Champagne of teas. First flush Rs 1000-5000/kg.' },
                { name: 'Potato (Seed)', scientific_name: 'Solanum tuberosum', season: 'rabi', duration_days: 100, water_requirement: 'Medium', profit_per_hectare: 120000, reason: 'Hooghly is seed potato hub. 2x price of table potato.' },
                { name: 'Mango (Himsagar)', scientific_name: 'Mangifera indica', season: 'zaid', duration_days: 90, water_requirement: 'Low', profit_per_hectare: 180000, reason: 'Malda Himsagar/Laxmanbhog GI tagged. Premium variety.' },
                { name: 'Jute', scientific_name: 'Corchorus capsularis', season: 'kharif', duration_days: 120, water_requirement: 'High', profit_per_hectare: 80000, reason: 'Golden fibre. Govt mandatory jute packaging. MSP support.' },
                { name: 'Betel Leaf (Paan)', scientific_name: 'Piper betle', season: 'all', duration_days: 365, water_requirement: 'High', profit_per_hectare: 400000, reason: 'Bangla Paan GI tag. Rs 200-500/100 leaves. Temple demand.' }
            ]
        },
        21: { // Odisha
            crops: [
                { name: 'Cashew', scientific_name: 'Anacardium occidentale', season: 'zaid', duration_days: 365, water_requirement: 'Low', profit_per_hectare: 150000, reason: 'Ganjam-Koraput belt. Processing industry. Rs 80-120/kg raw.' },
                { name: 'Turmeric (Kandhamal)', scientific_name: 'Curcuma longa', season: 'kharif', duration_days: 270, water_requirement: 'High', profit_per_hectare: 160000, reason: 'Kandhamal Haldi GI tag. High curcumin content. Organic premium.' },
                { name: 'Black Pepper', scientific_name: 'Piper nigrum', season: 'kharif', duration_days: 365, water_requirement: 'High', profit_per_hectare: 200000, reason: 'Koraput organic pepper. Export quality. Rs 400-600/kg.' },
                { name: 'Mango (Kesar)', scientific_name: 'Mangifera indica', season: 'zaid', duration_days: 120, water_requirement: 'Low', profit_per_hectare: 130000, reason: 'Dhenkanal mango famous. Pulp processing units.' },
                { name: 'Pisciculture (Fish)', scientific_name: 'Various', season: 'all', duration_days: 180, water_requirement: 'Very High', profit_per_hectare: 200000, reason: 'Chilika lake area. Prawn farming high returns.' }
            ]
        },
        22: { // Chhattisgarh
            crops: [
                { name: 'Aromatic Rice', scientific_name: 'Oryza sativa', season: 'kharif', duration_days: 130, water_requirement: 'High', profit_per_hectare: 100000, reason: 'Dubraj, Jawaphool varieties. GI potential. Premium over regular rice.' },
                { name: 'Lac Cultivation', scientific_name: 'Kerria lacca', season: 'all', duration_days: 180, water_requirement: 'Low', profit_per_hectare: 150000, reason: 'Chhattisgarh is lac hub. Shellac export. Forest-based income.' },
                { name: 'Mahua', scientific_name: 'Madhuca longifolia', season: 'zaid', duration_days: 365, water_requirement: 'Low', profit_per_hectare: 80000, reason: 'Flower collection. Oil, alcohol, tribal economy. Rs 30-50/kg flowers.' },
                { name: 'Tamarind', scientific_name: 'Tamarindus indica', season: 'all', duration_days: 365, water_requirement: 'Low', profit_per_hectare: 100000, reason: 'Forest produce. Pulp processing. Rs 40-80/kg.' },
                { name: 'Minor Millets', scientific_name: 'Various', season: 'kharif', duration_days: 90, water_requirement: 'Low', profit_per_hectare: 60000, reason: 'Kodo-Kutki organic. Tribal superfoods. Health food market.' }
            ]
        },
        23: { // Madhya Pradesh
            crops: [
                { name: 'Soybean', scientific_name: 'Glycine max', season: 'kharif', duration_days: 100, water_requirement: 'Medium', profit_per_hectare: 80000, reason: 'MP is soya bowl of India. Processing industry. MSP support.' },
                { name: 'Gram (Chickpea)', scientific_name: 'Cicer arietinum', season: 'rabi', duration_days: 110, water_requirement: 'Low', profit_per_hectare: 70000, reason: 'Largest gram producer. Desi variety premium. Dal mills nearby.' },
                { name: 'Wheat (Sharbati)', scientific_name: 'Triticum aestivum', season: 'rabi', duration_days: 120, water_requirement: 'Medium', profit_per_hectare: 65000, reason: 'Sehore Sharbati wheat GI tag. Premium variety for chapati.' },
                { name: 'Orange (Nagpur type)', scientific_name: 'Citrus sinensis', season: 'rabi', duration_days: 300, water_requirement: 'Medium', profit_per_hectare: 180000, reason: 'Chhindwara emerging citrus belt. Processing potential.' },
                { name: 'Garlic', scientific_name: 'Allium sativum', season: 'rabi', duration_days: 150, water_requirement: 'Low', profit_per_hectare: 120000, reason: 'Mandsaur is garlic hub. Export quality. Rs 80-200/kg.' }
            ]
        },
        28: { // Andhra Pradesh
            crops: [
                { name: 'Chilli (Guntur Sannam)', scientific_name: 'Capsicum annuum', season: 'kharif', duration_days: 150, water_requirement: 'Medium', profit_per_hectare: 200000, reason: 'Guntur chilli GI tag. Largest chilli market. Export to USA, Mexico.' },
                { name: 'Mango (Banginapalli)', scientific_name: 'Mangifera indica', season: 'zaid', duration_days: 120, water_requirement: 'Low', profit_per_hectare: 180000, reason: 'Andhra mango belt. Export to Middle East. Pulp processing.' },
                { name: 'Cashew', scientific_name: 'Anacardium occidentale', season: 'zaid', duration_days: 365, water_requirement: 'Low', profit_per_hectare: 160000, reason: 'Coastal belt. Processing industry in Kollam exports.' },
                { name: 'Aquaculture (Shrimp)', scientific_name: 'Penaeus vannamei', season: 'all', duration_days: 120, water_requirement: 'Very High', profit_per_hectare: 500000, reason: 'Nellore shrimp capital. Export to USA, Japan. Rs 300-500/kg.' },
                { name: 'Tobacco (FCV)', scientific_name: 'Nicotiana tabacum', season: 'rabi', duration_days: 120, water_requirement: 'Medium', profit_per_hectare: 150000, reason: 'Prakasam district. ITC, Godfrey Phillips contract. Export quality.' }
            ]
        }
    }
};

// Fetch real-time weather data
async function fetchWeatherData(lat, lon) {
    try {
        // Using Open-Meteo API (free, no key required)
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,rain&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Asia/Kolkata`
        );
        
        if (response.ok) {
            const data = await response.json();
            return {
                current_temp: data.current?.temperature_2m,
                humidity: data.current?.relative_humidity_2m,
                rain: data.current?.rain,
                forecast: data.daily
            };
        }
    } catch (error) {
        console.log('Weather API unavailable, using defaults');
    }
    return null;
}

// Get comprehensive agricultural data for a region
function getAgriculturalData(stateCode, districtName, seasonId) {
    const stateInfo = INDIA_AGRICULTURAL_DATA.states[stateCode] || {
        name: 'India',
        agro_zone: 'Mixed',
        annual_rainfall_mm: 1100,
        major_crops: ['Rice', 'Wheat', 'Pulses'],
        soil: 'Varied'
    };
    
    const seasonInfo = INDIA_AGRICULTURAL_DATA.seasons[seasonId] || INDIA_AGRICULTURAL_DATA.seasons[1];
    const seasonKey = seasonId === 1 ? 'kharif' : seasonId === 2 ? 'rabi' : 'zaid';
    const seasonCrops = INDIA_AGRICULTURAL_DATA.crops[seasonKey] || [];
    
    // Get state-specific specialty crops
    const stateSpecific = INDIA_AGRICULTURAL_DATA.stateSpecificCrops[stateCode];
    let specialtyCrops = [];
    
    if (stateSpecific && stateSpecific.crops) {
        specialtyCrops = stateSpecific.crops
            .filter(c => c.season === seasonKey || c.season === 'all')
            .map(c => ({
                name: c.name,
                scientific_name: c.scientific_name,
                duration_days: c.duration_days,
                water_requirement: c.water_requirement,
                water_mm: c.water_requirement === 'High' ? 800 : c.water_requirement === 'Medium' ? 500 : 300,
                optimal_temp: '20-35',
                suitable_soil: [stateInfo.soil.split(' ')[0], 'Well-drained'],
                suitable_states: [stateCode],
                msp: 0,
                avg_yield_quintal_per_hectare: Math.round(c.profit_per_hectare / 5000),
                investment_per_hectare: Math.round(c.profit_per_hectare * 0.4),
                profit_per_hectare: c.profit_per_hectare,
                diseases: ['Monitor local conditions'],
                practices: [
                    `Specialty crop of ${stateInfo.name}`,
                    c.reason,
                    'Connect with local FPOs for marketing',
                    'Visit Krishi Vigyan Kendra for technical guidance'
                ],
                is_specialty: true,
                specialty_reason: c.reason
            }));
    }
    
    // Filter generic crops suitable for this state
    const suitableCrops = seasonCrops.map(crop => {
        const isSuitable = crop.suitable_states.includes(stateCode);
        const isMajorCrop = stateInfo.major_crops.some(mc => 
            crop.name.toLowerCase().includes(mc.toLowerCase()) || 
            mc.toLowerCase().includes(crop.name.split(' ')[0].toLowerCase())
        );
        
        let suitability = 60; // Base for generic crops
        if (isSuitable) suitability += 20;
        if (isMajorCrop) suitability += 15;
        
        return {
            ...crop,
            suitability_score: Math.min(95, suitability),
            is_major_crop: isMajorCrop
        };
    });
    
    // Combine specialty crops (higher priority) with suitable generic crops
    const allCrops = [
        ...specialtyCrops.map(c => ({
            ...c,
            suitability_score: 95, // Specialty crops get highest score
            is_major_crop: false,
            is_specialty: true
        })),
        ...suitableCrops.filter(c => c.suitability_score >= 75)
    ].sort((a, b) => b.suitability_score - a.suitability_score);
    
    return {
        state: stateInfo,
        district: districtName,
        season: seasonInfo,
        crops: allCrops.slice(0, 8), // Return top 8 crops
        msp_data: INDIA_AGRICULTURAL_DATA.msp_2024_25,
        has_specialty_crops: specialtyCrops.length > 0
    };
}

// Export for global access
window.INDIA_AGRICULTURAL_DATA = INDIA_AGRICULTURAL_DATA;
window.getAgriculturalData = getAgriculturalData;
window.fetchWeatherData = fetchWeatherData;
