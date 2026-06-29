const fs = require('fs');

let content = fs.readFileSync('src/data/menu.ts', 'utf8');

const categoryDescriptions = {
  'Coffee': 'Rich, aromatic brews crafted to awaken your senses.',
  'Shakes': 'Creamy, thick, and indulgently sweet blended perfection.',
  'Mojito & Iced Tea': 'Refreshingly crisp and perfectly chilled thirst quenchers.',
  'Wraps': 'Fresh ingredients tightly rolled in a soft, warm tortilla.',
  'Noodles': 'Wok-tossed strands of joy with savory Asian flavors.',
  'Chilli Items': 'Fiery, crispy bites tossed in a tantalizing spicy glaze.',
  'Fried Rice': 'Fluffy grains wok-fried to smoky, savory perfection.',
  'Momos': 'Delicate steamed parcels filled with juicy, flavorful goodness.',
  'Sides & More': 'Crispy, golden bites perfect for snacking or sharing.',
  'Sandwich': 'Generously stuffed and perfectly grilled between artisan bread.',
  'Burger': 'Juicy, stacked, and bursting with flavor in every bite.',
  'Pasta': 'Al dente perfection coated in rich, comforting sauces.',
  'Toast Time': 'Crispy, buttery, and loaded with savory toppings.',
  'Pizza': 'Hot, cheesy goodness on a perfectly baked crust.',
  'Salad': 'Crisp, fresh greens tossed in light and zesty dressings.',
  'Desserts': 'Decadent, sweet treats to perfectly end your meal.'
};

content = content.replace(/\{ id: '(.*?)', name: '(.*?)', category: '(.*?)', group: '(.*?)', price: (.*?), description: '(.*?)', image: '(.*?)', isVeg: (.*?) \}/g, (match, id, name, category, group, price, oldDesc, image, isVeg) => {
  let itemAppeal = '';
  // Give specific appetite appeal descriptions based on item keywords
  const lName = name.toLowerCase();
  if (lName.includes('brownie')) itemAppeal = 'Warm, gooey, and bursting with rich chocolate fudge.';
  else if (lName.includes('mojito')) itemAppeal = 'A refreshing burst of mint and citrus perfectly muddled.';
  else if (lName.includes('burger')) itemAppeal = 'Juicy patty layered with fresh veggies and toasted buns.';
  else if (lName.includes('pizza')) itemAppeal = 'Crispy crust topped with gooey cheese and fresh ingredients.';
  else if (lName.includes('noodles')) itemAppeal = 'Wok-tossed to perfection with a savory, smoky aroma.';
  else if (lName.includes('momos')) itemAppeal = 'Soft, delicate dumplings packed with flavorful fillings.';
  else if (lName.includes('fries') || lName.includes('potato')) itemAppeal = 'Golden, crispy, and perfectly seasoned for every bite.';
  else if (lName.includes('shake')) itemAppeal = 'A creamy, velvety delight that is impossibly thick.';
  else if (lName.includes('coffee')) itemAppeal = 'A smooth, aromatic brew to perfectly energize your day.';
  else itemAppeal = categoryDescriptions[category] || 'A masterfully prepared delicacy to satisfy your cravings.';

  return `{ id: '${id}', name: '${name}', category: '${category}', group: '${group}', price: ${price}, description: '${itemAppeal.replace(/'/g, "\\'")}', image: '${image}', isVeg: ${isVeg} }`;
});

fs.writeFileSync('src/data/menu.ts', content);
