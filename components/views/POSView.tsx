
import React, { useContext, useState } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { CATEGORIES } from '../../data/mockData';
import ProductCard from '../pos/ProductCard';
import Cart from '../pos/Cart';

const POSView: React.FC = () => {
  const { products } = useContext(AppContext);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-8rem)] gap-6">
      <div className="lg:w-2/3 flex flex-col">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <button 
                onClick={() => setActiveCategory('All')}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${activeCategory === 'All' ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'}`}>
                All
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${activeCategory === cat ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto pr-2">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
            </div>
        </div>
      </div>
      <div className="lg:w-1/3">
        <Cart />
      </div>
    </div>
  );
};

export default POSView;
