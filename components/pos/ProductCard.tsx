
import React, { useContext } from 'react';
import { Product } from '../../types';
import { AppContext } from '../../contexts/AppContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useContext(AppContext);

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer group transform hover:-translate-y-1 transition-all duration-300 flex flex-col"
      onClick={() => product.stock > 0 && addToCart(product)}
    >
      <div className="relative">
        <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-cover" />
        <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${product.stock > 0 ? 'opacity-0 group-hover:opacity-40' : 'opacity-60'}`}></div>
        {product.stock <= 0 && <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">Out of Stock</span>}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           {product.stock > 0 && <span className="text-white font-bold text-lg">Add to Cart</span>}
        </div>
      </div>
      <div className="p-3 flex-1 flex flex-col justify-between">
        <h3 className="font-semibold text-neutral-800 truncate">{product.name}</h3>
        <p className="text-primary font-bold mt-1">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
