// ============================================================
// Sahakar — Comprehensive Reactive Mock Data Store & Database
// Backed by LocalStorage with real-time change event broadcasting
// ============================================================

const STORAGE_KEY = 'sahakar_master_db_v1';

// Initial Demo Seed Data
const DEFAULT_SEED_DATA = {
  users: [
    {
      id: 'usr-customer-1',
      email: 'customer@sahakar.coop',
      password: 'demo123',
      name: 'Neha Agarwal',
      role: 'Customer',
      phone: '+91 98101 23456',
      district: 'delhi',
      avatar: '👩',
      trustScore: 4.9,
      ratingsReceived: 14,
      address: 'B-4/12, Vasant Vihar, New Delhi',
      createdAt: '2024-03-15'
    },
    {
      id: 'usr-worker-1',
      email: 'worker@sahakar.coop',
      password: 'demo123',
      name: 'Rajesh Kumar',
      role: 'Worker',
      phone: '+91 98112 34567',
      district: 'delhi',
      avatar: '👷',
      trade: 'Electrician',
      skillLevel: 'Expert',
      ownershipStake: 0.12,
      reputationScore: 4.88,
      welfareContributions: 4850,
      societyId: 'soc-delhi-central',
      societyName: 'Delhi Central Labour Cooperative Federation',
      hourlyRate: 450,
      createdAt: '2022-01-10'
    },
    {
      id: 'usr-admin-1',
      email: 'admin@sahakar.coop',
      password: 'demo123',
      name: 'Harish Chandra Sharma',
      role: 'Federation Admin',
      phone: '+91 11 2345 6789',
      district: 'delhi',
      avatar: '👨‍💼',
      federationName: 'National Federation of Labour Cooperatives',
      createdAt: '2021-08-01'
    },
    {
      id: 'usr-council-1',
      email: 'council@sahakar.coop',
      password: 'demo123',
      name: 'Sunil R. Patil',
      role: 'District Council Member',
      phone: '+91 22 2456 7890',
      district: 'mumbai',
      avatar: '🏛️',
      councilDistrict: 'Mumbai Cooperative Council',
      createdAt: '2022-05-12'
    }
  ],

  districts: [
    { id: 'delhi', name: 'Delhi Cooperative Federation', members: 3420, activeRateFloor: 400, established: '2021' },
    { id: 'mumbai', name: 'Mumbai Labour Cooperative', members: 4180, activeRateFloor: 420, established: '2019' },
    { id: 'lucknow', name: 'Lucknow Shram Shakti Samiti', members: 1850, activeRateFloor: 350, established: '2023' },
    { id: 'pune', name: 'Pune Kamgar Sahakari Sangh', members: 2340, activeRateFloor: 380, established: '2020' },
    { id: 'bengaluru', name: 'Karnataka Labour Guild', members: 2890, activeRateFloor: 450, established: '2022' }
  ],

  trades: [
    'Electrician', 'Plumber', 'Carpenter', 'Painter',
    'Domestic Helper', 'Caregiver', 'Driver', 'Gardener',
    'Cleaner', 'Appliance Technician'
  ],

  workers: [
    {
      id: 'w1',
      userId: 'usr-worker-1',
      name: 'Rajesh Kumar',
      nameHi: 'राजेश कुमार',
      avatar: '👷',
      trade: 'Electrician',
      skillLevel: 'Expert',
      levelNum: 3,
      district: 'delhi',
      societyName: 'Delhi Central Labour Federation',
      rating: 4.88,
      reviewsCount: 142,
      jobsCompleted: 347,
      hourlyRate: 450,
      ownershipStake: 0.12,
      status: 'available', // available, busy, off_duty
      distanceKm: 1.2,
      coordinates: { lat: 28.6139, lng: 77.2090 },
      monthlyEarnings: 32500,
      potentialEarnings: 42000,
      incomeStability: 88,
      certifications: [
        { title: 'NSDC Level 4 Master Electrician', issuer: 'National Skill Development Corp', date: '2023', verified: true, certId: 'NSDC-ELE-2023-9981' },
        { title: 'Solar Panel Grid Installation Specialist', issuer: 'Skill Council for Green Jobs', date: '2024', verified: true, certId: 'SCGJ-SOL-8812' },
        { title: 'Police Clearance Certificate', issuer: 'Delhi Police Special Cell', date: '2025', verified: true, certId: 'PCC-DEL-77192' }
      ],
      badges: ['Master Electrician', 'Solar PV Expert', 'Police Verified', 'Safety Champion'],
      skills: ['Concealed Wiring', 'Three-Phase Panels', 'Solar Grid Setup', 'Smart Home Automation'],
      bio: '12+ years of domestic and commercial electrical excellence. Master guild craftsman with zero safety violations.'
    },
    {
      id: 'w2',
      userId: 'usr-worker-2',
      name: 'Priya Sharma',
      nameHi: 'प्रिया शर्मा',
      avatar: '👩‍🔧',
      trade: 'Plumber',
      skillLevel: 'Expert',
      levelNum: 3,
      district: 'mumbai',
      societyName: 'Mumbai Shramik Sahakari Sanstha',
      rating: 4.92,
      reviewsCount: 98,
      jobsCompleted: 213,
      hourlyRate: 400,
      ownershipStake: 0.08,
      status: 'available',
      distanceKm: 2.5,
      coordinates: { lat: 19.0760, lng: 72.8777 },
      monthlyEarnings: 27000,
      potentialEarnings: 36000,
      incomeStability: 79,
      certifications: [
        { title: 'NSDC Advanced Plumbing & Water Systems', issuer: 'Indian Plumbing Skills Council', date: '2023', verified: true, certId: 'IPSC-PLM-6623' }
      ],
      badges: ['NSDC Certified Plumber', 'Waterproofing Pro', 'Fast Responder'],
      skills: ['Concealed Pipe Leaks', 'PPR/CPVC Piping', 'Water Purifier & RO Fitting', 'Pressure Pumps'],
      bio: 'Specialist in concealed high-pressure plumbing, bathroom overhauls, and drainage detection.'
    },
    {
      id: 'w3',
      userId: 'usr-worker-3',
      name: 'Suresh Yadav',
      nameHi: 'सुरेश यादव',
      avatar: '🪚',
      trade: 'Carpenter',
      skillLevel: 'Master',
      levelNum: 4,
      district: 'lucknow',
      societyName: 'Lucknow Shram Shakti Samiti',
      rating: 4.95,
      reviewsCount: 184,
      jobsCompleted: 512,
      hourlyRate: 500,
      ownershipStake: 0.18,
      status: 'busy',
      distanceKm: 4.1,
      coordinates: { lat: 26.8467, lng: 80.9462 },
      monthlyEarnings: 36000,
      potentialEarnings: 45000,
      incomeStability: 92,
      certifications: [
        { title: 'Master Craftsman Woodworking & Joinery', issuer: 'Furniture & Fittings Skill Council', date: '2022', verified: true, certId: 'FFSC-WOD-1092' }
      ],
      badges: ['Master Craftsman', 'Modular Kitchen Pro', 'Custom Furniture Guru'],
      skills: ['Modular Kitchens', 'Custom Wardrobes', 'Antique Restoration', 'CNC Routing'],
      bio: 'Crafting architectural wooden installations and precision modular spaces for 15+ years.'
    },
    {
      id: 'w4',
      userId: 'usr-worker-4',
      name: 'Amit Patel',
      nameHi: 'अमित पटेल',
      avatar: '🎨',
      trade: 'Painter',
      skillLevel: 'Expert',
      levelNum: 3,
      district: 'pune',
      societyName: 'Pune Kamgar Sahakari Sangh',
      rating: 4.86,
      reviewsCount: 120,
      jobsCompleted: 428,
      hourlyRate: 380,
      ownershipStake: 0.14,
      status: 'available',
      distanceKm: 3.2,
      coordinates: { lat: 18.5204, lng: 73.8567 },
      monthlyEarnings: 31000,
      potentialEarnings: 38000,
      incomeStability: 84,
      certifications: [
        { title: 'Airless Spray & Texture Application Certified', issuer: 'Paints Skill Council', date: '2023', verified: true, certId: 'PCSC-TEX-5591' }
      ],
      badges: ['Texture Art Certified', 'Waterproofing Expert', 'Eco-Paints Certified'],
      skills: ['Texture Painting', 'Exterior Waterproofing', 'Epoxy Flooring', 'Airless Spray'],
      bio: 'Master in dustless sanding, luxury wall textures, and anti-fungal exterior coats.'
    },
    {
      id: 'w5',
      userId: 'usr-worker-5',
      name: 'Savita Devi',
      nameHi: 'सविता देवी',
      avatar: '👩‍🍳',
      trade: 'Domestic Helper',
      skillLevel: 'Expert',
      levelNum: 3,
      district: 'delhi',
      societyName: 'Delhi Central Labour Federation',
      rating: 4.93,
      reviewsCount: 165,
      jobsCompleted: 389,
      hourlyRate: 250,
      ownershipStake: 0.10,
      status: 'available',
      distanceKm: 0.8,
      coordinates: { lat: 28.6210, lng: 77.2150 },
      monthlyEarnings: 24000,
      potentialEarnings: 30000,
      incomeStability: 90,
      certifications: [
        { title: 'Hygiene, Nutrition & Housekeeping Certification', issuer: 'Domestic Workers Skill Council', date: '2023', verified: true, certId: 'DWSC-DOM-7721' }
      ],
      badges: ['NSDC Certified Helper', 'Police Verified', 'Hygiene Champion'],
      skills: ['Multi-Cuisine Meal Prep', 'Pantry Management', 'Deep Sanitization'],
      bio: 'Trained and verified domestic associate delivering wholesome culinary and home support.'
    },
    {
      id: 'w6',
      userId: 'usr-worker-6',
      name: 'Anjali Nair',
      nameHi: 'अंजलि नायर',
      avatar: '🩺',
      trade: 'Caregiver',
      skillLevel: 'Expert',
      levelNum: 3,
      district: 'bengaluru',
      societyName: 'Karnataka Labour Cooperative Guild',
      rating: 4.97,
      reviewsCount: 114,
      jobsCompleted: 278,
      hourlyRate: 550,
      ownershipStake: 0.11,
      status: 'available',
      distanceKm: 1.8,
      coordinates: { lat: 12.9716, lng: 77.5946 },
      monthlyEarnings: 38000,
      potentialEarnings: 48000,
      incomeStability: 95,
      certifications: [
        { title: 'Geriatric & Palliative Care Certification', issuer: 'Healthcare Sector Skill Council', date: '2023', verified: true, certId: 'HSSC-GER-4421' },
        { title: 'Red Cross First Aid & CPR Certified', issuer: 'Indian Red Cross Society', date: '2024', verified: true, certId: 'IRCS-CPR-8820' }
      ],
      badges: ['Red Cross CPR Certified', 'Geriatric Care Specialist', 'Emergency Care Pro'],
      skills: ['Elderly Patient Care', 'Post-Op Recovery', 'Vital Signs Monitoring', 'Medication Management'],
      bio: 'Empathetic healthcare caregiver with clinical training for senior living and recovery.'
    },
    {
      id: 'w7',
      userId: 'usr-worker-7',
      name: 'Manpreet Singh',
      nameHi: 'मनप्रीत सिंह',
      avatar: '🚗',
      trade: 'Driver',
      skillLevel: 'Master',
      levelNum: 4,
      district: 'delhi',
      societyName: 'Delhi Central Labour Federation',
      rating: 4.89,
      reviewsCount: 210,
      jobsCompleted: 640,
      hourlyRate: 350,
      ownershipStake: 0.15,
      status: 'available',
      distanceKm: 2.1,
      coordinates: { lat: 28.6290, lng: 77.2180 },
      monthlyEarnings: 34000,
      potentialEarnings: 40000,
      incomeStability: 87,
      certifications: [
        { title: 'Commercial Heavy & Light Transport License (Badge)', issuer: 'Delhi Transport Dept', date: '2020', verified: true, certId: 'DL-TRN-1992019' }
      ],
      badges: ['Zero Violation Record', 'VIP Chauffeur', 'Defensive Driving Pro'],
      skills: ['Luxury Sedan Driving', 'Outstation Navigation', 'Fleet EV Operation'],
      bio: 'Professional chauffeur with 14 years zero-violation safety record across interstate highways.'
    },
    {
      id: 'w8',
      userId: 'usr-worker-8',
      name: 'K. Ranganathan',
      nameHi: 'के. रंगनाथन',
      avatar: '🌿',
      trade: 'Gardener',
      skillLevel: 'Level 2',
      levelNum: 2,
      district: 'bengaluru',
      societyName: 'Karnataka Labour Cooperative Guild',
      rating: 4.84,
      reviewsCount: 76,
      jobsCompleted: 194,
      hourlyRate: 300,
      ownershipStake: 0.07,
      status: 'available',
      distanceKm: 3.5,
      coordinates: { lat: 12.9800, lng: 77.6000 },
      monthlyEarnings: 22000,
      potentialEarnings: 29000,
      incomeStability: 73,
      certifications: [
        { title: 'Organic Horticulture & Landscape Design', issuer: 'Agriculture Skill Council', date: '2023', verified: true, certId: 'ASCI-HRT-8831' }
      ],
      badges: ['Organic Farming Certified', 'Terrace Garden Pro', 'Bonsai Specialist'],
      skills: ['Terrace Gardening', 'Drip Irrigation', 'Organic Pest Control', 'Bonsai Pruning'],
      bio: 'Landscape horticulturist creating productive kitchen gardens and residential terrace greens.'
    },
    {
      id: 'w9',
      userId: 'usr-worker-9',
      name: 'Sunita Deshpande',
      nameHi: 'सुनीता देशपांडे',
      avatar: '🧹',
      trade: 'Cleaner',
      skillLevel: 'Expert',
      levelNum: 3,
      district: 'pune',
      societyName: 'Pune Kamgar Sahakari Sangh',
      rating: 4.91,
      reviewsCount: 138,
      jobsCompleted: 310,
      hourlyRate: 320,
      ownershipStake: 0.09,
      status: 'available',
      distanceKm: 1.5,
      coordinates: { lat: 18.5300, lng: 73.8500 },
      monthlyEarnings: 26000,
      potentialEarnings: 33000,
      incomeStability: 82,
      certifications: [
        { title: 'Industrial & Deep Sanitation Specialist', issuer: 'Cleaning Skills Council', date: '2023', verified: true, certId: 'CSCI-CLN-9921' }
      ],
      badges: ['Deep Clean Master', 'Industrial Sanitation Pro', 'Eco Chemical Certified'],
      skills: ['Kitchen Degreasing', 'Sofa/Upholstery Steam Extraction', 'Bathroom Descaling'],
      bio: 'Equipped with heavy steam extractors and eco-neutral disinfectants for flawless interiors.'
    },
    {
      id: 'w10',
      userId: 'usr-worker-10',
      name: 'Deepak Singh',
      nameHi: 'दीपक सिंह',
      avatar: '❄️',
      trade: 'Appliance Technician',
      skillLevel: 'Expert',
      levelNum: 3,
      district: 'delhi',
      societyName: 'Delhi Central Labour Federation',
      rating: 4.87,
      reviewsCount: 154,
      jobsCompleted: 298,
      hourlyRate: 480,
      ownershipStake: 0.10,
      status: 'available',
      distanceKm: 2.8,
      coordinates: { lat: 28.6350, lng: 77.2250 },
      monthlyEarnings: 33000,
      potentialEarnings: 44000,
      incomeStability: 86,
      certifications: [
        { title: 'Inverter AC & Refrigeration Master', issuer: 'Electronics Sector Skills Council', date: '2023', verified: true, certId: 'ESSC-APL-7741' }
      ],
      badges: ['Inverter AC Certified', 'PCB Diagnostic Pro', 'OEM Parts Guaranteed'],
      skills: ['Split & VRF Inverter ACs', 'Washing Machine PCB Diagnostic', 'Double Door Fridges'],
      bio: 'Master electronics troubleshooter repairing complex inverter control circuits and appliances.'
    }
  ],

  bookings: [
    {
      id: 'BK-9821',
      serviceTitle: 'Emergency Electrical Sparking & Hazard Repair',
      trade: 'Electrician',
      customerId: 'usr-customer-1',
      customerName: 'Neha Agarwal',
      customerPhone: '+91 98101 23456',
      address: 'B-4/12, Vasant Vihar, New Delhi',
      workerId: 'w1',
      workerName: 'Rajesh Kumar',
      workerAvatar: '👷',
      date: '2026-09-03',
      timeSlot: 'Morning (09:00 - 12:00)',
      status: 'In Progress', // Requested, Accepted, In Progress, Completed, Rated, Cancelled
      isEmergency: true,
      isTeamJob: false,
      totalAmount: 1450,
      breakdown: {
        baseLabor: 1200,
        emergencySurge: 250,
        welfareContribution: 14.50, // 1%
        societyShare: 130.50, // 9%
        workerPayout: 1305.00 // 90%
      },
      paymentStatus: 'Paid',
      paymentMethod: 'UPI (Google Pay)',
      invoiceId: 'INV-2026-09821',
      customerRiskFlag: 'None (Trust Score: 4.9⭐)'
    },
    {
      id: 'BK-9820',
      serviceTitle: 'Elderly Physiotherapy & Mobility Assistance',
      trade: 'Caregiver',
      customerId: 'usr-customer-1',
      customerName: 'Neha Agarwal',
      customerPhone: '+91 98101 23456',
      address: 'B-4/12, Vasant Vihar, New Delhi',
      workerId: 'w6',
      workerName: 'Anjali Nair',
      workerAvatar: '🩺',
      date: '2026-09-04',
      timeSlot: 'Morning (09:00 - 12:00)',
      status: 'Accepted',
      isEmergency: false,
      isTeamJob: false,
      totalAmount: 1650,
      breakdown: {
        baseLabor: 1650,
        emergencySurge: 0,
        welfareContribution: 16.50,
        societyShare: 148.50,
        workerPayout: 1485.00
      },
      paymentStatus: 'Paid',
      paymentMethod: 'Escrow Wallet',
      invoiceId: 'INV-2026-09820'
    },
    {
      id: 'BK-9819',
      serviceTitle: 'Full 3BHK Renovation & Multi-Trade Overhaul',
      trade: 'Multi-Trade Team',
      customerId: 'usr-customer-1',
      customerName: 'Neha Agarwal',
      customerPhone: '+91 98101 23456',
      address: 'B-4/12, Vasant Vihar, New Delhi',
      workerId: 'w1',
      workerName: 'Rajesh Kumar & Team',
      workerAvatar: '👷',
      teamMembers: [
        { role: 'Lead Electrician', workerName: 'Rajesh Kumar', avatar: '👷', payout: 15000 },
        { role: 'Master Carpenter', workerName: 'Suresh Yadav', avatar: '🪚', payout: 18000 },
        { role: 'Texture Painter', workerName: 'Amit Patel', avatar: '🎨', payout: 12000 }
      ],
      date: '2026-08-28',
      timeSlot: 'Full Day Project',
      status: 'Completed',
      isEmergency: false,
      isTeamJob: true,
      totalAmount: 50000,
      breakdown: {
        baseLabor: 50000,
        emergencySurge: 0,
        welfareContribution: 500.00,
        societyShare: 4500.00,
        workerPayout: 45000.00
      },
      paymentStatus: 'Paid',
      paymentMethod: 'NetBanking / RTGS',
      invoiceId: 'INV-2026-09819',
      ratingCustomerToWorker: 5,
      reviewCustomerToWorker: 'Incredible coordination between trades. Finished 2 days ahead of schedule with zero mess!',
      ratingWorkerToCustomer: 5,
      reviewWorkerToCustomer: 'Clear requirements, prompt access, and provided refreshing chai to the entire team.'
    }
  ],

  welfareFund: {
    totalPool: 23145000,
    inflowThisMonth: 485000,
    claimsProcessed: 412,
    claims: [
      {
        id: 'CLM-101',
        workerId: 'w1',
        workerName: 'Rajesh Kumar',
        trade: 'Electrician',
        type: 'Medical Hospitalization',
        description: 'Emergency finger ligament repair due to conduit slip on job site',
        amount: 25000,
        status: 'Approved',
        disbursedDate: '2026-08-15',
        reviewedBy: 'Harish Chandra Sharma (Federation Admin)'
      },
      {
        id: 'CLM-102',
        workerId: 'w3',
        workerName: 'Suresh Yadav',
        trade: 'Carpenter',
        type: 'Tool Loss / Theft Relief',
        description: 'Festool plunge saw set stolen from locked guild transport van',
        amount: 35000,
        status: 'Under Review',
        submittedDate: '2026-09-02',
        reviewedBy: 'Pending Board Quorum'
      }
    ]
  },

  proposals: [
    {
      id: 'prop-1',
      district: 'delhi',
      title: 'Mandate Minimum Wage Floor of ₹450/hr for Licensed Electricians across Delhi NCR',
      description: 'Protects guild members against price undercutting and sets a standard quality floor across institutional contracts.',
      proposer: 'Delhi Electrical Guild Council',
      status: 'Active',
      deadline: '2026-09-15',
      yesVotes: 1840,
      noVotes: 120,
      quorumTarget: 1500,
      appliedPolicy: 'Set Delhi Electrician minimum rate to ₹450/hr upon passage.'
    },
    {
      id: 'prop-2',
      district: 'mumbai',
      title: 'Allocate ₹12 Lakhs from Surplus to Bulk-Procure Industrial Scaffolding for High-Rise Painters',
      description: 'Reduces individual daily equipment rental cost from ₹3,000/day to ₹400/day maintenance charge.',
      proposer: 'Mumbai Painting Guild',
      status: 'Passed',
      deadline: '2026-08-30',
      yesVotes: 2450,
      noVotes: 85,
      quorumTarget: 2000,
      appliedPolicy: 'Surplus fund earmarked; 6 scaffolding sets delivered to Thane depot.'
    }
  ],

  disputes: [
    {
      id: 'DISP-881',
      bookingId: 'BK-9821',
      customerName: 'Vivek Malhotra',
      workerName: 'Rajesh Kumar',
      issue: 'Customer requested unquoted outdoor meter alteration after job completion',
      status: 'In Mediation',
      escrowFrozen: 1450,
      assignedMediator: 'Sunil R. Patil (Council Delegate)'
    }
  ],

  groupBuys: [
    {
      id: 'gb-1',
      item: 'Bosch Professional 18V Brushless Combi Drill Set (Bulk Lot 50)',
      retailPrice: 9500,
      groupPrice: 5800,
      savings: 3700,
      targetUnits: 50,
      pledgedUnits: 44,
      daysLeft: 3,
      organizer: 'Delhi Central Labour Federation'
    },
    {
      id: 'gb-2',
      item: 'Berger WeatherCoat Anti-Fungal Waterproofing Emulsion (20L Drum Lot 100)',
      retailPrice: 4800,
      groupPrice: 2950,
      savings: 1850,
      targetUnits: 100,
      pledgedUnits: 92,
      daysLeft: 5,
      organizer: 'Pune Kamgar Sahakari Sangh'
    }
  ],

  equipment: [
    { id: 'eq-1', name: 'Fluke Laser Multi-Meter & Circuit Analyzer', owner: 'Rajesh Kumar', dailyRate: 150, status: 'Available' },
    { id: 'eq-2', name: 'Stihl High-Reach Commercial Hedge Trimmer', owner: 'K. Ranganathan', dailyRate: 250, status: 'Available' },
    { id: 'eq-3', name: 'Heavy Duty 3000 PSI Hydro Drain Jetter', owner: 'Priya Sharma', dailyRate: 600, status: 'Rented' }
  ],

  kycQueue: [
    {
      id: 'kyc-201',
      name: 'Rameshwar Lal Gurjar',
      trade: 'Mason',
      phone: '+91 98112 34567',
      experienceYears: 8,
      district: 'delhi',
      documents: [
        { name: 'Aadhaar Card', verified: true, number: 'XXXX-XXXX-4412' },
        { name: 'NSDC Skill Certificate', verified: true, number: 'NSDC-MAS-2024-110' },
        { name: 'Police Clearance Certificate', verified: true, number: 'PCC-DL-88319' },
        { name: 'Delhi Society Affiliation Letter', verified: false, number: 'DEL-SOC-99' }
      ],
      status: 'Pending Review',
      submittedAt: '2026-09-02'
    }
  ]
};

// --- Store Manager ---
export function getStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SEED_DATA));
      return DEFAULT_SEED_DATA;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read from localStorage:', err);
    return DEFAULT_SEED_DATA;
  }
}

export function saveStore(updater) {
  try {
    const current = getStore();
    const updated = typeof updater === 'function' ? updater(current) : updater;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('sahakar_store_update', { detail: updated }));
    return updated;
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
    return getStore();
  }
}

// Reset store to fresh seed data
export function resetStore() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SEED_DATA));
  window.dispatchEvent(new CustomEvent('sahakar_store_update', { detail: DEFAULT_SEED_DATA }));
  return DEFAULT_SEED_DATA;
}

// Helper formatter
export function formatCurrency(amount) {
  if (amount === undefined || amount === null) return '₹0';
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
  if (amount >= 1000) return `₹${Number(amount).toLocaleString('en-IN')}`;
  return `₹${Number(amount).toFixed(0)}`;
}
