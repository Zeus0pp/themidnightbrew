import { MenuItem, Review } from '../types';

export const CATEGORIES = [
  { id: 'Coffee', name: 'Coffee', icon: 'Coffee', group: 'beverages' },
  { id: 'Shakes', name: 'Shakes', icon: 'CupSoda', group: 'beverages' },
  { id: 'Mojito & Iced Tea', name: 'Mojito & Iced Tea', icon: 'GlassWater', group: 'beverages' },
  { id: 'Wraps', name: 'Wraps', icon: 'Utensils', group: 'bites' },
  { id: 'Sandwich', name: 'Sandwich', icon: 'Sandwich', group: 'bites' },
  { id: 'Burger', name: 'Burger', icon: 'Sandwich', group: 'bites' },
  { id: 'Toast Time', name: 'Toast Time', icon: 'Utensils', group: 'bites' },
  { id: 'Sides & More', name: 'Sides & More', icon: 'Flame', group: 'bites' },
  { id: 'Momos', name: 'Momos', icon: 'Utensils', group: 'bites' },
  { id: 'Noodles', name: 'Noodles', icon: 'Soup', group: 'mains' },
  { id: 'Fried Rice', name: 'Fried Rice', icon: 'CookingPot', group: 'mains' },
  { id: 'Pasta', name: 'Pasta', icon: 'Utensils', group: 'mains' },
  { id: 'Pizza', name: 'Pizza', icon: 'Utensils', group: 'mains' },
  { id: 'Chilli Items', name: 'Chilli Items', icon: 'Sparkles', group: 'mains' },
  { id: 'Salad', name: 'Salad', icon: 'Utensils', group: 'mains' },
  { id: 'Desserts', name: 'Desserts', icon: 'Cake', group: 'desserts' }
] as const;

export const MENU_ITEMS: MenuItem[] = [
  { id: 'm1', name: 'Cold Coffee', category: 'Coffee', group: 'beverages', price: 79, description: 'A classic blend of chilled milk and rich espresso.', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80', isVeg: true, isBestseller: true },
  { id: 'm2', name: 'Chocolate Cold Coffee', category: 'Coffee', group: 'beverages', price: 89, description: 'Cold coffee blended with rich chocolate syrup.', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm3', name: 'Hazelnut Cold Coffee', category: 'Coffee', group: 'beverages', price: 99, description: 'Chilled coffee infused with smooth hazelnut flavor.', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm4', name: 'Irish Cold Coffee', category: 'Coffee', group: 'beverages', price: 109, description: 'Cold coffee with a distinct, creamy Irish flavor profile.', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm5', name: 'Caramel Cold Coffee', category: 'Coffee', group: 'beverages', price: 119, description: 'Chilled coffee sweetened with buttery caramel syrup.', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80', isVeg: true, isChefOriginal: true },
  
  { id: 'm6', name: 'Strawberry', category: 'Shakes', group: 'beverages', price: 99, description: 'A creamy and refreshing strawberry blended shake.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75bb8fc?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm7', name: 'Mango', category: 'Shakes', group: 'beverages', price: 99, description: 'A thick and fruity shake made with sweet mangoes.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75bb8fc?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm8', name: 'Pineapple', category: 'Shakes', group: 'beverages', price: 99, description: 'A smooth shake with a tangy and tropical pineapple flavor.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75bb8fc?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm9', name: 'Blueberry', category: 'Shakes', group: 'beverages', price: 99, description: 'A rich and creamy shake blended with sweet blueberries.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75bb8fc?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm10', name: 'Vanilla', category: 'Shakes', group: 'beverages', price: 99, description: 'A classic, smooth shake made with real vanilla bean.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75bb8fc?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm11', name: 'Black Currant', category: 'Shakes', group: 'beverages', price: 99, description: 'A sweet and tangy shake with rich black currant flavor.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75bb8fc?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm12', name: 'Butterscotch', category: 'Shakes', group: 'beverages', price: 99, description: 'A creamy shake with sweet, caramelized butterscotch notes.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75bb8fc?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm13', name: 'Oreo Shake', category: 'Shakes', group: 'beverages', price: 119, description: 'A thick shake blended with crushed Oreo cookies.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75bb8fc?auto=format&fit=crop&w=800&q=80', isVeg: true, isBestseller: true },
  { id: 'm14', name: 'Kitkat Shake', category: 'Shakes', group: 'beverages', price: 119, description: 'A creamy chocolate shake mixed with crispy KitKat pieces.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75bb8fc?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm15', name: 'Brownie Shake', category: 'Shakes', group: 'beverages', price: 129, description: 'A rich shake blended with soft, chocolate fudge brownie chunks.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75bb8fc?auto=format&fit=crop&w=800&q=80', isVeg: true, isChefOriginal: true },
  
  { id: 'm16', name: 'Virgin Mojito', category: 'Mojito & Iced Tea', group: 'beverages', price: 79, description: 'A refreshing blend of mint, lime, and sparkling soda.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm17', name: 'Lemon Iced Tea', category: 'Mojito & Iced Tea', group: 'beverages', price: 79, description: 'Chilled black tea with a refreshing squeeze of lemon.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm18', name: 'Lemonade (Sweet/Salty/Masala)', category: 'Mojito & Iced Tea', group: 'beverages', price: 79, description: 'Classic lemonade, customized to your preferred taste.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm19', name: 'Peach Iced Tea', category: 'Mojito & Iced Tea', group: 'beverages', price: 99, description: 'Smooth iced tea infused with sweet peach flavor.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80', isVeg: true, isBestseller: true },
  { id: 'm20', name: 'Strawberry Mojito', category: 'Mojito & Iced Tea', group: 'beverages', price: 99, description: 'A crisp mojito mixed with sweet strawberry flavors.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm21', name: 'Watermelon Mojito', category: 'Mojito & Iced Tea', group: 'beverages', price: 99, description: 'A refreshing mojito blended with fresh watermelon notes.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm22', name: 'Blueberry Mojito', category: 'Mojito & Iced Tea', group: 'beverages', price: 99, description: 'A classic mint mojito infused with sweet blueberries.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm23', name: 'Spicy Mango Mojito', category: 'Mojito & Iced Tea', group: 'beverages', price: 99, description: 'A tropical mango mojito with a hint of warming spice.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm24', name: 'Green Apple Mojito', category: 'Mojito & Iced Tea', group: 'beverages', price: 99, description: 'A crisp and tart mojito made with green apple flavor.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm25', name: 'Blue Lagoon', category: 'Mojito & Iced Tea', group: 'beverages', price: 99, description: 'A refreshing and vibrant citrus-flavored sparkling cooler.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80', isVeg: true, isChefOriginal: true },
  
  { id: 'm26', name: 'Veg Patty Wrap', category: 'Wraps', group: 'bites', price: 129, description: 'A crispy vegetable patty wrapped in a soft, warm tortilla.', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm27', name: 'Mexican Wrap', category: 'Wraps', group: 'bites', price: 139, description: 'A flavorful wrap filled with spiced beans and fresh vegetables.', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm28', name: 'Paneer Wrap', category: 'Wraps', group: 'bites', price: 149, description: 'A soft wrap filled with spiced cottage cheese and fresh greens.', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80', isVeg: true },
  
  { id: 'm29', name: 'Veg Noodles', category: 'Noodles', group: 'mains', price: 129, description: 'Stir-fried noodles tossed with a mix of fresh vegetables.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm30', name: 'Chilli Garlic Noodles', category: 'Noodles', group: 'mains', price: 149, description: 'Savory noodles wok-tossed with a spicy garlic sauce.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm31', name: 'Singapore Noodles', category: 'Noodles', group: 'mains', price: 159, description: 'Curry-flavored stir-fried noodles with mixed vegetables.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm32', name: 'Hakka Noodles', category: 'Noodles', group: 'mains', price: 169, description: 'Classic smoky stir-fried noodles with crunchy vegetables.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80', isVeg: true },
  
  { id: 'm33', name: 'Chilli Potato', category: 'Chilli Items', group: 'mains', price: 129, description: 'Crispy potato wedges coated in a sweet and spicy sauce.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm34', name: 'Chilli Paneer', category: 'Chilli Items', group: 'mains', price: 149, description: 'Cottage cheese cubes tossed in a spicy and tangy sauce.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm35', name: 'Honey Chilli Potato', category: 'Chilli Items', group: 'mains', price: 149, description: 'Crispy potatoes glazed with sweet honey and spicy chili.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm36', name: 'Chilli Mushroom', category: 'Chilli Items', group: 'mains', price: 159, description: 'Fried mushrooms wok-tossed in a savory, spicy glaze.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80', isVeg: true },
  
  { id: 'm37', name: 'Veg Fried Rice', category: 'Fried Rice', group: 'mains', price: 129, description: 'Fluffy rice stir-fried with finely chopped fresh vegetables.', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm38', name: 'Paneer Fried Rice', category: 'Fried Rice', group: 'mains', price: 149, description: 'Savory fried rice cooked with soft cubes of cottage cheese.', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80', isVeg: true },
  
  { id: 'm39', name: 'Steam Veg Momos', category: 'Momos', group: 'bites', price: 89, description: 'Steamed dumplings filled with finely minced mixed vegetables.', image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm40', name: 'Steam Paneer Momos', category: 'Momos', group: 'bites', price: 99, description: 'Steamed dumplings filled with seasoned cottage cheese.', image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm41', name: 'Veg Kurkure Momos', category: 'Momos', group: 'bites', price: 119, description: 'Crunchy, deep-fried dumplings with a savory vegetable filling.', image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm42', name: 'Paneer Kurkure Momos', category: 'Momos', group: 'bites', price: 129, description: 'Crispy, fried dumplings stuffed with spiced cottage cheese.', image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm43', name: 'Veg Chilli Momos', category: 'Momos', group: 'bites', price: 119, description: 'Vegetable dumplings tossed in a spicy, tangy wok sauce.', image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm44', name: 'Paneer Chilli Momos', category: 'Momos', group: 'bites', price: 129, description: 'Cottage cheese dumplings coated in a fiery chili sauce.', image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm45', name: 'Multigrain Momos (10pcs)', category: 'Momos', group: 'bites', price: 149, description: 'Nutritious multigrain dumplings filled with fresh vegetables.', image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=800&q=80', isVeg: true },
  
  { id: 'm46', name: 'Salted Corn', category: 'Sides & More', group: 'bites', price: 69, description: 'Sweet corn kernels lightly seasoned with salt.', image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm47', name: 'Peri Peri Corn', category: 'Sides & More', group: 'bites', price: 79, description: 'Sweet corn tossed in a spicy and tangy peri-peri seasoning.', image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm48', name: 'Cheese Baked Corn', category: 'Sides & More', group: 'bites', price: 99, description: 'Sweet corn kernels baked with a rich cheese topping.', image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm49', name: 'Salted Fries', category: 'Sides & More', group: 'bites', price: 99, description: 'Classic, crispy french fries lightly seasoned with salt.', image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm50', name: 'Peri Peri Fries', category: 'Sides & More', group: 'bites', price: 129, description: 'Crispy french fries dusted with a spicy peri-peri seasoning.', image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=800&q=80', isVeg: true },
  
  { id: 'm51', name: 'Bombay Kaccha', category: 'Sandwich', group: 'bites', price: 89, description: 'A classic street-style sandwich with tangy, vibrant flavors.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm52', name: 'Vegetable Club', category: 'Sandwich', group: 'bites', price: 99, description: 'A layered club sandwich filled with crisp, fresh vegetables.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm53', name: 'Paneer Takatak', category: 'Sandwich', group: 'bites', price: 119, description: 'A toasted sandwich filled with spicy, flavorful paneer.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm54', name: 'Jam With Cheese', category: 'Sandwich', group: 'bites', price: 119, description: 'A simple, comforting sandwich with fruit jam and melted cheese.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm55', name: 'Cheese Corn', category: 'Sandwich', group: 'bites', price: 119, description: 'A toasted sandwich filled with sweet corn and melted cheese.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80', isVeg: true },
  
  { id: 'm56', name: 'Aloo Tikki', category: 'Burger', group: 'bites', price: 59, description: 'A soft bun filled with a crispy, spiced potato patty.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm57', name: 'Veg Burger', category: 'Burger', group: 'bites', price: 69, description: 'A classic burger with a hearty vegetable patty and fresh greens.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm58', name: 'Masala Burger', category: 'Burger', group: 'bites', price: 79, description: 'A flavorful burger featuring an Indian-spiced patty.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm59', name: 'Paneer Burger', category: 'Burger', group: 'bites', price: 109, description: 'A satisfying burger with a thick, grilled cottage cheese patty.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm60', name: 'Double Decker', category: 'Burger', group: 'bites', price: 119, description: 'A generous, two-tiered burger for a hearty appetite.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80', isVeg: true },
  
  { id: 'm61', name: 'Mixed Sauce', category: 'Pasta', group: 'mains', price: 169, description: 'Pasta tossed in a blend of rich cream and tangy tomato sauce.', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm62', name: 'Red Sauce', category: 'Pasta', group: 'mains', price: 169, description: 'Pasta served in a classic, savory tomato and herb sauce.', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm63', name: 'Pink Sauce', category: 'Pasta', group: 'mains', price: 179, description: 'Pasta coated in a creamy, tomato-infused pink sauce.', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm64', name: 'White Sauce', category: 'Pasta', group: 'mains', price: 189, description: 'Pasta tossed in a rich, creamy, and cheesy white sauce.', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80', isVeg: true },
  
  { id: 'm65', name: 'Classic Garlic Bread', category: 'Toast Time', group: 'bites', price: 99, description: 'Toasted bread spread with aromatic garlic and herb butter.', image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm66', name: 'Stuffed Garlic Bread', category: 'Toast Time', group: 'bites', price: 129, description: 'Crispy garlic bread filled with a savory, cheesy center.', image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm67', name: 'Paneer Garlic Bread', category: 'Toast Time', group: 'bites', price: 149, description: 'Garlic bread topped with spiced cottage cheese pieces.', image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=800&q=80', isVeg: true },
  
  { id: 'm68', name: 'Kulhad Pizza', category: 'Pizza', group: 'mains', price: 99, description: 'A unique, cheesy pizza baked in a traditional clay pot.', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm69', name: 'Margherita', category: 'Pizza', group: 'mains', price: 129, description: 'A classic pizza topped with fresh tomato sauce and mozzarella.', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm70', name: 'Capsicum Delight', category: 'Pizza', group: 'mains', price: 139, description: 'A cheesy pizza topped with crisp, fresh bell peppers.', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm71', name: 'Corn Exotic', category: 'Pizza', group: 'mains', price: 139, description: 'A savory pizza topped with sweet corn and melted cheese.', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm72', name: 'Vegetable Pizza', category: 'Pizza', group: 'mains', price: 149, description: 'A classic pizza loaded with a mix of fresh vegetables.', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm73', name: 'Tandoori Pizza', category: 'Pizza', group: 'mains', price: 179, description: 'A flavorful pizza featuring smoky, Indian-spiced toppings.', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm74', name: 'Farm House', category: 'Pizza', group: 'mains', price: 199, description: 'A hearty pizza topped with an assortment of rustic vegetables.', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm75', name: 'Chef Special', category: 'Pizza', group: 'mains', price: 249, description: 'Our signature pizza prepared with the chef’s choice of toppings.', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80', isVeg: true },
  
  { id: 'm76', name: 'Vegetable Salad Bowl', category: 'Salad', group: 'mains', price: 119, description: 'A fresh, crisp mix of seasonal greens and vegetables.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm77', name: 'Paneer Salad Bowl', category: 'Salad', group: 'mains', price: 149, description: 'A healthy salad topped with protein-rich cottage cheese.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm78', name: 'Chef Special Salad', category: 'Salad', group: 'mains', price: 179, description: 'A premium mixed salad served with our signature dressing.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', isVeg: true },
  
  { id: 'm79', name: 'Chocolate Brownie', category: 'Desserts', group: 'desserts', price: 89, description: 'A rich, dense, and classic chocolate fudge brownie.', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm80', name: 'Choco Lava Cake', category: 'Desserts', group: 'desserts', price: 99, description: 'A soft chocolate cake with a warm, molten center.', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm81', name: 'Brownie With Hot Fudge', category: 'Desserts', group: 'desserts', price: 99, description: 'A chocolate brownie served with warm, rich fudge sauce.', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80', isVeg: true },
  { id: 'm82', name: 'Brownie With Ice Cream', category: 'Desserts', group: 'desserts', price: 119, description: 'A warm brownie served alongside cold vanilla ice cream.', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80', isVeg: true }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Nishkarsh Garg',
    role: 'Local Guide',
    comment: 'Absolutely loving the vibe at this cafe. It’s exactly what you need for a relaxing hangout with friends. Great food, aesthetic interiors, and amazing energy🤌☕️. Highly recommended💯',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=200&q=80',
    date: '2 months ago'
  },
  {
    id: 'r2',
    author: 'Daksh Verma',
    role: 'Customer',
    comment: 'The Midnight Brew is an amazing café with a cozy vibe, great coffee, and friendly service. Perfect spot to relax anytime..',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    date: '2 months ago'
  },
  {
    id: 'r3',
    author: 'Raj Tyagi',
    role: 'Customer',
    comment: 'Best cafe for chill amazing energy guys highly recommended ❤️',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&q=80',
    date: '2 months ago'
  },
  {
    id: 'r4',
    author: 'Priyanshu Pandat',
    role: 'Customer',
    comment: 'The most The café offers the best taste in food and beverages, and the service is truly excellent. The staff is polite, attentive, and quick, making the overall experience very pleasant. I really enjoyed my visit and would highly recommend',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    date: '2 months ago'
  },
  {
    id: 'r5',
    author: 'Saurabh yadav',
    role: 'Local Guide',
    comment: 'My experience was not good at all. I ordered hot coffee and chilli potato. Hot coffe was just like boiled milk and put some coffee, chilly potato was very',
    rating: 1,
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=200&q=80',
    date: '3 weeks ago'
  },
  {
    id: 'r6',
    author: 'Naveen Kumar',
    role: 'Local Guide',
    comment: 'Must try there is blue Lagoon and white sauce pasta',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    date: '2 months ago'
  },
  {
    id: 'r7',
    author: 'Tushar Naagar',
    role: 'Customer',
    comment: 'A must-try! The food tastes wonderful, the cafe has a great ambience, and the staff is very polite to everyone And 🙂↕️🙂↕️🙂↕️ brother 🙂↕️🙂↕️🙂↕️🙂↕️',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    date: '2 months ago'
  },
  {
    id: 'r8',
    author: 'Shubh Tiwari',
    role: 'Local Guide',
    comment: 'Very nice ambience and veryyyy tasty food. Must visit place',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    date: '1 month ago'
  },
  {
    id: 'r9',
    author: 'Divyansh garg',
    role: 'Customer',
    comment: 'The food here is absolutely delicious—every bite feels worth it🫶',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
    date: '2 months ago'
  },
  {
    id: 'r10',
    author: 'shilpi singh',
    role: 'Customer',
    comment: 'Food was amazing service was fabulous.Best place to visit with friends, everything was amazing',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    date: '2 months ago'
  },
  {
    id: 'r11',
    author: 'Pradeep Yadav',
    role: 'Customer',
    comment: 'Very tasty food at affordable rate.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=200&q=80',
    date: '1 month ago'
  },
  {
    id: 'r12',
    author: 'Krish Tyagi',
    role: 'Customer',
    comment: 'Best cafe best food ❤️',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    date: '2 months ago'
  },
  {
    id: 'r13',
    author: 'Lucky Chauhan',
    role: 'Customer',
    comment: 'Lovely vibes, Great food..',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=200&q=80',
    date: '2 months ago'
  },
  {
    id: 'r14',
    author: 'Pihul Sharma',
    role: 'Customer',
    comment: 'Absolutely amazing',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=200&q=80',
    date: '2 months ago'
  },
  {
    id: 'r15',
    author: 'Arjun',
    role: 'Customer',
    comment: 'Amazing',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    date: '2 months ago'
  },
  {
    id: 'r16',
    author: 'Siddhiksha Verma',
    role: 'Customer',
    comment: 'Must visit this cafe if u want cozy experience💕. The food was really good...nd loved the brownie🎀',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    date: '1 month ago'
  },
  {
    id: 'r17',
    author: 'Dev Rana',
    role: 'Customer',
    comment: 'Their Google location showed they were open until 3 AM but they were closed at 12:40 AM. I wasted my time travelling there and back.',
    rating: 1,
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
    date: '1 month ago'
  },
  {
    id: 'r18',
    author: 'Vardaan S. Rathore',
    role: 'Customer',
    comment: 'Loved every bit of it!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    date: '1 month ago'
  },
  {
    id: 'r19',
    author: 'Aarushi Chaudhary',
    role: 'Customer',
    comment: 'Great cafe with a cozy vibe, tasty coffee, and friendly service. Perfect place to relax..✨',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    date: '2 months ago'
  },
  {
    id: 'r20',
    author: 'Rishav Chaudhary',
    role: 'Customer',
    comment: 'Cozy vibe✨ with great food experience 😋',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    date: '2 months ago'
  },
  {
    id: 'r21',
    author: 'Kapil Singh Chauhan',
    role: 'Customer',
    comment: 'Must try Hazelnut Cold Coffee..',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    date: '2 months ago'
  },
  {
    id: 'r22',
    author: 'Yash Rana',
    role: 'Customer',
    comment: 'Best vibe for party and dates',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=200&q=80',
    date: '2 months ago'
  },
  {
    id: 'r23',
    author: 'Yugesh Siddhu',
    role: 'Customer',
    comment: 'Good food in a very reasonable price with good service and friendly environment .',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    date: '2 months ago'
  },
  {
    id: 'r24',
    author: 'Dhruv Sharma',
    role: 'Customer',
    comment: 'Midnight Brew Café is more about the vibe than the food. If you want a chill late-night hangout spot with friends, it’s a good choice. If you’re looking for top-tier coffee or fine dining, you might feel it’s good .',
    rating: 4,
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&q=80',
    date: '2 months ago'
  },
  {
    id: 'r25',
    author: 'Jaags',
    role: 'Customer',
    comment: 'Midnight Brew Café is more about the vibe than the food. If you want a chill late-night hangout spot with friends, it’s a good choice. If you’re looking for top-tier coffee or fine dining, you might feel it’s',
    rating: 4,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    date: '2 months ago'
  }
];

export const CAFE_INFO = {
  name: 'The Midnight Brew',
  tagline: 'Your Late Night Sanctuary & Artisanal Bistro',
  address: 'THE MIDNIGHT BREW, Shop no. GF119, Neelkanth Plaza, near ICICI Bank, Alpha-I Commercial Belt, Block E, Alpha I, Greater Noida, Uttar Pradesh 201310',
  phone: '+91 7011524714',
  email: 'hello@themidnightbrew.com',
  hours: {
    weekdays: 'Tues-Sun 12pm-3am',
    weekends: 'Mon: Closed',
  },
  social: {
    instagram: 'https://www.instagram.com/_themidnightbrew',
    maps: 'https://maps.google.com',
    whatsapp: 'https://whatsapp.com'
  }
};

export const handleInstagramClick = (e: { preventDefault: () => void }) => {
  const username = '_themidnightbrew';
  const webUrl = `https://www.instagram.com/${username}`;
  const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    e.preventDefault();
    const appUrl = `instagram://user?username=${username}`;
    const start = Date.now();
    setTimeout(() => {
      if (Date.now() - start < 2000) {
        window.open(webUrl, '_blank');
      }
    }, 1000);
    window.location.href = appUrl;
  }
};
