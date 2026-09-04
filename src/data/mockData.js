// ============================================================
// Sahakar — Comprehensive Enterprise Mock Data
// Labour Cooperative Federations, Skilled Trades, KYC & AI Forecasts
// ============================================================

export const CITIES = [
  'Delhi', 'Mumbai', 'Lucknow', 'Pune', 'Bengaluru',
  'Jaipur', 'Ahmedabad', 'Chennai', 'Hyderabad', 'Kolkata'
];

export const TRADES = [
  'Electrician',
  'Plumber',
  'Carpenter',
  'Painter',
  'Domestic Helper',
  'Caregiver',
  'Driver',
  'Gardener',
  'Cleaner',
  'Appliance Technician'
];

export const SKILL_LEVELS = ['Apprentice', 'Level 1', 'Level 2', 'Expert', 'Master'];

// ---- Platform Top-Level Stats ----
export const platformStats = {
  totalWorkers: 14680,
  welfarePool: 23145000,
  totalDistricts: 14,
  jobsCompleted: 148920,
  averageRating: 4.88,
  surplusReturned: 18450000
};

// ---- Labour Cooperative Federations & Primary Societies ----
export const SOCIETIES = [
  {
    id: 'soc-delhi-central',
    name: 'Delhi Central Labour Cooperative Federation',
    regNo: 'DEL/COOP/LAB/2021/892',
    city: 'Delhi',
    activeWorkers: 3420,
    established: '2021',
    president: 'Harish Chandra Sharma',
    contact: '+91 11 2345 6789',
    rating: 4.85,
    coverageDistricts: ['Central Delhi', 'South Delhi', 'East Delhi', 'North Delhi'],
    monthlyGMV: 4850000,
    welfareContribution: 48500,
    societiesCount: 14,
  },
  {
    id: 'soc-mumbai-shramik',
    name: 'Mumbai Shramik Sahakari Sanstha Ltd.',
    regNo: 'MH/MUM/SOC/2019/451',
    city: 'Mumbai',
    activeWorkers: 4180,
    established: '2019',
    president: 'Sunil R. Patil',
    contact: '+91 22 2456 7890',
    rating: 4.9,
    coverageDistricts: ['Mumbai City', 'Mumbai Suburban', 'Thane', 'Navi Mumbai'],
    monthlyGMV: 6200000,
    welfareContribution: 62000,
    societiesCount: 18,
  },
  {
    id: 'soc-bengaluru-guild',
    name: 'Karnataka Labour Cooperative Guild',
    regNo: 'KA/BLR/COOP/2022/102',
    city: 'Bengaluru',
    activeWorkers: 2890,
    established: '2022',
    president: 'M. Anjanappa',
    contact: '+91 80 2567 8901',
    rating: 4.8,
    coverageDistricts: ['Bengaluru Urban', 'Bengaluru Rural', 'Whitefield', 'Electronic City'],
    monthlyGMV: 4100000,
    welfareContribution: 41000,
    societiesCount: 11,
  },
  {
    id: 'soc-lucknow-shakti',
    name: 'Lucknow Shram Shakti Sahakari Samiti',
    regNo: 'UP/LKO/LAB/2023/341',
    city: 'Lucknow',
    activeWorkers: 1850,
    established: '2023',
    president: 'Ram Vilas Yadav',
    contact: '+91 522 234 5678',
    rating: 4.75,
    coverageDistricts: ['Hazratganj', 'Gomti Nagar', 'Alambagh', 'Indira Nagar'],
    monthlyGMV: 2450000,
    welfareContribution: 24500,
    societiesCount: 8,
  },
  {
    id: 'soc-pune-kamgar',
    name: 'Pune District Kamgar Sahakari Sangh',
    regNo: 'MH/PUN/COOP/2020/719',
    city: 'Pune',
    activeWorkers: 2340,
    established: '2020',
    president: 'Vikas G. Deshmukh',
    contact: '+91 20 2678 9012',
    rating: 4.82,
    coverageDistricts: ['Shivajinagar', 'Kothrud', 'Hinjewadi', 'Hadapsar'],
    monthlyGMV: 3180000,
    welfareContribution: 31800,
    societiesCount: 10,
  }
];

export const DISTRICTS = [
  { id: 'delhi', name: 'Delhi Cooperative', members: 3420, established: '2021' },
  { id: 'mumbai', name: 'Mumbai Cooperative', members: 4180, established: '2019' },
  { id: 'lucknow', name: 'Lucknow Cooperative', members: 1850, established: '2023' },
  { id: 'pune', name: 'Pune Cooperative', members: 2340, established: '2020' },
  { id: 'bengaluru', name: 'Bengaluru Cooperative', members: 2890, established: '2022' },
];

// ---- Verified Skilled Workers ----
export const workers = [
  {
    id: 'w1',
    name: 'Rajesh Kumar',
    nameHi: 'राजेश कुमार',
    avatar: '👷',
    trade: 'Electrician',
    level: 'Expert',
    levelNum: 3,
    city: 'Delhi',
    district: 'delhi',
    societyId: 'soc-delhi-central',
    societyName: 'Delhi Central Labour Federation',
    rating: 4.88,
    reviewsCount: 142,
    jobsCompleted: 347,
    memberSince: '2022',
    ownershipStake: 0.12,
    hourlyRate: 450,
    status: 'available',
    distanceKm: 1.2,
    coordinates: { lat: 28.6139, lng: 77.2090 },
    monthlyEarnings: 32500,
    potentialEarnings: 42000,
    incomeStability: 88,
    certifications: [
      { title: 'NSDC Level 4 Certified Electrician', issuer: 'National Skill Development Corp', date: '2023', verified: true, certId: 'NSDC-ELE-2023-9981' },
      { title: 'Solar Panel Grid Installation Specialist', issuer: 'Skill Council for Green Jobs', date: '2024', verified: true, certId: 'SCGJ-SOL-8812' },
      { title: 'Police Clearance Verified', issuer: 'Delhi Police Special Cell', date: '2025', verified: true, certId: 'PCC-DEL-77192' }
    ],
    badges: ['Certified Master Electrician', 'Solar PV Expert', 'Police Verified', 'Safety Star'],
    skills: ['Concealed Wiring', 'Three-Phase Distribution', 'Solar Grid Setup', 'Smart Home Automation', 'Generator Maintenance'],
    bio: '12+ years of industrial and domestic electrical experience. Master craftsman with zero workplace safety incidents.'
  },
  {
    id: 'w2',
    name: 'Priya Sharma',
    nameHi: 'प्रिया शर्मा',
    avatar: '👩‍🔧',
    trade: 'Plumber',
    level: 'Expert',
    levelNum: 3,
    city: 'Mumbai',
    district: 'mumbai',
    societyId: 'soc-mumbai-shramik',
    societyName: 'Mumbai Shramik Sahakari Sanstha',
    rating: 4.92,
    reviewsCount: 98,
    jobsCompleted: 213,
    memberSince: '2023',
    ownershipStake: 0.08,
    hourlyRate: 400,
    status: 'available',
    distanceKm: 2.5,
    coordinates: { lat: 19.0760, lng: 72.8777 },
    monthlyEarnings: 27000,
    potentialEarnings: 36000,
    incomeStability: 79,
    certifications: [
      { title: 'NSDC Advanced Plumbing & Water Systems', issuer: 'Indian Plumbing Skills Council', date: '2023', verified: true, certId: 'IPSC-PLM-6623' },
      { title: 'Commercial RO & Water Purifier Specialist', issuer: 'Skill India Mission', date: '2024', verified: true, certId: 'SIM-WAT-4412' }
    ],
    badges: ['NSDC Certified Plumber', 'Waterproofing Pro', 'Fast Responder'],
    skills: ['Leakage Detection', 'PPR & CPVC Piping', 'Bathroom Overhaul', 'Water Purifier & RO Fitting'],
    bio: 'Specialist in concealed pipeline repairs and high-pressure bathroom sanitation installations.'
  },
  {
    id: 'w3',
    name: 'Suresh Yadav',
    nameHi: 'सुरेश यादव',
    avatar: '🪚',
    trade: 'Carpenter',
    level: 'Master',
    levelNum: 4,
    city: 'Lucknow',
    district: 'lucknow',
    societyId: 'soc-lucknow-shakti',
    societyName: 'Lucknow Shram Shakti Samiti',
    rating: 4.95,
    reviewsCount: 184,
    jobsCompleted: 512,
    memberSince: '2021',
    ownershipStake: 0.18,
    hourlyRate: 500,
    status: 'busy',
    distanceKm: 4.1,
    coordinates: { lat: 26.8467, lng: 80.9462 },
    monthlyEarnings: 36000,
    potentialEarnings: 45000,
    incomeStability: 92,
    certifications: [
      { title: 'Master Craftsman Woodworking & Joinery', issuer: 'Furniture & Fittings Skill Council', date: '2022', verified: true, certId: 'FFSC-WOD-1092' },
      { title: 'Modular Kitchen Installation Specialist', issuer: 'Hettich Certified Training', date: '2023', verified: true, certId: 'HET-MOD-3321' }
    ],
    badges: ['Master Craftsman', 'Modular Kitchen Pro', 'Custom Furniture Guru'],
    skills: ['Modular Kitchens', 'Custom Wardrobes', 'Antique Wood Restoration', 'CNC Wood Routing'],
    bio: 'Crafting precision wooden architectural fittings and modular spaces with over 15 years of guild practice.'
  },
  {
    id: 'w4',
    name: 'Amit Patel',
    nameHi: 'अमित पटेल',
    avatar: '🎨',
    trade: 'Painter',
    level: 'Expert',
    levelNum: 3,
    city: 'Pune',
    district: 'pune',
    societyId: 'soc-pune-kamgar',
    societyName: 'Pune Kamgar Sahakari Sangh',
    rating: 4.86,
    reviewsCount: 120,
    jobsCompleted: 428,
    memberSince: '2022',
    ownershipStake: 0.14,
    hourlyRate: 380,
    status: 'available',
    distanceKm: 3.2,
    coordinates: { lat: 18.5204, lng: 73.8567 },
    monthlyEarnings: 31000,
    potentialEarnings: 38000,
    incomeStability: 84,
    certifications: [
      { title: 'Airless Spray & Texture Application Certified', issuer: 'Paints and Coatings Skill Council', date: '2023', verified: true, certId: 'PCSC-TEX-5591' }
    ],
    badges: ['Texture Art Certified', 'Waterproofing Expert', 'Eco-Paints Certified'],
    skills: ['Texture Design', 'Exterior Waterproofing', 'Epoxy Flooring', 'Airless Spray Painting'],
    bio: 'Specializing in dustless sanding, luxury textures, and anti-fungal exterior coatings.'
  },
  {
    id: 'w5',
    name: 'Savita Devi',
    nameHi: 'सविता देवी',
    avatar: '👩‍🍳',
    trade: 'Domestic Helper',
    level: 'Expert',
    levelNum: 3,
    city: 'Delhi',
    district: 'delhi',
    societyId: 'soc-delhi-central',
    societyName: 'Delhi Central Labour Federation',
    rating: 4.93,
    reviewsCount: 165,
    jobsCompleted: 389,
    memberSince: '2022',
    ownershipStake: 0.10,
    hourlyRate: 250,
    status: 'available',
    distanceKm: 0.8,
    coordinates: { lat: 28.6210, lng: 77.2150 },
    monthlyEarnings: 24000,
    potentialEarnings: 30000,
    incomeStability: 90,
    certifications: [
      { title: 'Hygiene, Nutrition & Housekeeping Certification', issuer: 'Domestic Workers Skill Council', date: '2023', verified: true, certId: 'DWSC-DOM-7721' },
      { title: 'Verified Background & Health Checkup', issuer: 'Delhi Urban Health Mission', date: '2025', verified: true, certId: 'DUHM-HLT-9012' }
    ],
    badges: ['NSDC Certified Helper', 'Police Verified', 'Hygiene Champion'],
    skills: ['Multi-Cuisine Meal Prep', 'Pantry Management', 'Deep Sanitization', 'Wardrobe Organization'],
    bio: 'Dedicated home assistant with certified hygiene training and background clearance.'
  },
  {
    id: 'w6',
    name: 'Anjali Nair',
    nameHi: 'अंजलि नायर',
    avatar: '🩺',
    trade: 'Caregiver',
    level: 'Expert',
    levelNum: 3,
    city: 'Bengaluru',
    district: 'bengaluru',
    societyId: 'soc-bengaluru-guild',
    societyName: 'Karnataka Labour Cooperative Guild',
    rating: 4.97,
    reviewsCount: 114,
    jobsCompleted: 278,
    memberSince: '2023',
    ownershipStake: 0.11,
    hourlyRate: 550,
    status: 'available',
    distanceKm: 1.8,
    coordinates: { lat: 12.9716, lng: 77.5946 },
    monthlyEarnings: 38000,
    potentialEarnings: 48000,
    incomeStability: 95,
    certifications: [
      { title: 'Geriatric & Palliative Care Certification', issuer: 'Healthcare Sector Skill Council', date: '2023', verified: true, certId: 'HSSC-GER-4421' },
      { title: 'Emergency First Aid & CPR Certified', issuer: 'Indian Red Cross Society', date: '2024', verified: true, certId: 'IRCS-CPR-8820' }
    ],
    badges: ['Red Cross CPR Certified', 'Geriatric Care Specialist', 'Emergency Care Pro'],
    skills: ['Elderly Patient Care', 'Post-Operative Recovery', 'Vital Signs Monitoring', 'Medication Management', 'Mobility Therapy'],
    bio: 'Registered healthcare caregiver specializing in empathetic senior care, patient rehabilitation, and dementia support.'
  },
  {
    id: 'w7',
    name: 'Manpreet Singh',
    nameHi: 'मनप्रीत सिंह',
    avatar: '🚗',
    trade: 'Driver',
    level: 'Master',
    levelNum: 4,
    city: 'Delhi',
    district: 'delhi',
    societyId: 'soc-delhi-central',
    societyName: 'Delhi Central Labour Federation',
    rating: 4.89,
    reviewsCount: 210,
    jobsCompleted: 640,
    memberSince: '2021',
    ownershipStake: 0.15,
    hourlyRate: 350,
    status: 'available',
    distanceKm: 2.1,
    coordinates: { lat: 28.6290, lng: 77.2180 },
    monthlyEarnings: 34000,
    potentialEarnings: 40000,
    incomeStability: 87,
    certifications: [
      { title: 'Commercial Heavy & Light Transport License (Badge)', issuer: 'Delhi Transport Department', date: '2020', verified: true, certId: 'DL-TRN-1992019' },
      { title: 'Defensive Driving & VIP Chauffeur Certification', issuer: 'Automotive Skills Development Council', date: '2022', verified: true, certId: 'ASDC-DRV-3312' }
    ],
    badges: ['Zero Violation Record', 'VIP Chauffeur', 'Defensive Driving Pro'],
    skills: ['Luxury Sedan Driving', 'Outstation Highway Navigation', 'Vehicle Preventive Maintenance', 'EV Fleet Operation'],
    bio: 'Professional chauffeur with 14 years accident-free driving record across north and western national highways.'
  },
  {
    id: 'w8',
    name: 'K. Ranganathan',
    nameHi: 'के. रंगनाथन',
    avatar: '🌿',
    trade: 'Gardener',
    level: 'Level 2',
    levelNum: 2,
    city: 'Bengaluru',
    district: 'bengaluru',
    societyId: 'soc-bengaluru-guild',
    societyName: 'Karnataka Labour Cooperative Guild',
    rating: 4.84,
    reviewsCount: 76,
    jobsCompleted: 194,
    memberSince: '2023',
    ownershipStake: 0.07,
    hourlyRate: 300,
    status: 'available',
    distanceKm: 3.5,
    coordinates: { lat: 12.9800, lng: 77.6000 },
    monthlyEarnings: 22000,
    potentialEarnings: 29000,
    incomeStability: 73,
    certifications: [
      { title: 'Organic Horticulture & Landscape Design', issuer: 'Agriculture Skill Council of India', date: '2023', verified: true, certId: 'ASCI-HRT-8831' }
    ],
    badges: ['Organic Farming Certified', 'Terrace Garden Pro', 'Bonsai Specialist'],
    skills: ['Terrace Gardening', 'Drip Irrigation Setup', 'Organic Pest Control', 'Bonsai & Lawn Manicuring'],
    bio: 'Transforming residential balconies and institutional estates into sustainable green sanctuaries.'
  },
  {
    id: 'w9',
    name: 'Sunita Deshpande',
    nameHi: 'सुनीता देशपांडे',
    avatar: '🧹',
    trade: 'Cleaner',
    level: 'Expert',
    levelNum: 3,
    city: 'Pune',
    district: 'pune',
    societyId: 'soc-pune-kamgar',
    societyName: 'Pune Kamgar Sahakari Sangh',
    rating: 4.91,
    reviewsCount: 138,
    jobsCompleted: 310,
    memberSince: '2022',
    ownershipStake: 0.09,
    hourlyRate: 320,
    status: 'available',
    distanceKm: 1.5,
    coordinates: { lat: 18.5300, lng: 73.8500 },
    monthlyEarnings: 26000,
    potentialEarnings: 33000,
    incomeStability: 82,
    certifications: [
      { title: 'Industrial & Hospital Deep Sanitation Specialist', issuer: 'Cleaning Skills Council of India', date: '2023', verified: true, certId: 'CSCI-CLN-9921' }
    ],
    badges: ['Deep Clean Master', 'Industrial Sanitation Pro', 'Fast Worker'],
    skills: ['Kitchen Degreasing', 'Sofa & Carpet Upholstery Extraction', 'Bathroom Descaling', 'Post-Construction Cleaning'],
    bio: 'Equipped with heavy-duty steam extractors and eco-friendly sterilization agents for spotless spaces.'
  },
  {
    id: 'w10',
    name: 'Deepak Singh',
    nameHi: 'दीपक सिंह',
    avatar: '❄️',
    trade: 'Appliance Technician',
    level: 'Expert',
    levelNum: 3,
    city: 'Delhi',
    district: 'delhi',
    societyId: 'soc-delhi-central',
    societyName: 'Delhi Central Labour Federation',
    rating: 4.87,
    reviewsCount: 154,
    jobsCompleted: 298,
    memberSince: '2023',
    ownershipStake: 0.10,
    hourlyRate: 480,
    status: 'available',
    distanceKm: 2.8,
    coordinates: { lat: 28.6350, lng: 77.2250 },
    monthlyEarnings: 33000,
    potentialEarnings: 44000,
    incomeStability: 86,
    certifications: [
      { title: 'Inverter AC, Refrigerator & Washing Machine Master', issuer: 'Electronics Sector Skills Council', date: '2023', verified: true, certId: 'ESSC-APL-7741' },
      { title: 'R-32 & Hydrocarbon Gas Safety Certification', issuer: 'National Ozone Unit MOEFCC', date: '2024', verified: true, certId: 'NOU-REF-5510' }
    ],
    badges: ['Inverter AC Certified', 'PCB Diagnostic Expert', 'OEM Verified Parts'],
    skills: ['Split & VRF Inverter ACs', 'Front-Load Washing Machine PCB Repairs', 'Double Door Frost-Free Fridges', 'Microwave Magnetron Repair'],
    bio: 'Circuit-level troubleshooting and genuine component repairs across all major household brands.'
  }
];

export const currentWorker = workers[0]; // Rajesh Kumar

// ---- Worker Dashboard Prosperity Engine Exports ----
export const seasonalDemand = [
  { month: 'Sep', demand: 75, potentialBonus: 4500 },
  { month: 'Oct', demand: 90, potentialBonus: 7200 },
  { month: 'Nov', demand: 95, potentialBonus: 8500 },
  { month: 'Dec', demand: 65, potentialBonus: 3200 },
  { month: 'Jan', demand: 60, potentialBonus: 2800 },
  { month: 'Feb', demand: 80, potentialBonus: 5600 },
];

export const skillLadder = [
  { level: 'Level 1: Basic Apprentice', req: 'Basic Wiring & Fixtures', avgIncome: 18000, current: false },
  { level: 'Level 2: Certified Electrician', req: 'Concealed & DB Wiring', avgIncome: 26000, current: false },
  { level: 'Level 3: Expert / Guild Member', req: 'Solar & 3-Phase Commercial', avgIncome: 35000, current: true },
  { level: 'Level 4: Master Craftsman', req: 'Smart Automation & Audit', avgIncome: 48000, current: false },
];

export const profitDistribution = {
  directJobEarnings: 28500,
  coopDividends: 4000,
  welfareContribution: 325,
  societyPoolTotal: 4850000
};

export const skillRecommendations = [
  {
    skill: 'Solar Panel Grid Installation (NSDC Level 4)',
    reason: 'Diwali commercial demand + government subsidy surge',
    estimatedIncrease: 9500,
    timeToLearn: '2 weeks part-time at Delhi Co-op Training Hub'
  }
];

// ---- Job Marketplace Auto-Assembled Teams Data ----
export const jobs = [
  {
    id: 'j1',
    title: 'Full 3BHK Renovation & Smart Lighting Setup',
    trade: 'Multi-Trade Team',
    team: [
      { trade: 'Electrician', workerName: 'Rajesh Kumar', avatar: '👷', rate: 450 },
      { trade: 'Painter', workerName: 'Amit Patel', avatar: '🎨', rate: 380 },
      { trade: 'Carpenter', workerName: 'Suresh Yadav', avatar: '🪚', rate: 500 },
    ],
    customerName: 'Vivek Malhotra',
    location: 'Vasant Kunj, New Delhi',
    city: 'Delhi',
    district: 'delhi',
    budget: 45000,
    duration: '6 Days',
    welfareContribution: 450,
    urgency: 'Medium',
    customerRiskScore: 'Safe (4.9⭐ Customer)',
    riskFlags: ['Verified Payment Escrow', 'Flexible Hours', 'Cold Drinking Water Provided'],
    status: 'Open for Team'
  },
  {
    id: 'j2',
    title: 'Emergency Bathroom Leakage & Pipeline Replacement',
    trade: 'Plumber',
    team: [
      { trade: 'Plumber', workerName: 'Priya Sharma', avatar: '👩‍🔧', rate: 400 }
    ],
    customerName: 'Sunita Rao',
    location: 'Bandra West, Mumbai',
    city: 'Mumbai',
    district: 'mumbai',
    budget: 3500,
    duration: '4 Hours',
    welfareContribution: 35,
    urgency: 'High',
    customerRiskScore: 'Safe (4.8⭐)',
    riskFlags: ['High Pressure Leak', 'Immediate Access Provided'],
    status: 'In Progress'
  }
];

// ---- Community Wholesale Group Buys ----
export const groupBuys = [
  {
    id: 'gb-1',
    item: 'Bosch Professional Cordless Drill Set (18V Brushless)',
    retailPrice: 8500,
    groupPrice: 5200,
    savings: 3300,
    targetUnits: 50,
    pledgedUnits: 42,
    daysLeft: 3,
    image: '⚡',
    organizingSociety: 'Delhi Central Labour Federation'
  },
  {
    id: 'gb-2',
    item: 'Berger WeatherCoat Exterior Waterproofing Primer (20L Drums)',
    retailPrice: 4200,
    groupPrice: 2800,
    savings: 1400,
    targetUnits: 100,
    pledgedUnits: 88,
    daysLeft: 5,
    image: '🎨',
    organizingSociety: 'Pune Kamgar Sahakari Sangh'
  }
];

export const communityMarketplace = {
  groupBuys: groupBuys,
  equipmentSharing: [
    { id: 'eq-1', name: 'Fluke Laser Distance Meter', owner: 'Rajesh Kumar', dailyRate: 150, available: true },
    { id: 'eq-2', name: 'Stihl Commercial Hedge Trimmer', owner: 'K. Ranganathan', dailyRate: 250, available: true },
  ]
};

// ---- Governance Democratic Ballots ----
export const ballots = [
  {
    id: 'gov-1',
    district: 'delhi',
    title: 'Allocate ₹15 Lakhs from Annual Surplus to Buy 4 Commercial Boom Lifts for High-Rise Painters',
    description: 'Currently painters rent boom lifts at ₹3,500/day. Cooperative purchase will reduce rental to ₹500/day maintenance cost.',
    proposer: 'Painter Guild Council',
    status: 'Active',
    deadline: '2026-09-10',
    yesVotes: 1420,
    noVotes: 110,
    quorum: 65,
    totalEligible: 2847
  },
  {
    id: 'gov-2',
    district: 'mumbai',
    title: 'Amend Dispute Redressal By-Laws: Mandate 48-hour Mediation Window before Escrow Release',
    description: 'Gives workers and customers a formal peer hearing before any penalty is evaluated.',
    proposer: 'Mumbai Arbitration Committee',
    status: 'Active',
    deadline: '2026-09-12',
    yesVotes: 2180,
    noVotes: 95,
    quorum: 72,
    totalEligible: 3215
  }
];

export const governanceVotes = ballots;

// ---- Welfare Fund Transparency Public Ledger ----
export const welfareStats = {
  totalPool: 23145000,
  inflowThisMonth: 485000,
  claimsProcessed: 412,
  disbursedThisYear: 3840000
};

export const monthlyInflows = [
  { month: 'Apr', inflow: 380000, payouts: 210000 },
  { month: 'May', inflow: 420000, payouts: 290000 },
  { month: 'Jun', inflow: 460000, payouts: 340000 },
  { month: 'Jul', inflow: 470000, payouts: 280000 },
  { month: 'Aug', inflow: 485000, payouts: 310000 },
  { month: 'Sep', inflow: 510000, payouts: 180000 },
];

export const payoutCategories = [
  { name: 'Emergency Hospitalization', value: 45, color: '#C45C3C' },
  { name: 'Accidental Injury Aid', value: 30, color: '#2D6A4F' },
  { name: 'Tool Loss & Disaster Relief', value: 15, color: '#D4A843' },
  { name: 'Maternity / Paternity Support', value: 10, color: '#40916C' },
];

export const recentPayouts = [
  { id: 'CLM-881', worker: 'Rameshwar Lal', trade: 'Mason', reason: 'Hand Fracture Treatment', amount: 35000, date: '2026-08-29', status: 'Disbursed' },
  { id: 'CLM-880', worker: 'Sunita Deshpande', trade: 'Cleaner', reason: 'High-Grade Steam Cleaner Stolen from Van', amount: 22000, date: '2026-08-24', status: 'Disbursed' },
  { id: 'CLM-879', worker: 'Priya Sharma', trade: 'Plumber', reason: 'Emergency Eye Care (Welding Sparks)', amount: 12500, date: '2026-08-18', status: 'Disbursed' },
];

export const welfareFund = {
  totalPool: 23145000,
  inflowThisMonth: 485000,
  claimsProcessed: 412,
  disbursedThisYear: 3840000,
  monthlyInflows: monthlyInflows,
  payoutCategories: payoutCategories,
  recentPayouts: recentPayouts
};

export const services = [
  { id: 'srv-1', title: 'Electrical Wiring & Panel Repair', trade: 'Electrician', startingPrice: 450, rating: 4.88 },
  { id: 'srv-2', title: 'Concealed Pipe Leak Detection', trade: 'Plumber', startingPrice: 400, rating: 4.92 },
  { id: 'srv-3', title: 'Elderly Care & Patient Nursing', trade: 'Caregiver', startingPrice: 550, rating: 4.97 },
  { id: 'srv-4', title: 'Full House Deep Cleaning', trade: 'Cleaner', startingPrice: 1200, rating: 4.91 },
  { id: 'srv-5', title: 'AC Inverter Gas Refill & Service', trade: 'Appliance Technician', startingPrice: 480, rating: 4.87 },
];

export const customers = [
  { id: 'c1', name: 'Neha Agarwal', city: 'Delhi', rating: 4.9, bookingsCount: 14 },
  { id: 'c2', name: 'Vivek Malhotra', city: 'Delhi', rating: 4.8, bookingsCount: 8 },
  { id: 'c3', name: 'Ritu Kapoor', city: 'Mumbai', rating: 5.0, bookingsCount: 22 },
];

// ---- Pending KYC Onboarding Queue (For Federation Admin) ----
export const pendingKYCQueue = [
  {
    id: 'kyc-101',
    name: 'Rameshwar Lal Gurjar',
    trade: 'Mason',
    city: 'Delhi',
    societyId: 'soc-delhi-central',
    submittedDate: '2026-09-02',
    phone: '+91 98112 34567',
    experienceYears: 8,
    documents: [
      { type: 'Aadhaar Card', status: 'verified', docNumber: 'XXXX-XXXX-4412', file: 'aadhaar_front_back.pdf' },
      { type: 'Skill Certificate', status: 'pending', docNumber: 'NSDC-MAS-2024-110', file: 'nsdc_certificate.jpg' },
      { type: 'Police Clearance', status: 'verified', docNumber: 'PCC-DL-88319', file: 'police_verification.pdf' },
      { type: 'Society Membership Letter', status: 'verified', docNumber: 'DEL-SOC-MBR-99', file: 'society_recommendation.pdf' }
    ],
    status: 'Under Review'
  },
  {
    id: 'kyc-102',
    name: 'Meenakshi Sundaram',
    trade: 'Caregiver',
    city: 'Bengaluru',
    societyId: 'soc-bengaluru-guild',
    submittedDate: '2026-09-03',
    phone: '+91 98450 98765',
    experienceYears: 6,
    documents: [
      { type: 'Aadhaar Card', status: 'verified', docNumber: 'XXXX-XXXX-8921', file: 'aadhaar_card.pdf' },
      { type: 'Red Cross First Aid', status: 'verified', docNumber: 'IRCS-BLR-2023-401', file: 'first_aid_cert.pdf' },
      { type: 'Police Clearance', status: 'pending', docNumber: 'PCC-BLR-11902', file: 'police_clearance_app.pdf' },
      { type: 'Society Membership Letter', status: 'verified', docNumber: 'KA-GUILD-7721', file: 'guild_nomination.pdf' }
    ],
    status: 'Under Review'
  },
  {
    id: 'kyc-103',
    name: 'Arun Gawande',
    trade: 'Driver',
    city: 'Pune',
    societyId: 'soc-pune-kamgar',
    submittedDate: '2026-09-01',
    phone: '+91 98220 11223',
    experienceYears: 10,
    documents: [
      { type: 'Aadhaar Card', status: 'verified', docNumber: 'XXXX-XXXX-3310', file: 'aadhaar.pdf' },
      { type: 'Commercial Transport DL', status: 'verified', docNumber: 'MH-12-2015000912', file: 'dl_badge.pdf' },
      { type: 'Police Clearance', status: 'verified', docNumber: 'PCC-PUN-55201', file: 'pcc_cleared.pdf' },
      { type: 'Society Membership Letter', status: 'verified', docNumber: 'PUN-SOC-6601', file: 'society_letter.pdf' }
    ],
    status: 'Approved'
  }
];

// ---- Customer Bookings Ledger ----
export const initialBookings = [
  {
    id: 'BK-9821',
    service: 'Emergency Electrical Hazard Repair',
    trade: 'Electrician',
    workerId: 'w1',
    workerName: 'Rajesh Kumar',
    workerAvatar: '👷',
    customerName: 'Neha Agarwal',
    customerPhone: '+91 98101 23456',
    address: 'B-4/12, Vasant Vihar, New Delhi',
    date: '2026-09-03',
    timeSlot: 'Morning (09:00 - 12:00)',
    status: 'In Progress',
    isEmergency: true,
    totalAmount: 1450,
    breakdown: {
      baseLabor: 1200,
      emergencySurge: 250,
      welfareContribution: 14.50,
      societyShare: 130.50,
      workerPayout: 1305.00,
    },
    paymentMethod: 'UPI (Google Pay)',
    paymentStatus: 'Paid',
    invoiceId: 'INV-2026-09821'
  },
  {
    id: 'BK-9820',
    service: 'Elderly Physiotherapy & Caregiver Assistance',
    trade: 'Caregiver',
    workerId: 'w6',
    workerName: 'Anjali Nair',
    workerAvatar: '🩺',
    customerName: 'Dr. Arjun Reddy',
    customerPhone: '+91 98450 67890',
    address: 'Flat 402, Prestige Tower, Indiranagar, Bengaluru',
    date: '2026-09-04',
    timeSlot: 'Morning (09:00 - 12:00)',
    status: 'Scheduled',
    isEmergency: false,
    totalAmount: 1800,
    breakdown: {
      baseLabor: 1800,
      emergencySurge: 0,
      welfareContribution: 18.00,
      societyShare: 162.00,
      workerPayout: 1620.00,
    },
    paymentMethod: 'Co-op Wallet',
    paymentStatus: 'Paid',
    invoiceId: 'INV-2026-09820'
  },
  {
    id: 'BK-9819',
    service: 'Full Bathroom Leakage & Fixture Installation',
    trade: 'Plumber',
    workerId: 'w2',
    workerName: 'Priya Sharma',
    workerAvatar: '👩‍🔧',
    customerName: 'Ritu Kapoor',
    customerPhone: '+91 98200 45678',
    address: '701, Sea View Apts, Bandra West, Mumbai',
    date: '2026-09-02',
    timeSlot: 'Afternoon (13:00 - 16:00)',
    status: 'Completed',
    isEmergency: false,
    totalAmount: 2200,
    breakdown: {
      baseLabor: 2200,
      emergencySurge: 0,
      welfareContribution: 22.00,
      societyShare: 198.00,
      workerPayout: 1980.00,
    },
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    invoiceId: 'INV-2026-09819',
    review: {
      rating: 5,
      comment: 'Extremely professional! Punctual, fixed concealed pipe leak without breaking additional tiles.',
      date: '2026-09-02'
    }
  }
];

// ---- Emergency / On-Demand Service Categories ----
export const emergencyServices = [
  {
    id: 'em-1',
    title: 'Short Circuit / Sparking Hazard',
    trade: 'Electrician',
    icon: '⚡',
    basePrice: 599,
    surgePrice: 200,
    etaMinutes: 15,
    description: 'Immediate isolation of electrical short circuits, sparking MCBs, and main meter burnouts.'
  },
  {
    id: 'em-2',
    title: 'Major Pipe Burst / Flooding',
    trade: 'Plumber',
    icon: '💧',
    basePrice: 549,
    surgePrice: 200,
    etaMinutes: 15,
    description: 'Rapid stoppage of main pipeline breaks, overhead tank overflow leaks, and drain blockages.'
  },
  {
    id: 'em-3',
    title: 'Urgent Elderly Patient / Medical Caregiver',
    trade: 'Caregiver',
    icon: '🩺',
    basePrice: 899,
    surgePrice: 250,
    etaMinutes: 20,
    description: 'Certified nursing assistance for critical elderly mobility, post-trauma supervision, or vital monitoring.'
  },
  {
    id: 'em-4',
    title: 'Emergency Lockout / Door Jammed',
    trade: 'Carpenter',
    icon: '🔑',
    basePrice: 499,
    surgePrice: 150,
    etaMinutes: 20,
    description: 'Non-destructive residential lock opening, safe latch extraction, and emergency hinge repair.'
  }
];

// ---- Welfare Schemes & Social Security Integration ----
export const welfareSchemes = [
  {
    id: 'sch-1',
    title: 'Pradhan Mantri Suraksha Bima Yojana (PMSBY)',
    category: 'Accident Insurance',
    coverage: '₹2,00,000 Accidental Death / Permanent Disability',
    annualPremium: '₹20 / year (Cooperative Subsidized 100%)',
    enrolledWorkers: 12450,
    eligibleBadge: 'Accident Protected',
    details: 'Cooperative auto-renews annual premiums through the 1% welfare fund pool.'
  },
  {
    id: 'sch-2',
    title: 'Ayushman Bharat PM-JAY & Cooperative Health Cover',
    category: 'Healthcare & Hospitalization',
    coverage: '₹5,00,000 cashless secondary & tertiary hospitalization per family',
    annualPremium: 'Fully Sponsored by State Labour Welfare Board',
    enrolledWorkers: 9820,
    eligibleBadge: 'Health Shield',
    details: 'Direct cashless treatment across 27,000+ empaneled hospitals across India.'
  },
  {
    id: 'sch-3',
    title: 'e-Shram National Database Integration',
    category: 'Social Security UAN',
    coverage: '12-digit Universal Account Number (UAN) with portable welfare entitlements',
    annualPremium: 'Free Enrollment',
    enrolledWorkers: 12847,
    eligibleBadge: 'e-Shram Verified',
    details: 'Seamless social security migration when worker takes contracts across state borders.'
  },
  {
    id: 'sch-4',
    title: 'Sahakar Member Provident Fund & Pension Pool',
    category: 'Retirement & Long-term Wealth',
    coverage: 'Monthly voluntary savings matched by 2% platform cooperative dividend allocation',
    annualPremium: 'Flexible Worker Micro-Contributions',
    enrolledWorkers: 8140,
    eligibleBadge: 'Co-op Pensioner',
    details: 'Guaranteed 8.15% compound annual return managed by Worker Board Trustees.'
  }
];

// ---- AI-Based Demand Forecasting & Workforce Allocation Data ----
export const aiDemandForecast = {
  summary: 'AI Engine predicts 38% surge in AC Technicians & Gardeners across Delhi & Pune over the next 14 days due to pre-summer transition.',
  hotspots: [
    { district: 'South Delhi Hub', trade: 'AC Technician', currentSupply: 42, predictedDemand: 78, gap: -36, surgeRisk: 'High', recommendation: 'Reallocate 20 technicians from East Delhi' },
    { district: 'Hinjewadi Tech Corridor, Pune', trade: 'Domestic Helper', currentSupply: 65, predictedDemand: 95, gap: -30, surgeRisk: 'High', recommendation: 'Dispatch 15 helpers from Kothrud sub-society' },
    { district: 'Indiranagar / Whitefield, BLR', trade: 'Caregiver', currentSupply: 50, predictedDemand: 58, gap: -8, surgeRisk: 'Moderate', recommendation: 'Adequate; schedule 10 on standby' },
    { district: 'Bandra / Andheri, Mumbai', trade: 'Plumber', currentSupply: 80, predictedDemand: 120, gap: -40, surgeRisk: 'High', recommendation: 'Pre-allocate monsoon waterproofing squads' },
  ],
  hourlyDemandCurve: [
    { hour: '07:00', bookings: 45, projectedDemand: 50 },
    { hour: '09:00', bookings: 140, projectedDemand: 165 },
    { hour: '11:00', bookings: 210, projectedDemand: 230 },
    { hour: '13:00', bookings: 110, projectedDemand: 120 },
    { hour: '15:00', bookings: 130, projectedDemand: 145 },
    { hour: '17:00', bookings: 260, projectedDemand: 290 },
    { hour: '19:00', bookings: 310, projectedDemand: 340 },
    { hour: '21:00', bookings: 95, projectedDemand: 110 },
  ],
  seasonalTrends: [
    { month: 'Jan', cleaning: 60, electrical: 70, acRepair: 20, plumbing: 55 },
    { month: 'Feb', cleaning: 65, electrical: 85, acRepair: 45, plumbing: 68 },
    { month: 'Mar', cleaning: 70, electrical: 90, acRepair: 95, plumbing: 75 },
    { month: 'Apr', cleaning: 75, electrical: 95, acRepair: 100, plumbing: 80 },
    { month: 'May', cleaning: 80, electrical: 90, acRepair: 95, plumbing: 85 },
    { month: 'Jun', cleaning: 85, electrical: 75, acRepair: 70, plumbing: 98 },
  ]
};

// ---- Standard Helper Functions ----
export const formatCurrency = (amount) => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
  if (amount >= 1000) return `₹${amount.toLocaleString('en-IN')}`;
  return `₹${amount}`;
};
