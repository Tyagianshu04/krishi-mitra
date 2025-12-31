// ============================================
// Multi-Language Translation System
// Supports: English, Hindi, Marathi, Punjabi, Tamil
// ============================================

const translations = {
    en: {
        // App Info
        app_name: 'Krishi Mitra',
        app_tagline: 'Smart Agriculture Advisory',
        
        // Login Page
        login_subtitle: 'Empowering farmers with AI-driven crop recommendations and weather insights',
        username_label: 'Username / Email / Mobile',
        username_placeholder: 'Enter your username, email or mobile number',
        password_label: 'Password',
        password_placeholder: 'Enter your password',
        remember_me: 'Remember me',
        forgot_password: 'Forgot password?',
        login_button: 'Login',
        logging_in: 'Logging in...',
        new_user_text: 'New to Krishi Mitra?',
        register_button: 'CREATE NEW ACCOUNT',
        register_benefits: 'Join thousands of farmers making smarter decisions!',
        or_try_demo: 'Or try without signing up:',
        demo_mode_button: 'Try Demo Mode',
        
        // Registration Page
        register_tagline: 'Create Your Account',
        register_subtitle: 'Join thousands of farmers making smarter agricultural decisions',
        fullname_label: 'Full Name',
        fullname_placeholder: 'Enter your full name',
        email_label: 'Email Address',
        email_placeholder: 'Enter your email address',
        mobile_label: 'Mobile Number',
        mobile_placeholder: 'Enter 10-digit mobile number',
        confirm_password_label: 'Confirm Password',
        confirm_password_placeholder: 'Re-enter your password',
        terms_accept: 'I agree to the Terms and Conditions',
        register_button: 'Create Account',
        registering: 'Registering...',
        have_account: 'Already have an account?',
        login_link: 'Login Here',
        
        // Features
        feature_profit: 'Maximize Profit with Smart Crop Selection',
        feature_weather: 'Real-time Weather Advisory',
        feature_comparison: 'Crop Comparison & Analysis',
        
        // Navigation
        nav_overview: 'Overview',
        nav_crop_recommendation: 'Crop Recommendation',
        nav_crop_comparison: 'Crop Comparison',
        nav_weather: 'Weather Advisory',
        nav_soil: 'Soil Analysis',
        
        // Dashboard
        overview_title: 'Dashboard Overview',
        overview_subtitle: "Quick insights into your farm's potential",
        select_location: 'Select Your Location',
        state_label: 'State',
        select_state: 'Select State',
        district_label: 'District',
        select_district: 'Select District',
        season_label: 'Season',
        season_kharif: 'Kharif (Jun-Oct)',
        season_rabi: 'Rabi (Nov-Apr)',
        season_zaid: 'Zaid (Mar-Jun)',
        get_recommendations: 'Get Recommendations',
        
        // Stats
        stat_recommended: 'Recommended Crops',
        stat_weather: 'Weather Status',
        stat_profit: 'Avg. Profit Increase',
        stat_duration: 'Avg. Crop Duration',
        
        // Quick Actions
        quick_actions: 'Quick Actions',
        action_get_recommendation: 'Get Crop Recommendation',
        action_check_weather: 'Check Weather Forecast',
        action_compare_crops: 'Compare Crops',
        
        // Crop Recommendation
        crop_rec_title: 'Crop Recommendations',
        crop_rec_subtitle: 'AI-powered suggestions based on your location and climate',
        empty_select_location: 'Please select your location to get crop recommendations',
        
        // Comparison
        comparison_title: 'Crop Comparison & Analysis',
        comparison_subtitle: 'Compare potential profits and resources',
        select_crops_compare: 'Select crops to compare',
        
        // Weather
        weather_title: 'Weather Advisory',
        weather_subtitle: 'Real-time weather updates and warnings',
        empty_weather: 'Select location to view weather advisory',
        
        // Soil
        soil_title: 'Soil Moisture Analysis',
        soil_subtitle: 'Monitor soil conditions for optimal crop growth',
        empty_soil: 'Select location to view soil analysis',
        
        // Common
        loading: 'Loading...',
        logout: 'Logout',
        footer_text: '© 2025 Krishi Mitra. Empowering farmers through technology.',
        
        // Messages
        login_success: 'Login successful!',
        login_error: 'Login failed. Please check your credentials.',
        demo_login_success: 'Demo mode activated!',
        
        // Marketplace Navigation
        marketplace_nav: 'Marketplace',
        
        // Marketplace - Farmer Selling
        nav_sell_produce: 'Sell Produce',
        nav_buy_produce: 'Buy Produce', 
        nav_corporate: 'Corporate Sales',
        sell_produce_title: 'Farmer Marketplace',
        sell_produce_subtitle: 'Sell your produce directly to buyers at your price',
        list_produce: 'List New Produce',
        available_qty: 'Available Quantity',
        asking_price: 'Asking Price',
        harvest_date: 'Harvest Date',
        collection_point: 'Collection Point',
        contact_farmer: 'Contact Farmer',
        msp_label: 'MSP',
        above_msp: 'Above MSP',
        organic_certified: 'Organic Certified',
        premium_quality: 'Premium Quality',
        
        // Marketplace - Retailer Buying
        buy_produce_title: 'Retailer Marketplace',
        buy_produce_subtitle: 'Buy directly from farmers at fair prices',
        place_order: 'Place Order',
        contact_cultivator: 'Contact Cultivator',
        farmer_name: 'Farmer Name',
        location: 'Location',
        price_per_quintal: 'Price/Quintal',
        
        // Corporate Section
        corporate_title: 'Corporate & Institutional Sales',
        corporate_subtitle: 'Large scale procurement and contract farming',
        active_tenders: 'Active Tenders',
        bid_now: 'Bid Now',
        apply_contract: 'Apply for Contract',
        tender_deadline: 'Deadline',
        min_quantity: 'Minimum Quantity',
        
        // Voice Instructions
        voice_enabled: 'Voice Enabled',
        voice_disabled: 'Voice Disabled',
        tap_to_hear: 'Tap any text to hear it',
        read_page: 'Read Full Page'
    },
    
    hi: {
        // ऐप जानकारी
        app_name: 'कृषि मित्र',
        app_tagline: 'स्मार्ट कृषि सलाहकार',
        
        // लॉगिन पृष्ठ
        login_subtitle: 'एआई-संचालित फसल सिफारिशों और मौसम जानकारी के साथ किसानों को सशक्त बनाना',
        username_label: 'उपयोगकर्ता नाम / ईमेल / मोबाइल',
        username_placeholder: 'अपना उपयोगकर्ता नाम, ईमेल या मोबाइल नंबर दर्ज करें',
        password_label: 'पासवर्ड',
        password_placeholder: 'अपना पासवर्ड दर्ज करें',
        remember_me: 'मुझे याद रखें',
        forgot_password: 'पासवर्ड भूल गए?',
        login_button: 'लॉगिन करें',
        logging_in: 'लॉगिन हो रहा है...',
        new_user_text: 'कृषि मित्र में नए हैं?',
        register_button: 'नया खाता बनाएं',
        register_benefits: 'हजारों किसानों के साथ बेहतर निर्णय लें!',
        or_try_demo: 'या बिना साइन अप किए आज़माएं:',
        demo_mode_button: 'डेमो मोड आज़माएं',
        
        // विशेषताएं
        feature_profit: 'स्मार्ट फसल चयन से लाभ बढ़ाएं',
        feature_weather: 'वास्तविक समय मौसम सलाह',
        feature_comparison: 'फसल तुलना और विश्लेषण',
        
        // नेविगेशन
        nav_overview: 'सारांश',
        nav_crop_recommendation: 'फसल सिफारिश',
        nav_crop_comparison: 'फसल तुलना',
        nav_weather: 'मौसम सलाह',
        nav_soil: 'मृदा विश्लेषण',
        
        // डैशबोर्ड
        overview_title: 'डैशबोर्ड सारांश',
        overview_subtitle: 'आपके खेत की क्षमता की त्वरित जानकारी',
        select_location: 'अपना स्थान चुनें',
        state_label: 'राज्य',
        select_state: 'राज्य चुनें',
        district_label: 'जिला',
        select_district: 'जिला चुनें',
        season_label: 'मौसम',
        season_kharif: 'खरीफ (जून-अक्टूबर)',
        season_rabi: 'रबी (नवंबर-अप्रैल)',
        season_zaid: 'जायद (मार्च-जून)',
        get_recommendations: 'सिफारिशें प्राप्त करें',
        
        // आंकड़े
        stat_recommended: 'सुझाई गई फसलें',
        stat_weather: 'मौसम की स्थिति',
        stat_profit: 'औसत लाभ वृद्धि',
        stat_duration: 'औसत फसल अवधि',
        
        // त्वरित कार्रवाई
        quick_actions: 'त्वरित कार्रवाई',
        action_get_recommendation: 'फसल सिफारिश प्राप्त करें',
        action_check_weather: 'मौसम पूर्वानुमान जांचें',
        action_compare_crops: 'फसलों की तुलना करें',
        
        // फसल सिफारिश
        crop_rec_title: 'फसल सिफारिशें',
        crop_rec_subtitle: 'आपके स्थान और जलवायु के आधार पर एआई-संचालित सुझाव',
        empty_select_location: 'फसल सिफारिशें प्राप्त करने के लिए कृपया अपना स्थान चुनें',
        
        // तुलना
        comparison_title: 'फसल तुलना और विश्लेषण',
        comparison_subtitle: 'संभावित लाभ और संसाधनों की तुलना करें',
        select_crops_compare: 'तुलना करने के लिए फसलें चुनें',
        
        // मौसम
        weather_title: 'मौसम सलाह',
        weather_subtitle: 'वास्तविक समय मौसम अपडेट और चेतावनियां',
        empty_weather: 'मौसम सलाह देखने के लिए स्थान चुनें',
        
        // मृदा
        soil_title: 'मृदा नमी विश्लेषण',
        soil_subtitle: 'इष्टतम फसल वृद्धि के लिए मृदा स्थितियों की निगरानी करें',
        empty_soil: 'मृदा विश्लेषण देखने के लिए स्थान चुनें',
        
        // सामान्य
        loading: 'लोड हो रहा है...',
        logout: 'लॉगआउट',
        footer_text: '© 2025 कृषि मित्र। प्रौद्योगिकी के माध्यम से किसानों को सशक्त बनाना।',
        
        // संदेश
        login_success: 'लॉगिन सफल रहा!',
        login_error: 'लॉगिन विफल। कृपया अपनी साख जांचें।',
        demo_login_success: 'डेमो मोड सक्रिय!',
        
        // मार्केटप्लेस नेविगेशन
        marketplace_nav: 'बाज़ार',
        
        // मार्केटप्लेस - किसान बिक्री
        nav_sell_produce: 'फसल बेचें',
        nav_buy_produce: 'फसल खरीदें',
        nav_corporate: 'कॉर्पोरेट बिक्री',
        sell_produce_title: 'किसान मंडी',
        sell_produce_subtitle: 'अपनी फसल सीधे खरीदारों को अपनी कीमत पर बेचें',
        list_produce: 'नई फसल लिस्ट करें',
        available_qty: 'उपलब्ध मात्रा',
        asking_price: 'मांगी गई कीमत',
        harvest_date: 'कटाई की तारीख',
        collection_point: 'संग्रह स्थान',
        contact_farmer: 'किसान से संपर्क करें',
        msp_label: 'न्यूनतम समर्थन मूल्य',
        above_msp: 'MSP से ऊपर',
        organic_certified: 'जैविक प्रमाणित',
        premium_quality: 'प्रीमियम गुणवत्ता',
        
        // मार्केटप्लेस - व्यापारी खरीद
        buy_produce_title: 'व्यापारी मंडी',
        buy_produce_subtitle: 'किसानों से सीधे उचित मूल्य पर खरीदें',
        place_order: 'ऑर्डर दें',
        contact_cultivator: 'किसान से संपर्क करें',
        farmer_name: 'किसान का नाम',
        location: 'स्थान',
        price_per_quintal: 'कीमत/क्विंटल',
        
        // कॉर्पोरेट सेक्शन
        corporate_title: 'कॉर्पोरेट और संस्थागत बिक्री',
        corporate_subtitle: 'बड़े पैमाने पर खरीद और अनुबंध खेती',
        active_tenders: 'सक्रिय टेंडर',
        bid_now: 'बोली लगाएं',
        apply_contract: 'अनुबंध के लिए आवेदन करें',
        tender_deadline: 'अंतिम तिथि',
        min_quantity: 'न्यूनतम मात्रा',
        
        // आवाज निर्देश
        voice_enabled: 'आवाज़ चालू',
        voice_disabled: 'आवाज़ बंद',
        tap_to_hear: 'सुनने के लिए किसी भी टेक्स्ट पर टैप करें',
        read_page: 'पूरा पेज सुनें'
    },
    
    mr: {
        // अॅप माहिती
        app_name: 'कृषी मित्र',
        app_tagline: 'स्मार्ट शेती सल्लागार',
        
        // लॉगिन पृष्ठ
        login_subtitle: 'एआय-चालित पीक शिफारशी आणि हवामान माहितीसह शेतकऱ्यांना सशक्त करणे',
        username_label: 'वापरकर्तानाव / ईमेल / मोबाइल',
        username_placeholder: 'तुमचे वापरकर्तानाव, ईमेल किंवा मोबाइल नंबर प्रविष्ट करा',
        password_label: 'पासवर्ड',
        password_placeholder: 'तुमचा पासवर्ड प्रविष्ट करा',
        remember_me: 'मला लक्षात ठेवा',
        forgot_password: 'पासवर्ड विसरलात?',
        login_button: 'लॉगिन करा',
        logging_in: 'लॉगिन होत आहे...',
        new_user_text: 'कृषी मित्रात नवीन आहात?',
        register_button: 'नवीन खाते तयार करा',
        register_benefits: 'हजारो शेतकऱ्यांसोबत चांगले निर्णय घ्या!',
        or_try_demo: 'किंवा साइन अप न करता वापरून पहा:',
        demo_mode_button: 'डेमो मोड वापरा',
        
        // वैशिष्ट्ये
        feature_profit: 'स्मार्ट पीक निवडीसह नफा वाढवा',
        feature_weather: 'रिअल-टाइम हवामान सल्ला',
        feature_comparison: 'पीक तुलना आणि विश्लेषण',
        
        // नेव्हिगेशन
        nav_overview: 'सारांश',
        nav_crop_recommendation: 'पीक शिफारस',
        nav_crop_comparison: 'पीक तुलना',
        nav_weather: 'हवामान सल्ला',
        nav_soil: 'माती विश्लेषण',
        
        // डॅशबोर्ड
        overview_title: 'डॅशबोर्ड सारांश',
        overview_subtitle: 'तुमच्या शेताच्या क्षमतेची द्रुत माहिती',
        select_location: 'तुमचे स्थान निवडा',
        state_label: 'राज्य',
        select_state: 'राज्य निवडा',
        district_label: 'जिल्हा',
        select_district: 'जिल्हा निवडा',
        season_label: 'हंगाम',
        season_kharif: 'खरीप (जून-ऑक्टोबर)',
        season_rabi: 'रब्बी (नोव्हेंबर-एप्रिल)',
        season_zaid: 'झायद (मार्च-जून)',
        get_recommendations: 'शिफारशी मिळवा',
        
        // आकडेवारी
        stat_recommended: 'सुचवलेली पिके',
        stat_weather: 'हवामान स्थिती',
        stat_profit: 'सरासरी नफा वाढ',
        stat_duration: 'सरासरी पीक कालावधी',
        
        // द्रुत क्रिया
        quick_actions: 'द्रुत क्रिया',
        action_get_recommendation: 'पीक शिफारस मिळवा',
        action_check_weather: 'हवामान अंदाज तपासा',
        action_compare_crops: 'पिकांची तुलना करा',
        
        // पीक शिफारस
        crop_rec_title: 'पीक शिफारशी',
        crop_rec_subtitle: 'तुमचे स्थान आणि हवामानावर आधारित एआय-चालित सूचना',
        empty_select_location: 'पीक शिफारशी मिळविण्यासाठी कृपया तुमचे स्थान निवडा',
        
        // तुलना
        comparison_title: 'पीक तुलना आणि विश्लेषण',
        comparison_subtitle: 'संभाव्य नफा आणि संसाधनांची तुलना करा',
        select_crops_compare: 'तुलना करण्यासाठी पिके निवडा',
        
        // हवामान
        weather_title: 'हवामान सल्ला',
        weather_subtitle: 'रिअल-टाइम हवामान अद्यतने आणि चेतावणी',
        empty_weather: 'हवामान सल्ला पाहण्यासाठी स्थान निवडा',
        
        // माती
        soil_title: 'माती ओलावा विश्लेषण',
        soil_subtitle: 'इष्टतम पीक वाढीसाठी माती परिस्थितींचे निरीक्षण करा',
        empty_soil: 'माती विश्लेषण पाहण्यासाठी स्थान निवडा',
        
        // सामान्य
        loading: 'लोड होत आहे...',
        logout: 'लॉगआउट',
        footer_text: '© 2025 कृषी मित्र. तंत्रज्ञानाद्वारे शेतकऱ्यांना सशक्त करणे.',
        
        // संदेश
        login_success: 'लॉगिन यशस्वी!',
        login_error: 'लॉगिन अयशस्वी. कृपया तुमची माहिती तपासा.',
        demo_login_success: 'डेमो मोड सक्रिय!',
        
        // मार्केटप्लेस नेव्हिगेशन
        marketplace_nav: 'बाजार',
        
        // मार्केटप्लेस - शेतकरी विक्री
        nav_sell_produce: 'पिक विका',
        nav_buy_produce: 'पिक खरेदी करा',
        nav_corporate: 'कॉर्पोरेट विक्री',
        sell_produce_title: 'शेतकरी बाजार',
        sell_produce_subtitle: 'तुमचे पिक थेट खरेदीदारांना तुमच्या किंमतीला विका',
        list_produce: 'नवीन पिक नोंदवा',
        available_qty: 'उपलब्ध प्रमाण',
        asking_price: 'मागितलेली किंमत',
        harvest_date: 'कापणीची तारीख',
        collection_point: 'संकलन ठिकाण',
        contact_farmer: 'शेतकऱ्याशी संपर्क करा',
        msp_label: 'किमान आधारभूत किंमत',
        above_msp: 'MSP वर',
        organic_certified: 'सेंद्रिय प्रमाणित',
        premium_quality: 'उत्कृष्ट गुणवत्ता',
        
        // मार्केटप्लेस - व्यापारी खरेदी
        buy_produce_title: 'व्यापारी बाजार',
        buy_produce_subtitle: 'शेतकऱ्यांकडून थेट योग्य किंमतीत खरेदी करा',
        place_order: 'ऑर्डर द्या',
        contact_cultivator: 'शेतकऱ्याशी संपर्क करा',
        farmer_name: 'शेतकऱ्याचे नाव',
        location: 'ठिकाण',
        price_per_quintal: 'किंमत/क्विंटल',
        
        // कॉर्पोरेट विभाग
        corporate_title: 'कॉर्पोरेट आणि संस्थात्मक विक्री',
        corporate_subtitle: 'मोठ्या प्रमाणात खरेदी आणि करार शेती',
        active_tenders: 'सक्रिय निविदा',
        bid_now: 'बोली लावा',
        apply_contract: 'कराराला अर्ज करा',
        tender_deadline: 'अंतिम तारीख',
        min_quantity: 'किमान प्रमाण',
        
        // आवाज सूचना
        voice_enabled: 'आवाज चालू',
        voice_disabled: 'आवाज बंद',
        tap_to_hear: 'ऐकण्यासाठी कोणत्याही मजकुरावर टॅप करा',
        read_page: 'संपूर्ण पेज वाचा'
    },
    
    pa: {
        // ਐਪ ਜਾਣਕਾਰੀ
        app_name: 'ਕ੍ਰਿਸ਼ੀ ਮਿੱਤਰ',
        app_tagline: 'ਸਮਾਰਟ ਖੇਤੀਬਾੜੀ ਸਲਾਹਕਾਰ',
        
        // ਲੌਗਿਨ ਪੇਜ
        login_subtitle: 'AI-ਸੰਚਾਲਿਤ ਫਸਲ ਸਿਫਾਰਸ਼ਾਂ ਅਤੇ ਮੌਸਮ ਜਾਣਕਾਰੀ ਨਾਲ ਕਿਸਾਨਾਂ ਨੂੰ ਸਸ਼ਕਤ ਬਣਾਉਣਾ',
        username_label: 'ਯੂਜ਼ਰਨੇਮ / ਈਮੇਲ / ਮੋਬਾਈਲ',
        username_placeholder: 'ਆਪਣਾ ਯੂਜ਼ਰਨੇਮ, ਈਮੇਲ ਜਾਂ ਮੋਬਾਈਲ ਨੰਬਰ ਦਾਖਲ ਕਰੋ',
        password_label: 'ਪਾਸਵਰਡ',
        password_placeholder: 'ਆਪਣਾ ਪਾਸਵਰਡ ਦਾਖਲ ਕਰੋ',
        remember_me: 'ਮੈਨੂੰ ਯਾਦ ਰੱਖੋ',
        forgot_password: 'ਪਾਸਵਰਡ ਭੁੱਲ ਗਏ?',
        login_button: 'ਲੌਗਿਨ ਕਰੋ',
        logging_in: 'ਲੌਗਿਨ ਹੋ ਰਿਹਾ ਹੈ...',
        new_user_text: 'ਕ੍ਰਿਸ਼ੀ ਮਿੱਤਰ ਵਿੱਚ ਨਵੇਂ ਹੋ?',
        register_button: 'ਨਵਾਂ ਖਾਤਾ ਬਣਾਓ',
        register_benefits: 'ਹਜ਼ਾਰਾਂ ਕਿਸਾਨਾਂ ਨਾਲ ਬਿਹਤਰ ਫੈਸਲੇ ਲਓ!',
        or_try_demo: 'ਜਾਂ ਸਾਈਨ ਅੱਪ ਕੀਤੇ ਬਿਨਾਂ ਵਰਤੋ:',
        demo_mode_button: 'ਡੈਮੋ ਮੋਡ ਅਜ਼ਮਾਓ',
        
        // ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ
        feature_profit: 'ਸਮਾਰਟ ਫਸਲ ਚੋਣ ਨਾਲ ਮੁਨਾਫਾ ਵਧਾਓ',
        feature_weather: 'ਰੀਅਲ-ਟਾਈਮ ਮੌਸਮ ਸਲਾਹ',
        feature_comparison: 'ਫਸਲ ਤੁਲਨਾ ਅਤੇ ਵਿਸ਼ਲੇਸ਼ਣ',
        
        // ਨੈਵੀਗੇਸ਼ਨ
        nav_overview: 'ਸੰਖੇਪ',
        nav_crop_recommendation: 'ਫਸਲ ਸਿਫਾਰਸ਼',
        nav_crop_comparison: 'ਫਸਲ ਤੁਲਨਾ',
        nav_weather: 'ਮੌਸਮ ਸਲਾਹ',
        nav_soil: 'ਮਿੱਟੀ ਵਿਸ਼ਲੇਸ਼ਣ',
        
        // ਡੈਸ਼ਬੋਰਡ
        overview_title: 'ਡੈਸ਼ਬੋਰਡ ਸੰਖੇਪ',
        overview_subtitle: 'ਤੁਹਾਡੇ ਖੇਤ ਦੀ ਸਮਰੱਥਾ ਦੀ ਤੇਜ਼ ਜਾਣਕਾਰੀ',
        select_location: 'ਆਪਣਾ ਸਥਾਨ ਚੁਣੋ',
        state_label: 'ਰਾਜ',
        select_state: 'ਰਾਜ ਚੁਣੋ',
        district_label: 'ਜ਼ਿਲ੍ਹਾ',
        select_district: 'ਜ਼ਿਲ੍ਹਾ ਚੁਣੋ',
        season_label: 'ਮੌਸਮ',
        season_kharif: 'ਖਰੀਫ (ਜੂਨ-ਅਕਤੂਬਰ)',
        season_rabi: 'ਰਬੀ (ਨਵੰਬਰ-ਅਪ੍ਰੈਲ)',
        season_zaid: 'ਜ਼ਾਇਦ (ਮਾਰਚ-ਜੂਨ)',
        get_recommendations: 'ਸਿਫਾਰਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕਰੋ',
        
        // ਅੰਕੜੇ
        stat_recommended: 'ਸੁਝਾਈਆਂ ਫਸਲਾਂ',
        stat_weather: 'ਮੌਸਮ ਸਥਿਤੀ',
        stat_profit: 'ਔਸਤ ਮੁਨਾਫਾ ਵਾਧਾ',
        stat_duration: 'ਔਸਤ ਫਸਲ ਮਿਆਦ',
        
        // ਤੇਜ਼ ਕਾਰਵਾਈਆਂ
        quick_actions: 'ਤੇਜ਼ ਕਾਰਵਾਈਆਂ',
        action_get_recommendation: 'ਫਸਲ ਸਿਫਾਰਸ਼ ਪ੍ਰਾਪਤ ਕਰੋ',
        action_check_weather: 'ਮੌਸਮ ਪੂਰਵ ਅਨੁਮਾਨ ਦੇਖੋ',
        action_compare_crops: 'ਫਸਲਾਂ ਦੀ ਤੁਲਨਾ ਕਰੋ',
        
        // ਫਸਲ ਸਿਫਾਰਸ਼
        crop_rec_title: 'ਫਸਲ ਸਿਫਾਰਸ਼ਾਂ',
        crop_rec_subtitle: 'ਤੁਹਾਡੇ ਸਥਾਨ ਅਤੇ ਜਲਵਾਯੂ ਉੱਤੇ ਅਧਾਰਤ AI-ਸੰਚਾਲਿਤ ਸੁਝਾਅ',
        empty_select_location: 'ਫਸਲ ਸਿਫਾਰਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਸਥਾਨ ਚੁਣੋ',
        
        // ਤੁਲਨਾ
        comparison_title: 'ਫਸਲ ਤੁਲਨਾ ਅਤੇ ਵਿਸ਼ਲੇਸ਼ਣ',
        comparison_subtitle: 'ਸੰਭਾਵੀ ਮੁਨਾਫੇ ਅਤੇ ਸਰੋਤਾਂ ਦੀ ਤੁਲਨਾ ਕਰੋ',
        select_crops_compare: 'ਤੁਲਨਾ ਕਰਨ ਲਈ ਫਸਲਾਂ ਚੁਣੋ',
        
        // ਮੌਸਮ
        weather_title: 'ਮੌਸਮ ਸਲਾਹ',
        weather_subtitle: 'ਰੀਅਲ-ਟਾਈਮ ਮੌਸਮ ਅੱਪਡੇਟ ਅਤੇ ਚੇਤਾਵਨੀਆਂ',
        empty_weather: 'ਮੌਸਮ ਸਲਾਹ ਦੇਖਣ ਲਈ ਸਥਾਨ ਚੁਣੋ',
        
        // ਮਿੱਟੀ
        soil_title: 'ਮਿੱਟੀ ਨਮੀ ਵਿਸ਼ਲੇਸ਼ਣ',
        soil_subtitle: 'ਸਰਵੋਤਮ ਫਸਲ ਵਿਕਾਸ ਲਈ ਮਿੱਟੀ ਦੀਆਂ ਸਥਿਤੀਆਂ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ',
        empty_soil: 'ਮਿੱਟੀ ਵਿਸ਼ਲੇਸ਼ਣ ਦੇਖਣ ਲਈ ਸਥਾਨ ਚੁਣੋ',
        
        // ਆਮ
        loading: 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
        logout: 'ਲੌਗਆਉਟ',
        footer_text: '© 2025 ਕ੍ਰਿਸ਼ੀ ਮਿੱਤਰ. ਤਕਨਾਲੋਜੀ ਰਾਹੀਂ ਕਿਸਾਨਾਂ ਨੂੰ ਸਸ਼ਕਤ ਬਣਾਉਣਾ।',
        
        // ਸੁਨੇਹੇ
        login_success: 'ਲੌਗਿਨ ਸਫਲ!',
        login_error: 'ਲੌਗਿਨ ਅਸਫਲ। ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀ ਜਾਣਕਾਰੀ ਜਾਂਚੋ।',
        demo_login_success: 'ਡੈਮੋ ਮੋਡ ਸਰਗਰਮ!',
        
        // ਮਾਰਕੀਟਪਲੇਸ ਨੈਵੀਗੇਸ਼ਨ
        marketplace_nav: 'ਮੰਡੀ',
        
        // ਮਾਰਕੀਟਪਲੇਸ - ਕਿਸਾਨ ਵਿਕਰੀ
        nav_sell_produce: 'ਫਸਲ ਵੇਚੋ',
        nav_buy_produce: 'ਫਸਲ ਖਰੀਦੋ',
        nav_corporate: 'ਕਾਰਪੋਰੇਟ ਵਿਕਰੀ',
        sell_produce_title: 'ਕਿਸਾਨ ਮੰਡੀ',
        sell_produce_subtitle: 'ਆਪਣੀ ਫਸਲ ਸਿੱਧੇ ਖਰੀਦਦਾਰਾਂ ਨੂੰ ਆਪਣੀ ਕੀਮਤ ਤੇ ਵੇਚੋ',
        list_produce: 'ਨਵੀਂ ਫਸਲ ਸੂਚੀ ਕਰੋ',
        available_qty: 'ਉਪਲਬਧ ਮਾਤਰਾ',
        asking_price: 'ਮੰਗੀ ਕੀਮਤ',
        harvest_date: 'ਵਾਢੀ ਦੀ ਮਿਤੀ',
        collection_point: 'ਇਕੱਠਾ ਕਰਨ ਦੀ ਥਾਂ',
        contact_farmer: 'ਕਿਸਾਨ ਨਾਲ ਸੰਪਰਕ ਕਰੋ',
        msp_label: 'ਘੱਟੋ-ਘੱਟ ਸਮਰਥਨ ਮੁੱਲ',
        above_msp: 'MSP ਤੋਂ ਉੱਪਰ',
        organic_certified: 'ਜੈਵਿਕ ਪ੍ਰਮਾਣਿਤ',
        premium_quality: 'ਪ੍ਰੀਮੀਅਮ ਗੁਣਵੱਤਾ',
        
        // ਮਾਰਕੀਟਪਲੇਸ - ਵਪਾਰੀ ਖਰੀਦ
        buy_produce_title: 'ਵਪਾਰੀ ਮੰਡੀ',
        buy_produce_subtitle: 'ਕਿਸਾਨਾਂ ਤੋਂ ਸਿੱਧੇ ਸਹੀ ਕੀਮਤ ਤੇ ਖਰੀਦੋ',
        place_order: 'ਆਰਡਰ ਦਿਓ',
        contact_cultivator: 'ਕਿਸਾਨ ਨਾਲ ਸੰਪਰਕ ਕਰੋ',
        farmer_name: 'ਕਿਸਾਨ ਦਾ ਨਾਮ',
        location: 'ਸਥਾਨ',
        price_per_quintal: 'ਕੀਮਤ/ਕੁਇੰਟਲ',
        
        // ਕਾਰਪੋਰੇਟ ਸੈਕਸ਼ਨ
        corporate_title: 'ਕਾਰਪੋਰੇਟ ਅਤੇ ਸੰਸਥਾਗਤ ਵਿਕਰੀ',
        corporate_subtitle: 'ਵੱਡੇ ਪੱਧਰ ਤੇ ਖਰੀਦ ਅਤੇ ਕੰਟਰੈਕਟ ਫਾਰਮਿੰਗ',
        active_tenders: 'ਸਰਗਰਮ ਟੈਂਡਰ',
        bid_now: 'ਬੋਲੀ ਲਗਾਓ',
        apply_contract: 'ਕੰਟਰੈਕਟ ਲਈ ਅਪਲਾਈ ਕਰੋ',
        tender_deadline: 'ਆਖਰੀ ਮਿਤੀ',
        min_quantity: 'ਘੱਟੋ-ਘੱਟ ਮਾਤਰਾ',
        
        // ਆਵਾਜ਼ ਨਿਰਦੇਸ਼
        voice_enabled: 'ਆਵਾਜ਼ ਚਾਲੂ',
        voice_disabled: 'ਆਵਾਜ਼ ਬੰਦ',
        tap_to_hear: 'ਸੁਣਨ ਲਈ ਕਿਸੇ ਵੀ ਟੈਕਸਟ ਤੇ ਟੈਪ ਕਰੋ',
        read_page: 'ਪੂਰਾ ਪੇਜ ਸੁਣੋ'
    },
    
    ta: {
        // ஆப் தகவல்
        app_name: 'கிரிஷி மித்ரா',
        app_tagline: 'ஸ்மார்ட் விவசாய ஆலோசகர்',
        
        // உள்நுழைவு பக்கம்
        login_subtitle: 'AI-இயக்கப்படும் பயிர் பரிந்துரைகள் மற்றும் வானிலை தகவல்களுடன் விவசாயிகளை மேம்படுத்துதல்',
        username_label: 'பயனர்பெயர் / மின்னஞ்சல் / மொபைல்',
        username_placeholder: 'உங்கள் பயனர்பெயர், மின்னஞ்சல் அல்லது மொபைல் எண்ணை உள்ளிடவும்',
        password_label: 'கடவுச்சொல்',
        password_placeholder: 'உங்கள் கடவுச்சொல்லை உள்ளிடவும்',
        remember_me: 'என்னை நினைவில் கொள்',
        forgot_password: 'கடவுச்சொல்லை மறந்துவிட்டீர்களா?',
        login_button: 'உள்நுழைய',
        logging_in: 'உள்நுழைகிறது...',
        new_user_text: 'கிரிஷி மித்ராவில் புதியவரா?',
        register_button: 'புதிய கணக்கை உருவாக்கவும்',
        register_benefits: 'ஆயிரக்கணக்கான விவசாயிகளுடன் சிறந்த முடிவுகள் எடுங்கள்!',
        or_try_demo: 'அல்லது பதிவு செய்யாமல் முயற்சிக்கவும்:',
        demo_mode_button: 'டெமோ பயன்முறையை முயலவும்',
        
        // அம்சங்கள்
        feature_profit: 'ஸ்மார்ட் பயிர் தேர்வுடன் லாபத்தை அதிகரிக்கவும்',
        feature_weather: 'நேரடி வானிலை ஆலோசனை',
        feature_comparison: 'பயிர் ஒப்பீடு மற்றும் பகுப்பாய்வு',
        
        // வழிசெலுத்தல்
        nav_overview: 'மேலோட்டம்',
        nav_crop_recommendation: 'பயிர் பரிந்துரை',
        nav_crop_comparison: 'பயிர் ஒப்பீடு',
        nav_weather: 'வானிலை ஆலோசனை',
        nav_soil: 'மண் பகுப்பாய்வு',
        
        // டாஷ்போர்டு
        overview_title: 'டாஷ்போர்டு மேலோட்டம்',
        overview_subtitle: 'உங்கள் பண்ணையின் திறன் பற்றிய விரைவான நுண்ணறிவு',
        select_location: 'உங்கள் இடத்தைத் தேர்ந்தெடுக்கவும்',
        state_label: 'மாநிலம்',
        select_state: 'மாநிலத்தைத் தேர்ந்தெடுக்கவும்',
        district_label: 'மாவட்டம்',
        select_district: 'மாவட்டத்தைத் தேர்ந்தெடுக்கவும்',
        season_label: 'பருவம்',
        season_kharif: 'கரீப் (ஜூன்-அக்டோபர்)',
        season_rabi: 'ரபி (நவம்பர்-ஏப்ரல்)',
        season_zaid: 'சயித் (மார்ச்-ஜூன்)',
        get_recommendations: 'பரிந்துரைகளைப் பெறுக',
        
        // புள்ளிவிவரங்கள்
        stat_recommended: 'பரிந்துரைக்கப்பட்ட பயிர்கள்',
        stat_weather: 'வானிலை நிலை',
        stat_profit: 'சராசரி லாப அதிகரிப்பு',
        stat_duration: 'சராசரி பயிர் காலம்',
        
        // விரைவு செயல்கள்
        quick_actions: 'விரைவு செயல்கள்',
        action_get_recommendation: 'பயிர் பரிந்துரையைப் பெறுக',
        action_check_weather: 'வானிலை முன்னறிவிப்பைச் சரிபார்க்கவும்',
        action_compare_crops: 'பயிர்களை ஒப்பிடுக',
        
        // பயிர் பரிந்துரை
        crop_rec_title: 'பயிர் பரிந்துரைகள்',
        crop_rec_subtitle: 'உங்கள் இடம் மற்றும் காலநிலையின் அடிப்படையில் AI-இயக்கப்படும் பரிந்துரைகள்',
        empty_select_location: 'பயிர் பரிந்துரைகளைப் பெற உங்கள் இடத்தைத் தேர்ந்தெடுக்கவும்',
        
        // ஒப்பீடு
        comparison_title: 'பயிர் ஒப்பீடு மற்றும் பகுப்பாய்வு',
        comparison_subtitle: 'சாத்தியமான லாபங்கள் மற்றும் வளங்களை ஒப்பிடுக',
        select_crops_compare: 'ஒப்பிட பயிர்களைத் தேர்ந்தெடுக்கவும்',
        
        // வானிலை
        weather_title: 'வானிலை ஆலோசனை',
        weather_subtitle: 'நேரடி வானிலை புதுப்பிப்புகள் மற்றும் எச்சரிக்கைகள்',
        empty_weather: 'வானிலை ஆலோசனையைக் காண இடத்தைத் தேர்ந்தெடுக்கவும்',
        
        // மண்
        soil_title: 'மண் ஈரப்பதம் பகுப்பாய்வு',
        soil_subtitle: 'உகந்த பயிர் வளர்ச்சிக்கான மண் நிலைமைகளைக் கண்காணிக்கவும்',
        empty_soil: 'மண் பகுப்பாய்வைக் காண இடத்தைத் தேர்ந்தெடுக்கவும்',
        
        // பொதுவான
        loading: 'ஏற்றுகிறது...',
        logout: 'வெளியேறு',
        footer_text: '© 2025 கிரிஷி மித்ரா. தொழில்நுட்பம் மூலம் விவசாயிகளை மேம்படுத்துதல்.',
        
        // செய்திகள்
        login_success: 'உள்நுழைவு வெற்றிகரமானது!',
        login_error: 'உள்நுழைவு தோல்வியடைந்தது. உங்கள் விவரங்களைச் சரிபார்க்கவும்.',
        demo_login_success: 'டெமோ பயன்முறை செயல்படுத்தப்பட்டது!',
        
        // மார்க்கெட்பிளேஸ் வழிசெலுத்தல்
        marketplace_nav: 'சந்தை',
        
        // மார்க்கெட்பிளேஸ் - விவசாயி விற்பனை
        nav_sell_produce: 'பயிர் விற்க',
        nav_buy_produce: 'பயிர் வாங்க',
        nav_corporate: 'கார்ப்பரேட் விற்பனை',
        sell_produce_title: 'விவசாயி சந்தை',
        sell_produce_subtitle: 'உங்கள் பயிரை நேரடியாக வாங்குபவர்களுக்கு உங்கள் விலையில் விற்கவும்',
        list_produce: 'புதிய பயிர் பட்டியலிடு',
        available_qty: 'கிடைக்கும் அளவு',
        asking_price: 'கேட்கும் விலை',
        harvest_date: 'அறுவடை தேதி',
        collection_point: 'சேகரிப்பு இடம்',
        contact_farmer: 'விவசாயியைத் தொடர்பு கொள்ளுங்கள்',
        msp_label: 'குறைந்தபட்ச ஆதரவு விலை',
        above_msp: 'MSP-க்கு மேல்',
        organic_certified: 'இயற்கை சான்றளிக்கப்பட்டது',
        premium_quality: 'உயர் தரம்',
        
        // மார்க்கெட்பிளேஸ் - வணிகர் வாங்குதல்
        buy_produce_title: 'வணிகர் சந்தை',
        buy_produce_subtitle: 'விவசாயிகளிடமிருந்து நேரடியாக நியாயமான விலையில் வாங்குங்கள்',
        place_order: 'ஆர்டர் செய்யுங்கள்',
        contact_cultivator: 'விவசாயியைத் தொடர்பு கொள்ளுங்கள்',
        farmer_name: 'விவசாயி பெயர்',
        location: 'இடம்',
        price_per_quintal: 'விலை/குவிண்டால்',
        
        // கார்ப்பரேட் பிரிவு
        corporate_title: 'கார்ப்பரேட் மற்றும் நிறுவன விற்பனை',
        corporate_subtitle: 'பெரிய அளவிலான கொள்முதல் மற்றும் ஒப்பந்த விவசாயம்',
        active_tenders: 'செயலில் உள்ள டெண்டர்கள்',
        bid_now: 'இப்போது ஏலம் விடுங்கள்',
        apply_contract: 'ஒப்பந்தத்திற்கு விண்ணப்பிக்கவும்',
        tender_deadline: 'கடைசி தேதி',
        min_quantity: 'குறைந்தபட்ச அளவு',
        
        // குரல் வழிகாட்டுதல்
        voice_enabled: 'குரல் ஆன்',
        voice_disabled: 'குரல் ஆஃப்',
        tap_to_hear: 'கேட்க எந்த உரையையும் தட்டவும்',
        read_page: 'முழு பக்கத்தையும் கேளுங்கள்'
    }
};

// Current language (default: English)
let currentLanguage = localStorage.getItem(CONFIG.STORAGE_KEYS.LANGUAGE) || CONFIG.DEFAULT_LANGUAGE;

// Apply translations to the page
function applyTranslations(lang) {
    if (!translations[lang]) {
        console.warn(`Language ${lang} not found. Falling back to English.`);
        lang = 'en';
    }

    currentLanguage = lang;
    localStorage.setItem(CONFIG.STORAGE_KEYS.LANGUAGE, lang);

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });

    // Update current language display
    const langDisplays = document.querySelectorAll('#currentLang, #headerCurrentLang');
    langDisplays.forEach(display => {
        if (display.id === 'currentLang') {
            const langConfig = CONFIG.LANGUAGES.find(l => l.code === lang);
            display.textContent = langConfig ? langConfig.nativeName : 'English';
        } else {
            display.textContent = lang.toUpperCase();
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Initialize language system
function initializeLanguage() {
    // Apply saved language on page load
    applyTranslations(currentLanguage);

    // Setup language buttons
    setupLanguageButtons();
    
    // Update header language indicator
    updateLanguageIndicator(currentLanguage);
}

// Update the language indicator in header
function updateLanguageIndicator(lang) {
    const headerCurrentLang = document.getElementById('headerCurrentLang');
    if (headerCurrentLang) {
        const langLabels = {
            'en': 'EN',
            'hi': 'हि',
            'mr': 'म',
            'pa': 'ਪੰ',
            'ta': 'த'
        };
        headerCurrentLang.textContent = langLabels[lang] || 'EN';
    }
}

// Setup language button event listeners
function setupLanguageButtons() {
    // Language selector toggle
    const languageBtn = document.getElementById('languageBtn');
    const headerLangBtn = document.getElementById('headerLangBtn');
    const languageDropdown = document.getElementById('languageDropdown');

    [languageBtn, headerLangBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const dropdown = document.getElementById('languageDropdown');
                if (dropdown) {
                    dropdown.classList.toggle('hidden');
                }
            });
        }
    });

    // Language selection
    if (languageDropdown) {
        languageDropdown.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const lang = btn.getAttribute('data-lang');
                applyTranslations(lang);
                updateLanguageIndicator(lang);
                languageDropdown.classList.add('hidden');
            });
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        if (languageDropdown && !languageDropdown.classList.contains('hidden')) {
            languageDropdown.classList.add('hidden');
        }
    });
}

// Initialize on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLanguage);
} else {
    initializeLanguage();
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.translations = translations;
    window.currentLanguage = currentLanguage;
    window.applyTranslations = applyTranslations;
}
