const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/productModel');
const connectDB = require('./config/db');

dotenv.config();

const sampleProducts = [
  // ---------------- TRENDING SECTION ----------------
  {
    name: 'Active Noise-Cancelling Wireless Headphones',
    price: 129.99,
    description: 'Immersive spatial audio with 40h battery life and sleek ergonomic cushion design.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
    category: 'Trending',
    rating: 4.9,
    numReviews: 128,
    countInStock: 15
  },
  {
    name: 'Smart OLED Fitness & Wellness Tracker',
    price: 69.99,
    description: 'Real-time heart rate monitoring, sleep analysis, and water resistance up to 50m.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
    category: 'Trending',
    rating: 4.8,
    numReviews: 95,
    countInStock: 20
  },
  {
    name: 'Minimalist Leather Smartwatch',
    price: 149.00,
    description: 'Premium Italian leather strap with touch display and wireless charging dock.',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600',
    category: 'Trending',
    rating: 4.7,
    numReviews: 64,
    countInStock: 8
  },

  // ---------------- COSMETICS & BEAUTY SECTION ----------------
  {
    name: 'Velvet Matte Liquid Lipstick Trio Set',
    price: 28.99,
    description: 'Long-lasting 24h waterproof formula in nude, rose, and classic crimson shades.',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600',
    category: 'Cosmetics',
    rating: 4.9,
    numReviews: 210,
    countInStock: 30
  },
  {
    name: 'Botanical Hyaluronic Glow Facial Serum',
    price: 38.50,
    description: 'Organic vitamin C & rosehip infusion for intense hydration and radiant skin.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600',
    category: 'Cosmetics',
    rating: 4.9,
    numReviews: 175,
    countInStock: 18
  },
  {
    name: 'Rose Gold Shimmer Eyeshadow Palette',
    price: 32.00,
    description: '16 high-pigment matte and metallic shades for versatile day & night looks.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600',
    category: 'Cosmetics',
    rating: 4.8,
    numReviews: 88,
    countInStock: 25
  },
  {
    name: 'Luminous Silk Hydrating Foundation',
    price: 42.00,
    description: 'Lightweight buildable medium coverage foundation with SPF 20 protection.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600',
    category: 'Cosmetics',
    rating: 4.7,
    numReviews: 140,
    countInStock: 14
  },

  // ---------------- GIRLS SECTION (Dresses & Outfits) ----------------
  {
    name: 'Girls Floral Summer Chiffon Dress',
    price: 44.99,
    description: 'Beautiful tier-layered floral party dress with lightweight breathable cotton lining.',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600',
    category: 'Girls',
    rating: 4.9,
    numReviews: 54,
    countInStock: 12
  },
  {
    name: 'Girls Vintage Denim Jacket & Tutu Dress',
    price: 49.99,
    description: 'Stylish washed denim jacket paired with a soft tulle princess skirt.',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600',
    category: 'Girls',
    rating: 4.8,
    numReviews: 76,
    countInStock: 15
  },
  {
    name: 'Girls Pastel Rainbow Party Gown',
    price: 54.00,
    description: 'Enchanting sleeveless formal gown with satin ribbon waist accent.',
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600',
    category: 'Girls',
    rating: 5.0,
    numReviews: 42,
    countInStock: 10
  },
  {
    name: 'Girls Soft Knit Cardigan & Skirt Set',
    price: 36.50,
    description: 'Cozy two-piece winter outfit made from ultra-soft hypoallergenic yarn.',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600',
    category: 'Girls',
    rating: 4.7,
    numReviews: 31,
    countInStock: 16
  },

  // ---------------- BOYS SECTION (Clothing & Outerwear) ----------------
  {
    name: 'Boys Classic Cotton Flannel Checkered Shirt',
    price: 29.99,
    description: '100% combed cotton button-down shirt designed for everyday comfort.',
    image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600',
    category: 'Boys',
    rating: 4.8,
    numReviews: 62,
    countInStock: 22
  },
  {
    name: 'Boys Streetwear Fleece Graphic Hoodie',
    price: 34.99,
    description: 'Warm fleece-lined hooded sweatshirt featuring modern urban chest graphic.',
    image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600',
    category: 'Boys',
    rating: 4.9,
    numReviews: 89,
    countInStock: 19
  },
  {
    name: 'Boys Smart Formal Tuxedo Suit Set',
    price: 69.99,
    description: 'Tailored 3-piece tuxedo set with blazer, vest, and matching trousers for events.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600',
    category: 'Boys',
    rating: 4.9,
    numReviews: 48,
    countInStock: 8
  },
  {
    name: 'Boys Urban Cargo Denim Jeans',
    price: 32.00,
    description: 'Durable stretch denim pants with multi-pocket utility styling.',
    image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=600',
    category: 'Boys',
    rating: 4.7,
    numReviews: 50,
    countInStock: 14
  },

  // ---------------- OFFERS & DISCOUNTS SECTION ----------------
  {
    name: 'Classic Velvet Evening Gown (20% OFF)',
    price: 88.00,
    description: 'Luxurious royal blue velvet gown ideal for special celebrations.',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600',
    category: 'Offers',
    rating: 4.9,
    numReviews: 110,
    countInStock: 7
  },
  {
    name: 'Designer Sunglasses & Case Bundle',
    price: 39.99,
    description: 'UV400 polarized lenses with hard shell protective travel case.',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600',
    category: 'Offers',
    rating: 4.6,
    numReviews: 73,
    countInStock: 25
  }
];

const seedData = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(sampleProducts);
    console.log('✅ Database successfully populated with Trending, Cosmetics, Girls, Boys, and Offers collections!');
    process.exit();
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedData();