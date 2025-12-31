// All Districts Data - Hardcoded for reliability
const DISTRICTS_DATA = {
    1: [ // Jammu and Kashmir
        {code: 11, name: "Srinagar", lat: 34.0837, lon: 74.7973},
        {code: 12, name: "Jammu", lat: 32.7266, lon: 74.8570},
        {code: 13, name: "Anantnag", lat: 33.7310, lon: 75.1484},
        {code: 14, name: "Baramulla", lat: 34.2093, lon: 74.3429}
    ],
    2: [ // Himachal Pradesh
        {code: 21, name: "Shimla", lat: 31.1048, lon: 77.1734},
        {code: 22, name: "Kangra", lat: 32.0998, lon: 76.2689},
        {code: 23, name: "Mandi", lat: 31.7084, lon: 76.9318},
        {code: 24, name: "Solan", lat: 30.9045, lon: 77.0967}
    ],
    3: [ // Punjab
        {code: 41, name: "Amritsar", lat: 31.6340, lon: 74.8723},
        {code: 42, name: "Ludhiana", lat: 30.9010, lon: 75.8573},
        {code: 43, name: "Jalandhar", lat: 31.3260, lon: 75.5762},
        {code: 44, name: "Patiala", lat: 30.3398, lon: 76.3869},
        {code: 45, name: "Bathinda", lat: 30.2110, lon: 74.9455}
    ],
    4: [ // Chandigarh
        {code: 61, name: "Chandigarh", lat: 30.7333, lon: 76.7794}
    ],
    5: [ // Uttarakhand
        {code: 71, name: "Dehradun", lat: 30.3165, lon: 78.0322},
        {code: 72, name: "Haridwar", lat: 29.9457, lon: 78.1642},
        {code: 73, name: "Nainital", lat: 29.3803, lon: 79.4636},
        {code: 74, name: "Udham Singh Nagar", lat: 29.0167, lon: 79.4167}
    ],
    6: [ // Haryana
        {code: 85, name: "Faridabad", lat: 28.4089, lon: 77.3178},
        {code: 86, name: "Gurugram", lat: 28.4595, lon: 77.0266},
        {code: 87, name: "Hisar", lat: 29.1492, lon: 75.7217},
        {code: 88, name: "Rohtak", lat: 28.8955, lon: 76.6066},
        {code: 89, name: "Karnal", lat: 29.6857, lon: 76.9905},
        {code: 90, name: "Panipat", lat: 29.3909, lon: 76.9635}
    ],
    7: [ // Delhi
        {code: 101, name: "Central Delhi", lat: 28.6517, lon: 77.2219},
        {code: 102, name: "South Delhi", lat: 28.5245, lon: 77.2066},
        {code: 103, name: "North Delhi", lat: 28.7041, lon: 77.1025}
    ],
    8: [ // Rajasthan
        {code: 111, name: "Jaipur", lat: 26.9124, lon: 75.7873},
        {code: 112, name: "Jodhpur", lat: 26.2389, lon: 73.0243},
        {code: 113, name: "Udaipur", lat: 24.5854, lon: 73.7125},
        {code: 114, name: "Kota", lat: 25.2138, lon: 75.8648},
        {code: 115, name: "Ajmer", lat: 26.4499, lon: 74.6399}
    ],
    9: [ // Uttar Pradesh
        {code: 151, name: "Lucknow", lat: 26.8467, lon: 80.9462},
        {code: 152, name: "Kanpur Nagar", lat: 26.4499, lon: 80.3319},
        {code: 153, name: "Agra", lat: 27.1767, lon: 78.0081},
        {code: 154, name: "Varanasi", lat: 25.3176, lon: 82.9739},
        {code: 155, name: "Prayagraj", lat: 25.4358, lon: 81.8463},
        {code: 156, name: "Ghaziabad", lat: 28.6692, lon: 77.4538},
        {code: 157, name: "Meerut", lat: 28.9845, lon: 77.7064},
        {code: 158, name: "Bareilly", lat: 28.3670, lon: 79.4304},
        {code: 159, name: "Aligarh", lat: 27.8974, lon: 78.0880},
        {code: 160, name: "Moradabad", lat: 28.8389, lon: 78.7768}
    ],
    10: [ // Bihar
        {code: 201, name: "Patna", lat: 25.5941, lon: 85.1376},
        {code: 202, name: "Gaya", lat: 24.7955, lon: 85.0002},
        {code: 203, name: "Bhagalpur", lat: 25.2425, lon: 86.9842},
        {code: 204, name: "Muzaffarpur", lat: 26.1225, lon: 85.3906}
    ],
    11: [ // Sikkim
        {code: 221, name: "Gangtok", lat: 27.3389, lon: 88.6065},
        {code: 222, name: "Namchi", lat: 27.1652, lon: 88.3639}
    ],
    12: [ // Arunachal Pradesh
        {code: 241, name: "Itanagar", lat: 27.0844, lon: 93.6053},
        {code: 242, name: "Tawang", lat: 27.5860, lon: 91.8714}
    ],
    13: [ // Nagaland
        {code: 261, name: "Kohima", lat: 25.6751, lon: 94.1086},
        {code: 262, name: "Dimapur", lat: 25.9067, lon: 93.7272}
    ],
    14: [ // Manipur
        {code: 281, name: "Imphal West", lat: 24.8170, lon: 93.9368},
        {code: 282, name: "Imphal East", lat: 24.7644, lon: 93.9632}
    ],
    15: [ // Mizoram
        {code: 301, name: "Aizawl", lat: 23.7271, lon: 92.7176},
        {code: 302, name: "Lunglei", lat: 22.8853, lon: 92.7378}
    ],
    16: [ // Tripura
        {code: 321, name: "Agartala", lat: 23.8315, lon: 91.2868},
        {code: 322, name: "Udaipur", lat: 23.5337, lon: 91.4827}
    ],
    17: [ // Meghalaya
        {code: 341, name: "Shillong", lat: 25.5788, lon: 91.8933},
        {code: 342, name: "Tura", lat: 25.5198, lon: 90.2034}
    ],
    18: [ // Assam
        {code: 361, name: "Guwahati", lat: 26.1445, lon: 91.7362},
        {code: 362, name: "Dibrugarh", lat: 27.4728, lon: 94.9120},
        {code: 363, name: "Jorhat", lat: 26.7509, lon: 94.2037},
        {code: 364, name: "Silchar", lat: 24.8333, lon: 92.7789}
    ],
    19: [ // West Bengal
        {code: 381, name: "Kolkata", lat: 22.5726, lon: 88.3639},
        {code: 382, name: "Darjeeling", lat: 27.0410, lon: 88.2663},
        {code: 383, name: "Howrah", lat: 22.5958, lon: 88.2636},
        {code: 384, name: "Siliguri", lat: 26.7271, lon: 88.3953}
    ],
    20: [ // Jharkhand
        {code: 401, name: "Ranchi", lat: 23.3441, lon: 85.3096},
        {code: 402, name: "Jamshedpur", lat: 22.8046, lon: 86.2029},
        {code: 403, name: "Dhanbad", lat: 23.7957, lon: 86.4304},
        {code: 404, name: "Bokaro", lat: 23.6693, lon: 86.1511}
    ],
    21: [ // Odisha
        {code: 421, name: "Bhubaneswar", lat: 20.2961, lon: 85.8245},
        {code: 422, name: "Cuttack", lat: 20.4625, lon: 85.8830},
        {code: 423, name: "Puri", lat: 19.8135, lon: 85.8312},
        {code: 424, name: "Sambalpur", lat: 21.4669, lon: 83.9812}
    ],
    22: [ // Chhattisgarh
        {code: 441, name: "Raipur", lat: 21.2514, lon: 81.6296},
        {code: 442, name: "Bilaspur", lat: 22.0797, lon: 82.1409},
        {code: 443, name: "Durg", lat: 21.1905, lon: 81.2849},
        {code: 444, name: "Korba", lat: 22.3595, lon: 82.7501}
    ],
    23: [ // Madhya Pradesh
        {code: 461, name: "Bhopal", lat: 23.2599, lon: 77.4126},
        {code: 462, name: "Indore", lat: 22.7196, lon: 75.8577},
        {code: 463, name: "Jabalpur", lat: 23.1815, lon: 79.9864},
        {code: 464, name: "Gwalior", lat: 26.2183, lon: 78.1828},
        {code: 465, name: "Ujjain", lat: 23.1765, lon: 75.7885}
    ],
    24: [ // Gujarat
        {code: 481, name: "Ahmedabad", lat: 23.0225, lon: 72.5714},
        {code: 482, name: "Surat", lat: 21.1702, lon: 72.8311},
        {code: 483, name: "Vadodara", lat: 22.3072, lon: 73.1812},
        {code: 484, name: "Rajkot", lat: 22.3039, lon: 70.8022},
        {code: 485, name: "Bhavnagar", lat: 21.7645, lon: 72.1519},
        {code: 486, name: "Jamnagar", lat: 22.4707, lon: 70.0577}
    ],
    27: [ // Maharashtra
        {code: 501, name: "Mumbai", lat: 19.0760, lon: 72.8777},
        {code: 502, name: "Pune", lat: 18.5204, lon: 73.8567},
        {code: 503, name: "Nagpur", lat: 21.1458, lon: 79.0882},
        {code: 504, name: "Nashik", lat: 19.9975, lon: 73.7898},
        {code: 505, name: "Aurangabad", lat: 19.8762, lon: 75.3433},
        {code: 506, name: "Solapur", lat: 17.6599, lon: 75.9064}
    ],
    28: [ // Andhra Pradesh
        {code: 521, name: "Visakhapatnam", lat: 17.6868, lon: 83.2185},
        {code: 522, name: "Vijayawada", lat: 16.5062, lon: 80.6480},
        {code: 523, name: "Guntur", lat: 16.3067, lon: 80.4365},
        {code: 524, name: "Nellore", lat: 14.4426, lon: 79.9865}
    ],
    29: [ // Karnataka
        {code: 541, name: "Bengaluru", lat: 12.9716, lon: 77.5946},
        {code: 542, name: "Mysuru", lat: 12.2958, lon: 76.6394},
        {code: 543, name: "Mangaluru", lat: 12.9141, lon: 74.8560},
        {code: 544, name: "Hubballi", lat: 15.3647, lon: 75.1240},
        {code: 545, name: "Belagavi", lat: 15.8497, lon: 74.4977}
    ],
    30: [ // Goa
        {code: 561, name: "North Goa", lat: 15.4909, lon: 73.8278},
        {code: 562, name: "South Goa", lat: 15.2993, lon: 74.1240}
    ],
    32: [ // Kerala
        {code: 581, name: "Thiruvananthapuram", lat: 8.5241, lon: 76.9366},
        {code: 582, name: "Kochi", lat: 9.9312, lon: 76.2673},
        {code: 583, name: "Kozhikode", lat: 11.2588, lon: 75.7804},
        {code: 584, name: "Thrissur", lat: 10.5276, lon: 76.2144},
        {code: 585, name: "Kannur", lat: 11.8745, lon: 75.3704}
    ],
    33: [ // Tamil Nadu
        {code: 601, name: "Chennai", lat: 13.0827, lon: 80.2707},
        {code: 602, name: "Coimbatore", lat: 11.0168, lon: 76.9558},
        {code: 603, name: "Madurai", lat: 9.9252, lon: 78.1198},
        {code: 604, name: "Tiruchirappalli", lat: 10.7905, lon: 78.7047},
        {code: 605, name: "Salem", lat: 11.6643, lon: 78.1460}
    ],
    34: [ // Puducherry
        {code: 621, name: "Puducherry", lat: 11.9416, lon: 79.8083},
        {code: 622, name: "Karaikal", lat: 10.9254, lon: 79.8380}
    ],
    36: [ // Telangana
        {code: 641, name: "Hyderabad", lat: 17.3850, lon: 78.4867},
        {code: 642, name: "Warangal", lat: 17.9784, lon: 79.6007},
        {code: 643, name: "Nizamabad", lat: 18.6725, lon: 78.0941},
        {code: 644, name: "Khammam", lat: 17.2473, lon: 80.1514}
    ],
    37: [ // Ladakh
        {code: 661, name: "Leh", lat: 34.1526, lon: 77.5771},
        {code: 662, name: "Kargil", lat: 34.5539, lon: 76.1315}
    ]
};

// Simple function to populate districts - NO API CALL
function loadDistrictsForState(stateCode) {
    const districtSelect = document.getElementById('districtSelect');
    if (!districtSelect) return;
    
    const districts = DISTRICTS_DATA[stateCode] || [];
    
    districtSelect.innerHTML = '<option value="">Select District</option>';
    
    districts.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.code;
        opt.textContent = d.name;
        opt.dataset.lat = d.lat;
        opt.dataset.lon = d.lon;
        districtSelect.appendChild(opt);
    });
    
    districtSelect.disabled = districts.length === 0;
}

// Auto-setup on load
document.addEventListener('DOMContentLoaded', function() {
    const stateSelect = document.getElementById('stateSelect');
    if (stateSelect) {
        stateSelect.addEventListener('change', function() {
            loadDistrictsForState(parseInt(this.value));
        });
    }
});
