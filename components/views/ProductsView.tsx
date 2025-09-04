
import React, { useContext } from 'react';
import Card from '../common/Card';
import { AppContext } from '../../contexts/AppContext';

const ProductsView: React.FC = () => {
    const { products } = useContext(AppContext);

    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Product Management</h2>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">Add Product</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-neutral-100">
                            <th className="p-3 font-semibold"></th>
                            <th className="p-3 font-semibold">Name</th>
                            <th className="p-3 font-semibold">Category</th>
                            <th className="p-3 font-semibold">Price</th>
                            <th className="p-3 font-semibold">Stock</th>
                            <th className="p-3 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} className="border-b hover:bg-neutral-50">
                                <td className="p-3">
                                    <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-md object-cover" />
                                </td>
                                <td className="p-3 font-medium">{product.name}</td>
                                <td className="p-3">{product.category}</td>
                                <td className="p-3">${product.price.toFixed(2)}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 text-xs rounded-full ${product.stock > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {product.stock}
                                    </span>
                                </td>
                                <td className="p-3 space-x-2">
                                    <button className="text-primary hover:underline text-sm">Edit</button>
                                    <button className="text-red-500 hover:underline text-sm">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default ProductsView;
