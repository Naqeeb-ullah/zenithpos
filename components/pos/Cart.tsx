
import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { PlusIcon, MinusIcon, TrashIcon } from '../icons/Icons';
import CheckoutModal from './CheckoutModal';
import { PaymentMethod } from '../../types';
import Receipt from './Receipt';

const Cart: React.FC = () => {
    const { cart, updateCartQuantity, clearCart, getCartSubtotal } = useContext(AppContext);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isReceiptOpen, setIsReceiptOpen] = useState(false);
    const [lastOrder, setLastOrder] = useState(null);

    const TAX_RATE = 0.08; // 8%
    const [discount, setDiscount] = useState(0);

    const subtotal = useMemo(() => getCartSubtotal(), [getCartSubtotal]);
    const tax = useMemo(() => subtotal * TAX_RATE, [subtotal]);
    const total = useMemo(() => subtotal + tax - discount, [subtotal, tax, discount]);

    const handleCheckoutSuccess = (order: any) => {
        setLastOrder(order);
        setIsCheckoutOpen(false);
        setIsReceiptOpen(true);
    };

    return (
        <>
            <div className="bg-white rounded-xl shadow-lg flex flex-col h-full">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">Current Order</h2>
                </div>
                {cart.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-neutral-500">
                        <p>Your cart is empty.</p>
                        <p className="text-sm">Add items to get started.</p>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {cart.map(item => (
                            <div key={item.id} className="flex items-center">
                                <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-md object-cover mr-3"/>
                                <div className="flex-1">
                                    <p className="font-semibold text-sm">{item.name}</p>
                                    <p className="text-xs text-neutral-500">${item.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center bg-neutral-100 rounded-full">
                                    <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="p-1.5 text-neutral-600 hover:text-primary"><MinusIcon /></button>
                                    <span className="px-2 text-sm font-bold">{item.quantity}</span>
                                    <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="p-1.5 text-neutral-600 hover:text-primary"><PlusIcon /></button>
                                </div>
                                <p className="w-16 text-right font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                )}
                <div className="p-4 border-t space-y-3">
                     <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Subtotal</span>
                        <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
                        <span className="font-semibold">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm items-center">
                        <span className="text-neutral-600">Discount</span>
                         <input 
                            type="number" 
                            value={discount} 
                            onChange={(e) => setDiscount(Math.max(0, parseFloat(e.target.value) || 0))}
                            className="w-20 text-right font-semibold bg-neutral-100 rounded-md p-1 border"
                        />
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-3 mt-3">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <button 
                        onClick={() => setIsCheckoutOpen(true)}
                        disabled={cart.length === 0}
                        className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-dark transition-colors disabled:bg-neutral-400 disabled:cursor-not-allowed"
                    >
                        Pay Now
                    </button>
                    <button onClick={clearCart} className="w-full text-center text-sm text-red-500 hover:text-red-700 font-medium mt-2">
                        Clear Cart
                    </button>
                </div>
            </div>
            
            <CheckoutModal 
                isOpen={isCheckoutOpen} 
                onClose={() => setIsCheckoutOpen(false)}
                cartDetails={{ subtotal, tax, discount, total }}
                onSuccess={handleCheckoutSuccess}
            />

            {lastOrder && (
                 <Receipt
                    isOpen={isReceiptOpen}
                    onClose={() => setIsReceiptOpen(false)}
                    order={lastOrder}
                 />
            )}
        </>
    );
};

export default Cart;
