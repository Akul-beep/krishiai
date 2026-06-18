export const brand = {
  name: "KrishiAI",
  tagline: "Precision Agriculture For The Next Billion Farmers",
  description:
    "Solar-powered IoT and AI field intelligence for small and marginal farmers across India.",
  email: "akulnehra@gmail.com",
};

export const ctas = {
  partner: {
    label: "Partner With Us",
    href: "mailto:akulnehra@gmail.com?subject=KrishiAI%20Partnership%20Inquiry",
  },
  joinEvent: {
    label: "Join Next Event",
    href: "mailto:akulnehra@gmail.com?subject=KrishiAI%20Field%20Event%20Signup",
  },
  fundraise: {
    label: "Fundraise",
    href: "mailto:akulnehra@gmail.com?subject=KrishiAI%20Fundraising%20Inquiry",
  },
  viewImpact: {
    label: "View Our Impact",
    href: "#impact",
  },
  viewSolution: {
    label: "View Solution",
    href: "#solution",
  },
};

export const missionStatement =
  "We give every farmer access to the same field intelligence that large agribusiness already has — clear guidance on water, fertilizer, and crop health from one solar-powered field unit.";

export const impactStats = [
  { value: "30%", label: "Less Water Used", desc: "Through precision irrigation" },
  { value: "20%", label: "Higher Crop Yield", desc: "For small and marginal farmers" },
  { value: "20%", label: "Less Fertilizer", desc: "Targeted application, less waste" },
];

export const problemStats = [
  {
    title: "Water Wastage",
    stat: "70%",
    body: "Agriculture uses 70% of India's freshwater. Up to 60% is lost to outdated flood irrigation.",
  },
  {
    title: "Depleting Soil Health",
    stat: "56%",
    body: "Over-fertilizing and poor moisture control have cut yields by up to 56% on degraded land.",
  },
  {
    title: "Unpredictable Climate",
    stat: "",
    body: "Droughts, floods, and heat waves hit harder every season. Farmers plan blind without live field data.",
  },
  {
    title: "Pest Infestations",
    stat: "40%",
    body: "Up to 40% of crops are lost each year to pests farmers cannot see coming.",
  },
];

export const costOfInaction = [
  { label: "Economic Impact", body: "Agriculture drives 18% of India's GDP. Declining yields put that at risk." },
  { label: "Livelihoods At Risk", body: "150 million farmers depend on the land for survival." },
  { label: "Food Security", body: "Inefficient farming threatens supply for 1.4 billion people." },
  { label: "Annual Loss", body: "$6 billion lost every year to outdated practices." },
];

export const evidenceItems = [
  {
    type: "Workshop",
    title: "Field Workshops In Punjab",
    body: "On-site sessions with smallholder farmers to test sensors and map real irrigation needs.",
    image: "workshop",
  },
  {
    type: "Interview",
    title: "Farmer Interviews",
    body: "Direct conversations on how farmers decide when to water, fertilize, and treat crops.",
    image: "interview",
  },
  {
    type: "Pilot",
    title: "Fazilka Pilot Data",
    body: "Live NPK, moisture, and temperature readings from active pilot farms in Punjab.",
    image: "field",
  },
  {
    type: "Partnership",
    title: "Punjab Field Program",
    body: "Co-designing deployment with cooperatives and NGOs to reach smallholder farmers at scale.",
    image: "punjab",
  },
];

export const sensors = [
  { id: "npk", label: "NPK Sensor", desc: "Nitrogen, phosphorus, and potassium in the soil" },
  { id: "moisture", label: "Soil Moisture", desc: "Real-time water content at root depth" },
  { id: "soil-temp", label: "Soil Temperature", desc: "Root-zone heat monitoring" },
  { id: "air", label: "Temperature & Humidity", desc: "Microclimate at crop level" },
  { id: "weather", label: "Weather APIs", desc: "Live forecast and climate data" },
  { id: "solar", label: "Solar Panel", desc: "Off-grid power for 24/7 monitoring" },
];

export const aiRecommendations = [
  "Pest risk alerts",
  "Crop disease warnings",
  "Irrigation scheduling",
  "Fertilizer guidance",
  "WhatsApp alerts for farmers",
];

export const sdgs = [
  {
    id: "2",
    title: "SDG 2: Zero Hunger",
    image: "/sdgs/sdg-2.png",
    body: "20% higher yields for small farmers through precision soil and weather monitoring.",
    stat: "20%",
    statLabel: "Yield Increase",
  },
  {
    id: "6",
    title: "SDG 6: Clean Water",
    image: "/sdgs/sdg-6.png",
    body: "30% less water used through data-driven irrigation instead of flood farming.",
    stat: "30%",
    statLabel: "Water Saved",
  },
  {
    id: "13",
    title: "SDG 13: Climate Action",
    image: "/sdgs/sdg-13.png",
    body: "20% less fertilizer applied. Lower emissions. Healthier soil for the long term.",
    stat: "20%",
    statLabel: "Less Fertilizer",
  },
];

export const team = [
  {
    name: "Akul Nehra",
    role: "Founder & CEO",
    bio: "Building AI and IoT tools that put enterprise-grade field intelligence in the hands of farmers who have never had it. Founder of KrishiAI, Frontier Challenge, and Arise Financial Literacy.",
    image: "akul",
  },
  {
    name: "Karambir Inder Singh",
    role: "Chief Operating Officer",
    bio: "Leads pilot operations and farmer engagement across Punjab. Turns field data into programs that scale to millions of growers.",
    image: "karambir",
  },
];

export const annualReports = [
  { year: "2025-2026", label: "Pilot results and farmer outcomes from Fazilka, Punjab.", status: "In Progress" },
  { year: "2026-2027", label: "Expansion metrics across new farms and partner regions.", status: "Upcoming" },
];
