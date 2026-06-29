export type Page = 'home' | 'menu' | 'contact' | 'admin';

export type CategoryGroup = 'all' | 'beverages' | 'bites' | 'mains' | 'desserts';

export interface MenuItem {
  id: string;
  name: string;
  category: string; // 'Coffee' | 'Shakes' | 'Mojitos & Iced Tea' | 'Desserts' | 'Wraps' | 'Noodles' | 'Chilli Items' | 'Fried Rice' | 'Momos' | 'Sides'
  group: CategoryGroup;
  price: number;
  description: string;
  image: string;
  isBestseller?: boolean;
  isChefOriginal?: boolean;
  isSpicy?: boolean;
  isVeg: boolean;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  comment: string;
  rating: number;
  avatar: string;
  date: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface ReservationDetails {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  type: 'Table Reservation' | 'Birthday / Private Event' | 'Study Group' | 'Late Night Pickup';
  notes: string;
  attachedItems?: CartItem[];
}
