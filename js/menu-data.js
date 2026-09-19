/* =============================================================================
   Punjab Ki Rasoi — menu
   -----------------------------------------------------------------------------
   One object per dish:
     name      dish name
     desc      one short line (keep under ~90 characters)
     price     number, or a string like "260 / 480" for half/full
     veg       true = veg, false = non-veg, "egg" = egg
     popular   true to show the "Popular" badge
     confirmed true when the price has been confirmed by the restaurant.
               Items WITHOUT `confirmed: true` carry indicative placeholder
               prices — replace them with the real menu prices before launch.
               Add ?review to the site URL to see these flagged on the page.
   ========================================================================== */
window.PKR_MENU = [
  {
    id: "starters", name: "Starters",
    tagline: "Small plates to open with — crisp, spiced and made to share.",
    items: [
      { name: "Samosa (2 pc)",        veg: true,  price: 40,  desc: "Crisp pastry, spiced potato and peas, served with mint and tamarind chutney." },
      { name: "Masala Papad",         veg: true,  price: 50,  desc: "Roasted papad topped with onion, tomato, coriander and chaat masala." },
      { name: "Hara Bhara Kebab",     veg: true,  price: 180, desc: "Spinach, green pea and potato patties, pan-seared till crisp at the edges." },
      { name: "Paneer Pakora",        veg: true,  price: 190, desc: "Paneer fingers in a spiced gram-flour batter, fried golden." },
      { name: "Veg Seekh Kebab",      veg: true,  price: 190, desc: "Minced vegetables and spices, pressed on the skewer and finished in the tandoor." },
      { name: "Chicken Pakora",       veg: false, price: 220, desc: "Boneless chicken in a ginger-garlic batter, crisp outside, juicy inside." },
      { name: "Dahi Kebab",           veg: true,  price: 200, desc: "Hung-curd and paneer kebabs, soft-centred with a light crust." }
    ]
  },
  {
    id: "tandoor", name: "Tandoor",
    tagline: "Marinated overnight, cooked over live coals. The section our regulars come for.",
    items: [
      { name: "Tandoori Chicken",     veg: false, price: "260 / 480", popular: true, desc: "Yoghurt, red chilli and whole-spice marinade, roasted in the clay oven. Half or full." },
      { name: "Chicken Tikka",        veg: false, price: 260, desc: "Boneless thigh in a smoky red marinade, charred on the skewer." },
      { name: "Murgh Malai Tikka",    veg: false, price: 280, desc: "Cream, cheese and cardamom marinade. Mild, rich and very tender." },
      { name: "Paneer Tikka",         veg: true,  price: 230, popular: true, desc: "Thick paneer cubes with peppers and onion, tandoor-charred, served with mint chutney." },
      { name: "Tandoori Mushroom",    veg: true,  price: 220, desc: "Button mushrooms in a spiced yoghurt marinade, finished over coals." },
      { name: "Chicken Seekh Kebab",  veg: false, price: 250, desc: "Hand-minced chicken with green chilli and coriander, grilled on the skewer." },
      { name: "Tangdi Kebab",         veg: false, price: 240, desc: "Chicken drumsticks marinated in ginger, garlic and Kashmiri chilli." },
      { name: "Afghani Chicken",      veg: false, price: 290, desc: "Creamy cashew-and-yoghurt marinade, gently smoked. Pale, soft and mild." }
    ]
  },
  {
    id: "mains", name: "North Indian Main Course",
    tagline: "Gravies built on slow-cooked onion and tomato, the dhaba way.",
    items: [
      { name: "Butter Chicken",       veg: false, price: 280, popular: true, desc: "Tandoori chicken folded into a silky tomato-butter gravy, finished with cream." },
      { name: "Chicken Curry (Dhaba Style)", veg: false, price: 240, desc: "Home-style bone-in chicken curry with whole spices and a thin, robust gravy." },
      { name: "Kadai Chicken",        veg: false, price: 270, desc: "Chicken tossed with peppers, onion and freshly pounded kadai masala." },
      { name: "Chicken Tikka Masala", veg: false, price: 290, desc: "Charred tikka pieces in a spiced onion-tomato masala." },
      { name: "Chicken Do Pyaza",     veg: false, price: 270, desc: "Chicken cooked twice over with onion — once in the gravy, once as a garnish." },
      { name: "Egg Curry",            veg: "egg", price: 160, desc: "Boiled eggs in a homely onion-tomato gravy. Good with jeera rice." },
      { name: "Egg Bhurji",           veg: "egg", price: 89,  confirmed: true, desc: "Spiced scrambled eggs with onion, tomato and green chilli. Pairs with tandoori roti." }
    ]
  },
  {
    id: "paneer", name: "Paneer Specialties",
    tagline: "Soft paneer, made fresh, in the gravies Punjab is known for.",
    items: [
      { name: "Paneer Butter Masala", veg: true, price: 240, popular: true, desc: "Paneer in a smooth, mildly sweet tomato-butter gravy with a swirl of cream." },
      { name: "Kadai Paneer",         veg: true, price: 240, desc: "Paneer with peppers and onion in a coarse, aromatic kadai masala." },
      { name: "Shahi Paneer",         veg: true, price: 250, desc: "Rich cashew-and-cream gravy, delicately spiced." },
      { name: "Palak Paneer",         veg: true, price: 230, desc: "Paneer in a smooth spinach gravy tempered with garlic." },
      { name: "Paneer Lababdar",      veg: true, price: 250, desc: "Grated and cubed paneer in a tangy onion-tomato gravy." },
      { name: "Matar Paneer",         veg: true, price: 220, desc: "Paneer and green peas in a home-style masala." },
      { name: "Paneer Bhurji",        veg: true, price: 230, desc: "Crumbled paneer stir-fried with onion, tomato and spices." }
    ]
  },
  {
    id: "dal-veg", name: "Dal & Vegetarian",
    tagline: "Slow-simmered dals and the everyday sabzis of a Punjabi kitchen.",
    items: [
      { name: "Dal Makhani",          veg: true, price: 190, popular: true, desc: "Black lentils and kidney beans simmered for hours with butter and a touch of smoke." },
      { name: "Dal Tadka",            veg: true, price: 160, desc: "Yellow lentils with a ghee tempering of cumin, garlic and dried chilli." },
      { name: "Dal Fry",              veg: true, price: 150, desc: "Comforting yellow dal cooked with onion and tomato." },
      { name: "Rajma Masala",         veg: true, price: 180, desc: "Kidney beans in a thick, spiced tomato gravy — a Punjabi staple." },
      { name: "Chole Masala",         veg: true, price: 170, desc: "Chickpeas in a dark, tangy Amritsari-style masala." },
      { name: "Chole Bhature",        veg: true, price: 120, desc: "Two puffed bhature with chole, pickle and onion. A full plate." },
      { name: "Aloo Gobi",            veg: true, price: 160, desc: "Potato and cauliflower with turmeric, cumin and ginger." },
      { name: "Mix Veg",              veg: true, price: 180, desc: "Seasonal vegetables in a light onion-tomato masala." }
    ]
  },
  {
    id: "breads", name: "Breads",
    tagline: "Pulled hot from the tandoor through the day.",
    items: [
      { name: "Tandoori Roti",        veg: true, price: 35, confirmed: true, popular: true, desc: "Whole-wheat roti baked on the wall of the tandoor. Plain or buttered." },
      { name: "Butter Roti",          veg: true, price: 40,  desc: "Tandoori roti brushed generously with butter." },
      { name: "Plain Naan",           veg: true, price: 50,  desc: "Soft leavened bread, blistered in the tandoor." },
      { name: "Butter Naan",          veg: true, price: 60,  desc: "Naan brushed with butter the moment it comes out." },
      { name: "Butter Garlic Naan",   veg: true, price: 70,  popular: true, desc: "Naan topped with garlic and coriander, brushed with butter." },
      { name: "Laccha Paratha",       veg: true, price: 60,  desc: "Layered, flaky paratha from the tandoor." },
      { name: "Amritsari Kulcha",     veg: true, price: 90,  desc: "Stuffed kulcha, crisp outside, served with chole." },
      { name: "Methi Paratha",        veg: true, price: 80,  confirmed: true, desc: "Fresh fenugreek leaves kneaded into the dough, served with curd and pickle." },
      { name: "Aloo Onion Paratha",   veg: true, price: 85,  confirmed: true, desc: "Stuffed with spiced potato and onion, served with curd and butter." },
      { name: "Onion Paratha",        veg: true, price: 70,  desc: "Stuffed with spiced onion, served with curd and pickle." },
      { name: "Paneer Paratha",       veg: true, price: 95,  confirmed: true, desc: "Stuffed with spiced paneer, served with curd and butter." }
    ]
  },
  {
    id: "rice", name: "Rice & Biryani",
    tagline: "Long-grain basmati, layered and steamed.",
    items: [
      { name: "Chicken Biryani",      veg: false, price: 220, popular: true, desc: "Basmati layered with spiced chicken, saffron and fried onion. Served with raita." },
      { name: "Egg Biryani",          veg: "egg", price: 190, desc: "Fragrant biryani rice with boiled eggs and fried onion. Served with raita." },
      { name: "Veg Biryani",          veg: true,  price: 180, desc: "Seasonal vegetables and basmati, dum-cooked. Served with raita." },
      { name: "Rajma Chawal",         veg: true,  price: 150, desc: "Rajma masala over steamed rice — the classic Punjabi lunch plate." },
      { name: "Veg Pulao",            veg: true,  price: 150, desc: "Basmati with peas, carrot and whole spices." },
      { name: "Jeera Rice",           veg: true,  price: 120, desc: "Steamed rice tossed with ghee and cumin." },
      { name: "Steamed Rice",         veg: true,  price: 90,  desc: "Plain basmati." }
    ]
  },
  {
    id: "chinese", name: "Chinese",
    tagline: "Indo-Chinese favourites from the wok.",
    items: [
      { name: "Chilli Chicken",       veg: false, price: 240, desc: "Crisp chicken tossed with green chilli, capsicum and soy. Dry or gravy." },
      { name: "Chilli Paneer",        veg: true,  price: 220, desc: "Crisp paneer with capsicum and onion in a hot-sweet sauce. Dry or gravy." },
      { name: "Gobi Manchurian",      veg: true,  price: 170, desc: "Cauliflower florets in a tangy Manchurian sauce." },
      { name: "Veg Manchurian",       veg: true,  price: 170, desc: "Vegetable dumplings in a garlic-soy gravy." },
      { name: "Chicken Fried Rice",   veg: false, price: 190, desc: "Wok-tossed rice with chicken, egg and spring onion." },
      { name: "Veg Fried Rice",       veg: true,  price: 150, desc: "Wok-tossed rice with mixed vegetables." },
      { name: "Schezwan Fried Rice",  veg: true,  price: 170, desc: "Fried rice with a fiery Schezwan sauce." },
      { name: "Chicken Hakka Noodles",veg: false, price: 190, desc: "Stir-fried noodles with chicken and vegetables." },
      { name: "Veg Hakka Noodles",    veg: true,  price: 150, desc: "Stir-fried noodles with cabbage, carrot and capsicum." }
    ]
  },
  {
    id: "beverages", name: "Beverages",
    tagline: "Cold, sweet and salty — to cut through the spice.",
    items: [
      { name: "Sweet Lassi",          veg: true, price: 60, popular: true, desc: "Thick, chilled yoghurt drink." },
      { name: "Salted Lassi",         veg: true, price: 50, desc: "Yoghurt drink with roasted cumin and salt." },
      { name: "Buttermilk (Chaas)",   veg: true, price: 40, desc: "Spiced, thin buttermilk with coriander and ginger." },
      { name: "Masala Coke",          veg: true, price: 60, desc: "Cola with lime, chaat masala and mint." },
      { name: "Fresh Lime Soda",      veg: true, price: 50, desc: "Sweet, salted or mixed." },
      { name: "Masala Chai",          veg: true, price: 25, desc: "Strong tea brewed with milk, ginger and cardamom." },
      { name: "Soft Drinks",          veg: true, price: 40, desc: "Assorted." },
      { name: "Mineral Water",        veg: true, price: 20, desc: "1 litre." }
    ]
  }
];
