// All copy and facts on this site come from the current cattleco.farm site.
// Edit here; components only render what this file exports.

export const brand = {
  name: "Cattle Co.",
  tagline: "Premium A2 milk and natural dairy products",
  motto: "Farming today for a healthier tomorrow",
  description:
    "Unpasteurised, unskimmed A2 milk from ethically raised Gir, Sahiwal and Hallikar cows, delivered fresh every morning across Bengaluru in glass bottles.",
};

export const contact = {
  email: "hello@cattleco.farm",
  phones: ["+91 63633 36096", "+91 63633 36070"],
  address: ["Vanaja Farmhouse, Ibbalakahalli", "Ramanagara, Karnataka 561201"],
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Vanaja+Farmhouse+Ibbalakahalli+Ramanagara+Karnataka+561201",
};

export const tel = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

// Links into the existing WooCommerce store. Only the paneer URL is confirmed;
// the others point at the store until product slugs are confirmed.
export const store = {
  home: "https://cattleco.farm/",
  paneer: "https://cattleco.farm/product/cattle-co-premium-a2-paneer/",
};

export const nav = [
  { label: "Our herd", href: "#herd" },
  { label: "Why A2", href: "#a2" },
  { label: "Products", href: "#products" },
  { label: "The farm", href: "#farm" },
  { label: "FAQ", href: "#faq" },
];

export const promises = [
  { icon: "dna", title: "DNA-tested herd", body: "Every cow is tested to confirm the A2/A2 gene variant." },
  { icon: "clock", title: "Hours, not days", body: "Milk reaches you within hours of milking." },
  { icon: "drop", title: "Nothing taken out", body: "Unpasteurised and unskimmed, so nutrients and good bacteria stay." },
  { icon: "bottle", title: "Glass, not plastic", body: "Delivered every morning in eco-friendly glass bottles." },
] as const;

export const breeds = [
  {
    name: "Gir",
    origin: "Gir forests, Gujarat",
    body: "Recognised by the domed forehead and long curled ears. One of India's best-known dairy breeds and a natural A2 producer.",
    image: "/images/gir.jpg",
  },
  {
    name: "Sahiwal",
    origin: "Punjab",
    body: "A calm, heat-tolerant breed with a reddish coat, prized for rich milk.",
    image: "/images/sahiwal.jpg",
  },
  {
    name: "Hallikar",
    origin: "Old Mysore, Karnataka",
    body: "Karnataka's own native breed, with long upswept horns. Part of the heritage we set out to preserve.",
    image: "/images/hallikar.jpg",
  },
];

export const a2 = {
  title: "What makes milk A2",
  body: "Cow's milk carries a protein called beta-casein in two forms, A1 and A2. India's indigenous breeds naturally produce the A2 form. We DNA-test every cow in our herd to confirm she carries only the A2/A2 variant.",
  points: [
    { k: "A2/A2", v: "Confirmed by DNA test for every cow in the herd" },
    { k: "Desi", v: "Gir, Sahiwal and Hallikar. Native breeds only" },
    { k: "Raw", v: "Never pasteurised, never skimmed" },
  ],
};

export type Product = {
  id: string;
  name: string;
  body: string;
  price: string;
  note?: string;
  href: string;
  image: string;
};

export const products: Product[] = [
  {
    id: "milk",
    name: "Premium A2 Milk",
    body: "Farm-fresh, unpasteurised and unskimmed. Bottled in glass and delivered every morning.",
    price: "Subscriptions from ₹252 a month",
    href: store.home,
    image: "/images/products/milk.webp",
  },
  {
    id: "ghee",
    name: "Premium A2 Ghee",
    body: "Traditional bilona ghee, churned from cultured butter. Rich in healthy fats.",
    price: "₹80 to ₹1,910",
    href: store.home,
    image: "/images/products/ghee.webp",
  },
  {
    id: "paneer",
    name: "Premium A2 Paneer",
    body: "Soft, creamy and wholesome. Handcrafted from our farm's pure A2 milk, in 100g and 250g packs.",
    price: "₹80 to ₹200",
    note: "Weekends only",
    href: store.paneer,
    image: "/images/products/paneer.webp",
  },
  {
    id: "curd",
    name: "A2 Curd",
    body: "Set from our unpasteurised milk and rich in probiotics for gut health.",
    price: "Ask with your order",
    href: store.home,
    image: "/images/products/curd.webp",
  },
];

export const farm = {
  title: "A small family farm that grew with Bengaluru",
  body: "Cattle Co. began on the outskirts of Bangalore, out of a passion for preserving India's indigenous cattle heritage. Today we supply A2 milk to families across the city, and the farm still runs the way it started.",
  image: "/images/farm.jpg",
  practices: [
    { icon: "grass", title: "Rotational grazing", body: "Our cows graze freely and move across pastures in rotation, which keeps the soil healthy." },
    { icon: "plant", title: "Organic fodder", body: "Fodder is grown on the farm with compost made from our own cow dung." },
    { icon: "sun", title: "Solar powered", body: "The farm runs on solar energy." },
    { icon: "rain", title: "Rainwater harvesting", body: "Rain is collected and stored to water the farm." },
    { icon: "bottle", title: "Glass bottles", body: "Milk leaves the farm in reusable glass to cut down on plastic." },
  ],
};

export const journey = [
  { title: "Milked at dawn", body: "Our cows are milked early every morning at the farm in Ramanagara." },
  { title: "Bottled in glass", body: "Unpasteurised, unskimmed milk goes straight into sealed glass bottles." },
  { title: "At your door", body: "Delivered across Bengaluru within hours of milking." },
];

// Paraphrased from the testimonials on cattleco.farm. Replace with the exact wording.
export const testimonials = [
  { quote: "I've been using Cattle Co. milk for about two months. The quality is very good, bottles are sealed for safety and delivery is prompt.", name: "Vaishnavi", role: "SBI employee, Bengaluru" },
  { quote: "I recommend it as real A2 milk from desi cows, without hormones or preservatives.", name: "Dr. Bhagyashree", role: "Gynecologist, Bengaluru" },
  { quote: "A month in and the milk is pure and reasonably priced.", name: "Kavitha", role: "Customer, Bengaluru" },
  { quote: "Great product and great service.", name: "Madhu", role: "Customer, Bengaluru" },
];

export const faqs = [
  {
    q: "What is A2 milk?",
    a: "Milk contains a protein called beta-casein in two forms, A1 and A2. Indigenous Indian breeds such as Gir, Sahiwal and Hallikar naturally produce A2 milk. Every cow in our herd is DNA-tested to confirm the A2/A2 gene variant.",
  },
  {
    q: "Is your milk pasteurised?",
    a: "No. Our milk is delivered unpasteurised and unskimmed, fresh every morning, to keep its nutrients and good bacteria intact.",
  },
  {
    q: "How is the milk delivered?",
    a: "In sealed, eco-friendly glass bottles, every morning, within hours of milking.",
  },
  {
    q: "When is paneer available?",
    a: "Paneer is available only on weekends. Orders placed on other days are delivered on the next available weekend.",
  },
  {
    q: "How are the cows raised?",
    a: "They graze freely using rotational grazing. Their fodder is grown with compost from our own cow dung, and the farm runs on solar power with rainwater harvesting.",
  },
  {
    q: "How much does a subscription cost?",
    a: "Milk subscriptions start from ₹252 a month. Ghee ranges from ₹80 to ₹1,910 and paneer from ₹80 to ₹200, depending on size.",
  },
];
