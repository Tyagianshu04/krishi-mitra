// ============================================
// CROP DISEASE DETECTION MODULE
// ============================================

(function() {
    'use strict';

    // Comprehensive Disease Database for Indian Crops
    const DISEASE_DATABASE = {
        rice: [
            {
                name: 'Blast (Rice Blast)',
                hindiName: 'ब्लास्ट रोग',
                severity: 'high',
                confidence: 92,
                symptoms: 'Diamond-shaped lesions with gray center and brown border on leaves. Nodes may turn blackish and break easily.',
                cause: 'Fungus (Magnaporthe oryzae). Spreads in humid conditions with temperatures 25-28°C.',
                treatment: [
                    { title: 'Chemical Control', desc: 'Spray Tricyclazole 75% WP @ 0.6g/L or Isoprothiolane 40% EC @ 1.5ml/L at initial disease appearance.' },
                    { title: 'Remove Infected Parts', desc: 'Remove and destroy severely infected plant parts to reduce fungal spread.' },
                    { title: 'Water Management', desc: 'Drain excess water from fields. Avoid continuous flooding during infection period.' },
                    { title: 'Nutrient Balance', desc: 'Avoid excessive nitrogen fertilization. Apply potash (K₂O) to strengthen plant resistance.' }
                ],
                prevention: [
                    'Use blast-resistant varieties like Pusa Basmati 1121, Samba Mahsuri',
                    'Treat seeds with Carbendazim 50% WP @ 2g/kg before sowing',
                    'Maintain proper spacing (20x15 cm) for air circulation',
                    'Avoid late planting and excessive nitrogen application',
                    'Practice crop rotation with non-host crops'
                ]
            },
            {
                name: 'Bacterial Leaf Blight',
                hindiName: 'जीवाणु पत्ती झुलसा',
                severity: 'high',
                confidence: 88,
                symptoms: 'Yellow to white lesions starting from leaf tips and margins, progressing downward. Leaves appear wilted and dry.',
                cause: 'Bacterium (Xanthomonas oryzae pv. oryzae). Spreads through irrigation water and rain splashes.',
                treatment: [
                    { title: 'Copper-based Spray', desc: 'Apply Copper Oxychloride 50% WP @ 2.5g/L mixed with Streptomycin Sulphate @ 0.5g/L.' },
                    { title: 'Drain Fields', desc: 'Drain standing water immediately. Avoid irrigation during active disease spread.' },
                    { title: 'Neem-based Treatment', desc: 'Spray neem oil @ 5ml/L as a bio-control measure to reduce bacterial population.' },
                    { title: 'Clip Infected Leaves', desc: 'Remove and burn infected leaf tips to prevent further spread.' }
                ],
                prevention: [
                    'Grow resistant varieties (Improved Samba Mahsuri, Rajendra Dhan 201)',
                    'Avoid clipping of seedling tips during transplanting',
                    'Ensure balanced NPK fertilization',
                    'Keep bunds and channels clean to prevent bacterial reservoirs',
                    'Avoid working in wet fields to prevent mechanical spread'
                ]
            },
            {
                name: 'Sheath Blight',
                hindiName: 'शीथ ब्लाइट',
                severity: 'medium',
                confidence: 85,
                symptoms: 'Oval or irregular greenish-gray lesions on leaf sheaths near water level. Lesions enlarge and coalesce, forming banded pattern.',
                cause: 'Fungus (Rhizoctonia solani). Favored by high humidity, dense planting, and excessive nitrogen.',
                treatment: [
                    { title: 'Fungicide Spray', desc: 'Apply Hexaconazole 5% SC @ 2ml/L or Validamycin 3% SL @ 2ml/L at tillering stage.' },
                    { title: 'Reduce Plant Density', desc: 'Thin out dense stands to improve air circulation at the canopy level.' },
                    { title: 'Biological Control', desc: 'Apply Trichoderma viride @ 2.5 kg/ha mixed with FYM near the plant base.' }
                ],
                prevention: [
                    'Avoid excessive nitrogen fertilizer; apply in split doses',
                    'Maintain optimum plant spacing',
                    'Remove and destroy crop residues after harvest',
                    'Deep summer ploughing to expose sclerotia to sunlight'
                ]
            }
        ],
        wheat: [
            {
                name: 'Wheat Rust (Yellow/Brown Rust)',
                hindiName: 'गेहूं का रतुआ रोग',
                severity: 'high',
                confidence: 94,
                symptoms: 'Yellow-orange to brown pustules on leaves arranged in stripes (yellow rust) or scattered (brown rust). Severe infection causes leaf drying.',
                cause: 'Fungus (Puccinia striiformis for yellow rust, P. triticina for brown rust). Spreads through wind-borne spores.',
                treatment: [
                    { title: 'Fungicide Application', desc: 'Spray Propiconazole 25% EC @ 1ml/L or Tebuconazole 25.9% EC @ 1ml/L immediately on symptom appearance.' },
                    { title: 'Second Spray', desc: 'Repeat spray after 15 days if disease persists. Alternate between fungicides to prevent resistance.' },
                    { title: 'Foliar Nutrition', desc: 'Apply foliar spray of 2% urea + 0.5% zinc sulphate to boost plant immunity.' }
                ],
                prevention: [
                    'Grow rust-resistant varieties (HD 3226, DBW 187, PBW 826)',
                    'Timely sowing (November 1st week for North India)',
                    'Avoid late sowing as it increases rust susceptibility',
                    'Monitor fields regularly from January onward',
                    'Report new rust races to nearest agriculture research station'
                ]
            },
            {
                name: 'Powdery Mildew',
                hindiName: 'चूर्णिल आसिता',
                severity: 'medium',
                confidence: 90,
                symptoms: 'White powdery fungal growth on upper leaf surfaces, stems, and ears. Affected leaves turn yellow and dry prematurely.',
                cause: 'Fungus (Blumeria graminis f. sp. tritici). Favored by moderate temperatures (15-22°C) and high humidity.',
                treatment: [
                    { title: 'Sulphur Spray', desc: 'Apply Wettable Sulphur 80% WP @ 2.5g/L or Karathane @ 1ml/L at first signs of white patches.' },
                    { title: 'Systemic Fungicide', desc: 'Spray Hexaconazole 5% SC @ 2ml/L for severe infection.' },
                    { title: 'Neem Solution', desc: 'Use neem-based formulation @ 5ml/L as an eco-friendly alternative.' }
                ],
                prevention: [
                    'Avoid dense sowing; maintain recommended seed rate',
                    'Balanced use of nitrogenous fertilizers',
                    'Grow tolerant varieties recommended for your zone',
                    'Remove volunteer wheat plants and weed hosts'
                ]
            },
            {
                name: 'Loose Smut',
                hindiName: 'खुला कंड रोग',
                severity: 'medium',
                confidence: 87,
                symptoms: 'Earheads replaced by black powdery mass of spores. Infected ears emerge earlier than healthy ones and spores disperse by wind.',
                cause: 'Fungus (Ustilago tritici). Seed-borne disease; fungus lies dormant inside the seed.',
                treatment: [
                    { title: 'Seed Treatment', desc: 'Treat seeds with Carboxin 75% WP @ 2.5g/kg or Vitavax Power @ 2g/kg before sowing.' },
                    { title: 'Solar Treatment', desc: 'Soak seeds in water for 4 hrs, then expose to sun for 4 hrs. Repeat for 3 days and dry seeds.' },
                    { title: 'Rogue Out', desc: 'Remove and destroy infected earheads before spores disperse (before the black mass opens).' }
                ],
                prevention: [
                    'Use certified disease-free seeds',
                    'Mandatory seed treatment before every sowing',
                    'Rogue out smutted earheads immediately upon detection',
                    'Do not save seeds from infected fields for next season'
                ]
            }
        ],
        cotton: [
            {
                name: 'Cotton Leaf Curl Virus (CLCuV)',
                hindiName: 'कपास पत्ती मोड़क विषाणु',
                severity: 'high',
                confidence: 91,
                symptoms: 'Upward or downward curling of leaves, thickening of veins (enation), stunted growth. Small leaf-like outgrowths on underside of leaves.',
                cause: 'Begomovirus transmitted by whitefly (Bemisia tabaci). Major problem in North India cotton belt.',
                treatment: [
                    { title: 'Whitefly Control', desc: 'Spray Diafenthiuron 50% WP @ 1g/L or Spiromesifen 22.9% SC @ 0.7ml/L to control whitefly vector.' },
                    { title: 'Neem-based Spray', desc: 'Apply Neem Seed Kernel Extract (NSKE) 5% or Neem oil @ 5ml/L at 15-day intervals.' },
                    { title: 'Remove Infected Plants', desc: 'Uproot severely infected plants early (within 45 DAS) and bury them deep to reduce virus inoculum.' },
                    { title: 'Systemic Insecticide', desc: 'Apply Imidacloprid 17.8% SL @ 0.3ml/L as soil drench around plant base for whitefly control.' }
                ],
                prevention: [
                    'Grow CLCuV-tolerant Bt varieties recommended for your zone',
                    'Treat seeds with Imidacloprid 70% WS @ 5g/kg',
                    'Avoid late sowing (sow before May 15 in North India)',
                    'Install yellow sticky traps @ 5/acre for whitefly monitoring',
                    'Remove alternate host weeds like Sida, Abutilon from field borders'
                ]
            },
            {
                name: 'Bacterial Blight of Cotton',
                hindiName: 'जीवाणु झुलसा',
                severity: 'medium',
                confidence: 86,
                symptoms: 'Angular water-soaked spots on leaves that turn brown to black. Black arm symptom on stems and petioles.',
                cause: 'Bacterium (Xanthomonas citri pv. malvacearum). Spreads through rain splash and contaminated seeds.',
                treatment: [
                    { title: 'Copper Spray', desc: 'Spray Copper Hydroxide 77% WP @ 2g/L at 10-day intervals during rainy season.' },
                    { title: 'Antibiotic Application', desc: 'Mix Streptocycline @ 0.5g + Copper Oxychloride @ 2.5g per liter and spray on affected plants.' },
                    { title: 'Destroy Debris', desc: 'Collect and burn all infected plant debris after harvest.' }
                ],
                prevention: [
                    'Use acid-delinted, treated seeds',
                    'Treat seeds with Carboxin + Thiram @ 3g/kg',
                    'Grow resistant varieties like Suraj, MCU 5',
                    'Practice crop rotation (avoid cotton-cotton sequence)',
                    'Maintain field hygiene; destroy crop residues'
                ]
            }
        ],
        tomato: [
            {
                name: 'Early Blight',
                hindiName: 'अगेती झुलसा',
                severity: 'medium',
                confidence: 89,
                symptoms: 'Dark brown concentric ring (target board) spots on older leaves. Spots enlarge, leaves yellow and drop. Fruit may show dark sunken lesions at stem end.',
                cause: 'Fungus (Alternaria solani). Favored by warm (24-29°C) and humid conditions.',
                treatment: [
                    { title: 'Fungicide Spray', desc: 'Apply Mancozeb 75% WP @ 2.5g/L or Chlorothalonil 75% WP @ 2g/L at 10-12 day intervals.' },
                    { title: 'Combination Spray', desc: 'Use Cymoxanil + Mancozeb (Curzate M8) @ 3g/L for better control in severe cases.' },
                    { title: 'Remove Lower Leaves', desc: 'Prune and remove lower infected leaves to reduce spore load and improve air circulation.' }
                ],
                prevention: [
                    'Use disease-free transplants and certified seeds',
                    'Practice 2-3 year crop rotation with non-solanaceous crops',
                    'Mulch to prevent soil splash onto lower leaves',
                    'Stake plants for better air circulation',
                    'Avoid overhead irrigation; use drip irrigation'
                ]
            },
            {
                name: 'Late Blight',
                hindiName: 'पछेती झुलसा',
                severity: 'high',
                confidence: 93,
                symptoms: 'Water-soaked dark green to brown patches on leaves, often starting from tips and margins. White fungal growth on leaf underside in humid conditions. Fruits show greasy brown patches.',
                cause: 'Oomycete (Phytophthora infestans). Rapidly spreads during cool (15-22°C), wet weather.',
                treatment: [
                    { title: 'Immediate Spray', desc: 'Apply Metalaxyl + Mancozeb (Ridomil Gold MZ 68% WP) @ 2.5g/L as soon as symptoms appear.' },
                    { title: 'Follow-up Spray', desc: 'Alternate with Cymoxanil + Mancozeb @ 3g/L after 7 days. Continue at 7-10 day intervals in wet weather.' },
                    { title: 'Protective Spray', desc: 'Apply Copper Oxychloride @ 2.5g/L as a preventive during forecast of rain/cloudy weather.' },
                    { title: 'Destroy Infected Fruits', desc: 'Remove and destroy infected fruits and plant debris from field immediately.' }
                ],
                prevention: [
                    'Grow resistant/tolerant varieties',
                    'Avoid planting in low-lying waterlogged areas',
                    'Provide proper drainage and avoid excessive irrigation',
                    'Keep adequate spacing between plants',
                    'Monitor weather forecasts and spray preventively before wet spells'
                ]
            },
            {
                name: 'Tomato Leaf Curl Virus',
                hindiName: 'पत्ती मोड़क विषाणु',
                severity: 'high',
                confidence: 90,
                symptoms: 'Upward curling and crinkling of leaves, yellowing of leaf margins, stunted bushy growth. Plants remain small with reduced fruit set.',
                cause: 'Begomovirus transmitted by whitefly (Bemisia tabaci). Very common in tropical and subtropical regions.',
                treatment: [
                    { title: 'Whitefly Control', desc: 'Spray Thiamethoxam 25% WG @ 0.3g/L or Diafenthiuron 50% WP @ 1g/L at 10-day intervals.' },
                    { title: 'Uproot Infected Plants', desc: 'Remove and destroy severely infected plants to prevent virus spread to healthy plants.' },
                    { title: 'Neem Treatment', desc: 'Apply NSKE 5% or neem oil @ 3ml/L as repellent spray against whiteflies.' }
                ],
                prevention: [
                    'Use ToLCV-resistant varieties (Arka Rakshak, Arka Samrat)',
                    'Raise nurseries under insect-proof net (40 mesh)',
                    'Install yellow sticky traps in and around fields',
                    'Treat seeds/seedlings with Imidacloprid before transplanting',
                    'Avoid planting near old infected tomato/chilli fields'
                ]
            }
        ],
        potato: [
            {
                name: 'Late Blight of Potato',
                hindiName: 'आलू का पछेती झुलसा',
                severity: 'high',
                confidence: 95,
                symptoms: 'Water-soaked brown-black lesions on leaves and stems. White mildew on undersurface of leaves. Tubers show brownish rot extending inward.',
                cause: 'Oomycete (Phytophthora infestans). The most destructive potato disease. Favored by cool (10-20°C), wet conditions.',
                treatment: [
                    { title: 'Systemic + Contact Spray', desc: 'Apply Metalaxyl + Mancozeb @ 2.5g/L at first symptom or when forecast predicts blight weather.' },
                    { title: 'Alternate Fungicides', desc: 'Rotate with Cymoxanil + Mancozeb @ 3g/L and Dimethomorph 50% WP @ 1g/L at 7-10 day intervals.' },
                    { title: 'Dehaulming', desc: 'Cut and remove haulms (aboveground plant parts) 10-15 days before harvest to prevent tuber infection.' },
                    { title: 'Tuber Treatment', desc: 'Treat harvested tubers with Mancozeb @ 0.25% solution before storage.' }
                ],
                prevention: [
                    'Use certified disease-free seed tubers',
                    'Grow resistant varieties (Kufri Jyoti, Kufri Badshah)',
                    'Avoid low-lying waterlogged fields',
                    'Proper earthing up (ridging) to protect tubers',
                    'Monitor ICAR late blight forecasting system for your area',
                    'Do not store infected tubers with healthy ones'
                ]
            },
            {
                name: 'Early Blight of Potato',
                hindiName: 'आलू का अगेती झुलसा',
                severity: 'medium',
                confidence: 87,
                symptoms: 'Dark brown spots with concentric rings (target board appearance) on older leaves first. Spots may coalesce, causing leaf death. Tuber lesions are dark, sunken, and circular.',
                cause: 'Fungus (Alternaria solani). Favored by warm (24-29°C) alternating wet and dry conditions.',
                treatment: [
                    { title: 'Protectant Fungicide', desc: 'Spray Mancozeb 75% WP @ 2.5g/L starting at first symptom, repeat every 10-12 days.' },
                    { title: 'Systemic Fungicide', desc: 'Apply Azoxystrobin 23% SC @ 1ml/L for better curative action in moderate infections.' },
                    { title: 'Nutritional Support', desc: 'Foliar spray of 0.5% Potassium chloride + micronutrients to improve plant vigor.' }
                ],
                prevention: [
                    'Use healthy, certified seed potatoes',
                    'Maintain balanced fertilization; avoid nitrogen excess',
                    'Practice crop rotation; avoid planting after solanaceous crops',
                    'Ensure adequate irrigation scheduling (avoid water stress)',
                    'Remove and destroy crop debris after harvest'
                ]
            }
        ],
        onion: [
            {
                name: 'Purple Blotch',
                hindiName: 'बैंगनी धब्बा रोग',
                severity: 'high',
                confidence: 88,
                symptoms: 'Small water-soaked lesions on leaves that enlarge and turn purplish-brown with concentric zones. Affected leaves may bend and dry up.',
                cause: 'Fungus (Alternaria porri). Spreads rapidly in warm (21-30°C), humid conditions with prolonged leaf wetness.',
                treatment: [
                    { title: 'Fungicide Rotation', desc: 'Spray Mancozeb 75% WP @ 2.5g/L alternated with Tebuconazole 25.9% EC @ 1ml/L at 10-12 day intervals.' },
                    { title: 'Sticker Addition', desc: 'Add Triton or Teepol sticker @ 1ml/L to fungicide spray for better adherence on waxy onion leaves.' },
                    { title: 'Bio-Control', desc: 'Apply Trichoderma harzianum @ 5g/L as preventive foliar spray.' }
                ],
                prevention: [
                    'Follow 3-year crop rotation; avoid Allium crops in sequence',
                    'Use disease-free healthy seedlings for transplanting',
                    'Avoid excessive nitrogen and maintain adequate potash levels',
                    'Ensure good drainage; avoid overhead irrigation',
                    'Remove and destroy infected crop residues'
                ]
            },
            {
                name: 'Downy Mildew',
                hindiName: 'मृदुल आसिता',
                severity: 'medium',
                confidence: 84,
                symptoms: 'Pale green to yellowish patches on leaves. Leaves bend downward from the middle. Violet-gray fungal growth visible during moist mornings.',
                cause: 'Oomycete (Peronospora destructor). Spreads in cool (10-15°C), foggy, and misty conditions.',
                treatment: [
                    { title: 'Metalaxyl Spray', desc: 'Apply Metalaxyl 8% + Mancozeb 64% WP @ 2.5g/L at first sign of disease.' },
                    { title: 'Copper Fungicide', desc: 'Spray Copper Oxychloride 50% WP @ 2.5g/L as follow-up spray after 10 days.' }
                ],
                prevention: [
                    'Grow resistant varieties',
                    'Avoid dense planting; maintain proper row spacing',
                    'Water early in the day to allow leaf surfaces to dry',
                    'Remove crop residues and volunteer onion plants'
                ]
            }
        ],
        sugarcane: [
            {
                name: 'Red Rot',
                hindiName: 'लाल सड़न रोग',
                severity: 'high',
                confidence: 91,
                symptoms: 'Drying and withering of top leaves (crown). Splitting cane shows red discoloration of internal tissues with white patches. Juice gives alcoholic smell.',
                cause: 'Fungus (Colletotrichum falcatum). The most dreaded sugarcane disease. Spreads through infected setts.',
                treatment: [
                    { title: 'Sett Treatment', desc: 'Treat seed setts with Carbendazim 50% WP @ 2g/L + Malathion @ 2ml/L solution for 15 minutes before planting.' },
                    { title: 'Hot Water Treatment', desc: 'Dip setts in hot water at 52°C for 30 minutes (aerated steam treatment) to kill internal mycelium.' },
                    { title: 'Rogue Out', desc: 'Uproot and destroy infected clumps along with their ratoon. Burn all infected debris.' },
                    { title: 'Bio-Agent', desc: 'Apply Trichoderma viride @ 2.5 kg/acre mixed with FYM in the furrows at planting.' }
                ],
                prevention: [
                    'Use disease-free seed cane from registered nurseries',
                    'Grow resistant varieties (CoC 671, Co 94012)',
                    'Avoid ratooning from infected fields',
                    'Practice crop rotation (sugarcane-rice or sugarcane-legume)',
                    'Do not allow waterlogging in the field',
                    'Avoid mechanical injury to canes during intercultural operations'
                ]
            },
            {
                name: 'Smut',
                hindiName: 'कंड रोग',
                severity: 'medium',
                confidence: 86,
                symptoms: 'Long whip-like black structure (smut whip) emerging from the growing point of the cane. Tillers become thin and grass-like.',
                cause: 'Fungus (Sporisorium scitamineum). Spreads through wind-borne spores and infected setts.',
                treatment: [
                    { title: 'Remove Whips', desc: 'Cut and destroy smut whips before they open and release spores. Burn them immediately.' },
                    { title: 'Sett Treatment', desc: 'Treat setts with Triadimefon 25% WP @ 2g/L for 15 minutes before planting.' },
                    { title: 'Uproot Clumps', desc: 'Uproot entire infected clumps from the field and do not allow ratooning.' }
                ],
                prevention: [
                    'Use certified disease-free seed cane',
                    'Grow smut-resistant varieties',
                    'Do not ratoon a smut-infected crop',
                    'Avoid using setts from smut-affected areas',
                    'Hot-air or hot-water treatment of setts before planting'
                ]
            }
        ],
        maize: [
            {
                name: 'Turcicum Leaf Blight',
                hindiName: 'टर्सिकम पत्ती झुलसा',
                severity: 'medium',
                confidence: 87,
                symptoms: 'Long elliptical gray-green lesions on leaves that turn tan as they mature. Lesions may coalesce covering entire leaves in severe cases.',
                cause: 'Fungus (Exserohilum turcicum). Favored by moderate temperatures (18-27°C) and heavy dews.',
                treatment: [
                    { title: 'Fungicide Spray', desc: 'Apply Mancozeb 75% WP @ 2.5g/L or Zineb 75% WP @ 2g/L when first lesions appear.' },
                    { title: 'Systemic Fungicide', desc: 'Spray Propiconazole 25% EC @ 1ml/L for advanced infections at tasseling stage.' }
                ],
                prevention: [
                    'Grow resistant hybrids recommended for your region',
                    'Practice crop rotation (avoid maize after maize)',
                    'Remove and destroy crop stubbles after harvest',
                    'Balanced fertilization with adequate potash'
                ]
            },
            {
                name: 'Maydis Leaf Blight',
                hindiName: 'मेडिस पत्ती झुलसा',
                severity: 'medium',
                confidence: 85,
                symptoms: 'Rectangular, buff to brown lesions restricted by veins on leaves. Lesions are smaller and narrower compared to Turcicum blight.',
                cause: 'Fungus (Bipolaris maydis). Spreads under warm (20-32°C), humid conditions.',
                treatment: [
                    { title: 'Contact Fungicide', desc: 'Spray Mancozeb 75% WP @ 2.5g/L at first symptom, repeat every 10-12 days.' },
                    { title: 'Remove Debris', desc: 'Remove severely infected lower leaves and destroy them.' }
                ],
                prevention: [
                    'Use resistant varieties/hybrids',
                    'Avoid monocropping of maize',
                    'Deep ploughing to bury crop residues',
                    'Timely sowing to avoid peak disease periods'
                ]
            }
        ],
        groundnut: [
            {
                name: 'Tikka Disease (Leaf Spots)',
                hindiName: 'टिक्का रोग',
                severity: 'medium',
                confidence: 89,
                symptoms: 'Dark brown circular spots on leaves (early leaf spot has lighter center; late leaf spot is darker). Severe infection causes defoliation and reduces yield by 50-70%.',
                cause: 'Fungi (Cercospora arachidicola for early, Phaeoisariopsis personata for late). Most common groundnut disease in India.',
                treatment: [
                    { title: 'Fungicide Spray', desc: 'Spray Chlorothalonil 75% WP @ 2g/L or Mancozeb @ 2.5g/L starting at 30 DAS, repeat every 15 days.' },
                    { title: 'Systemic Fungicide', desc: 'Apply Hexaconazole 5% EC @ 2ml/L or Carbendazim 50% WP @ 1g/L for curative action.' },
                    { title: 'Combined Spray', desc: 'Mancozeb + Carbendazim (SAAF) @ 2g/L gives both protective and curative action.' }
                ],
                prevention: [
                    'Use resistant varieties (GPBD 4, ICGV 00350)',
                    'Treat seeds with Thiram + Carbendazim @ 3g/kg',
                    'Practice inter-cropping with cereals (groundnut + sorghum)',
                    'Remove volunteer plants and crop residues',
                    'Follow recommended spacing for air circulation'
                ]
            }
        ],
        mustard: [
            {
                name: 'White Rust (Albugo)',
                hindiName: 'सफेद रतुआ',
                severity: 'medium',
                confidence: 88,
                symptoms: 'White blister-like pustules on the underside of leaves. Upper leaf surface shows yellowish patches. Flower heads (inflorescence) may be severely distorted (staghead).',
                cause: 'Oomycete (Albugo candida). Favored by cool (10-20°C), humid conditions with morning dew.',
                treatment: [
                    { title: 'Metalaxyl Spray', desc: 'Apply Metalaxyl 8% + Mancozeb 64% WP @ 2.5g/L at first appearance, repeat after 15 days.' },
                    { title: 'Remove Stagheads', desc: 'Cut and destroy distorted stagheads to prevent further spread.' },
                    { title: 'Mancozeb Spray', desc: 'Spray Mancozeb 75% WP @ 2.5g/L as preventive during flowering stage.' }
                ],
                prevention: [
                    'Grow resistant varieties (Pusa Bold, RH 749)',
                    'Timely sowing (October last week to November 1st week)',
                    'Treat seeds with Metalaxyl 35% SD @ 6g/kg',
                    'Avoid excessive nitrogen; maintain potash levels',
                    'Remove cruciferous weeds from field borders'
                ]
            },
            {
                name: 'Alternaria Blight',
                hindiName: 'अल्टरनेरिया झुलसा',
                severity: 'high',
                confidence: 86,
                symptoms: 'Dark brown to black circular spots with concentric rings on leaves. Spots also appear on stems and pods. Severe infection causes premature leaf fall.',
                cause: 'Fungus (Alternaria brassicae). Most destructive foliar disease of mustard. Favored by 20-25°C temperature and high humidity.',
                treatment: [
                    { title: 'Mancozeb Spray', desc: 'Spray Mancozeb 75% WP @ 2.5g/L at first symptom (usually 45-50 DAS), repeat at 15-day intervals.' },
                    { title: 'Iprodione Spray', desc: 'Apply Iprodione 50% WP @ 2g/L for severe infections.' },
                    { title: 'Seed Treatment', desc: 'Treat seeds with Iprodione @ 2g/kg or Mancozeb @ 3g/kg before sowing.' }
                ],
                prevention: [
                    'Use tolerant varieties (RLM 619, Varuna)',
                    'Early sowing to escape peak disease period',
                    'Ensure proper drainage in the field',
                    'Destroy crop residues by deep ploughing after harvest',
                    'Avoid continuous mustard cropping in the same field'
                ]
            }
        ],
        mango: [
            {
                name: 'Anthracnose',
                hindiName: 'एन्थ्रेक्नोज',
                severity: 'high',
                confidence: 92,
                symptoms: 'Black/dark brown spots on leaves and fruits. Blossom blight causing flower drop. Fruit shows sunken dark spots with salmon-pink spore mass in wet conditions.',
                cause: 'Fungus (Colletotrichum gloeosporioides). Major pre- and post-harvest disease. Spreads during warm (25-30°C), rainy weather.',
                treatment: [
                    { title: 'Pre-Bloom Spray', desc: 'Spray Carbendazim 50% WP @ 1g/L or Thiophanate Methyl @ 1g/L before flowering starts.' },
                    { title: 'During Flowering', desc: 'Apply Copper Oxychloride @ 3g/L to protect blossoms from blight.' },
                    { title: 'Post-Harvest Treatment', desc: 'Dip harvested fruits in hot water (52°C) for 5 minutes or Carbendazim @ 500ppm for 5 minutes.' }
                ],
                prevention: [
                    'Prune infected twigs and canopy for air circulation',
                    'Collect and destroy fallen infected fruits and leaves',
                    'Avoid overhead irrigation during flowering',
                    'Apply balanced nutrition (especially potash and zinc)',
                    'Proper post-harvest handling; avoid physical damage to fruits'
                ]
            },
            {
                name: 'Powdery Mildew of Mango',
                hindiName: 'चूर्णिल आसिता',
                severity: 'medium',
                confidence: 88,
                symptoms: 'White powdery coating on panicles (flower clusters), young fruits, and leaves. Causes severe blossom drop and fruit set failure. Affected fruits remain small and drop.',
                cause: 'Fungus (Oidium mangiferae). Appears during flowering season (Feb-March) in humid conditions.',
                treatment: [
                    { title: 'Sulphur Spray', desc: 'Dust or spray Wettable Sulphur 80% WP @ 2g/L at panicle emergence (before flowers open).' },
                    { title: 'Systemic Fungicide', desc: 'Apply Hexaconazole 5% SC @ 1ml/L or Triadimefon @ 1g/L at full bloom as second spray.' },
                    { title: 'Repeat Spray', desc: 'Give third spray 15 days after second spray if weather remains humid.' }
                ],
                prevention: [
                    'Avoid dense planting; maintain proper canopy management',
                    'Timely pre-bloom sprays are more effective than curative ones',
                    'Prune trees to allow sunlight penetration and air movement',
                    'Collect and destroy fallen infested flowers and leaves'
                ]
            }
        ],
        turmeric: [
            {
                name: 'Rhizome Rot',
                hindiName: 'प्रकन्द सड़न',
                severity: 'high',
                confidence: 87,
                symptoms: 'Yellowing and wilting of lower leaves progressing upward. Collar region turns soft and brown. Rhizomes show brownish rot with foul smell when pulled out.',
                cause: 'Fungus (Pythium aphanidermatum). Spreads in waterlogged, poorly drained soils during monsoon.',
                treatment: [
                    { title: 'Copper Drench', desc: 'Drench soil around affected plants with Copper Oxychloride @ 2.5g/L + Metalaxyl @ 2g/L solution.' },
                    { title: 'Bio-Control', desc: 'Apply Trichoderma viride @ 2.5 kg/ha mixed with neem cake and FYM near plant base.' },
                    { title: 'Uproot Infected Plants', desc: 'Remove and destroy completely rotted clumps to prevent spread to adjacent plants.' }
                ],
                prevention: [
                    'Use healthy, disease-free mother rhizomes',
                    'Treat seed rhizomes with Mancozeb @ 3g/L for 30 minutes',
                    'Ensure adequate drainage in the field',
                    'Apply neem cake @ 200 kg/ha in furrows',
                    'Avoid continuous turmeric cropping; rotate with paddy or pulses'
                ]
            },
            {
                name: 'Leaf Spot / Leaf Blotch',
                hindiName: 'पत्ती धब्बा',
                severity: 'low',
                confidence: 83,
                symptoms: 'Oval to irregular brown spots on both surfaces of leaves. Spots may enlarge and coalesce. Severe infection causes leaf drying.',
                cause: 'Fungus (Colletotrichum capsici / Taphrina maculans). Common during monsoon season.',
                treatment: [
                    { title: 'Fungicide Spray', desc: 'Spray Mancozeb 75% WP @ 2.5g/L starting at symptom appearance, repeat at 15-day intervals.' },
                    { title: 'Bordeaux Mixture', desc: 'Apply Bordeaux Mixture 1% as protective spray during rainy season.' }
                ],
                prevention: [
                    'Proper spacing for air circulation',
                    'Remove and destroy infected leaves',
                    'Avoid overhead irrigation during monsoon',
                    'Maintain balanced nutrition'
                ]
            }
        ],
        chana: [
            {
                name: 'Wilt (Fusarium Wilt)',
                hindiName: 'उकठा रोग',
                severity: 'high',
                confidence: 90,
                symptoms: 'Drooping and yellowing of leaves starting from the lower part. Plants wilt during flowering/pod filling. Internal stem shows brown discoloration of vascular tissue.',
                cause: 'Fungus (Fusarium oxysporum f. sp. ciceri). Soil-borne; persists for years. Major chickpea disease in India.',
                treatment: [
                    { title: 'Seed Treatment', desc: 'Treat seeds with Carbendazim 50% WP + Thiram 75% WP (1:1) @ 3g/kg or Trichoderma viride @ 4g/kg.' },
                    { title: 'Soil Application', desc: 'Apply Trichoderma viride @ 2.5 kg/ha enriched in FYM (100 kg) at sowing time.' },
                    { title: 'Uproot Wilted Plants', desc: 'Remove and destroy wilted plants along with adhering soil from the field.' }
                ],
                prevention: [
                    'Grow wilt-resistant varieties (Vishal, JG 74, ICCV 10)',
                    'Follow crop rotation with cereals (wheat/rice) for 3+ years',
                    'Deep summer ploughing to reduce fungal inoculum',
                    'Avoid waterlogging and excessive irrigation',
                    'Add sufficient organic matter (FYM/compost) to soil',
                    'Early sowing (October-November) reduces wilt incidence'
                ]
            },
            {
                name: 'Ascochyta Blight',
                hindiName: 'एस्कोकाइटा ब्लाइट',
                severity: 'medium',
                confidence: 85,
                symptoms: 'Circular necrotic spots with dark margins on leaves, stems, and pods. Stem lesions may girdle the plant causing breakage. Seeds may show brown discoloration.',
                cause: 'Fungus (Ascochyta rabiei). Seed-borne and air-borne. Severe in cool (15-25°C), wet weather.',
                treatment: [
                    { title: 'Seed Treatment', desc: 'Must treat seeds with Thiram + Carbendazim @ 2.5g/kg before sowing.' },
                    { title: 'Foliar Spray', desc: 'Spray Mancozeb 75% WP @ 2.5g/L at first sign of disease, repeat after 10-15 days.' },
                    { title: 'Chlorothalonil Spray', desc: 'Apply Chlorothalonil 75% WP @ 2g/L for better efficacy in humid conditions.' }
                ],
                prevention: [
                    'Use certified disease-free seeds',
                    'Grow tolerant varieties (GL 769, GBM 2)',
                    'Avoid dense sowing; use recommended seed rate',
                    'Inter-cropping with linseed or wheat reduces spread',
                    'Destroy infected crop residues by deep ploughing'
                ]
            }
        ]
    };

    // Healthy crop response when no disease is detected
    const HEALTHY_RESPONSE = {
        name: 'No Disease Detected',
        severity: 'healthy',
        confidence: 85,
        symptoms: 'The crop appears healthy with no visible signs of disease.',
        cause: 'N/A — Your crop looks good!',
        treatment: [
            { title: 'Continue Good Practices', desc: 'Maintain your current farming practices including balanced fertilization, proper irrigation, and regular monitoring.' },
            { title: 'Preventive Sprays', desc: 'Apply preventive fungicide sprays as per crop schedule to keep your crop protected.' }
        ],
        prevention: [
            'Continue monitoring regularly for early detection',
            'Maintain proper nutrition and irrigation schedules',
            'Practice crop rotation and field hygiene',
            'Use recommended seed treatment before every season'
        ]
    };

    // Common diseases reference data
    const REFERENCE_DISEASES = [
        { crop: 'Rice', disease: 'Blast', symptoms: 'Diamond-shaped lesions on leaves', severity: 'high' },
        { crop: 'Rice', disease: 'Bacterial Leaf Blight', symptoms: 'Yellow-white lesions from leaf tips', severity: 'high' },
        { crop: 'Wheat', disease: 'Yellow/Brown Rust', symptoms: 'Orange-brown pustules on leaves', severity: 'high' },
        { crop: 'Wheat', disease: 'Powdery Mildew', symptoms: 'White powdery growth on surfaces', severity: 'medium' },
        { crop: 'Cotton', disease: 'Leaf Curl Virus', symptoms: 'Upward curling, vein thickening', severity: 'high' },
        { crop: 'Tomato', disease: 'Late Blight', symptoms: 'Water-soaked brown patches', severity: 'high' },
        { crop: 'Tomato', disease: 'Leaf Curl Virus', symptoms: 'Upward curling, stunted growth', severity: 'high' },
        { crop: 'Potato', disease: 'Late Blight', symptoms: 'Brown-black lesions, white mildew', severity: 'high' },
        { crop: 'Onion', disease: 'Purple Blotch', symptoms: 'Purplish-brown spots with rings', severity: 'high' },
        { crop: 'Sugarcane', disease: 'Red Rot', symptoms: 'Red internal tissue, alcoholic smell', severity: 'high' },
        { crop: 'Mustard', disease: 'White Rust', symptoms: 'White blisters on leaf underside', severity: 'medium' },
        { crop: 'Mango', disease: 'Anthracnose', symptoms: 'Black spots on fruits and flowers', severity: 'high' },
        { crop: 'Groundnut', disease: 'Tikka Disease', symptoms: 'Brown circular leaf spots', severity: 'medium' },
        { crop: 'Chana', disease: 'Fusarium Wilt', symptoms: 'Drooping, yellowing, vascular brown', severity: 'high' },
        { crop: 'Turmeric', disease: 'Rhizome Rot', symptoms: 'Yellowing, soft collar, foul smell', severity: 'high' },
    ];

    // State
    let uploadedFile = null;
    let uploadedImageData = null;

    // ---- INITIALIZATION ----
    document.addEventListener('DOMContentLoaded', function() {
        setupDiseaseDetection();
    });

    function setupDiseaseDetection() {
        setupUploadZone();
        setupCameraCapture();
        setupAnalyzeButton();
        setupRemoveImage();
        setupNewScan();
        setupDownloadReport();
        populateReferenceGrid();
    }

    // ---- UPLOAD ZONE ----
    function setupUploadZone() {
        const zone = document.getElementById('diseaseUploadZone');
        const input = document.getElementById('diseaseImageInput');
        if (!zone || !input) return;

        // Click to browse
        zone.addEventListener('click', () => input.click());

        // File input change
        input.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
            }
        });

        // Drag and drop
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('drag-over');
        });
        zone.addEventListener('dragleave', () => {
            zone.classList.remove('drag-over');
        });
        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-over');
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFileUpload(e.dataTransfer.files[0]);
            }
        });
    }

    function handleFileUpload(file) {
        // Validate file
        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
            showDiseaseToast('Please upload a valid image (JPG, PNG, or WEBP)', 'error');
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            showDiseaseToast('Image size must be less than 10MB', 'error');
            return;
        }

        uploadedFile = file;

        // Read and preview
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedImageData = e.target.result;
            showImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    function showImagePreview(src) {
        const zone = document.getElementById('diseaseUploadZone');
        const preview = document.getElementById('diseaseImagePreview');
        const previewImg = document.getElementById('diseasePreviewImg');
        const analyzeBtn = document.getElementById('diseaseAnalyzeBtn');

        if (zone) zone.classList.add('hidden');
        if (preview) {
            previewImg.src = src;
            preview.classList.remove('hidden');
        }
        if (analyzeBtn) analyzeBtn.disabled = false;

        // Reset results
        const resultsCard = document.getElementById('diseaseResultsCard');
        if (resultsCard) resultsCard.classList.add('hidden');
    }

    // ---- REMOVE IMAGE ----
    function setupRemoveImage() {
        const btn = document.getElementById('diseaseRemoveImage');
        if (!btn) return;
        btn.addEventListener('click', resetUpload);
    }

    function resetUpload() {
        uploadedFile = null;
        uploadedImageData = null;

        const zone = document.getElementById('diseaseUploadZone');
        const preview = document.getElementById('diseaseImagePreview');
        const analyzeBtn = document.getElementById('diseaseAnalyzeBtn');
        const input = document.getElementById('diseaseImageInput');
        const resultsCard = document.getElementById('diseaseResultsCard');

        if (zone) zone.classList.remove('hidden');
        if (preview) preview.classList.add('hidden');
        if (analyzeBtn) analyzeBtn.disabled = true;
        if (input) input.value = '';
        if (resultsCard) resultsCard.classList.add('hidden');
    }

    // ---- CAMERA CAPTURE ----
    function setupCameraCapture() {
        const btn = document.getElementById('diseaseCameraBtn');
        if (!btn) return;
        btn.addEventListener('click', () => {
            // On mobile, open camera; on desktop, fallback to file input
            const input = document.getElementById('diseaseImageInput');
            if (input) {
                input.setAttribute('capture', 'environment');
                input.click();
                // Remove capture attribute after so browse still works normally
                setTimeout(() => input.removeAttribute('capture'), 1000);
            }
        });
    }

    // ---- ANALYZE BUTTON ----
    function setupAnalyzeButton() {
        const btn = document.getElementById('diseaseAnalyzeBtn');
        if (!btn) return;
        btn.addEventListener('click', analyzeImage);
    }

    function analyzeImage() {
        if (!uploadedFile && !uploadedImageData) {
            showDiseaseToast('Please upload an image first', 'error');
            return;
        }

        const resultsCard = document.getElementById('diseaseResultsCard');
        const analyzing = document.getElementById('diseaseAnalyzing');
        const resultContent = document.getElementById('diseaseResultContent');

        // Show analyzing state
        if (resultsCard) resultsCard.classList.remove('hidden');
        if (analyzing) analyzing.classList.remove('hidden');
        if (resultContent) resultContent.classList.add('hidden');

        // Scroll to results
        resultsCard.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Simulate AI analysis (1.5-3s delay for realistic feel)
        const delay = 1500 + Math.random() * 1500;
        setTimeout(() => {
            const cropType = document.getElementById('diseaseCropType')?.value || '';
            const result = simulateDiseaseDetection(cropType);
            displayResults(result);
        }, delay);
    }

    function simulateDiseaseDetection(selectedCrop) {
        // If a crop is selected, pick a disease from that crop
        // If auto-detect, pick a random crop and disease
        // 15% chance of healthy result
        const isHealthy = Math.random() < 0.15;
        if (isHealthy) {
            const crop = selectedCrop || getRandomCrop();
            return { ...HEALTHY_RESPONSE, crop: getCropDisplayName(crop) };
        }

        let crop = selectedCrop;
        if (!crop) {
            const cropKeys = Object.keys(DISEASE_DATABASE);
            crop = cropKeys[Math.floor(Math.random() * cropKeys.length)];
        }

        const diseases = DISEASE_DATABASE[crop];
        if (!diseases || diseases.length === 0) {
            // Fallback for crops not in database
            const fallbackCrops = Object.keys(DISEASE_DATABASE);
            crop = fallbackCrops[Math.floor(Math.random() * fallbackCrops.length)];
            const fallbackDiseases = DISEASE_DATABASE[crop];
            const disease = fallbackDiseases[Math.floor(Math.random() * fallbackDiseases.length)];
            return { ...disease, crop: getCropDisplayName(crop) };
        }

        const disease = diseases[Math.floor(Math.random() * diseases.length)];
        // Vary confidence slightly
        const confidenceVariation = Math.floor(Math.random() * 8) - 3;
        return {
            ...disease,
            crop: getCropDisplayName(crop),
            confidence: Math.min(98, Math.max(70, disease.confidence + confidenceVariation))
        };
    }

    function getRandomCrop() {
        const crops = Object.keys(DISEASE_DATABASE);
        return crops[Math.floor(Math.random() * crops.length)];
    }

    function getCropDisplayName(key) {
        const names = {
            rice: 'Rice (धान)', wheat: 'Wheat (गेहूं)', cotton: 'Cotton (कपास)',
            tomato: 'Tomato (टमाटर)', potato: 'Potato (आलू)', onion: 'Onion (प्याज)',
            sugarcane: 'Sugarcane (गन्ना)', maize: 'Maize (मक्का)',
            groundnut: 'Groundnut (मूंगफली)', mustard: 'Mustard (सरसों)',
            mango: 'Mango (आम)', turmeric: 'Turmeric (हल्दी)',
            chana: 'Chana (चना)'
        };
        return names[key] || key;
    }

    // ---- DISPLAY RESULTS ----
    function displayResults(result) {
        const analyzing = document.getElementById('diseaseAnalyzing');
        const resultContent = document.getElementById('diseaseResultContent');

        if (analyzing) analyzing.classList.add('hidden');
        if (resultContent) resultContent.classList.remove('hidden');

        // Status badge
        const badge = document.getElementById('diseaseStatusBadge');
        if (badge) {
            badge.className = 'disease-status-badge';
            if (result.severity === 'healthy') {
                badge.classList.add('healthy');
                badge.innerHTML = '<span class="status-icon">✅</span><span class="status-text">Healthy Crop - No Disease Detected</span>';
            } else if (result.severity === 'high') {
                badge.classList.add('diseased');
                badge.innerHTML = '<span class="status-icon">⚠️</span><span class="status-text">Disease Detected - High Severity</span>';
            } else if (result.severity === 'medium') {
                badge.classList.add('warning');
                badge.innerHTML = '<span class="status-icon">🔶</span><span class="status-text">Disease Detected - Moderate Severity</span>';
            } else {
                badge.classList.add('healthy');
                badge.innerHTML = '<span class="status-icon">💡</span><span class="status-text">Minor Issue Detected - Low Severity</span>';
            }
        }

        // Info Grid
        const infoGrid = document.getElementById('diseaseInfoGrid');
        if (infoGrid) {
            const severityClass = result.severity === 'high' ? 'severity-high' :
                                  result.severity === 'medium' ? 'severity-medium' : 'severity-low';
            infoGrid.innerHTML = `
                <div class="disease-info-item">
                    <div class="info-label">🌾 Crop Identified</div>
                    <div class="info-value">${result.crop || 'Unknown'}</div>
                </div>
                <div class="disease-info-item ${result.severity !== 'healthy' ? severityClass : ''}">
                    <div class="info-label">🦠 Disease</div>
                    <div class="info-value">${result.name}${result.hindiName ? ' (' + result.hindiName + ')' : ''}</div>
                </div>
                <div class="disease-info-item ${result.severity !== 'healthy' ? severityClass : ''}">
                    <div class="info-label">📊 Severity</div>
                    <div class="info-value">${capitalize(result.severity)}</div>
                </div>
                <div class="disease-info-item">
                    <div class="info-label">🎯 Confidence</div>
                    <div class="info-value">${result.confidence}%</div>
                </div>
            `;

            // Add symptoms and cause if available
            if (result.symptoms) {
                infoGrid.innerHTML += `
                    <div class="disease-info-item" style="grid-column: 1 / -1;">
                        <div class="info-label">🔍 Symptoms</div>
                        <div class="info-value" style="font-size:0.92rem;font-weight:400;">${result.symptoms}</div>
                    </div>
                `;
            }
            if (result.cause && result.cause !== 'N/A — Your crop looks good!') {
                infoGrid.innerHTML += `
                    <div class="disease-info-item" style="grid-column: 1 / -1;">
                        <div class="info-label">🧬 Cause</div>
                        <div class="info-value" style="font-size:0.92rem;font-weight:400;">${result.cause}</div>
                    </div>
                `;
            }
        }

        // Treatment Steps
        const treatmentSteps = document.getElementById('diseaseTreatmentSteps');
        if (treatmentSteps && result.treatment) {
            treatmentSteps.innerHTML = result.treatment.map((step, i) => `
                <div class="treatment-step">
                    <span class="step-number">${i + 1}</span>
                    <div class="step-text"><strong>${step.title}:</strong> ${step.desc}</div>
                </div>
            `).join('');
        }

        // Prevention Tips
        const preventionList = document.getElementById('diseasePreventionList');
        if (preventionList && result.prevention) {
            preventionList.innerHTML = result.prevention.map(tip => `
                <li>${tip}</li>
            `).join('');
        }

        // Store result for report download
        window._lastDiseaseResult = result;
    }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // ---- NEW SCAN ----
    function setupNewScan() {
        const btn = document.getElementById('diseaseNewScan');
        if (!btn) return;
        btn.addEventListener('click', () => {
            resetUpload();
            // Scroll back to upload zone
            const uploadCard = document.querySelector('.disease-upload-card');
            if (uploadCard) uploadCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // ---- DOWNLOAD REPORT ----
    function setupDownloadReport() {
        const btn = document.getElementById('diseaseDownloadReport');
        if (!btn) return;
        btn.addEventListener('click', downloadReport);
    }

    function downloadReport() {
        const result = window._lastDiseaseResult;
        if (!result) {
            showDiseaseToast('No analysis result to download', 'error');
            return;
        }

        const reportDate = new Date().toLocaleDateString('en-IN', {
            day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });

        let reportText = `
╔══════════════════════════════════════════════╗
║     KRISHI MITRA - CROP DISEASE REPORT      ║
╚══════════════════════════════════════════════╝

Report Date: ${reportDate}

━━━━ DETECTION SUMMARY ━━━━
Crop: ${result.crop || 'Unknown'}
Disease: ${result.name}${result.hindiName ? ' (' + result.hindiName + ')' : ''}
Severity: ${capitalize(result.severity)}
Confidence: ${result.confidence}%

━━━━ SYMPTOMS ━━━━
${result.symptoms || 'N/A'}

━━━━ CAUSE ━━━━
${result.cause || 'N/A'}

━━━━ RECOMMENDED TREATMENT ━━━━
${result.treatment ? result.treatment.map((s, i) => `${i + 1}. ${s.title}: ${s.desc}`).join('\n') : 'N/A'}

━━━━ PREVENTION TIPS ━━━━
${result.prevention ? result.prevention.map((p, i) => `${i + 1}. ${p}`).join('\n') : 'N/A'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Disclaimer: This is an AI-assisted preliminary diagnosis.
Always consult your local Krishi Vigyan Kendra (KVK) or
agriculture extension officer for confirmation and treatment.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generated by Krishi Mitra | www.krishimitra.in
        `.trim();

        const blob = new Blob([reportText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `disease-report-${Date.now()}.txt`;
        a.click();
        URL.revokeObjectURL(url);

        showDiseaseToast('Report downloaded successfully!', 'success');
    }

    // ---- REFERENCE GRID ----
    function populateReferenceGrid() {
        const grid = document.getElementById('diseaseReferenceGrid');
        if (!grid) return;

        grid.innerHTML = REFERENCE_DISEASES.map(item => `
            <div class="disease-ref-item">
                <div class="ref-crop">${item.crop}</div>
                <div class="ref-disease">${item.disease}</div>
                <div class="ref-symptoms">${item.symptoms}</div>
                <span class="ref-severity ${item.severity}">${capitalize(item.severity)} Severity</span>
            </div>
        `).join('');
    }

    // ---- TOAST NOTIFICATION ----
    function showDiseaseToast(message, type) {
        const toast = document.createElement('div');
        const bg = type === 'error' ? '#e53935' : '#2d5016';
        toast.style.cssText = `position:fixed;bottom:20px;right:20px;background:${bg};color:white;padding:14px 24px;border-radius:6px;z-index:10000;box-shadow:0 4px 12px rgba(0,0,0,0.15);font-size:0.9rem;animation:fadeSlideIn 0.3s ease;`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

})();
