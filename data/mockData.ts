
import { Product } from '../types';

export const CATEGORIES: string[] = ['Coffee', 'Tea', 'Pastries', 'Sandwiches'];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'prod-001', name: 'Espresso', category: 'Coffee', price: 2.50, stock: 100, imageUrl: 'https://picsum.photos/seed/espresso/400' },
  { id: 'prod-002', name: 'Latte', category: 'Coffee', price: 3.50, stock: 80, imageUrl: 'https://picsum.photos/seed/latte/400' },
  { id: 'prod-003', name: 'Cappuccino', category: 'Coffee', price: 3.50, stock: 75, imageUrl: 'https://picsum.photos/seed/cappuccino/400' },
  { id: 'prod-004', name: 'Americano', category: 'Coffee', price: 3.00, stock: 90, imageUrl: 'https://picsum.photos/seed/americano/400' },
  { id: 'prod-005', name: 'Mocha', category: 'Coffee', price: 4.00, stock: 60, imageUrl: 'https://picsum.photos/seed/mocha/400' },
  
  { id: 'prod-006', name: 'Green Tea', category: 'Tea', price: 2.75, stock: 50, imageUrl: 'https://picsum.photos/seed/greentea/400' },
  { id: 'prod-007', name: 'Chai Latte', category: 'Tea', price: 4.25, stock: 45, imageUrl: 'https://picsum.photos/seed/chai/400' },
  { id: 'prod-008', name: 'Earl Grey', category: 'Tea', price: 2.75, stock: 60, imageUrl: 'https://picsum.photos/seed/earlgrey/400' },
  
  { id: 'prod-009', name: 'Croissant', category: 'Pastries', price: 2.25, stock: 40, imageUrl: 'https://picsum.photos/seed/croissant/400' },
  { id: 'prod-010', name: 'Muffin', category: 'Pastries', price: 2.00, stock: 50, imageUrl: 'https://picsum.photos/seed/muffin/400' },
  { id: 'prod-011', name: 'Cinnamon Roll', category: 'Pastries', price: 3.00, stock: 30, imageUrl: 'https://picsum.photos/seed/cinnamon/400' },
  { id: 'prod-012', name: 'Pain au Chocolat', category: 'Pastries', price: 2.75, stock: 35, imageUrl: 'https://picsum.photos/seed/chocolat/400' },

  { id: 'prod-013', name: 'Turkey Club', category: 'Sandwiches', price: 7.50, stock: 25, imageUrl: 'https://picsum.photos/seed/turkeyclub/400' },
  { id: 'prod-014', name: 'Veggie Delight', category: 'Sandwiches', price: 6.75, stock: 30, imageUrl: 'https://picsum.photos/seed/veggie/400' },
  { id: 'prod-015', name: 'Ham & Cheese', category: 'Sandwiches', price: 7.00, stock: 20, imageUrl: 'https://picsum.photos/seed/hamcheese/400' },
];
