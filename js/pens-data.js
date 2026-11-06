
const PENS_DATA = [
  {
    "id": 1, "brand": "Aurora", "name": "88 Black", "fullName": "Aurora 88 Black",
    "nib": "Medium", "material": "Resin", "fill": "Piston", "price": 395,
    "priceDisplay": "$395", "rating": 4.8, "featured": true,
    "description": "The Aurora 88 Black is a timeless Italian masterpiece featuring a sleek black resin body with gold-plated trim. Its piston-fill mechanism holds generous ink capacity, perfect for extended writing sessions.",
    "color": "#1a1a1a",
    "image": "images/aurora 88 black.jpg"
  },
  {
    "id": 2, "brand": "Aurora", "name": "Optima Green", "fullName": "Aurora Optima Green",
    "nib": "Fine", "material": "Celluloid", "fill": "Piston", "price": 510,
    "priceDisplay": "$510", "rating": 4.9, "featured": false,
    "description": "A stunning celluloid body in vibrant green with Aurora's signature independent filling system. The Optima Green represents Italian craftsmanship at its finest.",
    "color": "#2d6a4f",
    "image": "images/Aurora Optima Green.jpg"
  },
  {
    "id": 3, "brand": "Aurora", "name": "Talentum Blue", "fullName": "Aurora Talentum Blue",
    "nib": "Broad", "material": "Resin", "fill": "Cartridge/Converter", "price": 185,
    "priceDisplay": "$185", "rating": 4.5, "featured": false,
    "description": "The Aurora Talentum Blue offers professional elegance with a comfortable ergonomic design. Its broad nib lays down expressive, generous lines.",
    "color": "#1d3557",
    "image": "images/Aurora Talentum Blue.jpg"
  },
  {
    "id": 4, "brand": "Cross", "name": "Century II Black", "fullName": "Cross Century II Black",
    "nib": "Medium", "material": "Lacquer/Chrome", "fill": "Cartridge/Converter", "price": 75,
    "priceDisplay": "$75", "rating": 4.3, "featured": false,
    "description": "The Cross Century II is an American classic with gleaming chrome trim and a rich black lacquer body. Smooth, reliable, and elegant — perfect for everyday use.",
    "color": "#212121",
    "image": "images/Cross Century II Black.jpg"
  },
  {
    "id": 5, "brand": "Cross", "name": "Townsend Gold", "fullName": "Cross Townsend Gold",
    "nib": "Fine", "material": "Gold-filled", "fill": "Cartridge/Converter", "price": 175,
    "priceDisplay": "$175", "rating": 4.6, "featured": false,
    "description": "The Cross Townsend Gold exudes executive prestige with its gold-filled body and precision-engineered fine nib. A statement piece for the discerning professional.",
    "color": "#b8860b",
    "image": "images/Cross Townsend Gold.jpg"
  },
  {
    "id": 6, "brand": "LAMY", "name": "Safari Charcoal", "fullName": "LAMY Safari Charcoal",
    "nib": "Medium", "material": "ABS Plastic", "fill": "Cartridge/Converter", "price": 32,
    "priceDisplay": "$32", "rating": 4.7, "featured": false,
    "description": "The LAMY Safari Charcoal is the quintessential entry-level fountain pen with German engineering precision. Its ergonomic grip and durable ABS body make it perfect for daily writing.",
    "color": "#3d3d3d",
    "image": "images/LAMY Safari Charcoal.jpg"
  },
  {
    "id": 7, "brand": "LAMY", "name": "2000 Brushed Steel", "fullName": "LAMY 2000 Brushed Steel",
    "nib": "Fine", "material": "Makrolon/Steel", "fill": "Piston", "price": 185,
    "priceDisplay": "$185", "rating": 4.8, "featured": true,
    "description": "The LAMY 2000 is a Bauhaus design icon — unchanged since 1966. Brushed stainless steel and Makrolon create an understated but supremely functional piston filler.",
    "color": "#808080",
    "image": "images/lamy 200 brushed steel.jpeg"
  },
  {
    "id": 8, "brand": "LAMY", "name": "Al-Star Ocean Blue", "fullName": "LAMY Al-Star Ocean Blue",
    "nib": "Extra Fine", "material": "Aluminium", "fill": "Cartridge/Converter", "price": 42,
    "priceDisplay": "$42", "rating": 4.6, "featured": false,
    "description": "The LAMY Al-Star in Ocean Blue brings together lightweight aluminium construction with a pop of vibrant color. An extra-fine nib for precise, elegant script.",
    "color": "#006994",
    "image": "images/LAMY Al-Star Ocean Blue.jpg"
  },
  {
    "id": 9, "brand": "Montblanc", "name": "Meisterstuck 149", "fullName": "Montblanc Meisterstuck 149",
    "nib": "Medium", "material": "Precious Resin", "fill": "Piston", "price": 1050,
    "priceDisplay": "$1,050", "rating": 5.0, "featured": true,
    "description": "The Montblanc Meisterstuck 149 is the pinnacle of luxury writing. Its precious black resin body, gold-plated trim, and 18k gold nib represent over a century of German craftsmanship.",
    "color": "#0d0d0d",
    "image": "images/meisterstuck 149.webp"
  },
  {
    "id": 10, "brand": "Montblanc", "name": "StarWalker Midnight Black", "fullName": "Montblanc StarWalker Midnight Black",
    "nib": "Fine", "material": "Precious Resin", "fill": "Cartridge/Converter", "price": 695,
    "priceDisplay": "$695", "rating": 4.9, "featured": false,
    "description": "The StarWalker Midnight Black features a sleek modern design inspired by space exploration. A floating Montblanc emblem in the transparent cap top makes it unmistakably iconic.",
    "color": "#0a0a2e",
    "image": "images/StarWalker Midnight Black.jpg"
  },
  {
    "id": 11, "brand": "Montblanc", "name": "Boheme Blue Hours", "fullName": "Montblanc Boheme Blue Hours",
    "nib": "Medium", "material": "Precious Resin/PVD", "fill": "Cartridge", "price": 880,
    "priceDisplay": "$880", "rating": 4.9, "featured": false,
    "description": "The Boheme Blue Hours captures the magic of twilight in deep blue precious resin with PVD coated trim. A jewel-like retractable nib mechanism distinguishes this extraordinary pen.",
    "color": "#191970",
    "image": "images/Boheme Blue Hours.jpg"
  },
  {
    "id": 12, "brand": "Parker", "name": "Parker 51 Black", "fullName": "Parker 51 Black",
    "nib": "Medium", "material": "Resin/Metal", "fill": "Cartridge/Converter", "price": 145,
    "priceDisplay": "$145", "rating": 4.7, "featured": false,
    "description": "The Parker 51 was once called the world's most wanted pen. This modern revival captures the iconic hooded nib design with a sleek black resin body and gold-tone trim.",
    "color": "#1c1c1c",
    "image": "images/Parker 51 Black.jpg"
  },
  {
    "id": 13, "brand": "Parker", "name": "Sonnet Silver", "fullName": "Parker Sonnet Silver",
    "nib": "Fine", "material": "Lacquer/Steel", "fill": "Cartridge/Converter", "price": 110,
    "priceDisplay": "$110", "rating": 4.5, "featured": false,
    "description": "The Parker Sonnet Silver is a distinguished writing instrument with a polished silver lacquer finish. Its fine stainless steel nib provides smooth, controlled writing.",
    "color": "#c0c0c0",
    "image": "images/Parker Sonnet Silver.jpg"
  },
  {
    "id": 14, "brand": "Parker", "name": "Duofold Centennial Burgundy", "fullName": "Parker Duofold Centennial Burgundy",
    "nib": "Broad", "material": "Precious Resin", "fill": "Cartridge/Converter", "price": 395,
    "priceDisplay": "$395", "rating": 4.8, "featured": false,
    "description": "The Duofold Centennial Burgundy is Parker's masterpiece in rich, lustrous precious resin. A bold broad nib and twin-banded gold trim make this a collector's treasure.",
    "color": "#6d1728",
    "image": "images/Duofold Centennial Burgundy.jpg"
  },
  {
    "id": 15, "brand": "Pelikan", "name": "Souveran M800 Black-Green", "fullName": "Pelikan Souveran M800 Black-Green",
    "nib": "Medium", "material": "Resin", "fill": "Piston", "price": 465,
    "priceDisplay": "$465", "rating": 4.9, "featured": true,
    "description": "The Pelikan Souveran M800 Black-Green is a German engineering marvel with its distinctive striped body. The dual-tone gold nib and piston mechanism make it a joy to use.",
    "color": "#1b4332",
    "image": "images/Souveran M800 Black-Green.jpg"
  },
  {
    "id": 16, "brand": "Pelikan", "name": "Souveran M600 Blue Striped", "fullName": "Pelikan Souveran M600 Blue Striped",
    "nib": "Fine", "material": "Resin", "fill": "Piston", "price": 310,
    "priceDisplay": "$310", "rating": 4.8, "featured": false,
    "description": "The Souveran M600 Blue Striped features Pelikan's signature striped design in ocean blue. A gold nib and piston fill system deliver reliable, smooth ink flow.",
    "color": "#003f7f",
    "image": "images/Souveran M600 Blue Striped.jpg"
  },
  {
    "id": 17, "brand": "Pelikan", "name": "Classic M205 Demonstrator", "fullName": "Pelikan Classic M205 Demonstrator",
    "nib": "Extra Fine", "material": "Transparent Resin", "fill": "Piston", "price": 95,
    "priceDisplay": "$95", "rating": 4.6, "featured": false,
    "description": "The Pelikan M205 Demonstrator lets you see the ink supply through its transparent resin body. A wonderful pen for those who love the art of the piston mechanism.",
    "color": "#87ceeb",
    "image": "images/Classic M205 Demonstrator.jpg"
  },
  {
    "id": 18, "brand": "Pilot", "name": "Custom 823 Smoke", "fullName": "Pilot Custom 823 Smoke",
    "nib": "Medium", "material": "Resin", "fill": "Vacuum", "price": 345,
    "priceDisplay": "$345", "rating": 4.9, "featured": true,
    "description": "The Pilot Custom 823 Smoke is one of Japan's finest writing instruments. Its transparent smoke resin body reveals the vacuum filling mechanism — an engineering marvel in your hand.",
    "color": "#4a4a4a",
    "image": "images/Custom 823 Smoke.jpg"
  },
  {
    "id": 19, "brand": "Pilot", "name": "Metropolitan Retro Pop", "fullName": "Pilot Metropolitan Retro Pop",
    "nib": "Medium", "material": "Metal", "fill": "Cartridge/Converter", "price": 22,
    "priceDisplay": "$22", "rating": 4.5, "featured": false,
    "description": "The Pilot Metropolitan Retro Pop offers premium metal construction at an unbeatable price. Its animal print pattern adds a fun, retro flair to everyday writing.",
    "color": "#5c4033",
    "image": "images/Metropolitan Retro Pop.jpg"
  },
  {
    "id": 20, "brand": "Pilot", "name": "Vanishing Point Black", "fullName": "Pilot Vanishing Point Black",
    "nib": "Fine", "material": "Resin/Rhodium", "fill": "Cartridge/Converter", "price": 235,
    "priceDisplay": "$235", "rating": 4.8, "featured": false,
    "description": "The Pilot Vanishing Point Black features a revolutionary retractable nib mechanism. Rhodium-plated trim and black resin create a sleek, professional instrument ready in an instant.",
    "color": "#0d0d0d",
    "image": "images/Vanishing Point Black.jpg"
  },
  {
    "id": 21, "brand": "Platinum", "name": "#3776 Century Chartres Blue", "fullName": "Platinum #3776 Century Chartres Blue",
    "nib": "Medium", "material": "Resin", "fill": "Cartridge/Converter", "price": 145,
    "priceDisplay": "$145", "rating": 4.7, "featured": false,
    "description": "Named after Mount Fuji's iconic height, the Platinum #3776 Century in Chartres Blue features the unique slip-and-seal cap mechanism to prevent ink evaporation for years.",
    "color": "#003399",
    "image": "images/Century Chartres Blue.jpg"
  },
  {
    "id": 22, "brand": "Platinum", "name": "Preppy Crystal", "fullName": "Platinum Preppy Crystal",
    "nib": "Extra Fine", "material": "Clear Plastic", "fill": "Cartridge", "price": 8,
    "priceDisplay": "$8", "rating": 4.4, "featured": false,
    "description": "The Platinum Preppy Crystal is the legendary gateway pen for fountain pen enthusiasts. Surprisingly smooth extra-fine nib at an unbeatable price point.",
    "color": "#e8f4f8",
    "image": "images/Preppy Crystal.jpg"
  },
  {
    "id": 23, "brand": "Sailor", "name": "1911 Large Black", "fullName": "Sailor 1911 Large Black",
    "nib": "Medium", "material": "Resin", "fill": "Cartridge/Converter", "price": 220,
    "priceDisplay": "$220", "rating": 4.8, "featured": false,
    "description": "The Sailor 1911 Large Black is a Japanese treasure with a classic cigar-shaped body and Sailor's renowned 21k gold nib. Smooth, reliable, and timelessly elegant.",
    "color": "#0d0d0d",
    "image": "images/1911 Large Black.jpg"
  },
  {
    "id": 24, "brand": "Sailor", "name": "Pro Gear Slim Green", "fullName": "Sailor Pro Gear Slim Green",
    "nib": "Fine", "material": "Resin", "fill": "Cartridge/Converter", "price": 185,
    "priceDisplay": "$185", "rating": 4.7, "featured": false,
    "description": "The Sailor Pro Gear Slim Green offers the same legendary Sailor quality in a slimmer profile. Deep forest green resin with gold trim creates a stunning combination.",
    "color": "#2d6a4f",
    "image": "images/Pro Gear Slim Green.jpg"
  },
  {
    "id": 25, "brand": "Sheaffer", "name": "Legacy Heritage Black", "fullName": "Sheaffer Legacy Heritage Black",
    "nib": "Medium", "material": "Resin/PVD", "fill": "Cartridge/Converter", "price": 155,
    "priceDisplay": "$155", "rating": 4.5, "featured": false,
    "description": "The Sheaffer Legacy Heritage Black combines American pen-making tradition with modern design. PVD trim against black resin creates a sophisticated, understated aesthetic.",
    "color": "#1a1a1a",
    "image": "images/Legacy Heritage Black.jpg"
  },
  {
    "id": 26, "brand": "Sheaffer", "name": "300 Matte Black", "fullName": "Sheaffer 300 Matte Black",
    "nib": "Fine", "material": "Resin/Chrome", "fill": "Cartridge/Converter", "price": 55,
    "priceDisplay": "$55", "rating": 4.3, "featured": false,
    "description": "The Sheaffer 300 Matte Black offers professional style at an accessible price. Chrome trim against matte black resin creates a bold, contemporary look.",
    "color": "#222222",
    "image": "images/300 Matte Black.jpg"
  },
  {
    "id": 27, "brand": "Visconti", "name": "Homo Sapiens Bronze Age", "fullName": "Visconti Homo Sapiens Bronze Age",
    "nib": "Medium", "material": "Basaltic Lava", "fill": "Vacuum", "price": 495,
    "priceDisplay": "$495", "rating": 4.9, "featured": true,
    "description": "The Visconti Homo Sapiens Bronze Age is crafted from volcanic basaltic lava — one of the most unique pen materials in the world. Bronze trim and a Dreamtouch nib make it extraordinary.",
    "color": "#7d5a3c",
    "image": "images/Homo Sapiens Bronze Age.jpg"
  },
  {
    "id": 28, "brand": "Visconti", "name": "Van Gogh Blue Iris", "fullName": "Visconti Van Gogh Blue Iris",
    "nib": "Fine", "material": "Resin", "fill": "Cartridge/Converter", "price": 110,
    "priceDisplay": "$110", "rating": 4.6, "featured": false,
    "description": "Inspired by Van Gogh's masterpiece, the Visconti Van Gogh Blue Iris captures swirling blue patterns in resin. Art meets writing in this Italian-designed collector's piece.",
    "color": "#4169e1",
    "image": "images/Van Gogh Blue Iris.jpg"
  },
  {
    "id": 29, "brand": "Waterman", "name": "Carene Black Sea", "fullName": "Waterman Carene Black Sea",
    "nib": "Medium", "material": "Lacquer/PVD", "fill": "Cartridge/Converter", "price": 175,
    "priceDisplay": "$175", "rating": 4.7, "featured": false,
    "description": "The Waterman Carene Black Sea features a sleek, hydrodynamic design in deep black lacquer with PVD trim. Its 23k gold nib delivers the famous Waterman smooth writing experience.",
    "color": "#0a0a2e",
    "image": "images/Carene Black Sea.jpg"
  },
  {
    "id": 30, "brand": "Waterman", "name": "Expert Metallic Blue", "fullName": "Waterman Expert Metallic Blue",
    "nib": "Fine", "material": "Metal/Lacquer", "fill": "Cartridge/Converter", "price": 65,
    "priceDisplay": "$65", "rating": 4.4, "featured": false,
    "description": "The Waterman Expert Metallic Blue brings French elegance to an accessible price point. Its metallic blue finish catches the light beautifully, and the stainless steel nib writes smoothly.",
    "color": "#1e5fa0",
    "image": "images/Expert Metallic Blue.jpg"
  }
];
